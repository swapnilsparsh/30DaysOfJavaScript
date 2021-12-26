const btn = document.getElementById('emoji-btn');
const emojis = ["😆", "😅", "🤣", "😂", "😀", "🤑", "🤨", "🙂", "😊", "😗", "😛", "😏", "🤥", "😴", "🥺", "😧", "🤗", "🤩", 
"😎", "🥳", "😍", "😱", "🤓", "😷", "🥴", "😳", "🤯", "🤫", "🤑", "😪", "😴", "😵","😶‍🌫️", "🥵", "🥶", "😳","🤪","😵","🥴",
"😵‍💫","😠","😡","🤮","🤢","🤒","😷","🤬","🤧","😇","🥳"];

btn.addEventListener('mouseover', () => {
    btn.innerText = emojis[Math.floor(Math.random() * emojis.length)];
})

btn.addEventListener('click', () => {
    btn.innerText = emojis[Math.floor(Math.random() * emojis.length)];
})