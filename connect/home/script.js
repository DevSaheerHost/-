  // Get data from localStorage
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const account_circle = document.querySelector('#account_circle');
  const home_page = document.querySelector('#home_page')
  const profile_page = document.querySelector('#profile_page');
  
  const user_name = profile_page.querySelector('#user_name')
  const user_career = profile_page.querySelector('#user_career')
  const user_dp = profile_page.querySelector('#user_dp')
  const button_wrap = profile_page.querySelector('#button_wrap')

const usersList = document.getElementById("usersList");
let firstName;
// functions ___________

const positive = () =>{
    firstName = userName.split(' ')[0]
    account_circle.textContent=userName.charAt(0);
  }
  const negative = () => {
    document.location='../auth/sign_up'
  }
  
  userName && userEmail ?
  positive(): 
  negative();
  
  
  
  
  
  
  window.addEventListener("load", function() {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDiXOyYgEwZKb0nLgVyDgi_zMlScS8pknY",
      authDomain: "abcd-23e67.firebaseapp.com",
      databaseURL: "https://abcd-23e67-default-rtdb.firebaseio.com",
      projectId: "abcd-23e67",
      storageBucket: "abcd-23e67.firebasestorage.app",
      messagingSenderId: "17831104016",
      appId: "1:17831104016:web:6e7f58609291c2181c4495"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Sign in user and load user list, excluding the logged-in user
    auth.onAuthStateChanged(user => {
      if (user) {
        loadUserList(user.uid);
      } else {
        // Redirect to login if not authenticated
        window.location.href = '../auth/sign_in';
      }
    });

    function loadUserList(loggedInUid) {
      db.collection("users").onSnapshot(snapshot => {
        usersList.innerHTML = "";
        
        snapshot.forEach(doc => {
          const user = doc.data();
          if (user.uid !== loggedInUid) {
            usersList.innerHTML += getUserCard(user);
          }
        });
      });
    }

    // Start chat with selected user
    window.startChat = function(selectedUid, partnerName) {
      // Store partner UID and name in localStorage
      localStorage.setItem('partnerUid', selectedUid);
      localStorage.setItem('partnerName', partnerName);
      
      // Navigate to chat page
      window.location.href = '../chat/';
    }
  });
  
  
  const showProfile=(id, name, career)=>{
    showElem(profile_page);
    setProfile(id, name, career)
  }
  
  
  getUserCard = (user) => `
<div class="card" onclick="showProfile('${user.uid}', '${user.name}', '${user.career}')">
  <div class="profile">
    <span class="dp">
      <img src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="User Profile Picture">
    </span>
    <span>
      <h3>${user.name}</h3>
      <p class="gray small">${user.career}</p>
    </span>
  </div>
</div>
`;
  const showElem = elem =>{
    elem.classList.remove('closeElem')
  elem.classList.add('openElem');
  }
  const hideElem = elem =>{
    elem.classList.add('closeElem')
  elem.classList.remove('openElem');
  }
  
  const setProfile = (id, name, career)=>{
    user_name.textContent=name;
    user_career.textContent=career;
    user_dp.src='https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
    button_wrap.innerHTML=`
    <button class="message" onclick="startChat('${id}', '${name}')">
      Lets chat
       <i class="fa-solid fa-arrow-right"></i> </button>
    `
  }