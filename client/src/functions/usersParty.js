export const removeFromParty = (axios, user, pokemon, id) => {

    axios.delete("http://localhost:5000/pokemon/delete/" + user +'/'+ pokemon + '/' + id)
         .then( res => {
                           alert(res.data)
                           window.location.reload() 
                        })
}