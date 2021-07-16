import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import {
  container
} from './styles.module.scss';
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

export default function Navbar() {
  return (
    <div className={container}>
      <SearchBox />
      <Button>Login</Button>
    </div>
  )
}