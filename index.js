const express=require('express');
const app =express();
const bodyparser=require('body-parser');
const request=require('request');
const axios =require("axios");
const port=5000;
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    
res.render('homepage.ejs');
});
app.get('/movies/result',(req,res)=>{
     var name=req.query.search;
     var title="http://www.omdbapi.com/?apikey=thewdb&s="+name;
     request(title,async(error,response,body)=>{
     var data=JSON.parse(body);
     console.log(data)
     res.render("result.ejs",{data:data});
   });
});
app.get("/movies/:id",(req,res)=>{
    var url="http://www.omdbapi.com/?apikey=thewdb&i="+req.params.id;
    request(url,(err,response,body)=>{
        var data=JSON.parse(body);
        console.log(data);
        res.render("movie.ejs",{data:data})
    })
})
app.listen(port,()=>{
console.log("server started");
});