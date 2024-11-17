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

// Sign-in validation and Firebase logic
const validateForm = (event) => {
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = ""; // Clear previous errors

  // Validate form inputs
  if (email === "" || password === "") {
    errorMessage.textContent = "All fields are required!";
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage.textContent = "Please enter a valid email!";
    return false;
  }

  // Firebase sign-in logic
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            localStorage.setItem("userId", user.uid);
            localStorage.setItem("userName", doc.data().name);
            localStorage.setItem("userEmail", doc.data().email);
          }
          // Redirect to home page after successful sign-in
          window.location.href = "../../home";
        });
    })
    .catch((error) => {
      errorMessage.textContent = "Invalid email or password"; // Display error message
      console.error("Error during sign-in:", error);
    });

  return false; // Prevent form from actually submitting
};
