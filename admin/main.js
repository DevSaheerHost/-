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

let title = document.querySelector("#title");
let subtitle = document.querySelector("#subTitle");
let image = document.querySelector("#image");
let type = document.querySelector("#type");
let url = document.querySelector("#url");

let uploadBtn = document.querySelector(".upload");
let popup = document.querySelector(".popup");
let cancel = document.querySelector(".cancel");
let continueBtn = document.querySelector(".continue");
$(document).ready(function () {
  $("body").show(100);
  $(".popup").hide();

  let postRef = firebase.database().ref("/web/data/");
  $(".upload").click(function () {
    //-----
    popup.classList.add("popup-visible");
    $(".popup").fadeIn(300);
    cancel.onclick = () => {
      $(".popup").fadeOut(300);
    };
    continueBtn.onclick = () => {
      uploadData();
      $(".popup").fadeOut(300);
    };
  });

  uploadData = () => {
    postRef
      .push({
        title: title.value,
        subtitle: subTitle.value,
        image: image.value,
        pageurl: url.value,
        type: type.value,
        time: date,
      })
      .then((res) => {
        console.log(res.getKey()); // this will return you ID
        setTimeout(clearTitle, 200);
        setTimeout(clearSubTitle, 400);
        setTimeout(clearImage, 600);
        setTimeout(clearType, 800);
        setTimeout(clearUrl, 1000);
      })
      .catch((error) => console.log(error));
  };
});

var globalDate = new Date();

var y = globalDate.getFullYear();
var m = globalDate.getMonth();
var d = globalDate.getDate();

//console.log(globalDate)
//console.log(d+" "+m+' '+y )

var date = d + "-" + m + "-" + y;

clearTitle = () => {
  title.value = "";
};
clearSubTitle = () => {
  subTitle.value = "";
};
clearUrl = () => {
  url.value = "";
};
clearImage = () => {
  image.value = "";
};
clearType = () => {
  type.value = "";
};
