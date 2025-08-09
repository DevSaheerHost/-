const $ = selector => document.querySelector(selector)

let listArr = JSON.parse(localStorage.getItem("list"))||[]

const saveTask = task => localStorage.setItem("list",JSON.stringify(task))

const createUI = (newTaskObj) => {
  const taskList = $("#taskList")
  const li = document.createElement("li")
  const text = document.createElement("p")
  text.textContent = newTaskObj.task;
  
  const deleteBtn = document.createElement("button")
  deleteBtn.textContent="Delete"
  deleteBtn.classList.add("delete-btn")
  
  const completeBtn = document.createElement("button")
  completeBtn.classList.add("complete-btn")
  completeBtn.textContent="✅"
  
  const btnWraper = document.createElement("div")
  btnWraper.classList.add("btn-wraper")
  
  !newTaskObj.completed?
  btnWraper.appendChild(completeBtn):
  li.classList.add("completed");
  
  
  btnWraper.appendChild(deleteBtn)
  li.appendChild(text)
  li.appendChild(btnWraper)
  
  taskList.appendChild(li)
  
  deleteBtn.onclick=(e)=>(deleteTask(newTaskObj, e))
  
  completeBtn.onclick= e =>(completeTask(newTaskObj, e))
}

const deleteTask = (task, e) =>{
      listArr = listArr.filter(t=>t!=task)
      saveTask(listArr)
      
      const removableElement = e.target.parentNode.parentNode
      removableElement.classList.add("slide")
      setTimeout(()=>removableElement.remove(), 500)
}

const completeTask = (task, e) => {
  filteredTask = listArr.filter(t => t!=task)


  let updatedSingleTask 
  
  listArr.filter(oldTask=>{
    if (oldTask==task) {
     
     
     oldTask.completed=true
     updatedSingleTask = oldTask
    }
  })

  filteredTask.push(updatedSingleTask)
  
  listArr = filteredTask
  saveTask(listArr)
  
  const removableBtn = e.target
  removableBtn.parentNode.parentNode.classList.add("completed")
  removableBtn.classList.add("fadeout")
}



listArr.forEach(task=>createUI(task))

$("#addTask").onclick=()=> addTask()


const addTask = ()=>{
  const newTask = $("#taskInput").value
  if(!newTask) return;
  
  taskObj = {
    task: newTask,
    completed: false
  }
  listArr.push(taskObj);
  saveTask(listArr)
  createUI(taskObj)
  $("#taskInput").value = ''
}
