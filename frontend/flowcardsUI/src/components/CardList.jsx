import React, { useState, useEffect } from 'react';
import Card from './Card/Card';
import { cards as cardsList, fetchCards, addCard } from '../stores/cards'
import { removeCard } from '../services/flow.service';
import { useStore } from 'nanostores/react';

export default function() {
  const list = useStore(cardsList);
  const [cards, setCards] = useState(list);

  const deleteCard = async (idx) => {
    await removeCard(cards[idx]);
  };

  useEffect(() => {
    setCards(list);
  }, [list]);
  
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="card-row">
      {cards && cards.map((card, idx) => {
        return <Card index={idx} {...card} onRemove={() => deleteCard(idx)} key={idx} />
      })}
    </div>
  );
}