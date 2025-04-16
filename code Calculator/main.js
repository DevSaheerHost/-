const $ = selector => document.querySelector(selector);

const input = $('input');
const out = $('.answer h2');
const charMap = {
  'b': '1', 'l': '2', 'a': '3', 'c': '4',
  'k': '5', 'w': '6', 'h': '7', 'i': '8',
  't': '9', 'e': '0'
};

// Create back button
const backButton = document.createElement('span');
backButton.id = 'back';
backButton.textContent = '⌫';
$('.typekeys').appendChild(backButton);

function calculateLeftToRight(expression) {
  const tokens = expression.match(/(\d+\.?\d*|\+|-|\*|\/)/g) || [];
  if (tokens.length < 3) return parseFloat(tokens[0]) || 0;
  
  let result = parseFloat(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const num = parseFloat(tokens[i + 1]);
    
    switch (operator) {
      case '+': result += num; break;
      case '-': result -= num; break;
      case '*': result *= num; break;
      case '/': result /= num; break;
    }
  }
  return result;
}

input.addEventListener('input', function() {
  const converted = this.value.split('').map(char => {
    const lowerChar = char.toLowerCase();
    return charMap[lowerChar] || char;
  }).join('');

  try {
    const finalExpression = converted
      .replace(/×/g, '*')
      .replace(/÷/g, '/');
    
    out.textContent = converted ? 
      calculateLeftToRight(finalExpression) : 
      '0';
  } catch {
    out.textContent = 'Invalid Expression';
  }
  
  this.scrollLeft = this.scrollWidth - this.clientWidth;
});

document.querySelectorAll('.numbers span, .letters span, .typekeys span').forEach(span => {
  span.addEventListener('click', function() {
    if (this.id === 'back') return;
    if (this.id==='save') return;
    let char = this.textContent;
    input.value += {'×':'*', '÷':'/'}[char] || char;
    input.dispatchEvent(new Event('input'));
    $('.input-history-wrapper').scrollTop=0
  });
});

$('#back').addEventListener('click', () => {
  input.value = input.value.slice(0, -1);
  input.dispatchEvent(new Event('input'));
});

// AC (All Clear) functionality
$('#ac').addEventListener('click', () => {
  input.value = '';
  out.textContent = '0';
  input.dispatchEvent(new Event('input'));
});



// Load existing history from localStorage on page load
let history = [];
try {
  const storedHistory = localStorage.getItem('history');
  history = storedHistory ? JSON.parse(storedHistory) : [];
} catch (error) {
  console.error('Error loading history:', error);
  localStorage.removeItem('history'); // Clear corrupted data
}

$('#save').addEventListener('click', () => {
  if (input.value.trim()) {
    history.push(`${input.value.trim()} = ${out.textContent}`);
    
    // Save to localStorage with validation
    try {
      localStorage.setItem('history', JSON.stringify(history));
      console.log('History saved successfully');

      renderHistory()
    } catch (error) {
      console.error('Failed to save history:', error);
    }
    
    
  }
});
const renderHistory=()=>{
      $('#history-list').innerHTML=''
  history.forEach(his=>{
    $('#history-list').innerHTML+=`<span class='history'>${his}</span>`
  })
  $('.input-history-wrapper').scrollTop = $('.input-history-wrapper').scrollHeight - $('.input-history-wrapper').clientHeight;
}
renderHistory()
    $('.input-history-wrapper').scrollTop=0