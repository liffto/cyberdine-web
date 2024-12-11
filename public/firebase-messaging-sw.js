importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA4-6BS8G_dd1aRBRjtYuDc8Iy1Xxyq5ic",
  authDomain: "lt-menu-c2fff.firebaseapp.com",
  projectId: "lt-menu-c2fff",
  storageBucket: "lt-menu-c2fff.appspot.com",
  messagingSenderId: "267592842259",
  appId: "1:267592842259:web:cf076b45c8ca9b0c9d93e6",
  measurementId: "G-N30NNFGGC2",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});