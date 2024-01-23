// v 3.2
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAthM6oD2dYuAPrrLtqZT3pOWvkb17zRME",
  authDomain: "codersaheer.firebaseapp.com",
  databaseURL: "https://codersaheer-default-rtdb.firebaseio.com",
  projectId: "codersaheer",
  storageBucket: "codersaheer.appspot.com",
  messagingSenderId: "894319865406",
  appId: "1:894319865406:web:d3dfb840065d9c9344ab6f",
  measurementId: "G-SH7NLD967G"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();



var TotalData=0
//..........................................//
database.ref("web/data/").on("child_added", (snapshot) => {
  //console.log('-----getting data Started--------')
  const data = snapshot.val();
 // console.log('create function')
  // create(data.title, data.image, data.subtitle, data.pageurl);
  //console.log('-------getting Stopped------')
  
  var purl = data.pageurl;
  var img = data.image;
  var tit = data.title;
  
  const totellabel = document.querySelector('#totelText')
  const loader = document.querySelector('loader')
  
  
  cardSection.innerHTML += `
  <card>
            <a href="` + data.pageurl + `" target="_blank"><img src="` + data.image + `" alt="">
            <text-area>
            
              <h3>` + data.title + `</h3>
              <label for="">` + data.subtitle + `</label>
            </text-area>
            <label class="timeLbl">` + data.time + `</label>
            <a>
          </card>`
  
  TotalData++
  totellabel.innerHTML=TotalData +' Projects'
  
  loader.style.display='none'
  
  
});
//------------------------------------------//

console.log('Hello World!');
const cardSection = document.querySelector('#cardSec')


function create(image, title, subtitle, pageurl) {
  console.log('Function Started')
  
        console.log('image '+image)
        console.log('datas '+title+' '+subtitle)
        console.log('Function Ented')
}


const iframe = document.querySelector('iframe')
const backBtn = document.querySelector('#back')
back.display='none'
card=()=>{
  
  cardSec.style.display='none'
  iframe.style.display='block'
  backBtn.style.display='block'
}
Back=()=>{
  cardSec.style.display = 'flex'
  iframe.style.display = 'none'
  backBtn.style.display='none'
}

// database.ref("web/messages/").push({
//   time: '12:00 pm',
//   message: 'Title',
//   userAgent:'sub',
// // //  image: 'https://i.ibb.co/K52SmS5/bg.jpg'
// });
// database.ref("web/data/images/").push({
//   image: 'http'
// });
// database.ref("web/data/titles/").push({
//   title: 'title'
// });
// database.ref("web/data/subtitles/").push({
//   timestamp: firebase.database.ServerValue.TIMESTAMP,
// });



//-------------------=------

const nav = document.querySelector('nav')

togleMenu=()=>{
  nav.classList.toggle('openMenu')
}


//---------------------------




// scroll //

window.onscroll = function() { myFunction() };

function myFunction() {
  if (document.documentElement.scrollTop > 350) {
    document.querySelector("#menu-btn").className = "header-fix";
  } else{
    document.querySelector("#menu-btn").className = "";
  }
}


// command input function------////

const commandInput = document.querySelector('#commandInput')
const commandBtn = document.querySelector('#commandBtn')
const sendSvg = document.querySelector('#sendSvg')
commandInput.oninput=()=>{
  if(commandInput.value.length!== 0){
    sendSvg.style.color='#42445A'
  } else{
    sendSvg.style.color='#42445A57'
  }
  
  if (commandInput.value.length>=100) {
    commandInput.style.color='red'
    sendSvg.style.color='red'
  } else{
    commandInput.style.color='#42445A'
    //endSvg.style.color='#42445A'
    
  }
}




// alert for signup //
const Alert = document.querySelector('alert')


// login checkup for alert hide //
// if (localStorage.getItem('login') == 'true') {
//   Alert.style.display='none'
// }





// cancel alert function //
function cancel(){
  Alert.style.display='none'
}
var userAgent = navigator.userAgent;



// signup function from alert //
function signup(){
  const usernameInput=document.querySelector('#name') 
  const emailInput=document.querySelector('#email') 
  if (usernameInput.value.length!==0 && emailInput.value.length!==0) {
    Alert.style.display = 'none'
    
    database.ref("web/users/").push({
      name: usernameInput.value,
      email: emailInput.value,
      userAgent: userAgent,
      // timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    
    if (commandInput.value.length!==0) {
      commandBtn.onclick()
    }
    
    
    localStorage.setItem('login', 'true')
    localStorage.setItem('name', usernameInput.value)
  }
  
  
}






commandBtn.onclick=()=>{
  if (commandInput.value.length>=100) {
    
  }else{
  
  if (localStorage.getItem('login')=='true') {
    
  
  
  if (commandInput.value.length!==0) {
    const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
const tm = String(currentDate.getTime())
console.log(formattedDate);




var userAgent = navigator.userAgent;

    
    
    
    database.ref("web/messages/").push({
            name: localStorage.getItem('name'),
             time: formattedDate,
             message: commandInput.value,
             userAgent: userAgent,
            // timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    commandInput.value=''
  } else {
    
  }
} else{
  Alert.style.display = 'flex'
}
}
}




setTimeout(loadCmd, 2000)

// Comment Getting
function loadCmd(){
  

const messageDiv = document.querySelector('message-div')

database.ref("web/messages/").on("child_added", (snapshot) => {
      const Messages = snapshot.val();


      var msg = Messages.message;
      var time = Messages.time;
      var uname = Messages.name;
      //var tit = Messages.;
      
      //console.log(msg)
      //console.log(time)
      
      
      messageDiv.innerHTML+=`
      <card id="myid">
              <container>
                <div>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                </span>
                  <h3>`+uname+`</h3>
                </div>
                <texts>
                <p>`+msg+`</p>
                </texts>
              </container>
              <label class="timelabel">`+time+`</label>
            </card>
            `
            
      
})
const loader2 = document.querySelector('loader2')
loader2.style.display='none'
}




// var userAgent = navigator.userAgent;

// if (userAgent.includes("Android")) {
//   console.log("Operating System: Android");
// } else if (userAgent.includes("Windows")) {
//   console.log("Operating System: Windows");
// } else if (userAgent.includes("iOS")) {
//   console.log("Operating System: iOS");
// } else {
//   console.log("Operating System: Unknown");
// }
