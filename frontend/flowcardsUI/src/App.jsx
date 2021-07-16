import React, { useState } from 'react'
import jwt_decode from 'jwt-decode';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import CardList from './components/CardList';
import AddCardButton from './components/AddCardButton/AddCardButton';
import LoginModal from './components/LoginModal';
import { saveCard } from './services/flow.service';
// import { useRoutes, navigate } from '@patched/hookrouter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";

const saveNewCard = async (data) => await saveCard(data);

// New routes can be declared here, with the components they point to
// const routes = {
//   '/': () => (
    // <>
    //   <AddCardButton onSave={(data) => saveNewCard(data)}/>
    // </>
//   ),
//   '/cards': () => (
    // <>
    //   <CardList />
    //   <AddCardButton onSave={(data) => saveNewCard(data)}/>
    // </>
//   )
// };

const Routes = ({token}) => {
  return (
    <Switch>
      <Route exact path="/">
        <>
          <AddCardButton onSave={(data) => saveNewCard(data)}/>
          {token && <Redirect to={{pathname: '/cards'}} />}
        </>
      </Route>
      <Route exact path="/cards">
        <>
          <CardList />
          <AddCardButton onSave={(data) => saveNewCard(data)}/>
        </>
      </Route>
    </Switch>
  )
}


function App() {
  const token = localStorage.getItem('fc_jwt');
  const [isOpen, setIsOpen] = useState(!token);
  
  const onClose = () => setIsOpen(false);

  if(token) {
    let user = jwt_decode(token).user;
    localStorage.setItem('fc_ud', JSON.stringify(user));
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <LoginModal isOpen={isOpen} onClose={onClose}/>
        <Routes token={token}/>
        {/* {content} The components from the routes declared above will be rendered here */}
      </div>
    </Router>
    
  )
}

export default App
