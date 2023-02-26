function talk(){  
    var know = {  
     "Who are you" : "Hello, I am special bot for 30 Days of JavaScript",  
     "How are you" : "Good :)",  
     "What can I do for you" : "Please star this repository",  
     "How do I contribute" : "Please read Readme",  
     "ok" : "Thank You So Much ",  
     "Bye" : "Okay! Will meet soon.."  
    };  
    var user = document.getElementById('userBox').value;  
     document.getElementById('chatLog').innerHTML = user + "<br>";  
    if (user in know) {  
     document.getElementById('chatLog').innerHTML = know[user] + "<br>";  
    }else{  
     document.getElementById('chatLog').innerHTML = "Sorry,I didn't understand <br>";  
    }  
   }  
