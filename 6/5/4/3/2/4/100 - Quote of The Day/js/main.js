var httr = new XMLHttpRequest(); 
var quotes = [];
httr.open('GET', 'https://type.fit/api/quotes/');
httr.send();
httr.addEventListener('readystatechange', function(){
    if(httr.readyState==4)
    {
        quotes = JSON.parse(httr.response);
        console.log(quotes);
    }
});
var x =  document.getElementById('newQuote');
var y;
var w = document.getElementById('quote');
var z = document.getElementById('name');
x.addEventListener('click',function(){
    display();
})
function display(){
    do{
        y = Math.floor(Math.random() * quotes.length);
    }while(quotes[y].author == null)
    w.innerHTML = quotes[y].text;
    z.innerHTML = "-- " + quotes[y].author;     
}