const $=selector=>document.querySelector(selector)
// Keep it up/Top

const username = localStorage.getItem('name')?
localStorage.getItem('name'):
'';
console.log(username)
!username?
$('.loginpage').classList.remove('hidden'):
$('.loginpage').classList.add('hidden');



// Date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('dateInput').value = today;
  $('#filterDate').value='2025-01-29';
//---

$('.creation_page').classList.add('hidden')
$('.floating_btn').onclick=()=>$('.creation_page').classList.remove('hidden')
$('.close').onclick=()=>$('.creation_page').classList.add('hidden')


$('#create').onclick=()=>calculateData()

const calculateData=()=>{
  let newData={}
  newData.name = $('#name').value
  newData.number = $('#number').value
  newData.complaint = $('#complaint').value
  newData.amount = $('#amount').value
  newData.code = $('#code').value
  newData.date = $('#dateInput').value
  newData.status = $('#status').value
  
ref.push(newData);
$('.creation_page').classList.add('hidden')
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSXIeQX-Bh-Ao7e19DeKCGK17cDw1ewDE",
  authDomain: "cannoo.firebaseapp.com",
  databaseURL: "https://cannoo-default-rtdb.firebaseio.com",
  projectId: "cannoo",
  storageBucket: "cannoo.firebasestorage.app",
  messagingSenderId: "147317550502",
  appId: "1:147317550502:web:3ea5785813724c99333367",
  measurementId: "G-LNYZXJ3CTQ"
};


firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = firebase.database().ref(username);


// Assuming you want to access an item with the key 'itemId'
ref.child(username).once('value', (snapshot) => {
  const item = snapshot.val();
  console.log(item);
});

//const serviceRef = database.ref(); // Root reference

database.ref(username).on("child_added", (snapshot) => {

  const data = snapshot.val();
  console.log('added')
  showAllData(data)
  $('#filterDate').onchange=()=>{
    $('.list_view').innerHTML=''
    filterByDate(data, $('#filterDate').value)
  }
})

const filterByDate=(data, Customdate)=>
{
const [year, month, day]=data.date.split('-')
  formatedDate = `${day}, ${month}, ${year}`
  date = formatedDate.replace(/,/g, '/')
 // console.log( data.date==today)
  dat = Customdate.split('-')[1]
  console.log('cust date ',Customdate)
  console.log('formtedDate',formatedDate)
  console.log(month)
  console.log(data)
  if (dat==month) {
    $('.list_view').innerHTML+=listLayout(data)
    console.log(data)
  }
  
}
const showAllData=data=>
  $('.list_view').innerHTML+=listLayout(data)



const listLayout=data=>`
<div class="list">
       <div class="nav">
         <h4>${data.complaint}</h4>
         <h4 class="${data.status}">• ${data.status}</h4>
       </div>
       <p>Realme | ${data.code} | ${data.amount}</p>
       <p>Name: ${data.name}</p>
       <p>Number: ${data.number}</p>
       
       <div class="button_wrapper">
         <button class="pending status_btn">Pending</button>
         <button class="failed status_btn">Failed</button>
         <button class="finishid status_btn">Finished</button>
       </div>
       <div>
         <p class="date">${data.date}</p>
         <button class="call">Call</button>
       </div>
       
       `


  $('.list').querySelectorAll('.status_btn').forEach((btn) => {
  btn.onclick = (event) => {
    alert('g')
    const newStatus = event.target.classList[0]; // Get the status class
    const dataKey = btn.closest('.list').dataset.key; // Assuming you set a data-key
    ref.child(dataKey).update({ status: newStatus });
  };
});

let dataArr
database.ref(username+"/").once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const snapshotKey = childSnapshot.key;
      const datas = childSnapshot.val();
     // dataArr.push({ data, snapshotKey });
     console.log(datas)
    });
    
    })
    
    
   function login() {
     const admin_name = $('#admin_name').value
if (admin_name.length > 3) {
  console.log(admin_name)
  localStorage.setItem('name', admin_name)

  location.reload()
} else {
  console.log('Minimum 3 length')
}
   }