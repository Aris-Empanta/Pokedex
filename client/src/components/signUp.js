import "../css/signUp.css"
import axios from "axios"
import { useState } from 'react';

export const SignUp = () => {

    const [username, setUsername ] = useState("")
    const [password, setPassword ] = useState("")
    const [confirmPassword, setConfirmPassword ] = useState("")
    
    const signUpUser = () => {

        if(confirmPassword === password) {

                axios.post("http://localhost:5000/sign-up", {
                                                            username: username,
                                                            password: password
                                                            })
                    .then( res => alert(res.data))
            } else {
                alert("Passwords don't match!")
            }
        }

    return(<div id="signUp">
             <h1 id="signUpTitle">Sign up</h1>   
             <div className="credentialsInputs">
                <input type="text" placeholder="username" className="inputs" autoComplete="off"
                       onChange={ (e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="password" className="inputs" autoComplete="off"
                       onChange={ (e) => setPassword(e.target.value)} />  
                <input type="password" placeholder="confirm password" className="inputs" autoComplete="off"
                       onChange={ (e) => setConfirmPassword(e.target.value)} />  
                <button id="signUpButton" onClick={ signUpUser } >Sign up</button> 
             </div>
            </div>)
}