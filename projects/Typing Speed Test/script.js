// Text samples for different difficulty levels
const textSamples = {
  easy: [
    "The quick brown fox jumps over the lazy dog. This is a simple sentence to test your typing speed. Practice makes perfect and you will get better with time.",
    "Cats and dogs are popular pets around the world. They bring joy and happiness to many families. Taking care of pets teaches responsibility.",
    "The sun rises in the east and sets in the west. Birds fly in the sky and fish swim in the water. Nature is beautiful and amazing.",
  ],
  medium: [
    "Technology has revolutionized the way we communicate and work. Social media platforms connect billions of people across different continents. Digital transformation continues to reshape industries.",
    "Programming languages enable developers to create software applications. Learning to code requires practice, patience, and problem-solving skills. The tech industry offers exciting career opportunities.",
    "Climate change affects ecosystems worldwide and requires global cooperation. Renewable energy sources like solar and wind power offer sustainable alternatives to fossil fuels.",
  ],
  hard: [
    "Quantum computing leverages superposition and entanglement to perform complex calculations exponentially faster than classical computers. This paradigm shift in computational capability could revolutionize cryptography, drug discovery, and artificial intelligence.",
    "Neuroplasticity demonstrates the brain's remarkable ability to reorganize neural pathways throughout life. Cognitive neuroscience research reveals that consistent practice and learning can strengthen synaptic connections and enhance mental acuity.",
    "Cryptocurrency blockchain technology employs cryptographic hash functions and distributed consensus mechanisms to maintain immutable ledgers. Decentralized finance protocols are disrupting traditional banking infrastructure through smart contracts.",
  ],
};

// Global variables
let currentDifficulty = "easy";
let currentText = "";
let isTestActive = false;
let startTime = null;
let timerInterval = null;
let timeLeft = 60;
let totalErrors = 0;

// DOM elements
const difficultyBtns = document.querySelectorAll(".difficulty-btn");
const textDisplay = document.getElementById("textDisplay");
const userInput = document.getElementById("userInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const errorsEl = document.getElementById("errors");
const resultsEl = document.getElementById("results");
const tryAgainBtn = document.getElementById("tryAgainBtn");

// Initialize
function init() {
  selectRandomText();
  displayText();
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", changeDifficulty);
  });

  startBtn.addEventListener("click", startTest);
  resetBtn.addEventListener("click", resetTest);
  tryAgainBtn.addEventListener("click", () => {
    resultsEl.classList.add("hidden");
    resetTest();
  });

  userInput.addEventListener("input", handleInput);
}

// Change difficulty
function changeDifficulty(e) {
  if (isTestActive) return;

  difficultyBtns.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");
  currentDifficulty = e.target.dataset.level;
  selectRandomText();
  displayText();
}

// Select random text
function selectRandomText() {
  const texts = textSamples[currentDifficulty];
  currentText = texts[Math.floor(Math.random() * texts.length)];
}

// Display text with spans
function displayText() {
  textDisplay.innerHTML = currentText
    .split("")
    .map((char, index) => `<span data-index="${index}">${char}</span>`)
    .join("");
}

// Start test
function startTest() {
  if (isTestActive) return;

  isTestActive = true;
  startTime = Date.now();
  timeLeft = 60;
  totalErrors = 0;

  userInput.disabled = false;
  userInput.value = "";
  userInput.focus();

  startBtn.disabled = true;
  difficultyBtns.forEach((btn) => (btn.disabled = true));

  startTimer();
}

// Start timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

// Handle input
function handleInput(e) {
  if (!isTestActive) return;

  const typedText = userInput.value;
  const textSpans = textDisplay.querySelectorAll("span");

  let correctChars = 0;
  let errors = 0;

  textSpans.forEach((span, index) => {
    const char = span.textContent;
    const typedChar = typedText[index];

    // Reset classes
    span.classList.remove("correct", "incorrect", "current");

    if (typedChar === undefined) {
      // Not typed yet
      if (index === typedText.length) {
        span.classList.add("current");
      }
    } else if (typedChar === char) {
      // Correct
      span.classList.add("correct");
      correctChars++;
    } else {
      // Incorrect
      span.classList.add("incorrect");
      errors++;
    }
  });

  // Update stats
  totalErrors = errors;
  updateStats(correctChars, typedText.length);

  // Check if finished
  if (typedText.length >= currentText.length) {
    endTest();
  }
}

// Update stats
function updateStats(correctChars, totalChars) {
  // Calculate WPM
  const timeElapsed = (60 - timeLeft) / 60; // in minutes
  const wordsTyped = correctChars / 5; // standard: 5 chars = 1 word
  const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
  wpmEl.textContent = wpm;

  // Calculate accuracy
  const accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  accuracyEl.textContent = `${accuracy}%`;

  // Update errors
  errorsEl.textContent = totalErrors;
}

// End test
function endTest() {
  isTestActive = false;
  clearInterval(timerInterval);

  userInput.disabled = true;
  startBtn.disabled = false;
  difficultyBtns.forEach((btn) => (btn.disabled = false));

  showResults();
}

// Show results
function showResults() {
  const wpm = wpmEl.textContent;
  const accuracy = accuracyEl.textContent;
  const errors = errorsEl.textContent;
  const charsTyped = userInput.value.length;

  document.getElementById("finalWpm").textContent = `${wpm} WPM`;
  document.getElementById("finalAccuracy").textContent = accuracy;
  document.getElementById("finalErrors").textContent = errors;
  document.getElementById("finalChars").textContent = charsTyped;

  resultsEl.classList.remove("hidden");
}

// Reset test
function resetTest() {
  isTestActive = false;
  clearInterval(timerInterval);

  timeLeft = 60;
  totalErrors = 0;

  timerEl.textContent = "60s";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100%";
  errorsEl.textContent = "0";

  userInput.value = "";
  userInput.disabled = true;

  startBtn.disabled = false;
  difficultyBtns.forEach((btn) => (btn.disabled = false));

  selectRandomText();
  displayText();
}

// Initialize on load
init();
