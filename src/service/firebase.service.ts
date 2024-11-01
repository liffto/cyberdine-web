import { database } from "../../firebase-config";
import { ref, onValue as getFirebaseData, Query, Unsubscribe, set, update } from "firebase/database";
import { Item } from "@/model/products/items";
import { CartMenu } from "@/model/orders/cart_menu";
import { CustomerDetails } from "@/model/customer_detail/customer_details";

export class FirebaseServices {
    static shared: FirebaseServices = new FirebaseServices();

    getOrgMenu(restId: string, callBack: Function): Unsubscribe {
        const completedTasksRef: Query = ref(database, `menu/${restId}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(snapshot.val())
            }
        })
    }

    getCartMenu(restId: string, table: string, deviceId: string, callBack: Function): Unsubscribe {
        const completedTasksRef: Query = ref(database, `order/${restId}/table${table}/${deviceId}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(new CartMenu(snapshot.val()))
            }
        })
    }

    getRestCategory(restId: string, callBack: Function): Unsubscribe {
        const completedTasksRef: Query = ref(database, `category/${restId}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(snapshot.val())
            }
        });
    }

    async addToCart(menu: Item, restId: string, deviceId: string, table: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/order/${restId}/${table}/${deviceId}/cart/${menu.category}/${menu.id}`);
        await set(updateMenu, JSON.parse(JSON.stringify(menu))).then(() => {
            callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    async removeToCart(menu: Item, restId: string, deviceId: string, table: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/order/${restId}/${table}/${deviceId}/cart/${menu.category}/${menu.id}`);
        await set(updateMenu, menu.quantity == null ? null : JSON.parse(JSON.stringify(menu))).then(() => {
            callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    getCustomerDetails(restId: string, deviceId: string, callback?: (ele: boolean) => void): Unsubscribe {
        const completedTasksRef: Query = ref(database, `customerDetails/${restId}/${deviceId}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (!(snapshot.exists())) {
                callback && callback(true)
            }
        });
    }

    async addCustomerDetails(customerDetails: CustomerDetails, restId: string, deviceId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/customerDetails/${restId}/${deviceId}`);
        await set(updateMenu, JSON.parse(JSON.stringify(customerDetails))).then(() => {
            callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    async placeOrder(data: Map<string, Map<string, Item>>, restId: string, deviceId: string, table: string, callback?: (ele: string) => void) {
        try {
            const plainData = Object.fromEntries(
                Array.from(data, ([key, value]) => [key, Object.fromEntries(value)])
            );
            for (const key in plainData) {
                if (plainData.hasOwnProperty(key)) {
                    const items = plainData[key];
                    for (const itemKey in items) {
                        if (items.hasOwnProperty(itemKey)) {
                            items[itemKey].isOrdered = true;
                        }
                    }
                }
            }
            const updateMenu = ref(database, `/order/${restId}/table${table}/${deviceId}/pending`);
            await set(updateMenu, JSON.parse(JSON.stringify(plainData)));
            const cartRef = ref(database, `/order/${restId}/table${table}/${deviceId}/cart`);
            await set(cartRef, null);
            callback?.("done");
        } catch (error) {
            console.error("Error updating isOrdered:", error);
            callback && callback("error");
        }
    }


}