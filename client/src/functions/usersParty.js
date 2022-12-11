import { serverHost } from "../variables/serverHost"

//The function to delete a pokemon from the party
export const removeFromParty = (axios, user, pokemon, id) => {

    axios.delete( serverHost + "pokemon/delete/" + user +'/'+ pokemon + '/' + id)
         .then( res => {
                           alert(res.data)
                           window.location.reload() 
                        })
}