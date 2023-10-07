// Define the API endpoint
const apiEndpoint = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

// Function to fetch and display the BTC price
function fetchBTCPrice() {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            const btcPrice = data.bitcoin.usd;
            console.log(`Current BTC Price: $${btcPrice}`);
            // You can also update this on your webpage, e.g.:
            // document.getElementById("btcPrice").innerText = `Current BTC Price: $${btcPrice}`;
        })
        .catch(error => {
            console.error("Error fetching BTC price:", error);
        });
}

// Call the function to fetch and display the price
fetchBTCPrice();
