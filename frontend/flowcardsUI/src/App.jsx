import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import CardList from './components/CardList';
import AddCardButton from './components/AddCardButton/AddCardButton';
import { saveCard } from './services/flow.service';
import { useRoutes } from '@patched/hookrouter';
import { cookieName } from '../config.json';
import { createUser } from './services/flow.service';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from './stores/user';
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

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

const CookieDialog = ({isOpen, onClose, saveUser}) => {
  const [name, setName] = useState('');
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to Flowcards!</ModalHeader>
        <ModalBody pb={6}>
          <Stack spacing={3}>
            <Text fontSize="lg">Hey there!</Text>
            <Text fontSize="lg">
              Due to time constraints, we weren't able to implement authentication (yet!). So instead, we'd like to just store a simple cookie in your browser so we can identify you and get your cards. If this is okay, please enter your name and hit "Okay!" - otherwise, check back in soon for when we have a full auth flow built 😁
            </Text>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input variant="solid" size="lg" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button ml={3} colorScheme="blue" onClick={() => { saveUser(name); onClose(); }}>Okay!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function App() {
  const content = useRoutes(routes);
  const cookie = document.cookie.split('; ').filter(cookie => cookie.includes('_fcid')).length;
  const [isOpen, setIsOpen] = useState(!cookie);
  
  const onClose = () => setIsOpen(false);

  const saveUser = (name) => {
    let uuid = uuidv4();
    document.cookie = cookieName + '=' + uuid;
    createUser({name, uuid});
    setUser(uuid);
  }

  return (
    <div className="App">
      <Navbar />
      <CookieDialog isOpen={isOpen} onClose={onClose} saveUser={saveUser} />
      {content} {/* The components from the routes declared above will be rendered here */}
    </div>
  )
}

export default App
