var imgNum = 0;
var rand = [2, 3, 4, 5, 6, 7, 8, 9];
var randNum;
var ind = [];

document.getElementById('img1').addEventListener('click', ()=>{
    document.getElementById('img1').style = "border: 5px solid rgb(139, 139, 172)";
    document.getElementById('img2').style = "border: none";
    document.getElementById('img3').style = "border: none";
    imgNum = 1;
})
document.getElementById('img2').addEventListener('click', ()=>{
    document.getElementById('img2').style = "border: 5px solid rgb(139, 139, 172)";
    document.getElementById('img1').style = "border: none";
    document.getElementById('img3').style = "border: none";
    imgNum = 2;
})
document.getElementById('img3').addEventListener('click', ()=>{
    document.getElementById('img3').style = "border: 5px solid rgb(139, 139, 172)";
    document.getElementById('img1').style = "border: none";
    document.getElementById('img2').style = "border: none";
    imgNum = 3;
})
function start(){
    if(imgNum==0)
    {
        document.getElementById('invalid').innerHTML = 'Please choose an image';
        document.getElementById('invalid').style = "border: 1px solid rgb(120, 4, 4); padding:8px;border-radius:10px;width:100%;"
        return;
    }
    document.getElementById('invalid').style.display = "none";
    x = `<div onclick="move(${1})" id="div1" class="col-md-4"></div>`;
    while(rand.length != 0)
    {   
        randNum = Math.floor(Math.random() * rand.length);
        if(!ind.includes(rand[randNum]))
        {
            ind.push(rand[randNum]);
            rand.splice(randNum, 1);
        }
    }
    for (var i = 2; i < 10; i++)
        {
            x += `<div onclick="move(${i})" id="div${i}" class="col-md-4">
                    <img src="images/img${imgNum}/${ind[i-2]}.jpg" alt="">
                </div>`;
        }
    document.getElementById('puzzle').innerHTML = x;
}
function move(index){
    if((index - 1) > 0 && document.getElementById(`div${index-1}`).innerHTML == '')
    {
        document.getElementById(`div${index-1}`).innerHTML = document.getElementById(`div${index}`).innerHTML;
                                                        
        document.getElementById(`div${index}`).innerHTML = '';
    }
    else if((index + 1) < 10 && document.getElementById(`div${index+1}`).innerHTML=='')
    {
        document.getElementById(`div${index+1}`).innerHTML = document.getElementById(`div${index}`).innerHTML;
                                                    
        document.getElementById(`div${index}`).innerHTML = '';
       
    }
    else if((index - 3) > 0 && document.getElementById(`div${index-3}`).innerHTML == '')
    {
        document.getElementById(`div${index-3}`).innerHTML = document.getElementById(`div${index}`).innerHTML;
                                                        
        document.getElementById(`div${index}`).innerHTML = '';
    }
    else if((index + 3) < 10 && document.getElementById(`div${index+3}`).innerHTML == '')
    {
        document.getElementById(`div${index+3}`).innerHTML = document.getElementById(`div${index}`).innerHTML;
                                                        
        document.getElementById(`div${index}`).innerHTML = '';
    }
    if(win())
    {
        setTimeout(() => {
            celebrate()
        }, 1500)
    }
}
function win(){
    for(var i = 2; i < 10; i++)
    {
        if(!document.getElementById(`div${i}`).innerHTML.includes(`${i}.jpg`))
        {
            return false;
        }
    }
    return true;
}
function celebrate(){
    document.getElementById('puzzle').innerHTML = `<div class="d-flex justify-content-center align-items-center">
                                                        <div id="win">You Win!!!</div>
                                                        <img src="images/img${imgNum}/whole1.jpg" class="row my-5" style="width:100%;height:100wh">
                                                    </div>`;
}
