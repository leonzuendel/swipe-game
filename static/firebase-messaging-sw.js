
importScripts(
  'https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDlEy0WvIlAaRv1tf15w0dp9qdRZFvzZA0","authDomain":"leonzuendel-swipe-game.firebaseapp.com","databaseURL":"https:\u002F\u002Fleonzuendel-swipe-game.firebaseio.com","projectId":"leonzuendel-swipe-game","storageBucket":"leonzuendel-swipe-game.appspot.com","messagingSenderId":"489772235999","appId":"1:489772235999:web:32a46e71d0a7b758e43d6a"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.info("SW received the message: ", payload);
  const notification = payload.notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath
      }
    ]
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification
  // MARK 1 -> always takes first item
  const clickAction = notification.actions[0].action
  const action = e.action
  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow(clickAction)
    notification.close()
  }
})
