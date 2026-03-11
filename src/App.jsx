import React, { useEffect } from "react";
import axios from "axios";

const publicVapidKey =
"BFRoQ6-5WAEkEDFi2MrzBvdmL9TqMVzNzD1-4GbG-mt6omFQjS-9P-4QLSKFAtrLgCwNoNdLvH9th1O8_jlOYSo";

const API_URL = "https://push-notification-backend-ukcd.onrender.com";

function App() {

  useEffect(() => {
    subscribeUser();
  }, []);

  async function subscribeUser() {

    const permission = await Notification.requestPermission();
    console.log("Permission:", permission);

    if (permission !== "granted") return;

    // register service worker
    const registration = await navigator.serviceWorker.register("/worker.js");
    console.log("Service worker registered");

    await navigator.serviceWorker.ready;

    // check existing subscription
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {

      console.log("Creating subscription");

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

    }

    console.log("Subscription:", subscription);

    try {

      await axios.post(`${API_URL}/subscribe`, subscription);

      console.log("Subscribed successfully");

    } catch (err) {

      console.error("Subscription error:", err);

    }

  }

  function urlBase64ToUint8Array(base64String) {

    const padding = "=".repeat((4 - base64String.length % 4) % 4);

    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);

    return new Uint8Array(
      [...rawData].map(char => char.charCodeAt(0))
    );

  }

  return (
    <div>
      <h1>MERN Push Notifications</h1>

      <button
        onClick={() => axios.post(`${API_URL}/sendNotification`)}
      >
        Send Notification
      </button>

    </div>
  );

}

export default App;