import React, { useState, useEffect } from 'react';
import { useStore } from 'nanostores/react';
import Card from './Card/Card';
import { cards as cardsList, fetchCards, setCards as setCardStore } from '../stores/cards'
import { removeCard, getUserCards } from '../services/flow.service';
import { Flex } from '@chakra-ui/react';

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
    <Flex 
      direction={{ base: 'column', md: 'row'}}
      align={{ base: 'center', md: 'flex-start'}}
      wrap={{ base: 'nowrap', md: 'wrap'}}
      justify={{ base: 'center', md: 'flex-start'}}>
      {cards && cards.map((card, idx) => {
        return <Card controls index={idx} {...card} onRemove={() => deleteCard(idx)} key={idx} />
      })}
    </Flex>
  );
}