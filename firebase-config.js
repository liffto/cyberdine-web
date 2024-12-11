// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getMessaging,getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL:
    process.env.NODE_ENV === "development"
      ? "https://lt-menu-c2fff-default-rtdb.firebaseio.com"
      : "https://cyberdine-aeeb1-default-rtdb.firebaseio.com",
  // databaseURL: 'https://lt-menu-c2fff-default-rtdb.firebaseio.com',
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
console.log(firebaseConfig,"firebaseConfig");
// Initialize Firebase
const app = initializeApp(firebaseConfig,"cyberdine");
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL:
    process.env.NODE_ENV === "development"
      ? "https://lt-menu-c2fff-default-rtdb.firebaseio.com"
      : "https://cyberdine-aeeb1-default-rtdb.firebaseio.com",
  // databaseURL: 'https://lt-menu-c2fff-default-rtdb.firebaseio.com',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
export const getMessagingFun = () => {
  if (typeof window !== "undefined"){
    
    console.log(config,"config");
    
    const app = 
      initializeApp(config)
    return getMessaging(app);
  }
  else{
    return null
  }
};
async function requestNotificationPermission() {
  if (typeof window !== "undefined" && "Notification" in window) {
    try {
      const permission = await Notification.requestPermission();
      const app =  initializeApp(config)
        
      if (permission === "granted") {
        const messaging = getMessaging(app);

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        return token;
      }
    } catch (error) {
      console.error("Error getting notification permission:", error);
    }
  }
  return null;
}

export { database, firebaseConfig, };
export { app, requestNotificationPermission}