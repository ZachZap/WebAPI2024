var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//connect to mongoDB via mongoose
mongoose.connect("mongodb://0.0.0.0:27017/WebAPI",{
    //useNewURLParser:true,
    //useUnifiedTopology:true
}).then(function(){
    console.log("Connection with mongoDB database successful")
}).catch(function(err){
    console.log(err);
});

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

var Schema = mongoose.Schema;

var GameData = new Schema({
    gamename:String,
    gamestudio:String
});

var gameModel = mongoose.model("games",GameData);

app.get("/getdata",function(req,res){

    gameModel.find({}).then(function(games){
        res.json({games});
    });
    //var gamedata = gameModel.find({});
    //res.json(gamedata);
});

app.post("/deletegame", function(req, res)
{
    console.log(req.body.game._id);
    gameModel.findByIdAndDelete(req.body.game._id).exec();
    res.redirect("games.html");
})

app.post("/updategame", function(req, res)
{
    console.log(req.body);
    gameModel.findByIdAndUpdate(req.body.id,{gamename:req.body.game}).then(function(){
        res.redirect("games.html");
    });
})

app.listen(3000, function(){
    console.log("Running on Port 3000");
})