var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");


app.use(express.static(__dirname + "/pages"));

//javascript for a route
app.get("/", function(req, res){
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/index.html"));
});

app.get("/about", function(req, res){
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/about.html"));
});

app.get("/contact", function(req, res){
    //res.send("here would be the page from the route");
    res.sendFile(path.join(__dirname+"/pages/contact.html"));
});

app.listen(3000, function(){
    console.log("Running on Port 3000");
})