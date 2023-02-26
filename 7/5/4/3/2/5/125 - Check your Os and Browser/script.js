let browserDetailsRef=document.getElementById("browser-details");
let osDetailsRef= document.getElementById("os-details");
var browserList=[
    {name:"Firefox",value:"Firefox"},
    {name:"Opera",value:"OPR"},
    {name:"Edge",value:"Edg"},
    {name:"Chrome",value:"Chrome"},
    {name:"Safari",value:"Safari"},
];
var os = [
    {name:"Android",value:"Android"},
    {name:"iPhone",value:"iPhone"},
    {name:"ipad",value:"Mac"},
    {name:"Macintosh",value:"Mac"},
    {name:"Linux",value:"Linux"},
    {name:"Window",value:"Win"},

];

let browserChecker=()=>{
    let userDetails=navigator.userAgent;
    for(let i in browserList){
        if(userDetails.includes(browserList[i].name)){
            browserDetailsRef.innerHTML =browserList[i].name || "Unknow Browser";
            break;
        }
    }
    for(let i in os){
        if(userDetails.includes(os[i].name)){
            osDetailsRef.innerHTML =os[i].name;
            break;
        }
    }
};
window.onload=browserChecker();