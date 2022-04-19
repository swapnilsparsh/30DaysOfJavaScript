const express=require('express');
const app=express();
var jokes=require('./data.json');
app.get('/jokes',(req,res)=>{
    res.json(jokes);
});
app.post('/add/jokes',(req,res)=>{
    jokes.push(req.body);
    res.json(jokes);
})
app.put('/update/joke/:name',(req,res)=>{
    let id=req.params.name;
  let x=jokes.find(r=>r.name==id);
  let newJoke={...x,...req.body};
  jokes[id]=newJoke;
  res.json(jokes);
})
app.delete('/delete/joke/:id',(req,res)=>{
    let id=Number(req.params.id);
    let x=jokes.findIndex(r=>r.id==id);
    jokes.splice(x,1);
    res.json(jokes);

});
app.listen(8900,()=>{
    console.log("server is listening to 8900");
})