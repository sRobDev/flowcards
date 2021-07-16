import React, { useState, useEffect } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  Text,
  Flex,
  FormControl,
  useToast
} from '@chakra-ui/react';
import Card from './Card/Card';
import { cards as cardList } from '../stores/cards';
import { useStore } from 'nanostores/react';
import { RewindIcon, ForwardIcon } from '../assets/icons';

export default function KnowledgeTestModal({isOpen, onClose}) {
  const toast = useToast();
  const cards = useStore(cardList);
  const [answer, setAnswer] = useState('');
  const [transition, setTransition] = useState(true);
  const [iterator, setIterator] = useState(0);
  const [card, setCard] = useState(null);

  const submitAnswer = () => {
    let parsedAnswer = parse(answer);
    let parsedCard = parse(card.content);

    if(parsedAnswer === parsedCard) { 
      console.log('Turbo: Correct!');
      toast({
        title: "Correct!",
        description: "You guessed it!",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      forward();
      setAnswer('');
    } else {
      toast({
        title: "Incorrect!",
        description: "Try again!",
        status: "warning",
        duration: 5000,
        isClosable: true
      })
    }
    
    function parse(str) {
      return str.toLowerCase().trim();
    }
  }

  const back = () => {
    setTransition(false);
    setIterator(curr => curr - 1);
  }

  const forward = () => {
    if(iterator + 1 >= cards.length) return;
    setIterator(curr => curr + 1);
  }

  useEffect(() => {
    setCard(cards[iterator]);
    setTransition(true);
  }, [iterator]); 

  useEffect(() => {
    if(cards.length) setCard(cards[0]);
  }, [cards]);

  return (
    <Modal returnFocusOnClose={false} blockScrollOnMount isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Test Your Knowledge 🧠</ModalHeader>
        <ModalBody pb={6}>
          <Text fontSize="sm" mb={4}>What's on the other side of this card? 🤔</Text>
          <Flex direction="column" align="center">
            <Flex w="100%" justify="center" align="center">
              <Button isDisabled={!iterator} onClick={back}><RewindIcon/></Button>
              <Card disableHover disableClick {...card}/>
              <Button isDisabled={iterator + 1 >= cards.length} onClick={forward}><ForwardIcon/></Button>
            </Flex>
            <FormControl mt={4}>
              <Flex>
                <Input variant="filled" size="lg" placeholder="Make your guess!" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
              </Flex>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button ml={4} colorScheme="blue" onClick={submitAnswer}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) 
}