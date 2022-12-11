//The function to search a pokemon
export const searchPokemon = (setPokemon, pokeName, pokemon, axios) => {
           
           const pokemonInfo = document.getElementById("pokemonInfo")
           const loading = document.getElementById("loading")

           pokemonInfo.style.display = "none"
           loading.style.display = "initial"

           let endpoints = ["http://localhost:5000/pokemon/" + pokeName, 
                            "http://localhost:5000/pokemon/comments/" + pokeName]

            axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                (res) => { 
                           loading.style.display = "none"
                           let pokemonData = {}

                            pokemonData.image = res[0].data.image
                            pokemonData.id = res[0].data.id
                            pokemonData.name = res[0].data.name
                            pokemonData.height = res[0].data.height
                            pokemonData.weight = res[0].data.weight
                            pokemonData.types = res[0].data.types 
                            pokemonData.evolutions = res[0].data.evolutions
                            pokemonData.comments = res[1].data
                            
                            const handleNotFound = () => {

                              alert(res[0].data)
                              
                              pokemonInfo.style.display = "none"
                            }

                            res[0].data === "Pokemon not found"?  handleNotFound() :
                                                                 pokemonInfo.style.display = "flex"

                            setPokemon(pokemonData)
                         }
                        
                ).catch(e => console.log(e))         
        }

//The function to logout a user
export const logout = async (setLoggedIn, navigate ) => {
       
    //We set the logged-in state in local storage and in parent
    //component state as false, and we navigate to the login route. 
    await setLoggedIn(false)
    localStorage.setItem('logged-in', JSON.stringify(false));
    localStorage.setItem('username', JSON.stringify(""));
    navigate("/", { replace: true} )

 }

//The function to show the modal of the pokemon details
export const showDetails = (pokemon, axios) => {

    let details = document.getElementById("detailsWrapper")    

    details.style.display = "flex"
    
    axios.get("http://localhost:5000/pokemon/" + pokemon)
         .then((res) => {
                            console.log(res.data)
                         
                         })
  }

//The function to hide the pokemon details modal  
export  const hideDetails = () => {

    let details = document.getElementById("detailsWrapper")

    details.style.display = "none"
  }

//The function to submit a comment  
export const submitComment = (user, axios, name) => {

    let comment = document.getElementById("comment").value

    let data = {
                 user: user,
                 pokemon: name,
                 comment: comment   
                }
    
    axios.post("http://localhost:5000/pokemon/comments", data)
         .then( res => { alert(res.data) 
                          } )       
         .catch( err => console.log(err))     
   //We clear the input
   document.getElementById("comment").value = ''
}

//The function to add a pokemon in your team
export const catchPokemon = (axios, pokemon, image, user) => {

    let data = { 
                 pokemon: pokemon, 
                 user: user,
                 image: image 
                }

    axios.post("http://localhost:5000/pokemon/catch/", data)
         .then( res => console.log(res.data))
}

//The function to make the first letter capital
export const firstLetterCapital = (name) => {
    

  if(name)  return name.split("")
                .map( (item, index) => index === 0 ? item.toUpperCase() : item )
                .join('')
}