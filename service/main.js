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
  $('#filterDate').value=today//'2025-01-29';
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
  
  
  if (!newData.name || !newData.number || !newData.amount) {
  alert("All fields must be filled out");
  return;
}

ref.push(newData)
  .then(() => {
    $('.creation_page').classList.add('hidden');
    console.log('Data added successfully');
  })
  .catch((error) => {
    console.error('Error adding data:', error);
  });

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
  console.warn(item);
});

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
const showAllData=(data, key)=>{
  $('.list_view').innerHTML+=listLayout(data, key);
  
$('.list_view').addEventListener('click', (event) => {
  const listElement = event.target.closest('.list');
  const dataKey = listElement?.dataset.key;

  if (event.target.classList.contains('delete_btn')) {
    
    //
//     if (confirm("Are you sure you want to delete this record?")) {
//   ref.child(dataKey).remove()
//     .then(() => {
//       console.log('Data deleted successfully');
//       listElement.remove();
//     })
//     .catch((error) => {
//       console.error('Error deleting data:', error);
//     });
// }

    //
    ref.child(dataKey).remove()
      .then(() => {
        console.log('Data deleted successfully');
        listElement.remove(); // Remove from DOM
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  }

  if (event.target.classList.contains('status_btn')) {
    const newStatus = event.target.classList[0]; // Get the new status
    ref.child(dataKey).update({ status: newStatus })
      .then(() => console.log('Status updated successfully'))
      .catch((error) => console.error('Error updating status:', error));
  }
});


}


const listLayout=(data, key)=>`
<div class="list" data-key='${key}'>
       <div class="nav">
         <h4>${data.complaint}</h4>
         <h4 class="status ${data.status}">• ${data.status}</h4>
       </div>
       <p>Realme | ${data.code} | ${data.amount}</p>
       <p>Name: ${data.name}</p>
       <p>Number: ${data.number}</p>
       
       <div class="button_wrapper">
         <button class="pending status_btn">Pending</button>
         <button class="failed status_btn">Failed</button>
         <button class="finished status_btn">Finished</button>
       </div>
       <div>
         <p class="date">${data.date}</p>
         <button class="call"><a href='tel:7592949476'>Call</a></button>
         <button class="delete_btn">Delete</button>

       </div>
       
       `
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
  alert('Name must be at least 3 characters long.')
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
  if ($("#filter-all").classList.contains("active")) {
    $(".list_view").innerHTML += listLayout(data, key);
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
