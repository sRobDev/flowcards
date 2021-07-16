import React, { useState } from 'react'
import jwt_decode from 'jwt-decode';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import CardList from './components/CardList';
import AddCardButton from './components/AddCardButton/AddCardButton';
import LoginModal from './components/LoginModal';
import { saveCard } from './services/flow.service';
import { useRoutes } from '@patched/hookrouter';

const saveNewCard = async (data) => await saveCard(data);

// New routes can be declared here, with the components they point to
const routes = {
  '/': () => (
    <>
      <CardList />
      <AddCardButton onSave={(data) => saveNewCard(data)}/>
    </>
  ),
  '/cards': () => (
    <>
      <CardList />
      <AddCardButton onSave={(data) => saveNewCard(data)}/>
    </>
  )
};


function App() {
  const content = useRoutes(routes);
  const token = localStorage.getItem('fc_jwt');
  const [isOpen, setIsOpen] = useState(!token);
  
  const onClose = () => setIsOpen(false);

  if(token) localStorage.setItem('fc_ud', JSON.stringify(jwt_decode(token).user));

  return (
    <div className="App">
      <Navbar />
      <LoginModal isOpen={isOpen} onClose={onClose} />
      {content} {/* The components from the routes declared above will be rendered here */}
    </div>
  )
}

export default App
