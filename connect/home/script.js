window.addEventListener("load", function () {
  const userDesc = localStorage.getItem("userDesc");
  const userTag = localStorage.getItem("userTag");
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const hide_profile = document.querySelector("#hide_profile");
  const desc_text_p = document.querySelector("#desc_text_p");
  const my_ac_circle = document.querySelector("#my_ac_circle");
  const home_page = document.querySelector("#home_page");
  const profile_page = document.querySelector("#profile_page");
  const about_text_p = document.querySelector("#about_text_p");
  const new_name_input = document.querySelector("#new_name_input");
  const new_desc_input = document.querySelector("#new_desc_input");
  const new_tag_input = document.querySelector("#new_tag_input");
  const user_name = profile_page.querySelector("#user_name");
  const user_career = profile_page.querySelector("#user_career");
  const user_dp = profile_page.querySelector("#user_dp");
  const button_wrap = profile_page.querySelector("#button_wrap");
  const my_career_p = document.querySelector("#my_career_p");
  const closeProfile = document.querySelector("#closeProfle");
  const usersList = document.getElementById("usersList");
  const my_profile = document.querySelector("#my_profile");
  const updateBtn = document.querySelector("#updateBtn");
  const sign_out_btn = document.querySelector("#sign_out");
  let firstName;

  // functions ___________
  const positive = () => {
    firstName = userName.split(" ")[0];
    my_ac_circle.textContent = userName.charAt(0);
  };
  const negative = () => {
    document.location = "../auth/sign_up";
  };

  userName && userEmail ? positive() : negative();

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

  // Sign in user and load user list, excluding the logged-in user
  auth.onAuthStateChanged((user) => {
    if (user) {
      loadUserList(user.uid);
    } else {
      // Redirect to login if not authenticated
      window.location.href = "../auth/sign_in";
    }
  });

  const loadUserList = (loggedInUid) => {
    db.collection("users").onSnapshot((snapshot) => {
      usersList.innerHTML = "";

      snapshot.forEach((doc) => {
        const user = doc.data();
        if (user.uid !== loggedInUid) {
          usersList.innerHTML += getUserCard(user);
        } else {
          my_career_p.textContent = user.career;

          new_name_input.value = userName;
          new_desc_input.value = user.description;
          new_tag_input.value = user.tag;
        }
      });
    });
  };

  // Start chat with selected user
  window.startChat = function (selectedUid, partnerName) {
    // Store partner UID and name in localStorage
    localStorage.setItem("partnerUid", selectedUid);
    localStorage.setItem("partnerName", partnerName);

    // Navigate to chat page
    window.location.href = "../chat/";
  };

  const showProfile = (id, name, career, desc, tag) => {
    showElem(profile_page);
    setProfile(id, name, career, desc, tag);
  };

  const getUserCard = (user) => `
    <div class="card" data-uid="${user.uid}" data-name="${user.name.replace(/^"+|"+$/g, "")}" data-career="${user.career.replace(/^"+|"+$/g, "")}" data-desc="${user.description.replace(/^"+|"+$/g, "")}" data-tag="${user.tag.replace(/^"+|"+$/g, "")}" onclick="window.location.hash='profile'">
    <div class='profile_wrapper'>
      <div class="profile">
        <span class="dp">
          <img src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="User Profile Picture">
        </span>
        <span>
          <h3>${user.name}</h3>
          <p class="gray small">${user.career}</p>
        </span>
      </div>
      <button class='chat'>Chat</button>
      </div>
      <p class='user_desc'>${user.description}</p>
    </div>
  `;

  // Event delegation to handle card clicks
  usersList.addEventListener("click", function (event) {
    const card = event.target.closest(".card"); // Find the closest card element
    if (card) {
      const userId = card.dataset.uid;
      const userName = card.dataset.name;
      const userCareer = card.dataset.career;
      const userDesc = card.dataset.desc;
      const userTag = card.dataset.tag;
      showProfile(userId, userName, userCareer, userDesc, userTag);
    }
  });

  const showElem = (elem) => {
    elem.classList.remove("closeElem");
    elem.classList.add("openElem");
  };

  const hideElem = (elem) => {
    elem.classList.add("closeElem");
    elem.classList.remove("openElem");
  };

  const hideElemDown = (elem) => {
    elem.classList.add("closeElemDown");
    elem.classList.remove("openElemUp");
  };

  const showElemUp = (elem) => {
    elem.classList.remove("closeElemDown");
    elem.classList.add("openElemUp");
  };

  const setProfile = (id, name, career, desc, tag) => {
    desc_text_p.textContent = tag;
    about_text_p.textContent = desc;
    const firstName = name.split(" ")[0];
    my_ac_circle.textContent = userName.charAt(0);
    user_name.textContent = name;
    user_career.textContent = career;
    user_dp.src =
      "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
    button_wrap.innerHTML = `
      <button class="message" onclick="startChat('${id}', '${name}')" id='chat_with_btn'>
        Chat with ${firstName}<i class="fa-solid fa-arrow-right"></i>
      </button>
    `;
  };

  const dataChanging = () => {
    error_text.textContent = "";
    updateBtn.removeAttribute("disabled");
  };

  updateBtn.onclick = () => updateMyData();

  const updateMyData = () => {
    const error_text = document.querySelector("#error_text");
    error_text.textContent = "";
    const newName = document.querySelector("#new_name_input").value.trim();
    const newDesc = document.querySelector("#new_desc_input").value.trim();
    const newTag = document.querySelector("#new_tag_input").value.trim();
    newName.length < 3
      ? (error_text.textContent = "Name must be at least 3 letters")
      : uploadData(newName, newDesc, newTag);
  };

  const uploadData = (name, desc, tag) => {
    //console.log(name, desc, tag)
    updateBtn.setAttribute("disabled", "");
    // Get the current user's UID from localStorage
    const userId = localStorage.getItem("userId");

    // Create a reference to the user document in Firestore
    const userRef = db.collection("users").doc(userId);

    // Update the user document with the new data
    userRef
      .update({
        name: name,
        description: desc,
        tag: tag,
      })
      .then(() => {
        // Show success message or update the UI to reflect the changes
        // alert('Profile updated successfully!');

        // Optionally, you could also update the localStorage to reflect the new name
        localStorage.setItem("userName", name);
        localStorage.setItem("userDesc", desc);
        localStorage.setItem("userTag", tag);

        // After successful update, you can close the profile section or do something else
        hideElemDown(my_profile);
      })
      .catch((error) => {
        // Handle errors if the update fails
        console.error("Error updating user data: ", error);
        error_text.textContent = "Failed to update data. Please try again.";
      });
  };

  closeProfile.onclick = () => hideElemDown(my_profile);
  my_ac_circle.onclick = () => showElemUp(my_profile);
  hide_profile.onclick = () => {
    window.location.hash = "";
  };
  new_name_input.onchange = () => dataChanging();
  new_desc_input.onchange = () => dataChanging();
  new_tag_input.onchange = () => dataChanging();

  sign_out_btn.onclick = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location = "./";
  };

  const handleUrlChange = () => {
    //const currentUrl = window.location.href;
    //if currentUrl.endsWith('') then
    const hash = window.location.hash;
    if (hash == "" || hash == "#") {
      console.log("Home section loaded");
      hideElem(profile_page);
    } else if (hash == "#profile") {
      showElem(profile_page);
      console.log("Profile section loaded");
    } else {
      console.log("Other section loaded", hash);
    }
  };
  const chaneHash = (hash) => {
    window.location.hash = hash;
  };
  handleUrlChange();
  window.addEventListener("hashchange", handleUrlChange);

  try {
    const action = someObject.action; // Example
  } catch (error) {
    console.error("Error accessing property:", error);
  }
});
