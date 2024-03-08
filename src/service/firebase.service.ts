import { Menu } from "@/model/products/menu";
import { database } from "../../firebase-config";
import { ref, onValue as getFirebaseData, Query, Unsubscribe } from "firebase/database";

export class FirebaseServices {
    static shared: FirebaseServices = new FirebaseServices();

     getOrgMenu(restId: string, callBack: Function):Unsubscribe {
        const completedTasksRef: Query = ref(database, `menu/${restId}`);
        console.log("firebase");
        
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(new Menu(snapshot.val()))
            }
        })
    }

     getRestCategory(restId: string, callBack: Function):Unsubscribe {
        const completedTasksRef: Query = ref(database, `category/${restId}`);
        return getFirebaseData(completedTasksRef, (snapshot) => {
            if (snapshot.exists()) {
                callBack(snapshot.val())
            }
        });

    }
}