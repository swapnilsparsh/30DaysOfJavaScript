
button=document.getElementById('button');
button.addEventListener('click',e=>{
    let ans=document.createElement('div');
    document.getElementById('matrix').appendChild(ans);
   
    const n=3;
let j=0;
let arr=new Array(n);
let input=document.getElementsByName('array[]');

for (let i = 0; i < n; i++) {
    arr[i]=[];
    for(;j<(i+1)*n;j++){
        let a=input[j];
        if(a.value==""){
            alert("Enter the values in matrix!");
            return;
        }
        arr[i].push(a.value);
        
    }
}
transpose(arr);
ans.innerHTML="Transpose Matrix: ";
ans.classList.add('fontstyle');
let table=document.createElement('table');
let thead=document.createElement('thead');
let tbody=document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);
document.getElementById('body').appendChild(table);

let trRow=document.createElement('tr');
for (let i = 1; i <= n; i++) {
    let thRow=document.createElement('th');
    thRow.innerHTML="A"+i;
    trRow.appendChild(thRow);
}
thead.appendChild(trRow);
let trData1=document.createElement('tr');
for (let i = 0; i <n; i++) {
    let num=arr[0][i];
    let tdData1=document.createElement('td');
    tdData1.innerHTML=""+num;
    trData1.appendChild(tdData1);
}
tbody.appendChild(trData1);
let trData2=document.createElement('tr');
for (let i = 0; i <n; i++) {
    let num=arr[1][i];
    let tdData2=document.createElement('td');
    tdData2.innerHTML=""+num;
    trData2.appendChild(tdData2);
}
tbody.appendChild(trData2);
let trData3=document.createElement('tr');
for (let i = 0; i <n; i++) {
    let num=arr[2][i];
    let tdData3=document.createElement('td');
    tdData3.innerHTML=""+num;
    trData3.appendChild(tdData3);
}
tbody.appendChild(trData3);
table.classList.add('ansTableClass');

});
function transpose(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j<i; j++) {
            const temp=arr[i][j];
            arr[i][j]=arr[j][i];
            arr[j][i]=temp;
            
        }
        
    }
}