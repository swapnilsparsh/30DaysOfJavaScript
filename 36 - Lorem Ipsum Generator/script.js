const form = document.querySelector('#form')
const copy = document.querySelector('.copy')

// handling form
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const size = parseInt(form.input.value);
    document.querySelector('.text-section').innerHTML = loremIpsum(size);


})

// generation text
function loremIpsum(size) {
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula odio non risus finibus feugiat.
    Donec bibendum, sapien eget volutpat dapibus, urna velit malesuada tortor, et fermentum arcu velit non dui.
    Vestibulum condimentum, justo sed rhoncus laoreet, nunc tellus viverra nulla, nec eleifend purus velit non justo.
    Proin sit amet venenatis velit, eu varius nunc. Integer eget ligula eu metus elementum sodales.
    Sed efficitur, mi a rhoncus vehicula, odio orci malesuada elit, at fermentum justo nulla et urna.
    Cras auctor, elit at lacinia eleifend, metus ex condimentum purus, ut lacinia tortor lectus id ipsum.
    Nunc viverra sit amet justo in lacinia. Vestibulum scelerisque, orci id cursus placerat, purus purus bibendum urna, at scelerisque quam libero sed arcu.
    Fusce eget purus eget purus sodales tristique ac nec nunc. Pellentesque eleifend laoreet ultrices.`;

    const array = lorem.split('\n')
    let result = '';

    for (let i = 0; i < size; i++) {
        result += `<p class='text-white font-semibold'>${array[i % array.length]}<p/>`
    }

    //showing or hiding the text container
    if (result) {
        document.querySelector('.text-wrapper').style.display = 'flex'
    } else {
        document.querySelector('.text-wrapper').style.display = 'none'
    }
    return result;

}


// adding event to copy button
copy.addEventListener('click', (e) => {
    const text = document.querySelector('.text-section').textContent
    const textArea = document.createElement('textarea')
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.style.display = 'none';

    textArea.select();
    textArea.setSelectionRange(0, 99999);

    if (textArea.select) {
        navigator.clipboard.writeText(textArea.value)
        copy.classList.add('fa-clipboard')
        copy.classList.remove('fa-copy')
        setTimeout(() => {
            copy.classList.remove('fa-clipboard')
            copy.classList.add('fa-copy')
        }, 500);
    }
})