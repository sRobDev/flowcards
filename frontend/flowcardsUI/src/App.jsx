import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Card from './components/Card/Card';
import AddCardButton from './components/AddCardButton/AddCardButton';
import { removeCard, getAllCards } from './services/flow.service';

function App() {
  const [cards, setCards] = useState(null);

  const deleteCard = async (idx) => {
    await removeCard(cards[idx]);
    fetchCards();
  };

  const fetchCards = async () => setCards(await getAllCards());
  
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="card-row">
        {cards && cards.map((card, idx) => {
          return <Card {...card} onRemove={() => deleteCard(idx)} key={idx} />
        })}
      </div>

      <AddCardButton />
    </div>
  )
}

export default App
