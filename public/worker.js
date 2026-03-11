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
    body: "Push notification working"
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    tag: Date.now().toString() // unique tag for every notification
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );

});