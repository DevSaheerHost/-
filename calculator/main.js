const keys=[
  {
    name: 'clear',
    text:'C',
    id:'clear',
    type:'primary'
  },
  {
    name: 'b-open',
    text:'(',
    id:'(',
    type:'primary'
  },
  {
    name: 'b-close',
    text: ')',
    id: ')',
    type: 'primary'
  },
  {
    name: 'add',
    text: '+',
    id: '+',
    type: 'primary'
  },
  {
    name: 'seven',
    text: 7,
    id: 7,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: 8,
    id: 8,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: 9,
    id: 9,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: '-',
    id: '-',
    type: 'primary'
  },
  {
    name: 'seven',
    text: 4,
    id: 4,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: 5,
    id: 5,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: 6,
    id: 6,
    type: 'secondary'
  },
  {
    name: 'multiply',
    text: 'X',
    id: '*',
    type: 'primary'
  },
  {
    name: 'seven',
    text: 1,
    id: 1,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: 2,
    id: 2,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: 3,
    id: 3,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: '÷',
    id: '/',
    type: 'primary'
  },
  {
    name: 'seven',
    text: 'Del',
    id: 'del',
    type: 'primary'
  },
  {
    name: 'seven',
    text: 0,
    id: 0,
    type: 'secondary'
  },
  {
    name: 'seven',
    text: '.',
    id: '.',
    type: 'secondary'
  },
  {
    name: 'seven',
    text: '=',
    id: '=',
    type: 'primary'
  },
  ]
  
  
const keyboardSec = document.querySelector('.keyboard');
const result = document.querySelector('#result');
const alertElem = document.querySelector('.alert')
const alertInfo = localStorage.getItem('calcAlertRemoved')

keyboardSec.innerHTML=keys.map(key=>{
  return `
  
  <div class="key ${key.type}" id="${key.id}">
         <h4>${key.text}</h4>
       </div>
  
  `
}).join('')

const appentValue =key=>{
  result.value += key.id
}
const showResult =()=>{
  let total = result.value
  if (total) {
    try {
      result.value = eval(total)
    } catch (e) {
      alert('Invalid expression or '+e.message)
      
      throw e
    }
  }
}



const keyElem = document.querySelectorAll('.key')
keyElem.forEach(key=>{
  key.onclick=()=>{
    
    if (key.id=='clear') {
      result.value=''
    }else if(key.id=='del'){
      let last = result.value
      result.value = last.slice(0, -1)
    }else if(key.id=='='){
      showResult()
    }
    else{
      appentValue(key)
    }
  }
})




removeAlert=()=>{
  alertElem.remove()
  localStorage.setItem('calcAlertRemoved', true)
}
if (alertInfo) {
  removeAlert()
}