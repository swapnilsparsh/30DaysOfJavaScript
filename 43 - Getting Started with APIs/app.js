
const cat_result = document.getElementById('gallery');


btn_generate.addEventListener("click", function() {
    allimages="";
  fetch("https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc")
   .then((res) => res.json())
   .then((res) => {
    for(let i=0;i<5;i++){
     allimages+= `
     <div style="display:flex;">
     <img src=${res[i].url} alt="cat" />
     <div>
     `
    }
    cat_result.innerHTML=allimages;
});
})


