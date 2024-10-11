const questions = [
  {
    qu: 'What is the capital of France?',
    op: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    an: 'Paris',
  },
  {
    qu: 'What element does "O" represent on the periodic table?',
    op: ['Osmium', 'Oxygen', 'Gold', 'Oganesson'],
    an: 'Oxygen',
  },
  {
    qu: 'What is the largest planet in our solar system?',
    op: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    an: 'Jupiter',
  },
  {
    qu: 'Which planet is known as the Red Planet?',
    op: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    an: 'Mars',
  },
  {
    qu: 'What is the hardest natural substance on Earth?',
    op: ['Gold', 'Diamond', 'Iron', 'Quartz'],
    an: 'Diamond',
  },
  {
    qu: 'In what year did the Titanic sink?',
    op: ['1912', '1905', '1920', '1898'],
    an: '1912',
  },
  {
    qu: 'Who wrote the play "Romeo and Juliet"?',
    op: ['Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Leo Tolstoy'],
    an: 'William Shakespeare',
  },
  {
    qu: 'What is the smallest prime number?',
    op: ['0', '1', '2', '3'],
    an: '2',
  },
  {
    qu: 'Which ocean is the largest?',
    op: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    an: 'Pacific Ocean',
  },
  {
    qu: 'What is the currency of Japan?',
    op: ['Yen', 'Dollar', 'Euro', 'Won'],
    an: 'Yen',
  },
];

// Timer Variables
let minute = 2;
let second = 0;
let currentQuestionIndex = 0;
let score = 0; // Variable to track the score

// Elements
const startBtn = document.getElementById('start_btn');
const startContainer = document.querySelector('.start-container');
const time = document.getElementById('time');
const questionText = document.getElementById('question-text');
const optionContainer = document.getElementById('option-container');
const questionNumber = document.getElementById('question-number');
const nextBtn = document.getElementById('next-btn');
const alertDiv = document.querySelector('alert');
const scoreDisplay = document.getElementById('score-display');

// Functions
startBtn.onclick = () => {
  startContainer.classList.add('hide-container');
  setTimeout(() => {
    startContainer.remove();
    document.querySelector('main').classList.remove('hidden');
  }, 500);
  startTimer();
  loadQuestion();
};

const startTimer = () => {
  const timer = setInterval(() => {
    second--;
    if (second < 0) {
      second = 59;
      minute--;
    }

    if (minute < 0) {
      clearInterval(timer);
      TimeOver();
    }

    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedSecond = second.toString().padStart(2, '0');
    time.innerHTML = `Time - ${formattedMinute} : ${formattedSecond}`;
  }, 1000);
};

const loadQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.qu;
  optionContainer.innerHTML = ''; // Clear previous options
  currentQuestion.op.forEach((option, index) => {
    const optionSpan = document.createElement('span');
    optionSpan.className = 'option';
    optionSpan.innerHTML = `
      <input type="radio" name="q${currentQuestionIndex}" id="op${index}" value="${option}">
      <label for="op${index}" class="option-text">${option}</label>
    `;
    optionContainer.appendChild(optionSpan);
  });
  questionNumber.textContent = currentQuestionIndex + 1;
  nextBtn.disabled = true; 

  optionContainer.addEventListener('change', () => {
    nextBtn.disabled = false;
  });
};

nextBtn.onclick = () => {
  const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  
  // Check if an option is selected
  if (selectedOption) {
    const selectedAnswer = selectedOption.value;
    if (selectedAnswer === questions[currentQuestionIndex].an) {
      score++; // Increment score if the answer is correct
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    QuizEnd();
  }
};

const QuizEnd = () => {
  
  // Show score in the alert
  scoreDisplay.textContent = score;
  alertDiv.classList.remove('hidden');
};

const TimeOver = () => {
  alertDiv.classList.remove('hidden');
  scoreDisplay.textContent = score; // Show score even when time is up
};

document.getElementById('close').onclick = () => {
  alertDiv.classList.add('hidden');
  location.reload(); // Reload the page to restart the quiz
};