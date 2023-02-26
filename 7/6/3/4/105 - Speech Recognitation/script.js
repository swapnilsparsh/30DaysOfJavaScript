const texts= document.querySelector(".texts");
window.SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition=new SpeechRecognition();
recognition.interimResults=true;
let p=document.createElement("p");

recognition.addEventListener("result", (e)=>{
 texts.appendChild(p);
 const text=Array.from(e.results)
   .map((result)=>result[0])
   .map((result)=>result.transcript)
   .join("");

p.innerText=text;
if(e.result[0].isFinal){
    if(text.includes("How are You")){
        p=document.createElement("p");
        p.classList.add("replay");
        p.innerText="I am fine";
        texts.appendChild(p);
    }

    if(text.includes("What's Your name")
    || text.includes("What is Your name")){
        p=document.createElement("p");
        p.classList.add("replay");
        p.innerText="My name is Codewith_random";
        texts.appendChild(p);
    }

    if(text.includes("Open Youtube:")){
        p=document.createElement("p");
        p.classList.add("replay");
        p.innerText="Opening Youtube...";
        texts.appendChild(p);
        console.log("Opening Youtube");
        window.open("https://www.youtube.com")
    }

    p=document.createElement("p");
}

});


recognition.addEventListener("end", ()=>{
 recognition.start();
});

recognition.start();