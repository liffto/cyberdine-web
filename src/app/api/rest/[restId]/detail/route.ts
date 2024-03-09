import { database } from "../../../../../../firebase-config";
import { ref, get as getFirebaseData, Query } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log("req.url",req.url.split("/")[5]);
    const completedTasksRef: Query = ref(database, `hotel/${req.url.split("/")[5]}`);
    const snapshot = await getFirebaseData(completedTasksRef);
    if (snapshot.exists()) {
      return NextResponse.json({
        data: snapshot.val(),
      });
    } else {
      return NextResponse.json({
        data: "No data found",
      });
    }
}