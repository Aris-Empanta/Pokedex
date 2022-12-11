import './App.css';
import {Route,  Routes} from 'react-router-dom';
import { Login } from "./components/login"
import { SignUp } from "./components/signUp"
import { Home } from "./components/home"
import { useEffect, useState } from 'react';
import { DynamicPokemon } from "./components/dynamicPokemon"
import { UsersParty } from "./components/usersParty"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    
    //We grab the value of the logged-in state saved in the local storage,
    //and if there is a status saved, we set our state accordingly
    let loggedStatus = JSON.parse(localStorage.getItem('logged-in'))
    if (localStorage.length > 0) setLoggedIn(loggedStatus)
  }, [setLoggedIn])

  return (
    <div>
      <Routes>
        <Route path="" exact element={loggedIn === false? <Login setLoggedIn={setLoggedIn}/>: <Home  setLoggedIn={setLoggedIn} />}/>
        <Route path="sign-up" element={<SignUp />}/>
        <Route path="home" element= {loggedIn === false? <Login setLoggedIn={setLoggedIn}/>: <Home  setLoggedIn={setLoggedIn} />}/>
        <Route path=":pokemon" element={loggedIn === false? <Login setLoggedIn={setLoggedIn}/> :<DynamicPokemon />} />
        <Route path="party" element= {loggedIn === false? <Login setLoggedIn={setLoggedIn}/>: <UsersParty />}/>
      </Routes>
    </div>
  );
}

export default App;
