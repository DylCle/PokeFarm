const express = require('express')
const {
    createVote, 
    getVotedPokemon,
    getPokemon,
    deleteVote,
    updateVote
} = require('../controllers/votesController')
const router = express.Router()



//get all voted 
router.get('/', getVotedPokemon)

//get single pkmn
router.get('/:id', getPokemon)


//post vote
router.post('/', createVote)

//delete
router.delete('/:id', deleteVote)

//update vote
router.patch('/:id', updateVote)



module.exports = router