// Fetch the JSON data
fetch('api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        batterys = data.battery;
        let affordableData = data.battery.filter(battery => battery.price < 50);

        data.popular_brands.forEach(brand => createPopularBrandCards(brand));
        activePopular();
        
        createBattery(batterys);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Generate HTML for a brand
const getData = data => `
    <span class="brand pd-05-1 br-5">
        ${data}
    </span>
`;

// Generate HTML for a product card
const getProductLayout = data => `
    <div class="card" onclick="showProduct('${data.model}')">
        <img class="br-5" src="${data.image}" alt="product">
        
        <div>
            <p class="title">${data.title}</p>
            <p class="desc">${data.description}</p>
            <p class="price">₹${data.price}</p>
        </div>
    </div>
`;

// Create brand cards
const createPopularBrandCards = data => {
    const listView = document.querySelector('#listView');
    listView.innerHTML += getData(data);
};

// Set active brand and toggle selection
const activePopular = () => {
    const listView = document.querySelector('#listView');
    const brands = listView.querySelectorAll('.brand');
brands[0].classList.add('bg-acc');

brands.forEach(brand => {
    brand.onclick = function() {
        brands.forEach(b => b.classList.remove('bg-acc'));

        this.classList.add('bg-acc'); 

        const brand = this.innerText
        searchData(brand=='All'?'':brand)
    };
});
};

// Create battery cards based on filtered data
const createBattery = (data, query) => {
    const productSec = document.querySelector('#productSec');
    productSec.innerHTML = '';
    data.forEach(data => productSec.innerHTML += getProductLayout(data));
    if (data.length === 0) {
        productSec.innerHTML = `<p class='notfound'>No results found for "${query}"</p>`;
    }
};

// Handle search input focus and blur
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#search');
const searchOut = document.querySelector('#search_out');

searchInput.onfocus = () => searchOut.classList.add('focus');

searchInput.onblur = () => {
    setTimeout(() => searchOut.classList.remove('focus'), 200);
};

searchInput.onkeypress=()=>{
  searchInput.blur()
  searchBtn.click()
}
// Handle search suggestions as user types
searchInput.oninput = (e) => {
    const query = e.target.value.toLowerCase();
    const searchChances = batterys.filter(battery => battery.title.toLowerCase().includes(query) || battery.model.toLowerCase().includes(query));
    searchOut.innerHTML = searchChances.map(data => `
        <div class='searchChanses' onclick="setInput('${data.title}')">${data.title}</div>
    `).join('');
    searchChances.length==0?searchOut.innerHTML=`
     <div class='searchChanses' onclick="setInput('${query}')">${query}</div>`:''
    
};

// Search button click handler
searchBtn.onclick = () => searchData(searchInput.value);
// Perform the search based on query
const searchData = query => {
    const searchQuery = query.toLowerCase();
    const filteredData = batterys.filter(battery => 
        battery.title.toLowerCase().includes(searchQuery) || 
        battery.description.toLowerCase().includes(searchQuery) || 
        battery.model.toLowerCase().includes(searchQuery)
    );
    
    createBattery(filteredData, query);
};



// Set input value from search suggestions
const setInput = value => {
    searchInput.value = value;
    
    searchOut.classList.remove('focus'); // Hide suggestions after selecting
    searchData(value); 
    
};

const dropDownElem = document.querySelector('#dropDownElem')

const dropDownList = document.querySelector('#dropDownList')

dropDownElem.onclick= ()=>{
  dropDownList.classList.toggle('hidden')
}

document.body.onclick=(e)=>e.target!=dropDownElem? dropDownList.classList.add('hidden'):''




const showProduct = (query) => {
  window.location.href = `./products/?model=${query}`;
};

