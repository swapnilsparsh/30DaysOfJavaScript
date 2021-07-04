const img = document.querySelector('img');
const input = document.querySelector('input');

input.addEventListener('keydown', () =>{
    const favicon = `https://favicon.githubusercontent.com/${input.value}`;
    img.src = favicon;
})