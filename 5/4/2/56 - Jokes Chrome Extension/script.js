fetch('https://icanhazdadjoke.com/slack')
.then(data=> data.json())
.then(jokeData=> {
    //var test=0;
    const jokeText=jokeData.attachments[0].text;
    const jokeid=document.getElementById('jokeid');
    jokeid.innerHTML=jokeText;
})