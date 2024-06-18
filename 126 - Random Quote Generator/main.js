document.addEventListener("DOMContentLoaded", () => {
  let quotes = [];

  // Fetch quotes from the API
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      quotes = data;
      getQuote(); // Display an initial quote
    });

  // Function to generate a new quote
  function getQuote() {
    if (quotes.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById("quote");
    const quoteText = quotes[randomIndex].text;
    const quoteAuthor = cleanAuthor(quotes[randomIndex].author || "Unknown");
    quoteElement.textContent = `${quoteText} - ${quoteAuthor}`;
  }

  // Function to clean up the author text
  function cleanAuthor(author) {
    // Remove unwanted text patterns (e.g., ", type.fit")
    return author.replace(/, type\.fit/g, "");
  }

  // Function to copy the current quote to the clipboard
  function copyQuote() {
    const quoteElement = document.getElementById("quote");
    const textArea = document.createElement("textarea");
    textArea.value = quoteElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Quote copied to clipboard!");
  }

  // Expose functions to the global scope so they can be called from the onclick attribute
  window.getQuote = getQuote;
  window.copyQuote = copyQuote;
});
