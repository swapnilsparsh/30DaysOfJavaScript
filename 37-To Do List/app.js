const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser({extended:true}));
app.use(express.static("public"));

app.set('view engine','ejs');
let item=["Buy food","Cook food","Eat food"];
let work=[];
app.get("/",function(req,res){
    let date = new Date();
    let options ={
        weekday : "long",
        day: "numeric",
        month: "long"
    };
    let day = date.toLocaleDateString("en-US",options);
    res.render("list", {listTitle: day,newListItem: item});
});


app.post("/",function(req,res){
    let items  = req.body.nextItem;
    console.log(req.body);
    if(req.body.list==="Work")
    {
        work.push(items);
        res.redirect("/work");
        
    }
    else
    {
        item.push(items);
        res.redirect("/");
    }
 })

 app.get("/work",function(req,res){
     res.render("list",{listTitle:"Work",newListItem:work})
 })
app.get("/about",function(req,res){
    res.render("about");
})


app.listen(3000,function(){
    console.log(`listining to server 3000`);
})