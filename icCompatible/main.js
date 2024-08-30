const menu_btn = document.querySelector('#menu_btn');
const menu = document.querySelector('#menu');
const close_nav = document.querySelector('#close_nav');
menu_btn.onclick=()=>{
  menu.classList.add('menu-open')
}
close_nav.onclick=()=>{
  menu.classList.remove('menu-open')
}