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



const login=()=> {
     console.log('loggining')
     const admin_name = $('#admin_name').value
if (admin_name.length > 3) {
  console.log(admin_name)
  localStorage.setItem('name', admin_name)
  location.reload()
} else {
  alert('Name must be at least 3 characters long.')
}
   }
document.querySelector('#login_btn').onclick=()=>login()
const $=selector=>document.querySelector(selector)
let DeleteThis = null
let Confirm =false

// Keep it up/Top

const username = localStorage.getItem('name') || ''
$('#shop_name').textContent=username
console.log(username || 'no user name')
!username?
$('.loginpage').classList.remove('hidden'):
$('.loginpage').classList.add('hidden');

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = firebase.database().ref(username);

// Date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('dateInput').value = today;
  $('#filterDate').value=today//'2025-01-29';
//---

$('.creation_page').classList.add('hidden')
$('.floating_btn').onclick=()=>$('.creation_page').classList.remove('hidden')
$('.close').onclick=()=>$('.creation_page').classList.add('hidden')


$('#create').onclick=()=>calculateData()

const calculateData=()=>{
  let newData={}
  newData.name = $('#name').value || 'N/A'
  newData.number = $('#number').value || 'N/A'
  newData.complaint = $('#complaint').value
  newData.amount = $('#amount').value || 'N/A'
  newData.code = $('#code').value.toUpperCase() || 'N/A'
  newData.date = $('#dateInput').value
  newData.status = $('#status').value
  newData.model = $('#model').value || 'N/A'
  
  
  if (!newData.name || !newData.number || !newData.amount) {
  openWarningPage()
  $('.warning_page').classList.removehidden()
  return;
}

ref.push(newData)
  .then(() => {
    $('.creation_page').classList.add('hidden');
    console.log('Data added successfully');
    showHint('Data added successfully')
  })
  .catch((error) => {
    console.error('Error adding data:', error);
    showHint('Error adding data:', error)
  });

}




// Assuming you want to access an item with the key 'itemId'
// ref.child(username).once('value', (snapshot) => {
//   const item = snapshot.val();
//   console.warn(item);
// });

//const serviceRef = database.ref(); // Root reference

database.ref(username).on("child_added", (snapshot) => {

  const data = snapshot.val();
  const key = snapshot.key
  //console.log(key)
  showAllData(data, key)
// Attach event listener to the date input
$("#filterDate").onchange = () => {
  const selectedDate = $("#filterDate").value;
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  filterByDate(selectedDate);
};

// Function to filter by date
const filterByDate = (selectedDate) => {
  // Clear the current list view
  $(".list_view").innerHTML = "";

  // Fetch all data from Firebase
  database.ref(username).once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const data = childSnapshot.val();

      // Check if the data's date matches the selected date
      if (data.date === selectedDate) {
        $(".list_view").innerHTML += listLayout(data, key);
      }
    });
  });
};
/////////////
})

const filterByDate2=(data, Customdate)=>
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
let deleteKey =null
const showAllData=(data, key)=>{
  $('.list_view').innerHTML+=listLayout(data, key);
  
$('.list_view').addEventListener('click', (event) => {
  const listElement = event.target.closest('.list');
  const dataKey = listElement?.dataset.key;

  if (event.target.classList.contains('delete_btn')) {
    DeleteThis = dataKey;
    console.log(dataKey)
    openWarningPage()
//this way to delete

    
    //openWarningPage()
    //DeleteThis=dataKey;
    // old delete quick 
    
  //   ref.child(dataKey).remove()
  // .then(() => {
  //   console.log('Data deleted successfully');
  //   listElement.remove(); // Remove from DOM
  // })
  // .catch((error) => {
  //   console.error('Error deleting data:', error);
  // });
  }

  if (event.target.classList.contains('status_btn')) {
    const newStatus = event.target.classList[0]; // Get the new status
    ref.child(dataKey).update({ status: newStatus })
      .then(() => console.log('Status updated successfully'))
      .catch((error) => {
        console.error('Error updating status:', error)
        showHint('Error updating status:', error)
      });
  }
});


}


const modeButtons = document.querySelectorAll('.mode_selector')
modeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    let mode = event.target.classList[1]
    let modeName=event.target.dataset.modename
    console.log(modeName)
openMode(mode, modeName);
  });
});

const openMode = (mode, modeName) =>{
  let modePages = document.querySelectorAll('.mode_pages');
  modePages.forEach(page=>{
    page.classList.add('hidden')
    
    if (mode==page.classList[1]) {
      $(`main.${mode}`).classList.remove('hidden')
    }
  })
  //$('.mode_pages').classList.add('hidden');
  
  //$(`.${mode}`).classList.remove('hidden');
  mode!='service_mode'?
  $('.sub-header').classList.add('hidden'):
  $('.sub-header').classList.remove('hidden')
  $('#headText').textContent=modeName;
}
const listLayout=(data, key)=>`
<div class="list" data-key='${key}'>
       <div class="nav">
         <h4>${data.complaint}</h4>
         <h4 class="status ${data.status}">• ${data.status}</h4>
       </div>
       <p>${data.model?data.model:''} | ${data.code} | ${data.amount}</p>
       <p>Name: ${data.name}</p>
       <p>Number: ${data.number}</p>
       
       <div class="button_wrapper">
         <button class="pending status_btn">Pending</button>
         <button class="failed status_btn">Failed</button>
         <button class="finished status_btn">Finished</button>
       </div>
       <div>
         <p class="date">${data.date}</p>
         <button class="call"><a href='tel:${data.number}'>Call</a></button>
         <button class="delete_btn">Delete</button>

       </div>
       
       `
let dataArr
database.ref(username+"/").once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const snapshotKey = childSnapshot.key;
      const datas = childSnapshot.val();
     // dataArr.push({ data, snapshotKey });
     
    });
    
    })
    
    
   
   
   const toggleMenu=()=>{
     $('.side_menu').classList.toggle('sidemenu_close')
     console.log('comming soon')
   }
   document.body.onclick=e=>{
     if (e.target.id!='menu_bar' && e.target.id!='menu') {
       $('.side_menu').classList.add('sidemenu_close')
       
     }
   }
   const closeWarningPage=()=>{
       $('.warning_page').classList.add('hidden')
       DeleteThis=null
   }
   
  
   deleteData=()=>{
     if (DeleteThis) {
  ref.child(DeleteThis).remove()
    .then(() => {
      console.log('Data deleted successfully');
      showHint('Data deleted successfully')
      const listElement = document.querySelector(`.list[data-key="${DeleteThis}"]`);
        if (listElement) listElement.remove();
      DeleteThis=null
      closeWarningPage()
    })
    .catch((error) => {
      console.error('Error deleting data:', error);
      showHint('Error deleting data : ', error)
    });

}
   }
   
   const openWarningPage=()=>{
    if (DeleteThis) {
      $('.warning_page').classList.remove('hidden')
     $('.warning_page').querySelector('h5').innerHTML=`Are you sure to delete? ${DeleteThis}`
    } else {
      return
    }
   }
   
   database.ref(username).on("child_changed", (snapshot) => {
  const updatedData = snapshot.val();
  const key = snapshot.key;

  // Find the corresponding DOM element using the key
  const listElement = document.querySelector(`.list[data-key="${key}"]`);

  if (listElement) {
    // Update the status in the UI
    const statusElement = listElement.querySelector(".status");
    statusElement.textContent = `• ${updatedData.status}`;
    statusElement.className = `status ${updatedData.status}`; // Update class for color change
  }
});


const filterButtons = document.querySelectorAll(".filters span");

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const filterStatus = event.target.dataset.status;
    filterData(filterStatus);
  });
});

const filterData = (status) => {
  // Clear the current list view
  $(".list_view").innerHTML = "";

  // Fetch all items from Firebase
  database.ref(username).once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const data = childSnapshot.val();

      // Show all data if status is 'all', otherwise filter by specific status
      if (status === "all" || data.status === status) {
        $(".list_view").innerHTML += listLayout(data, key);
      }
    });
  });
};




database.ref(username).on("child_added", (snapshot) => {
  const data = snapshot.val();
  const key = snapshot.key;

  // Initially display all items
  if ($("#filter_all").classList.contains("active")) {
    //$(".list_view").innerHTML += listLayout(data, key);
  }
});



database.ref(username).on("child_changed", (snapshot) => {
  const updatedData = snapshot.val();
  const key = snapshot.key;

  // Remove the outdated element
  const listElement = document.querySelector(`.list[data-key="${key}"]`);
  if (listElement) listElement.remove();

  // Re-add the updated item only if it matches the current filter
  const activeFilter = document.querySelector(".filters .active").dataset.status;
  if (activeFilter === "all" || updatedData.status === activeFilter) {
    $(".list_view").innerHTML += listLayout(updatedData, key);
  }
});



filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    const filterStatus = event.target.dataset.status;
    filterData(filterStatus);
  });
});




database.ref(username).on("child_changed", (snapshot) => {
  const updatedData = snapshot.val();
  const key = snapshot.key;

  // Remove the outdated element
  const listElement = document.querySelector(`.list[data-key="${key}"]`);
  if (listElement) listElement.remove();

  // Re-add the updated item only if it matches the selected date
  const selectedDate = $("#filterDate").value;
  if (updatedData.date === selectedDate) {
    $(".list_view").innerHTML += listLayout(updatedData, key);
  }
});

//------
const showHint=text =>{
  text?$('.hint').classList.remove('hidden'):null
  $('.hint').classList.remove('hintOpacityDim')
  $('.hint p').textContent=text;
  setTimeout(()=>$('.hint').classList.add('hintOpacityDim'), 2000)
  setTimeout(()=>$('.hint').classList.add('hidden'), 2300)
}
//------
