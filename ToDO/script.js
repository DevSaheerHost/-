const addInput = document.querySelector("#add-input")
const searchInput = document.querySelector("#search-input")
const listContainer = document.querySelector("#list-container")
const deleteItem = document.querySelectorAll(".deleteItem")
const clearAll = document.querySelector("#clearAll")
let id = 0

let todoList = [
    // {do: 'fghg'},
    // {do: 'user',a:90},
    // {do: 'num'}
]
let listHTML
let filteredList

addToList = () => {
    if (addInput.value) {
        id++
        todoList.push({
            do: addInput.value,
            time: new Date().toLocaleTimeString(),
            id: id
        })
        filteredList = todoList.filter(item => {
            const name = item.do.toLocaleLowerCase()
            return name.includes('')
        })



        showOnUI()
    }
}


search = (query) => {
    filteredList = todoList.filter(item => {
        const name = item.do.toLocaleLowerCase()
        return name.includes(query)
    })
}
searchInput.oninput = () => {
    search(searchInput.value)
    showOnUI()
}







showOnUI = () => {
    listContainer.innerHTML = ""
    filteredList.forEach((list, index) => {
        listHTML = `
        
                <div class="list-item">
                    <p>${list.do}</p>
                    <span class="delete"><span class="material-symbols-outlined deleteItem  " id="${list.id}">
                            delete
                        </span></span>
                </div>
           
        `;
        listContainer.insertAdjacentHTML("beforeend", listHTML)
        addInput.value = null
        const deleteItem = document.querySelectorAll(".deleteItem")
        console.log(deleteItem.length)
        for (let i = 0; i < deleteItem.length; i++) {
            deleteItem[i].onclick=(e)=>{
                console.log();
                console.log(todoList.slice(i, 1));
                e.target.parentElement.parentElement.style.display='none'
            }
            
        }
    })
    
}

addInput.onkeypress = (e) => {
    if (e.key === 'Enter') {

        addToList()
    }
}


clearAll.onclick = () => {
    todoList = []
    listContainer.innerHTML = ''
}

// for(i=0;i<deleteItem.length;i++){
//     console.log('hello');
// }

