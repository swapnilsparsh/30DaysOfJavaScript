const quotes = [
  "Quote 1",
  "Quote 2",
  "Quote 3",
  "Quote 4",
  // Add more quotes here
];

const quoteText = document.getElementById("quote-text");
const newQuoteButton = document.getElementById("new-quote-button");

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function displayRandomQuote() {
  const randomQuote = getRandomQuote();
  quoteText.textContent = randomQuote;
}

newQuoteButton.addEventListener("click", displayRandomQuote);

// Initial quote display
displayRandomQuote();
