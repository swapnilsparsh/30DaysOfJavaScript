function validatePalin() {  
    
    string = document.getElementById("text").value;
    
    // to obtain total length of the word or sentence
    const len = string.length;  
  
    // to remove spaces from the accepted string, if there is any
    let string1 = string.replace(/ /g, "");
    
    let len1 = string1.length;
    
    let string2 = "";
    
    // to remove special characters
    for (let j = 0; j < len1; j++) {
      
      if((string1[j] >= 'a' && string1[j] <= 'z') || (string1[j] >= 'A' && string1[j] <= 'Z') || (string1[j] >= '0' && string1[j] <= '9')) {
        string2 = string2.concat(string1[j]);
      }
          
    }
    
    // to obtain total length of the new string
    let len2 = string2.length;
  
    // to check for empty string
    if (string2 == "") {
      document.getElementById("result").innerHTML = "Please enter a valid string!";
    }
    
    else {
      
      string2 = string2.toLowerCase();
      
      let flag = 1;
      
      // for loop to divide the words into 2 half
      for (let i = 0; i < (len2 / 2); i++) {  
  
        // condition to check whether the first and last characters are same  
        if (string2[i] !== string2[len2 - 1 - i]) {  
           
            flag = 0;
        }
        
      }
     
     if (flag == 0) {
       document.getElementById("result").innerHTML = "It is not a palindrome.";        
     }
     
     else if (flag == 1) {
       document.getElementById("result").innerHTML = "It is a palindrome.";
     }
     
  }
       
}  
  
function clearScreen() {
  
  document.getElementById("result").innerHTML = "";
  document.getElementById("text").value = "";
  
}

