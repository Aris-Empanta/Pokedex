import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { firstLetterCapital } from "../functions/home"
import { Link } from "react-router-dom";
import "../css/dynamicPokemon.css"
import { serverHost } from "../variables/serverHost";

export const DynamicPokemon = () => {
    
    const [ pokemon, setPokemon ] = useState(null)
    const [ comments, setComments ] = useState([])

    const params = useParams()

    useEffect(() => {
                        const loading = document.getElementById("loadingDynamicPokemon")

                        loading.style.display = "initial"

                        axios.get( serverHost + "pokemon/" + params.pokemon)
                             .then( res =>  { loading.style.display = "none"
                                               setPokemon(res.data)} )
                        axios.get( serverHost + "pokemon/comments/" + params.pokemon)
                             .then( res =>  setComments(res.data) )
                    }, [])

    return(<div>
              <div id="loadingDynamicPokemon">
                <p className="pleaseWait">Please wait ...</p>
              </div>
              {pokemon === null ? null : 
                                      <div className="outerStatsWrapper">    
                                        <div className="imageAndStatsWrapper">         
                                          <img src={pokemon.image} id="dynamicPokeImage" /> 
                                          <div>
                                            <p className="characteristics"> <span className="characteristicsLabel">Name:</span> { firstLetterCapital(pokemon.name) }</p>
                                            <p className="characteristics"><span className="characteristicsLabel">Height:</span> { pokemon.height }''</p>
                                            <p className="characteristics"><span className="characteristicsLabel">Weight:</span> { pokemon.weight } lbs</p>
                                            <div className="characteristics poketypes"><p className="characteristicsLabel">Type:
                                              </p> { pokemon.types !== undefined ?
                                                      pokemon.types.map( (item, index) => <p> { index === 1 ? ", " : ""} {item}</p>) 
                                                                                  : null}
                                            </div>
                                          </div>
                                        </div>
                                        <p className="evolutionChainTitle">Evolution Chain</p>
                                        <div className="evolutionChain" >
                                        { pokemon.evolutions !== undefined ? 
                                        pokemon.evolutions.map( item => <Link className="evolutionLinks" target={"_blank"} to={ item }>
                                                                            <div className="evolutionLinksWrapper">
                                                                              <p>{ firstLetterCapital(item) }</p>
                                                                            </div>
                                                                        </Link>) 
                                                                          : null}
                                        </div>  
                                        <p className="commentsTitle">Comments</p>
                                        { comments.map( item => <p className="commentsFetched">
                                                                  <span className = "commentingUser">{ item.user } : </span>{ item.comment } 
                                                                </p>)}
                                        </div>
              }
           </div>)
}