// Get color input by id 
const colorPicker = document.getElementById('color-picker');

// Default background 
colorPicker.value = '#06020F';

// Input event
colorPicker.addEventListener('input', ()=>{
    // Get the selected color of the input (hex value)
    const colorSelected = colorPicker.value;
    // Live updating the color
    document.body.style.background = colorSelected;
})