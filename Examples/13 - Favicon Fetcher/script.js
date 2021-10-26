const img = document.querySelector('img');
const input = document.querySelector('input');

input.addEventListener('keydown', () =>{
    const favicon = `https://www.google.com/s2/favicons?sz=32&domain_url=${input.value}`;
    img.src = favicon;
})