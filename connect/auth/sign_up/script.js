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

// Sign-up validation and Firebase logic
const validateForm = (event) => {
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const career = document.getElementById("career").value.trim();
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = ""; // Clear previous errors

  // Validate form inputs
  if (name === "" || email === "" || career === "select" || password === "") {
    errorMessage.textContent = "All fields are required!";
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage.textContent = "Please enter a valid email!";
    return false;
  }

  if (password.length < 6) {
    errorMessage.textContent = "Password should be at least 6 characters long!";
    return false;
  }

  // Firebase sign-up logic
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Store user data in Firestore
      db.collection("users")
        .doc(user.uid)
        .set({
          uid: user.uid,
          name: name,
          email: email,
          career: career,
          description:'add a value',
          tad: 'add a value'
        })
        .then(() => {
          // Store user data in localStorage for later use
          localStorage.setItem("userId", user.uid);
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);

          // Redirect to home after successful sign-up
          window.location.href = "../../home";
        })
        .catch((error) => {
          errorMessage.textContent = "Error saving user data: " + error.message;
          console.error("Error storing user data in Firestore:", error);
        });
    })
    .catch((error) => {
      // Display error if Firebase sign-up fails
      errorMessage.textContent = error.message;
      console.error("Error during sign-up:", error);
    });
};
