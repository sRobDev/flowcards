import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Card from './components/Card/Card';
import AddCardButton from './components/AddCardButton/AddCardButton';
import { removeCard } from './services/flow.service';
function App() {
  const [data, setData] = useState(null);
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [adding, setAdding] = useState(false);

  const deleteCard = (id) => {
    removeCard(id);
    fetchData();
  };

  const fetchData = async () => {
    const res = await (await fetch('http://localhost:3001/cards/all/1')).json();
    setData(res);
  }

  const submitNewCard = async (data) => {
    const res = await (await fetch('http://localhost:3001/card/new/1', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).json();

    fetchData();
  }

  const submitCard = () => {
    setAdding(false);
    submitNewCard({title: cardTitle, content: cardDescription});
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {/* Body */}
      <div className="card-row">
        {data && data.map((card, idx) => <Card {...card} onRemove={() => deleteCard(card.id)} key={idx} />)}
      </div>

      <AddCardButton />


      {/* {adding && (
        <div>
          <input placeholder="Enter Card Title" value={cardTitle} onChange={e => setCardTitle(e.target.value)} />
          <input placeholder="Enter Card Description" value={cardDescription} onChange={e => setCardDescription(e.target.value)} />
          <button onClick={() => submitCard()}>Submit</button>
        </div>
      )} */}
    </div>
  )
}

export default App
