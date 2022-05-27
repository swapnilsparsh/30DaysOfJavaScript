function books(genre){
    fetch("https://www.googleapis.com/books/v1/volumes?q=subject:"+ genre)
    .then(data => data.json())
    .then(bookData => {  
        for(let i=0; i<=9;i++)
        {const bookText = bookData.items[i].volumeInfo.title;
     document.querySelector(".output"+i).textContent =`${i+1}. ${bookText}  ` ;}
    })
  }
    
 
  document.getElementById("clickme").addEventListener("click",()=>{
    const type= document.getElementById("type");
    console.log(type.value);
  books(type.value);});

  document.getElementById("reset").addEventListener("click",()=>{
    for(let i=0; i<=9;i++){
  document.querySelector(".output"+i).textContent= " "; }
    });

