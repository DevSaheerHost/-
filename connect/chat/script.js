window.addEventListener("load", function () {
  const user_name = document.querySelector("#user_name");
const user_dp = this.document.querySelector("#user_dp")
  const firebaseConfig = {
    apiKey: "AIzaSyDiXOyYgEwZKb0nLgVyDgi_zMlScS8pknY",
    authDomain: "abcd-23e67.firebaseapp.com",
    databaseURL: "https://abcd-23e67-default-rtdb.firebaseio.com",
    projectId: "abcd-23e67",
    storageBucket: "abcd-23e67.firebasestorage.app",
    messagingSenderId: "17831104016",
    appId: "1:17831104016:web:6e7f58609291c2181c4495",
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Check if user is authenticated
  auth.onAuthStateChanged((user) => {
    if (!user) {
      alert("You need to log in to access the chat.");
      window.location.href = "../auth/sign_in";
    } else {
      const partnerUid = localStorage.getItem("partnerUid");
      const partnerName = localStorage.getItem("partnerName");
      const partnerDp = this.localStorage.getItem("partnerDp")
      if (!partnerUid || !partnerName) {
        alert("No user selected for chat. Please go back to the user list.");
        window.location.href = "../home/";
      } else {
        console.log(partnerDp);
        
        user_name.textContent = partnerName;
        user_dp.src =partnerDp;
        // Real-time chat listener
        db.collection("chats")
          .where("participants", "array-contains", user.uid)
          .orderBy("timestamp")
          .onSnapshot((snapshot) => {
            const chatBox = document.getElementById("chatBox");
            chatBox.innerHTML = "";
            snapshot.forEach((doc) => {
              const message = doc.data();
              if (message.participants.includes(partnerUid)) {
                sendText(message, partnerName);
              }
            });
            // Scroll to the bottom of the chatBox to show the latest message
            chatBox.scrollTop = chatBox.scrollHeight;
          });
      }
    }
  });

  // Send a message
  window.sendMessage = () => {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();

    const user = auth.currentUser;
    const partnerUid = localStorage.getItem("partnerUid");

    if (messageText && user && partnerUid) {
      db.collection("chats")
        .add({
          participants: [user.uid, partnerUid],
          text: messageText,
          senderName: user.displayName || user.email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          time: getCurrentTime(),
        })
        .then(() => {
          messageInput.value = "";
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          alert("Failed to send message. Try again.");
        });
    }
  };
});
const userEmail = localStorage.getItem("userEmail");
const sendText = (message, partnerName) => {
  const chatBox = document.getElementById("chatBox"); // Define it here
  const messageClass = message.senderName === userEmail ? "received" : "sent";
  chatBox.innerHTML += `<div class="message ${messageClass}">
                           ${message.text}
                           <div class="message_time">${message.time?message.time:''}</div>
                        </div>`;
  //console.log(messageClass, message.senderName);
};

const getCurrentTime = () => {
  const now = new Date();

  // Extract hours and minutes
  let hours = now.getHours();
  const minutes = now.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert '0' to '12'

  // Format minutes with leading zero if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Combine parts into the desired format
  const currentTime = `${hours}:${formattedMinutes} ${ampm}`;
  return currentTime;
};

// console.log(getCurrentTime());
