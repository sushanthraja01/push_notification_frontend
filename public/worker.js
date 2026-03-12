self.addEventListener("install", event => {
  self.skipWaiting();
});


self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});


self.addEventListener("push", event => {

  console.log("Push event received");

  let data = {
    title: "Notification",
    body: "Push notification working",
    url: "https://push-notification-frontend-inky.vercel.app/"
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (err) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: "/logo192.png",
    tag: Date.now().toString(), // unique notification
    data: {
      url: data.url || "https://push-notification-frontend-inky.vercel.app/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );

});


self.addEventListener("notificationclick", event => {

  event.notification.close();

  const url = event.notification.data?.url || "https://push-notification-frontend-inky.vercel.app/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(clientList => {

      for (const client of clientList) {

        if (client.url === url && "focus" in client) {
          return client.focus();
        }

      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }

    })
  );

});