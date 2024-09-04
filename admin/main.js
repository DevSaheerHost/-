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

let title = document.querySelector('#title')
let subtitle = document.querySelector('#subTitle')
let image = document.querySelector('#image')
let type = document.querySelector('#type')
let url = document.querySelector('#url')

let uploadBtn = document.querySelector('.upload')

$(document).ready(function () {
  $('body').show(100)
  
  

let postRef = firebase.database().ref('/web/data/');
$('.upload').click(function () {
  //-----
  
  postRef.push({ 'title': title.value,
  'subtitle': subTitle.value,
  'image': image.value,
  'pageurl': url.value,
  'type': type.value,
  'time':date
  })
    .then(res => {
      console.log(res.getKey()) // this will return you ID
      setTimeout(clearTitle, 50)
      setTimeout(clearSubTitle, 100)
      setTimeout(clearImage, 200)
      setTimeout(clearType, 300)
      setTimeout(clearUrl, 400)
      
    })
    .catch(error => console.log(error));
  
    //-------
  
  
  
})

})


var globalDate = new Date();

var y = globalDate.getFullYear()
var m = globalDate.getMonth()
var d = globalDate.getDate()

//console.log(globalDate)
//console.log(d+" "+m+' '+y )

var date = d+"-"+m+'-'+y ;


clearTitle=()=>{
  title.value = ''
}
clearSubTitle=()=>{
  subTitle.value = ''
}
clearUrl=()=>{
  
  
  url.value = ''
}
clearImage=()=>{
  
  image.value = ''
}
clearType=()=>{
  
  type.value = ''
}