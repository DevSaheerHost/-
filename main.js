// v 3.4

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAthM6oD2dYuAPrrLtqZT3pOWvkb17zRME",
  authDomain: "codersaheer.firebaseapp.com",
  databaseURL: "https://codersaheer-default-rtdb.firebaseio.com",
  projectId: "codersaheer",
  storageBucket: "codersaheer.appspot.com",
  messagingSenderId: "894319865406",
  appId: "1:894319865406:web:d3dfb840065d9c9344ab6f",
  measurementId: "G-SH7NLD967G",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

const totellabel = document.querySelector("#totelText");
const loader = document.querySelector("loader");
const cardSection = document.querySelector("#cardSec");
const iframe = document.querySelector("iframe");
const backBtn = document.querySelector("#back");
const nav = document.querySelector("nav");
const Alert = document.querySelector("alert");
const usernameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const commandInput = document.querySelector("#commandInput");
const commandBtn = document.querySelector("#commandBtn");
const sendSvg = document.querySelector("#sendSvg");
const UserIcon = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>`;

var lightIcon = `<svg width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`;

var darckIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
          </svg>`;
const loader2 = document.querySelector("loader2");
const themeBtn = document.querySelector("#themeBtn");
let name = localStorage.getItem("name")
  ? localStorage.getItem("name")
  : "non Auther";
const messageDiv = document.querySelector("message-div");
var TotalData = 0;

// check if user is signed in, the title will be set to the user's name
if (localStorage.getItem("name") !== null) {
  document.title = localStorage.getItem("name");
}
let dataStore = [];
database
  .ref("web/data/")
  .on("child_added", (snapshot) =>
    dataStore.push({ ...snapshot.val(), key: snapshot.key })
  );
setTimeout(() => {
  dataStore.reverse();
  console.log(dataStore);
}, 5000);

const FetchAndCreateCard = (cardSection) => {
  const dataArr = [];

  // Fetch all data once
  database.ref("web/data/").once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const snapshotKey = childSnapshot.key;
      const data = childSnapshot.val();
      dataArr.push({ data, snapshotKey });
    });

    // Reverse the data array
    const reversedData = dataArr.reverse();

    // Now call createCard once for each reversed item
    reversedData.forEach((item) => {
      createCard(item.data, item.snapshotKey, cardSection);
    });
  });
};
FetchAndCreateCard(cardSection);

togleMenu = () => {
  nav.classList.toggle("openMenu");
};

document.querySelector("main").onclick = () => nav.classList.remove("openMenu");
document.querySelector(".menuList").onclick = () => togleMenu();

// -------------command input function------//

commandInput.oninput = () => {
  if (commandInput.value.length !== 0) {
    sendSvg.style.fill = "#42445A";
  } else {
    sendSvg.style.fill = "#42445A57";
  }

  if (commandInput.value.length >= 100) {
    commandInput.style.color = "red";
    sendSvg.style.color = "red";
  } else {
    commandInput.style.color = "#42445A";
    //endSvg.style.color='#42445A'
  }
};

const createCard = (data, snapshotKey, parant, typeText) => {
  TotalData++;
  totellabel.innerHTML = `${TotalData} ${typeText || "Contents"}`;
  loader.style.display = "none";
  const newCard = document.createElement("card");
  newCard.innerHTML = getCardLayout(data);
  parant.appendChild(newCard);

  console.log(parant.classList);

  addReactionToDataCard(data, newCard);
  newCard.querySelector(".addReaction").onclick = () => {
    addNewReactionToDataCard(data, snapshotKey, newCard);
  };
};

const addReactionToDataCard = (data, newCard) => {
  if (data.clicked && data.totReact) {
    newCard.querySelector(".addReaction").innerText = `👍🏼 ${data.totReact}`;
  }
};

const addNewReactionToDataCard = (data, snapshotKey, newCard) => {
  // Update the UI to show an immediate reaction change
  const currentReactions = data.totReact || 0; // Set to 0 if undefined
  const newReactionCount = currentReactions + 1;

  newCard.querySelector(".addReaction").innerText = `👍🏼 ${newReactionCount} `;

  // Update Firebase with the new reaction count and set clicked to true
  database.ref("web/data/" + snapshotKey).update({
    clicked: true,
    totReact: newReactionCount,
    reactorName: name,
  });
};
const getCardLayout = (data) => {
  return (
    `
          <a href="` +
    data.pageurl +
    `" target="_blank"><img src="` +
    data.image +
    `" alt="">
 <text-area>
<h5 class='m-1-0'>` +
    data.title +
    `</h5>
 <label for=""> ` +
    data.subtitle +
    `</label>
 <label class="type m-1-0"> ` +
    data.type +
    `</label>
  </text-area>
  <label class="timeLbl">` +
    data.time +
    `</label>
 </a>
  <span class="addReaction">🫥</span> <span class="reactions hidden">👍🏼 ♥️ 😁 👎🏼 </span>
          `
  );
};

// alert for signup //

// cancel alert function //
const cancel = () => {
  Alert.style.display = "none";
};
var userAgent = navigator.userAgent;

// signup function f r o m alert //
const signup = () => {
  if (usernameInput.value.length !== 0 && emailInput.value.length !== 0) {
    cancel();

    database
      .ref("web/users/")
      .push({
        name: usernameInput.value,
        email: emailInput.value,
        userAgent: userAgent,
        userDp: UserIcon,
        // timestamp: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        showLog("Login Success");
        // Reload the page once data is successfully saved
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        showLog("Error adding user:", error);
      });

    if (commandInput.value.length !== 0) {
      commandBtn.onclick();
      cancel();
    }

    localStorage.setItem("login", "true");
    localStorage.setItem("name", usernameInput.value);
    document.title = localStorage.getItem("name");

    var logTxt = "Login Success with " + localStorage.getItem("name");
    showLog(logTxt);
  } else {
    var logTxt = "Please Fill all inputs ";
    showLog(logTxt);
  }
};

commandBtn.onclick = () => {
  if (commandInput.value.length >= 100) {
    var logTxt = "Maximum Characters Exeeded";
    showLog(logTxt);
  } else {
    if (localStorage.getItem("login") == "true") {
      if (commandInput.value.length !== 0) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        const tm = String(currentDate.getTime());
        // console.log(formattedDate);

        var userAgent = navigator.userAgent;

        database.ref("web/messages/").push({
          name: localStorage.getItem("name"),
          time: formattedDate,
          message: commandInput.value,
          userAgent: userAgent,
          userDp: UserIcon,
          // timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        commandInput.value = "";
      } else {
        var logTxt = "Please Enter Something";
        showLog(logTxt);
      }
      document.title = localStorage.getItem("name");
    } else {
      Alert.style.display = "flex";
      var logTxt = "Please login First";
      showLog(logTxt);
    }
  }
};
const showSignupPage = () => (Alert.style.display = "flex");

// Comment Getting
const loadCmd = () => {
  var commendId = 0;
  database.ref("web/messages/").on("child_added", (snapshot) => {
    const Messages = snapshot.val();

    var msg = Messages.message;
    var time = Messages.time;
    var uname = Messages.name;
    var Udp = Messages.userDp;
    var adminDP = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug-fill" viewBox="0 0 16 16">   <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"/>   <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"/> </svg>`;

    commendId++;

    if (uname == "Developer") {
      messageByDeveloper(msg, time, uname, adminDP);
    } else {
      messageByUser(msg, time, uname, Udp);
    }
  });

  const messageByDeveloper = (msg, time, uname, adminDP) => {
    messageDiv.innerHTML +=
      `
 <card class="msgdiv" id="myid message-card">
 <container>
 <div class="user-name-box>
 <span class="dp">
 ${adminDP}
 </span>
  <h3>` +
      uname +
      `</h3>
 </div>
   <texts>
 <p>` +
      msg +
      `</p>
</texts>
 </container>
<label class="timelabel">` +
      time +
      `</label>
</card>
 `;
  };

  const messageByUser = (msg, time, uname, Udp) => {

    messageDiv.innerHTML +=
      `
      <card class="msgdiv" id="myid message-card">
 <container>
 <div class="user-name-box>
 <span class="dp">
 ${Udp}
</span>
<h3>` +
      uname +
      `</h3>
                </div>
                <texts>
                <p>` +
      msg +
      `</p>
                </texts>
              </container>
              <label class="timelabel">` +
      time +
      `</label>
            </card>
            `;

  };

  loader2.style.display = "none";

  setTimeout(scroll, 2000);
};
setTimeout(loadCmd, 2000);
const scroll = () => {
  messageDiv.scrollTop = -999999999;
};

// scroll footer effect /////

// logout

const logout = () => {
  if (localStorage.getItem("login") == "true") {
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    var logTxt = "Logout success";
    showLog(logTxt);
    document.title = "CODER";
    document.location = "/";
  } else {
    var logTxt = "Login Info not Exists";
    showLog(logTxt);
  }
  //
};

// snackbar
const showLog = (logTxt) => {
  var snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
  snackbar.innerHTML = logTxt;
};

var themeState = false;

togleTheme = () => {
  // const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (!themeState) {
    themeState = true;
    themeBtn.innerHTML = lightIcon;
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else {
    themeState = false;
    themeBtn.innerHTML = darckIcon;
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  }
};

const slidImages = [
  "./banner_images/banner_1.png",
  "./banner_images/banner-2.png",
];
const heroImg = document.querySelector("#hero-image-card");
let correntImageIndex = 0;
const changeImage = () => {
  correntImageIndex = (correntImageIndex + 1) % slidImages.length;
  heroImg.src = slidImages[correntImageIndex];
  setTimeout(changeImage, 3000);
};
changeImage();

// Section switcher 4 li , when click this.borderBottom= 1px solid
document.querySelectorAll("#sectionSwitcher li").forEach((li) => {
  li.onclick = () => {
    TotalData = 0
    document
      .querySelectorAll("#sectionSwitcher li")
      .forEach((li) => li.classList.remove("active"));
    li.classList.add("active");
    //switchTHeSection(li);
    
cardSection.innerHTML=''
    dataStore.reverse().forEach((item) => {
        // createCard(item.data, item.snapshotKey, cardSection);
        if (item.type== li.dataset.type || item.type == "Project/Hope") {
          createCard(item, item.snapshotKey, cardSection, li.dataset.type=="My project" ? "Projects" : li.dataset.type);
        } else if (li.dataset.type == "view-all") {
          createCard(item, item.snapshotKey, cardSection, "Projects");
        }

        // the design button.dataset is "Design" and the data.type is "web design/ ui design"
        if (li.dataset.type == "Design" && item.type == "web design") {
          createCard(item, item.snapshotKey, cardSection, li.dataset.type);
        }

      });

  };
});
const viewAllSec = document.querySelector("#viewAllSec");
const projectSection = document.querySelector("#projectSection");
const designSection = document.querySelector("#designSection");
const postSection = document.querySelector("#postSection");
const switchTHeSection = (li) => {
  TotalData = 0;

  hideAllSections(viewAllSec, designSection, postSection, projectSection);
  switch (li.id) {
    case "view-all":
      viewAllSec.classList.remove("hidden");
      break;
    case "projects":
      addDataToTheSection(projectSection);
      break;
    case "designs":
      // hideAllSections(viewAllSec, designSection, postSection, projectSection);
      designSection.classList.remove("hidden");
      dataStore.forEach((item) => {
        // createCard(item.data, item.snapshotKey, cardSection);
        if (item.title == "design") {
          console.log(item);
        }

      });
      break;
    case "posts":
      hideAllSections(viewAllSec, designSection, postSection, projectSection);
      postSection.classList.remove("hidden");

    default:
      break;
  }
};

const hideAllSections = (
  viewAllSec,
  designSection,
  postSection,
  projectSection
) => {
  viewAllSec.classList.add("hidden");
  designSection.classList.add("hidden");
  postSection.classList.add("hidden");
  projectSection.classList.add("hidden");
};
hideAllSections(viewAllSec, designSection, postSection, projectSection);
viewAllSec.classList.remove("hidden");


// Add data to the project section
// This function will be called when the "Projects" section is clicked
// It will fetch data from Firebase and create cards dynamically
// It will also remove the "hidden" class from the project section to make it visible
// The project section will be populated with cards containing project data
// The function will create a new section element with the class "cardSec" and append it to the project section
// The FetchAndCreateCard function will be called to fetch data and create cards within this new section
// The project section will be displayed with a padding of 1rem
// The inner HTML of the project section will be cleared before appending the new section
// This ensures that the project section is always up-to-date with the latest data from Firebase
const addDataToTheSection = (projectSection) => {
  projectSection.classList.remove("hidden");

  const proSec = document.createElement("section");
  proSec.classList.add("cardSec");
  proSec.style.padding = "1rem";
  projectSection.innerHTML = "";
  FetchAndCreateCard(proSec);
  projectSection.appendChild(proSec);
};

if (localStorage.getItem("login")) {
  document.querySelector(".authIn").classList.add("hidden");
  document.querySelector(".authIn2").classList.add("hidden");
} else {
  document.querySelector(".authOut").classList.add("hidden");
}
