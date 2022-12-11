const db = require("../database/db")
const setsOfSix = require("../functions/functions").setsOfSix
const firstLetterCapital = require("../functions/functions").firstLetterCapital

module.exports = {
    getPokemon: (req, res) => {

        const pokeName = req.params.name
                
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName)
            .then( response =>  response.json())
            .then((data) => { 
                              //We "clean" the received pokemon data to keep only the 
                              //values we are concerned about.
                              const pokemonData = {}
    
                              pokemonData.name = data.species.name
                              pokemonData.image = data.sprites.other['dream_world']['front_default']
                              pokemonData.id = data.id 
                              pokemonData.height = data.height
                              pokemonData.weight = data.weight
                              pokemonData.types = data.types.length === 2 ? [data.types[0].type.name, data.types[1].type.name ] :
                                                                    [data.types[0].type.name]
                                                                    
                              //We fetch the url of evolution chain by the pokemon id
                              fetch("https://pokeapi.co/api/v2/pokemon-species/" + data.id)
                                   .then( response => response.json() )
                                   .then((data) => {       
                                                     let url = data["evolution_chain"]["url"]
                                                     //We use the evolution chain url to fetch the pokemon's evolutions
                                                     fetch(url).then((response) => response.json())
                                                               .then( data => { 
                                                                          let evolutions = []
                    
                                                                          let first = data.chain.species.name
                    
                                                                          evolutions.push(first)
                    
                                                                          if(data.chain["evolves_to"].length > 0) {
                                                                            let second = data.chain["evolves_to"][0].species.name
                                                                            evolutions.push(second)
                    
                                                                            
                                                                          }   
                                                                          if(data.chain["evolves_to"][0]["evolves_to"].length > 0) {
                    
                                                                            let thirdEvolutions = data.chain["evolves_to"][0]["evolves_to"]
                                                               
                    
                                                                            for( let i=0; i < thirdEvolutions.length; i++) {
                    
                                                                                evolutions.push(thirdEvolutions[i].species.name)
                                                                            }
                                                                          }                                                     
                    
                                                                          pokemonData.evolutions = evolutions
                                                                          res.send(pokemonData)
                                                                        })  
                                            });                           
    
                              
                            }).catch(e => res.send('Pokemon not found'))
    },
    postComment: (req, res) => {

        let user = req.body.user
        let pokemon = req.body.pokemon
        let comment = req.body.comment
            
        let query = `INSERT INTO comments VALUES(?, ?, ?)`
        
        db.query( query, [user, pokemon, comment ], (err, rows) => { if(err) throw err 
                                                                     res.send("Your comment has been successfully added!")} )
      },
    getComments: (req, res) => {

        let pokemon = req.params.pokemon
      
        let query = `SELECT * FROM comments WHERE pokemon = ?`
      
        db.query( query, [ pokemon ], (err, rows) => { if(err) throw err 
                                                        res.send(rows)
                                                      } )
      },
    catchPokemon: (req, res) => {

        let pokemon = req.body.pokemon
        let user = req.body.user
        let image = req.body.image
      
        //First, we found the amount of sets a trainer has
        let query = `SELECT MAX(setNumber) as maxSet 
                     FROM pokemonSets
                     WHERE user= ?`
      
        db.query(query,[user],  (err, rows) => { 
                                                  let maxSet = rows[0].maxSet !== null ? rows[0].maxSet + 1 : 1
      
                                                  let query = `INSERT INTO pokemonSets 
                                                              VALUES( ?, ?, ?, ? )`
      
                                                  db.query( query, [ maxSet, pokemon, user, image ], (err, rows) => { 
                                                                                                      if(err) throw err
                                                                                                      res.send(`Congratulations! You caught ${firstLetterCapital(pokemon)} !`)
                                                                                                      })                                               
                                                  })                               
            },
    fetchCaught: (req, res) => {

        let user = req.params.user
      
        let query = `SELECT *
                     FROM pokemonSets
                     WHERE user =  ? `
      
        db.query( query, [ user ], (err, rows) => { 
                                                    let sets = setsOfSix(rows) 
                                                     res.send(sets)     
                                                   })
      },
    removePokemon: (req, res) => {

        let user = req.params.user
        let pokemon = req.params.pokemon
        let setNumber = req.params.id
      
        let query = `DELETE  
                     FROM pokemonSets
                     WHERE user = ? AND setNumber = ?`
      
        db.query( query, [user, setNumber], (err, rows) => { 
                                                             if(err) throw err    
                                                             res.send(firstLetterCapital(pokemon) + ' has been removed from your party!')                                                               
                                                            })
        
      }  
}