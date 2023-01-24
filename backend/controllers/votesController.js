const Votes = require('../models/Votes')
const mongoose = require('mongoose')


//get all voted pokemon
const getVotedPokemon = async (req, res) => {
    const votes = await Votes.find({}).sort({createdAt: -1})

    res.status(200).json(votes)
}

//get single pokemon
const getPokemon = async (req, res) => {
    const {id} = req.params


    if (!mongoose.Types.ObjectId.isValid){
        return res.status(404).json({error: 'No FUCK workout'})
    }

    const vote = await Votes.findById(id);
    if (!vote) {
        return res.status(404).json({error: 'no such workout'})
    }

    res.status(200).json(vote)
}

//create new vote
const createVote = async (req, res) => {
    const {_id, name, votes} = req.body
    //add doc to db
    try {
        const vote = await Votes.create({_id, name, votes})
        res.status(200).json(vote)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete voted pkmn
const deleteVote = async (req, res) =>  {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'cant del pokemon was not voted'})
    }

    const vote = await Votes.findById(id);
    if (!vote) {
        return res.status(400).json({error: "that pokemon has no votes"})
    }
    res.status(200).json(vote)
    
}


//update vote
const updateVote = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid){
        return res.status(404).json({error: 'That pokemon was not voted'})
    }

    const vote = await Votes.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!vote) {
        return res.status(400).json({error: "that pokemon has no votes"})
    }
    res.status(200).json(vote)
}

module.exports = {
    createVote,
    getVotedPokemon,
    getPokemon,
    deleteVote,
    updateVote

}