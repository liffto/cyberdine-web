import { Menu } from "@/model/products/menu";
import { database } from "../../firebase-config";
import { ref, onValue as getFirebaseData, Query, Unsubscribe, set } from "firebase/database";
import { Item } from "@/model/products/items";
import { CartMenu } from "@/model/orders/cart_menu";
import { CustomerDetails } from "@/model/customer_detail/customer_details";

export class FirebaseServices {
    static shared: FirebaseServices = new FirebaseServices();

    getOrgMenu(restId: string, callBack: Function): Unsubscribe {
        const completedTasksRef: Query = ref(database, `menu/${restId}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(new Menu(snapshot.val()))
            }
        })
    }

    getCartMenu(restId: string,deviceId:string, callBack: Function): Unsubscribe {
        
        const completedTasksRef: Query = ref(database, `order/${restId}/${deviceId}`);
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

    async addToCart(menu: Item, restId: string,deviceId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/order/${restId}/${deviceId}/${menu.category}/${menu.id}`);
        await set(updateMenu, JSON.parse(JSON.stringify(menu))).then(() => {
           callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    async removeToCart(menu: Item, restId: string,deviceId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/order/${restId}/${deviceId}/${menu.category}/${menu.id}`);
        await set(updateMenu, null).then(() => {
            callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    getCustomerDetails(restId: string,deviceId: string, callback?: (ele: boolean) => void): Unsubscribe {        
        const completedTasksRef: Query = ref(database, `customerDetails/${restId}/${deviceId}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (!(snapshot.exists())) {
                callback && callback(true)
            }
        });
    }

    async addCustomerDetails(customerDetails: CustomerDetails, restId: string,deviceId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/customerDetails/${restId}/${deviceId}`);
        await set(updateMenu, JSON.parse(JSON.stringify(customerDetails))).then(() => {
           callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }
}