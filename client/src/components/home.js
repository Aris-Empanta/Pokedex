import "../css/home.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchPokemon, logout, firstLetterCapital,
         showDetails, hideDetails,
         submitComment, catchPokemon } from "../functions/home"
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket }from "@fortawesome/free-solid-svg-icons";
import { faXmark }from "@fortawesome/free-solid-svg-icons";
import { Loading } from "./loading";


export const Home = ({setLoggedIn}) => {

   const [user, setUser ] = useState("")
   const [pokeName, setPokeName ] = useState("")
   const [pokemon, setPokemon ] = useState({})

    let navigate = useNavigate()

    useEffect(() => {

      let user = JSON.parse(localStorage.getItem('username'))
      setUser(user)
    })
    //By pressing the ESC key you can hide the details modal
    document.addEventListener('keydown', (event) => {

      let details = document.getElementById("detailsWrapper")    
        
      if (event.key === 'Escape') {
            details.style.display = "none"
            }
         });
//
    return( <div id="Home">
               <div id="headerWrapper">
                  <Link target={"_blank"} className="pokeLink" to="../party">
                     <div className="pokeball">
                        <div className="blackCircle"></div>
                     </div>                     
                     <p className="linkLabel">{ user } sets</p>
                  </Link>                     
                  <button id="logoutButton" onClick={ () => logout(setLoggedIn, navigate) }>
                     <FontAwesomeIcon icon={faRightFromBracket } />  Logout
                  </button>
               </div>
               <div id="searchWrapper">
                  <input type="text" placeholder="Enter pokemon name"  autoComplete="off"
                        id="pokemonName" onChange={(e) => setPokeName(e.target.value) }/>
                  <button onClick={ () => searchPokemon(setPokemon, pokeName, pokemon, axios) }
                          id="searchButton" >
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
               </div>
               <div className="pokeInfoWrapper">
                  <Loading />
                  <div id="pokemonInfo">                  
                     <img src={pokemon.image} className="pokemonSprite"/>                   
                     <p className="pokemonName">#{pokemon.id} { firstLetterCapital(pokemon.name)}</p>                  
                     <div id="catchAndDetails">
                        <button onClick={ () => catchPokemon(axios, pokemon.name, pokemon.image, user) } 
                                className="catchButton">
                           Catch
                        </button>
                        <button onClick={ () => { showDetails(pokemon[2], axios);
                                                  searchPokemon(setPokemon, pokeName, pokemon, axios) }}
                                className="detailsButton ">
                           Details
                        </button>
                     </div> 
                     <div className="pokemonSearchInput">
                        <input type="text" id="comment" placeholder="Leave your comment" autoComplete="off"/>
                        <button onClick={ () => submitComment(user, axios, pokemon.name) }
                                className="commentButton" >
                           Submit
                        </button>      
                     </div>           
                  </div>  
               </div>              
               { Object.keys(pokemon).length !== 0 ?
                  <div id="detailsWrapper">
                     <div id="details">
                           <button onClick={ hideDetails } className="hideDetails">
                              <FontAwesomeIcon icon={ faXmark } />
                           </button>
                           <div className="imageStatsWrapper">
                              <img src={pokemon.image} className="imageOnDetails"/>
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
                           pokemon.evolutions.map( item => <Link className="evolutionLinks" target={"_blank"} to={ "../" + item }>
                                                              <div className="evolutionLinksWrapper">
                                                                <p>{ firstLetterCapital(item) }</p>
                                                               </div>
                                                           </Link>) 
                                                            : null}
                           </div>
                           <p className="commentsTitle">Comments</p>
                           { pokemon.comments.map( item => <p className="commentsFetched">
                                                           <span className = "commentingUser">{ item.user } : </span>{ item.comment } 
                                                           </p>)}
                        </div>   
                     </div>
                     :
                      null
               }   
   </div>)}