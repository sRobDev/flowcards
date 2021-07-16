import React, { useState } from 'react';
import { register, login } from '../services/flow.service';
import { useHistory } from 'react-router-dom';
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
  Input,
  Link
} from '@chakra-ui/react';

export default function LoginModal({isOpen, onClose}) {
  const history = useHistory();
  const [newUser, setNewUser] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSave = async () => {
    const data = {email, password};
    if(newUser) {
      const { user } = await register(data);
      if(!user) return console.error('Unable to register!');
    }
    loginUser();
  }

  const loginUser = async () => {
    const { token, body: user } = await login({email, password});
    if(!token) return console.error('Login failed');
    localStorage.setItem('fc_jwt', token);
    localStorage.setItem('fc_ud', JSON.stringify(user));
    history.push('/cards');
  }
  
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to Flowcards!</ModalHeader>
        <ModalBody pb={6}>
          <Stack spacing={3}>
            <Text fontSize="xlg">Please {newUser ? 'register' : 'log in'}!</Text>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input variant="filled" size="lg" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input variant="filled" type="password" size="lg" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            { newUser ? (
              <Text fontSize="sm">Already have an account? Please <Link href="#" color="green" onClick={() => setNewUser(false)}>login!</Link></Text>
            ) : <Text fontSize="sm">Don't have an account? Please <Link href="#" color="blue" onClick={() => setNewUser(true)}>register!</Link></Text>}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button ml={3} colorScheme={newUser ? 'blue' : 'green'} onClick={() => { onSave(); onClose(); }}>{newUser ? 'Register' : 'Log in'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}