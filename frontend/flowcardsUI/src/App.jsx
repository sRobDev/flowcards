import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import CardList from './components/CardList';
import LoginModal from './components/LoginModal';
import { isAuthenticated } from './services/auth.service';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

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
      </div>
    </Router>
  )
}

export default App
