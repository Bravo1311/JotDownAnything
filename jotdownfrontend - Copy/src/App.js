import React, { useState }from 'react';

import { UserContext } from './context/userContext';

import "bootstrap/dist/css/bootstrap.min.css"

import {BrowserRouter as Router, Routes, Route, link} from "react-router-dom"

import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

import firebase from "firebase/compat/app"
import "firebase/compat/auth"

import firebaseconfig from './Firebase/firebase';

import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import PageNotFound from './Pages/Pagenotfound'
import Todos from './Pages/Todos';
import Quotes from './Pages/Quotes';
import Notes from './Pages/Notes';

import Header from './Layout/Headers'


firebase.initializeApp(firebaseconfig)

const App = () => {
  const [user, setUser] = useState(null)
  return (
    <>
    <Router>
      <ToastContainer/>
      <UserContext.Provider value = {{user, setUser}}>
        <Header/>
        <Routes>
          <Route exact path = "/" element = {<Home/>}>
            <Route exact path = "/todos" element = {<Todos/>}/>
            <Route exact path = "/quotes" element = {<Quotes/>}/>
            <Route exact path = "/notes" element = {<Notes/>}/>
          </Route>
          <Route exact path = "/signin" element = {<SignIn/>}/>
          <Route exact path = "/signup" element = {<SignUp/>}/>
          <Route exact path = "*" element  = {<PageNotFound/>}/>     
          
        </Routes>
        {/* <Footer/> */}
      </UserContext.Provider>
      </Router>
    </>
  );
}

export default App
