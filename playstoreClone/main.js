window.onload=()=>{
  document.body.classList.remove('hidden')
  
  
let catSelector = document.querySelectorAll('.cat-selector')

let categorySec = document.querySelectorAll('.category-sec')

let hero = document.querySelector('#autoScroll')
let bottomNav = document.querySelectorAll('.bottom-nav')
let screens = document.querySelectorAll('#screen')



document.onclick=(e)=>{
  if (e.target.id=='cat_selector') {
    e.target.classList.add('focus')
    var focused = e.target.innerText;
    clearFocus(focused);
    var corrent = e.target.getAttribute('name');
    //console.log(corrent)
    setCategory(corrent)
  }
  
  // set screeens bottomnav //
  let clickId = e.target.Id
  if (e.target.parentElement.getAttribute('id')=='bottom-nav') {
    var targetName = e.target.parentElement.getAttribute('name')
    setTarget(targetName);
  }
  
  
}
clearFocus=(focused)=>{
  for (var i = 0; i < catSelector.length; i++) {
  if (catSelector[i].innerText==focused) {
    
  } else{
    catSelector[i].classList.remove('focus')
  }
}
}

setCategory=(corrent)=>{
  for (var x = 0; x < categorySec.length; x++) {
    if (categorySec[x].getAttribute('name')==corrent) {
    categorySec[x].classList.remove('hidden');
  } else{
    categorySec[x].classList.add('hidden')
  }
  }
  
}







  
  
  
 
        const scrollAmount = 300;
        const scrollInterval = 4000;

        function autoScroll() {
            hero.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(() => {
                if (hero.scrollLeft + hero.offsetWidth >= hero.scrollWidth) {
                    hero.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }, scrollInterval);
        }

        setInterval(autoScroll, scrollInterval);
        

  setTarget=(targetName)=>{
    for (var i = 0; i < bottomNav.length; i++) {
      let navName = bottomNav[i].getAttribute('name')
      if (navName==targetName) {
        bottomNav[i].classList.add('active');
        setScreen(navName)
        
      } else {
        bottomNav[i].classList.remove('active')
      }
    }
  }
  
  setScreen=(navName)=>{
    for (var i = 0; i < screens.length; i++) {
      var screenName = screens[i].getAttribute('name')
      if (navName == screenName) {
        
        
       screens[i].classList.remove('hidden')
      }else{
        screens[i].classList.add('hidden')
      }
    }
  }
  
  
  
    
  }
  document.onload=()=>{
    console.log('dom')
  }