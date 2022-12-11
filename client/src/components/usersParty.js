import { useEffect, useState } from "react"
import "../css/usersParty.css"
import axios from "axios"
import { firstLetterCapital } from "../functions/home"
import { Link } from "react-router-dom";
import { removeFromParty } from "../functions/usersParty";

export const UsersParty = () => {   
    
    const [pokemonParties, setPokemonParties ] = useState([])
    const [ user, setUser ] = useState("")

    useEffect(() => {

        let user = JSON.parse(localStorage.getItem('username'))

        axios.get("http://localhost:5000/pokemon/pokemon-sets/" + user)
             .then( res => {     
                            setUser(user) 
                            console.log(res.data)                     
                            setPokemonParties(res.data)
                           })
    }, [])

    return(<div>
              <p className="userPartyTitle">{ user }</p>
             <div id="pokemonSets">
             {pokemonParties.map((element, index ) => 
                                          <div className="pokemonSet">
                                            <p className="setIndex">Set No{ index + 1}</p>
                                            { element.map(item => 
                                               <div className="pokemonInParty">
                                                <img src={ item.image } className="pokemonPartyImage" />
                                                <p className="pokemonPartyName">{ firstLetterCapital(item.pokemon)}</p>
                                                <div className="detailsAndRemove">
                                                  <Link className="linkOfdetails" target={"_blank"} to={ "../" + item.pokemon }>
                                                    Details
                                                  </Link>
                                                  <button className="removeFromParty"
                                                          onClick={ () => removeFromParty(axios, item.user, item.pokemon, item.setNumber) }>
                                                            Remove 
                                                  </button>
                                                </div>
                                              </div>) }
                                          </div>)} 
             </div>            
           </div>)
}