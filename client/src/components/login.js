import "../css/logIn.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from 'react';
import { serverHost } from "../variables/serverHost";

export const Login = ({setLoggedIn}) => {

    const [username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")

    let navigate = useNavigate()
    
    const logInUser = () => {

        const login = async () => {
            
            //The function to login to home page. we set the state accordingly.
            //Then we set also the local storage "logged in value" to remain the state
            //even if we refresh the page or close the window. Then we navigate to home page.
            //BTW setting state is asynchronous.
            await setLoggedIn(true);
            localStorage.setItem('logged-in', JSON.stringify(true));
            localStorage.setItem('username', JSON.stringify(username));
            navigate("../home", { replace: true} )
        }

        axios.post( serverHost + "log-in", {
                                            username: username,
                                            password: password
                                        })
             .then( res => {
                            res.data === "No such user" ? alert("Wrong credentials") :
                                                          login()
                          })
        }

    return(<div id="loginComponent">
                <h1 id="pokedexTitle">The Pokedex</h1>
                <div className="credentialsInputs">
                    <input type="text" autoComplete="off" placeholder="username" className="inputs"
                           onChange={ (e) => setUsername(e.target.value)}/>
                    <input type="password" autoComplete="off" placeholder="password" className="inputs" 
                           onChange={ (e) => setPassword(e.target.value)}/>
                    <button onClick={ logInUser } id="loginButton">Login</button>
                </div>
                <p id="notMember">Not a member? <Link to= "sign-up" target={"_blank"}>Sign up now</Link></p>                
            </div>)
}