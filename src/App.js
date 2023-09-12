import { FirebaseConfig } from "./config/Config"
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"

import { Header } from "./components/Header"
import './App.css'
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { Contact } from "./pages/Contact"
import { Signup } from "./pages/Signup"

function App() {
  const FBapp = initializeApp(FirebaseConfig)
  const FBauth = getAuth()
  // navigation array
  const NavItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact"},
    { label: "Create Account", link: "/signup" },
    { label: "Log in", link: "/signin"}
  ]
  // navigation for authenticated user
  
  const AuthNavItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact"},
    { label: "Log out", link: "/signout"}
  ]

  // application states
  const [ nav, setNav ] = useState( NavItems )

  const saySomething = ( word ) => {
    alert( word )
  }
  // signing up a user
  const signUp = ( email, password ) => {
    createUserWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => {
      // do something
    })
    .catch( (error) => console.log(error.message) )
  }

  return (
    <div className="App">
      <Header items={nav} />
      <Routes>
        <Route path="/" element={ <Home greeting="Hey you're at home!" /> } />
        <Route path="/about" element={ <About greeting="Hey you, this is about page!" handler={saySomething} /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/signup" element={ <Signup handler={signUp}/> } />
      </Routes>
    </div>
  );
}

export default App;
