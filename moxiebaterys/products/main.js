
    const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get('model'); 
    console.log('Title from URL:', model);
    
    // Fetch the JSON data
    fetch('../api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        getProduct(data, model); // Pass the data and title to the function
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    

    const getProduct = (data, model) => {
      const product = data.battery.find(item => item.model === model); // Find item by title
      if (product) {
        showData(product)
      } else {
        showEmptyData()
      }
    };
    
    const productSec = document.querySelector('#productSec')
    const showData=product=>{
      productSec.innerHTML=`
          <img src="${product.image}" alt="Product">
          <div>
    <p class="title">${product.title}</p>
    <p class="desc">${product.description}</p>
    <p class="price">₹${product.price}</p>
    <div class="btn_wrapper">
    <button>Chat with whatsapp</button>
  </div>
    </div>
      `
    }
    
    const showEmptyData = ()=>
        productSec.innerHTML = `
              <img src="https://tepeseo.com/wp-content/uploads/2019/05/404notfound.png" alt="Product">
        <p class="title">N/A</p>
        <p class="desc">N/A</p>
        <p class="price">₹00.00</p>
          `
    