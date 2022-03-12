
const api = "https://api.quotable.io/random";
const btn = document.getElementById("btn");
btn.addEventListener("click", getQuote);
const quote = document.getElementById("quote");
function getQuote() {
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            quote.innerHTML = `"${data.content}"`;
        });
}
