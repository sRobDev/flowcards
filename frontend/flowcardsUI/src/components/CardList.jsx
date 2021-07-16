import React, { useState, useEffect } from 'react';
import { useStore } from 'nanostores/react';
import { user as storeUser } from '../stores/user';
import Card from './Card/Card';
import { cards as cardsList, fetchCards, setCards as setCardStore } from '../stores/cards'
import { removeCard, getUserCards } from '../services/flow.service';

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
    async function fetchData() {
      const userCards = await getUserCards();
      setCardStore(userCards);
    }
    fetchData();
  }, []);

  return (
    <div className="card-row">
      {cards && cards.map((card, idx) => {
        return <Card index={idx} {...card} onRemove={() => deleteCard(idx)} key={idx} />
      })}
    </div>
  );
}