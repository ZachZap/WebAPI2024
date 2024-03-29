var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var dataToSend;
require("../models/GameData")
var gameModel = mongoose.model("games");
router.get("/getdata",function(req,res){

    gameModel.find({}).then(function(games){
        res.json({games});
    });
    //var gamedata = gameModel.find({});
    //res.json(gamedata);
});

router.post("/deletegame", function(req, res)
{
    console.log(req.body.game._id);
    gameModel.findByIdAndDelete(req.body.game._id).exec();
    res.redirect("games.html");
})

router.post("/updategame", function(req, res)
{
    console.log(req.body);
    gameModel.findByIdAndUpdate(req.body.id,{gamename:req.body.game}).then(function(){
        res.redirect("games.html");
    });
})

router.post("/saveGame", function(req, res)
{
    console.log(req.body);
    new gameModel(req.body).save().then(function(){
        res.redirect("games.html");
    })
})

router.post("/unity", function(req, res)
{
    console.log("Unity Posted Data: ");
    console.log(req.body);
    dataToSend = req.body;
});

router.get("/getUnity", function(req, res)
{
    console.log(dataToSend);
    res.json(dataToSend);
});

module.exports = router;

