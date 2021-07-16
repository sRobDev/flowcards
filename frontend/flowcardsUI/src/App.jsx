import React, { useState } from 'react'
import jwt_decode from 'jwt-decode';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import CardList from './components/CardList';
import AddCardButton from './components/AddCardButton/AddCardButton';
import LoginModal from './components/LoginModal';
import { saveCard } from './services/flow.service';
import { isAuthenticated } from './services/auth.service';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const saveNewCard = async (data) => await saveCard(data);

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={ ({ location }) => {
      return isAuthenticated() ? children : <Redirect to={{ pathname: '/login', state: { from: location }}}/>
    }}/>
  )
}

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <>
          <LoginModal isOpen={true} onClose={() => {}}/>
        </>
      </Route>
      <PrivateRoute exact path="/">
        <>
          <Navbar />
          <CardList />
          <AddCardButton onSave={(data) => saveNewCard(data)}/>
        </>
      </PrivateRoute>
    </Switch>
  )
}


function App() {
  return (
    <Router>
      <div className="App">
        <Routes />
        {/* {content} The components from the routes declared above will be rendered here */}
      </div>
    </Router>
  )
}

export default App
