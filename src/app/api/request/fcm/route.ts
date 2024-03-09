import { getMessaging } from "firebase-admin/messaging";
import admin from "firebase-admin";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
// **Initialize Firebase app (move outside the handler function):**
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      process.env.NODE_ENV == "development"
        ? require("../../../../../firebase-admin-config.dev.json")
        : require("../../../../../firebase-admin-config.prod.json")
    ),
  });
}

const messaging = getMessaging(); // Access messaging service after initialization

export async function POST(req: NextRequest) {
  const rawBody = (await req.body!.getReader().read()).value;
  const decoder = new TextDecoder();
  const decodedString = decoder.decode(rawBody);
  const datas = JSON.parse(decodedString);
  const { token, data } = datas;
  const notificationData = {
    title: data.title, // Assuming title comes from the request body
    body: data.body, // Assuming body comes from the request body
  };

  const data1 = {
    notification: notificationData, 
    token,
  };
  if (!token || !data) {
    return NextResponse.json({ error: "Missing token or data" });
  }
  try {
    const response = await messaging.send(data1);
    console.log("Message sent successfully:", response);
    return NextResponse.json({ message: "Notification sent!" });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Failed to send notification" });
  }
}
