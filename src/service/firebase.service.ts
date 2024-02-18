import { Menu } from "@/model/products/menu";
import { database } from "../../firebase-config";
import { ref, onValue as getFirebaseData, Query } from "firebase/database";

export class FirebaseServices{
    static shared:FirebaseServices = new FirebaseServices();
    async getOrgMenu(restId:string,callBack:Function){
        const completedTasksRef: Query = ref(database, `menu/${restId}`);
     getFirebaseData(completedTasksRef,(snapshot)=>{
        if(snapshot.exists() ){
            callBack(new Menu(snapshot.val()))
        }
     });
    // console.log(snapshot.val(),"snapshot");
    
    }
}