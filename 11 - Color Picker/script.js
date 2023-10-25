// Get color input by id 
const colorPicker = document.getElementById('color-picker');

// Default background 
colorPicker.value = '#06020F';

function hexToRgbNew(input) {
    var hex= input.slice(1)
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);
  
    return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
  }

  function hexToHSL(H) {
    // Convert hex to RGB first
    // var H= input.slice(1)
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

// Input event
colorPicker.addEventListener('input', ()=>{
    // Get the selected color of the input (hex value)
    const colorSelected = colorPicker.value;
    // Live updating the color
    document.body.style.background = colorSelected;
    document.getElementById("hex-value").innerHTML=colorSelected;
    document.getElementById("rgb-value").innerHTML="rgb("+hexToRgbNew(colorSelected)+")";
    document.getElementById("hsl-value").innerHTML=hexToHSL(colorSelected);
})

function hex(){
    navigator.clipboard.writeText(document.getElementById("hex-value").innerHTML);
    toastr.success('Now you can use it!', 'Copied to clipboard', { timeOut: 3000 });
}
function rgb(){
    navigator.clipboard.writeText(document.getElementById("rgb-value").innerHTML);
    toastr.success('Now you can use it!', 'Copied to clipboard', { timeOut: 3000 });
}
function hsl(){
    navigator.clipboard.writeText(document.getElementById("hsl-value").innerHTML);
    toastr.success('Now you can use it!', 'Copied to clipboard', { timeOut: 3000 });
}