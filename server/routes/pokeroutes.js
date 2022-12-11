const express = require("express")
const router = express.Router()
const controller = require("../controllers/pokeControllers")

//The route to get the desired pokemon data by pokemon name.
router.get("/:name", controller.getPokemon )

//The route to post comments for a pokemon.
router.post( "/comments", controller.postComment)

//The route to get the comments of a specific pokemon
router.get("/comments/:pokemon", controller.getComments )

//The route to save a pokemon into user's sets.
router.post("/catch", controller.catchPokemon )

//The route to fetch all the pokemon that a specific users has saved.
router.get("/pokemon-sets/:user", controller.fetchCaught )

//The route to remove a pokemon from your sets
router.delete("/delete/:user/:pokemon/:id", controller.removePokemon)

module.exports = router