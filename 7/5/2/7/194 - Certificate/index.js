
var temp = document.getElementById("template")

var tempvalue = temp.options[temp.selectedIndex].value;
console.log(tempvalue);

const submitBtn = document.getElementById("submit");
const user = document.querySelector("#name");
// console.log(user.value);
submitBtn.addEventListener('click',()=>{
    const value = user.value;
    // alert(value);
    generatePDF(value);    
});


const generatePDF = async(name) =>{
    const {PDFDocument, rgb} = PDFLib;
    // const exBytes = await fetch("./certificate-template.pdf").then((res)=>{
    //     return res.arrayBuffer();
    // });
    const exBytes = await fetch(`./${temp.options[temp.selectedIndex].value}.pdf`).then((res)=>{
        return res.arrayBuffer();
    });
    // console.log(exBytes);

   
   


    const pdfDoc = await PDFDocument.load(exBytes);

    pdfDoc.registerFontkit(fontkit);
    const exFont= await fetch("./Sanchez-Regular.ttf").then((res)=>{
        return res.arrayBuffer();
    });
    const myFont = await pdfDoc.embedFont(exFont);
    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    firstPg.drawText(name,{
        x: 275,
        y:280,
        // y: 250,
        size: 50,
        font: myFont,
        color: rgb(.16, .66, .88)
    })

    
    
    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    // window.open(uri);
    // document.querySelector("#mypdf").src = uri;
    saveAs(uri, "GSSoC'22 Participation Certificate.pdf", {autoBom: true});
    // var file = new file(
    //     [pdfBytes], "Codedamn Certificate.pdf", {
    //         type: "applications/pdf;charset = utf-8",
    //     }
    // );
    // saveAs(file);
    
};




