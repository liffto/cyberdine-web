import { Menu } from "@/model/products/menu";
import { database } from "../../firebase-config";
import { ref, onValue as getFirebaseData, Query, Unsubscribe, set } from "firebase/database";
import { Item } from "@/model/products/items";
import { CartMenu } from "@/model/orders/cart_menu";
import { CustomerDetails } from "@/model/customer_detail/customer_details";
import { FeedBackDetailsModel } from "@/model/feedback_detail/feedback_details";
import { FoodItem } from "@/model/manage_org_model/hotel_list";
import { deleteObject, ref as uploadImage, getStorage } from "firebase/storage";

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

    getOrgCategoryMenu(restId: string, orgMenuType: string, category: string, callBack: Function): Unsubscribe {
        const completedTasksRef: Query = ref(database, `menu/${restId}/${orgMenuType}/${category}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(snapshot.val())
            }
        })
    }

    getCartMenu(restId: string, deviceId: string, callBack: Function): Unsubscribe {

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

    async addToCart(menu: Item, restId: string, deviceId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/order/${restId}/${deviceId}/${menu.category}/${menu.id}`);
        await set(updateMenu, JSON.parse(JSON.stringify(menu))).then(() => {
            callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    async removeToCart(menu: Item, restId: string, deviceId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/order/${restId}/${deviceId}/${menu.category}/${menu.id}`);
        await set(updateMenu, null).then(() => {
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

    getToken(callback: (data: any) => void): Unsubscribe {
        const completedTasksRef: Query = ref(database, `githubKey`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if ((snapshot.exists())) {
                callback && callback(snapshot.val())
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

    async addFeedbackDetails(feedbackDetails: FeedBackDetailsModel, restId: string, feedbackId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/feedback/${restId}/${feedbackId}`);
        await set(updateMenu, JSON.parse(JSON.stringify(feedbackDetails))).then(() => {
            callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    async updateMenuItem(selectedFoodItems: FoodItem, restId: string, orgMenuType: string, category: string, itemId: string, callback?: (ele: string) => void) {
        const updateMenu = await ref(database, `/menu/${restId}/${orgMenuType}/${category}/${itemId}`);
        await set(updateMenu, JSON.parse(JSON.stringify(selectedFoodItems))).then(() => {
            callback && callback("done")
        }).catch((error) => {
            console.error(error);
            callback && callback("error")
        });
    }

    getHotellist(callBack: Function): Unsubscribe {
        const completedTasksRef: Query = ref(database, `hotel`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(snapshot.val())
            }
        });
    }

    removeLogo(imageUrl: string, callBack: (success: boolean) => void): Unsubscribe {
        const storage = getStorage();
        const storageRef = uploadImage(storage, imageUrl);

        const deleteFile = async () => {
            try {
                await deleteObject(storageRef);
                callBack(true); // Notify success
            } catch (e) {
                console.error("Error deleting file:", e);
                callBack(false); // Notify failure
            }
        };

        deleteFile();
        return () => {
            // Optionally return a cleanup function if needed
        };
    }
}