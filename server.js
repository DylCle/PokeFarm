const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const { response } = require('express');


app.use(bodyParser.urlencoded({extended: true}));

const voteSchema = {
    _id: String,
    vote: Number
    
}

const Vote = mongoose.model("vote", voteSchema);

mongoose.connect("mongodb+srv://falcon:OGfalcon1@vote.tor7xmb.mongodb.net/?retryWrites=true&w=majority")

app.use(express.static("public"));

const getVote = async (req,res) => {
    const { id } = req.params
    const vote = await Vote.findById(id)
    res.status(200).json(vote)
}

const makeVote = async (req, res) => {
    Vote.findByIdAndUpdate({_id: req.body._id}, {$inc : {vote : 1 }}, 
    function(err, _id) 
    {
        if(err)  
        {
            console.log(err)
        }
            if (_id) 
            {
                Vote.findByIdAndUpdate({_id: req.body._id}, {$inc : {vote : 1 }});
                console.log("title is alreay exisit")
                res.redirect("/"); 
            } else 
            {
               
            let newVote =  new Vote( {
                _id: req.body._id,
                vote: req.body.vote
            })
            newVote.save();
            res.redirect("/"); 
            }
    })
}



app.get("/voted", (req,res) => {

    Vote.find().sort("-vote").limit(1).exec((err,id) => {
        if(err)
        {
            console.log(err)
        }else {
            res.send(JSON.stringify(id[0]._id))
        }
    })

})




app.post("/", makeVote)

app.get("/:id", getVote);



app.listen(3000, function() {
    console.log("server running on port 3000");
})