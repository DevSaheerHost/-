
const scrollData =[
  {
    img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/products/stacked_doughnuts_glass_christmas_ornament_2_533x.jpg?v=1638869734',
    name:'Stacked Doughnuts Glass Christma...',
    price:'19.00',
    status: 'New',
    stock:'Out stock'
   
  }, {
    img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/products/red_and_green_glass_bottle_of_hot_sauce_christmas_ornament_2_533x.jpg?v=1638869693',
    name:'Red And Green Glass Bottle Of Ho...',
    price:'30.00',
    status: 'New',
    stock:''
  },{
    img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/products/pre_lit_arctic_spruce_mailbox_swag_2_533x.jpg?v=1638869653',
    name:'Pre Lit Arctic Spruce Mailbox Swag',
    price:'30.00',
    status: 'New',
  },{
    img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/products/holiday_time_snow_capped_green_fir_tree_with_burlap_base_2_533x.jpg?v=1638869605',
    name:'Holiday Time Snow Capped Green F...',
    price:'30.00',
    dis: '-9%',
    status: 'New',
    stock:'Sale'
  },{
    
    img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/products/golden_yellow_red_and_white_french_fries_glass_christmas_ornament_2_533x.jpg?v=1638869502',
    name:'Holiday Time Green Fir Tree With...',
    price:'20.00',
    status: 'New',
  
  }
  
  ]
  const scrollData2=[
    {
      img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/articles/Rectangle_20qq4_533x.png?v=1638356131',
      date:'Dec 03, 2021',
      name:'Christmas Angel',
    },
    {
      img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/articles/Rectangle_2q04_533x.png?v=1638356161',
      date:'Dec 01, 2021',
      name:'Christmas Fayre With Late N...',
    },
    {
      
      img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/articles/blog_1_533x.png?v=1638354866',
      date:'Nov 24, 2021',
      name:'10 healthy alternatives to ...',
    
    },
    {
      
      
      img:'https://theme1053-christmas-shop.myshopify.com/cdn/shop/articles/blog_2_533x.png?v=1638354863',
      date:'Nov 15, 2021',
      name:'How to save over $100 on yo...',
    
    
    }
    ]
  
  const scrollElem = document.querySelector('#scrollContainer')
const scrollElem2 = document.querySelector('#scrollContainer2')

const subPage = document.querySelector('#subPage')


const closeSubPage = ()=>{
  subPage.remove()
}

scrollData.forEach(item=>{
  scrollElem.innerHTML+=`
   <div class="item">
        <img src="${item.img}" alt="https://theme1053-christmas-shop.myshopify.com/cdn/shop/products/stacked_doughnuts_glass_christmas_ornament_2_533x.jpg?v=1638869734">
        <p class=''>${item.name}</p>
        <p>$${item.price}</p>
     
        <span class="info">
        
             ${item.dis?` <span class=" red-bg">
            ${item.dis}
        </span>`:''}
        
        ${item.status?` <span class=" black-bg">
            ${item.status}
        </span>`:''}
         ${item.stock?` <span class=" dim-bg">
            ${item.stock}
        </span>`:''}
        
        
        </span>
       
      </div>
  `
})

scrollData2.forEach(item=>{
  scrollElem2.innerHTML+=`
   <div class="item">
        <img src="${item.img}" alt="https://theme1053-christmas-shop.myshopify.com/cdn/shop/products/stacked_doughnuts_glass_christmas_ornament_2_533x.jpg?v=1638869734">
        <p class='dim date'>${item.date}</p>
        <h3>${item.name}</h3>
     <a href='#'>READ MORE</a>
        
       
      </div>
  `
})


const ulToggler = document.querySelectorAll('#ulToggler')
const ul = document.querySelectorAll('.ul')
ulToggler.onclick=()=>{
  ul.classList.toggle('collapse')
}
setTimeout(()=>{subPage.style.display='flex'}, 3000)