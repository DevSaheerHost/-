html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HTML</title>
  
  </head>

<body>
<h1>Hello world!<\h1>

</body>
</html>
  `
  
  let css = `
  body{
  margin: 1rem;
  font-family: sans-serif;
}
  
  `
  
  document.onDOMcontentLoaded = () => {
    alert('f')
  }
document.querySelector('#html-code').innerHTML=html

document.querySelector('#css-code').innerHTML=css

run=()=>{
  
  let htmlcode = document.querySelector('#html-code').value
  let csscode = document.querySelector('#css-code').value
let jscode = document.querySelector('#js-code').value
let output = document.querySelector('#output')

try {
  output.contentDocument.body.innerHTML=`${htmlcode} <style>${csscode} <\style>`+eval(jscode)
} catch (e) {
  output.contentDocument.body.innerHTML=e.message
  throw e
}

}

run()



let fullscreen = false
let fullScreenToggler = document.querySelector('#fullscreenToggler')
let outView = document.querySelector('.output-section')


fullScreenToggler.onclick=()=>{
  if (fullscreen) {
    outView.classList.remove('fullscreen')
    
    fullscreen = false
  } else {
    outView.classList.add('fullscreen')
    fullscreen = true
  }
}


  Prism.highlightAll()