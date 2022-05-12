let a=0;
let save;
let n;
let score=0;
function work(num)
{
      let cl=document.getElementById(num).getAttribute("class");  //gets array of classes element has
      a++;
      for(let i=1;i<=30;i++)
      {
            document.getElementById(i).classList.remove("xyz");   //hide all texts
            document.getElementById(i).innerText="-";             //adds - in place of block names
      }
      document.getElementById(num).classList.add("xyz");        //shows the first clicked element
      document.getElementById(num).innerText=cl[0];             //text of first shown element
      console.log(cl);
      if(a==2)
      {
            a=0;
            document.getElementById(n).classList.add("xyz");  //shows the second clicked element
            document.getElementById(n).innerText=save;        //text of second clicked element
            if(save==cl)
            {
                  score=score+10;                             //if two clicked elements matches the score increases
            }
            console.log(score);
            save="none";                                      //to remove saved previous element
            n=0;                                              //to remove saved previous element
      }
      else if(a==1)
      {
            save=cl[0];                                       //to save previous element
            n=num;                                            //to save previous element's id
      }
}
