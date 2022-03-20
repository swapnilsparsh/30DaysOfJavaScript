const getNextQuote = async() =>
{
  var url = "https://raw.githubusercontent.com/msramalho/json-tv-quotes/master/quotes.json";
  const response = await fetch(url);
  const totalQuotes = await response.json();
  const index = Math.floor(Math.random()*totalQuotes.length);
  const quo=totalQuotes[index].quote;
  const auth=totalQuotes[index].author;
  const sour=totalQuotes[index].source;
  quote.innerHTML=""+quo;
  author.innerHTML="~ "+auth;
  source.innerHTML=""+sour;
  tweetButton.href="https://twitter.com/intent/tweet?text="+quo+" ~ "+auth+" | "+sour;
  whatsappButton.href="whatsapp://send?text="+quo+" ~ "+auth+" | "+sour;
}

getNextQuote();
