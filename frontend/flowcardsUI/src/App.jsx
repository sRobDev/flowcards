import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import CardList from './components/CardList';
import AddCardButton from './components/AddCardButton/AddCardButton';
import { saveCard } from './services/flow.service';

function App() {
  const saveNewCard = async (data) => await saveCard(data);

  return (
    <div className="App">
      <Navbar />
      <CardList />
      <AddCardButton onSave={(data) => saveNewCard(data)}/>
    </div>
  )
}

export default App
