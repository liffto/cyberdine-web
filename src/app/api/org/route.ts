import { database } from "../../../../firebase-config";
import { ref, get as getFirebaseData, Query } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // const request = await req.json();
    return NextResponse.json({"hi":JSON.stringify(req.url)})

    // const completedTasksRef: Query = ref(database, queryPath);
    // const snapshot = await getFirebaseData(completedTasksRef);

    // if (snapshot.exists()) {
    //   return NextResponse.json({
    //     data: snapshot.val(),
    //   });
    // } else {
    //   return NextResponse.json({
    //     data: "No data found",
    //   });
    // }
  } catch (error: any) {
    return NextResponse.error();
  }
}