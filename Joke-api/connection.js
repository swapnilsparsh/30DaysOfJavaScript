
const express= require('express');
const app= express();
//const cors= require('cors');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(cors);
app.use(express.static('public'));
require('dotenv').config();
const {MongoClient}=require('mongodb');
const y=process.env.URI;
//require('./url.js');
MongoClient.connect(y,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(client=>{
    console.log("DB connected");
    let db=client.db('Joke');
    //db.open();
    let jokes=db.collection('Jokes');
    app.get('/',(req,res)=>{
        jokes.find().toArray().then(result=>{
            res.render('index.ejs',{jokes:result});
        }).catch(err=>{
            console.error(err);
        })
    });
    app.post('/jokes',(req,res)=>{
        jokes.insertOne(req.body).then(result=>{
            res.redirect('/');
            console.log(result);
        }).catch(err=>{
            console.error(err);
        })
    });
    app.put('/jokes',(req,res)=>{
        jokes.findOneAndUpdate(
            {name:req.body.name},
            {
                $set:{
                    name:req.body.name,
                    joke:req.body.joke
                }
            },
            {upsert:false}
        ).then(result=>{
            res.redirect('/')
            console.log("success");
        }).catch(err=>{
            console.error(err);
        })
    });
    app.delete('/jokes',(req,res)=>{
        jokes.findOneAndDelete(
            {name:req.body.name},
            
        ).then(result=>{
            res.json("Data deleted")
        }).catch(err=>{
            console.error(err);
        })
    })
    /*app.get('jokes/search',(req,res)=>{
        console.log("reached");
        let n=req.body.name;
        let name=n.charAt(0).toUpperCase()+n.slice(1);
        jokes.findOne(
            {name:name}
        ).then(result=>{
            res.render("index.ejs",{joke:result})
        }).catch(err=>{
            console.error(err);
        })

    })*/
    

}).catch(err=>{
    console.error(err);
})
const PORT= process.env.PORT || 7800 ;
app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}...`);
});

/*process.on('SIGINT',function(){
    MongoClient.close(function(){
        console.log("DB closed...");
        process.exit(0);
    });
});*/