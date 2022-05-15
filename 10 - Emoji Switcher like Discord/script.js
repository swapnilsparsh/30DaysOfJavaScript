const btn = document.getElementById('emoji-btn');

const emojis = [];


const emojiAddFunction = async () => {
    
    let res = await fetch('https://emoji-api.com/emojis?access_key=1ce9b701f975ba7b63dd065ab1e09f26e3d1e83d')
    res = await res.json()
    
    for(let i=0 ; i<res.length ; i++){
        emojis.push(res[i].character);
    }
}

emojiAddFunction();

btn.addEventListener('mouseover', () => {
    btn.innerText = emojis[Math.floor(Math.random() * emojis.length)];
})

btn.addEventListener('click', () => {
    btn.innerText = emojis[Math.floor(Math.random() * emojis.length)];
})
