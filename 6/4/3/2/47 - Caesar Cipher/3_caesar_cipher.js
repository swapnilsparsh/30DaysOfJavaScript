
function main(x) { // x identifies from which button call is being made: Encrypt or Decrypt
    var entry_text = document.getElementById('entry').value
    var key_val = parseInt(document.getElementById('key').value) // Reading and storing both the inputs
    key_val = key_val % 26
    if(x===2){
        key_val = (-1) * key_val  // If call is for Decrypt then key value entered becomes negative
    }
    var final_string = ""
    for (var i = 0; i < entry_text.length; i++) {
        final_string = final_string + change(entry_text.charAt(i), key_val)
      }
    out_ele = document.getElementById('output')
    out_ele.style.display = final_string === "" ? "none":"flex"
    out_ele.innerHTML = final_string  
}

function isUpperCase(str) { // function to check if letter/word is uppercase or not
    return str === str.toUpperCase()
}

function change(ch, key){  // function to shift alphabets according to the key value
    if (!(/[a-zA-Z]/).test(ch)){ // checks for symbol and returns without any change if found
        return ch
    }
    if(isUpperCase(ch)){
        let no =  (ch.charCodeAt(0) + key - 65) % 26 + 65
        if(no < 65){
            return (String.fromCharCode(no+26))
        }
        else{
            return (String.fromCharCode(no))
        }
    }
    else{
        let no = (ch.charCodeAt(0) + key - 97) % 26 + 97
        if(no < 97){
            return (String.fromCharCode(no+26))
        }
        else{
            return (String.fromCharCode(no))
        }
    }

}