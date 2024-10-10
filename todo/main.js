const input = document.querySelector('input')
const addBtn = document.querySelector('#addTask')
const clearAll = document.querySelector('#clearAll')
const undo = document.querySelector('#undo')
const container = document.querySelector('.container')


let data=['Home', 'Make a trip', 'Add class']


const showData=()=>{
  data.reverse()
  if (data.length===0) {
    container.innerHTML='<span class="empty">This page is now empty</span>'
  }else{
  container.innerHTML=''
  data.forEach((task, index)=>
  {
  container.innerHTML+=`
  <div class='task-list'>${index+1+' ' +task} <button id= '${index}' class='delt delete'>
  <span class="material-symbols-outlined">
  delete
  </span></button></div>`
  document.querySelectorAll('.delt').forEach(button =>{
  button.onclick = e => {
    const elem = e.target.id
   deleted =  data.splice(elem, 1)
   //console.log(deleted)
    showData()
  }
})
  
  }
  
)}
}
showData()



addTask = newTask =>
newTask?data.push(newTask):alert('Type something');

addBtn.onclick=()=>{
  const newTask = input.value.trim()
addTask(newTask)
showData()
  input.value=''
}
input.onkeydown= code=>{
  code.keyCode==13?
  addBtn.onclick():
  null;
  
}

clearAll.onclick=()=>{
data=[] 
showData()
}
undo.onclick=()=>{
  data.pop()
  showData()
}
