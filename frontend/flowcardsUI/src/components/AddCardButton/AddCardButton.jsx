import React, { useState } from 'react';
import {
  CirclePlusIcon
} from '../../assets/icons';
import {
  container
} from './AddCardButton.module.scss';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  useDisclosure
} from '@chakra-ui/react';

export default function AddCardButton({
  onSave
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cardTitle, setCardTitle] = useState('');
  const [cardContent, setCardContent] = useState('');

  const handleClose = () => {
    onClose();
    clearInputs();
    setCardTitle('');
    setCardContent('');
  }

  return (
    <>
      <button className={container} onClick={onOpen}>
        <CirclePlusIcon />
        <span>Add Card</span>
      </button>

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={() => { setCardTitle(''); setCardContent(''); onClose()}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new card</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Card Title</FormLabel>
              <Input variant="outline" size="lg" placeholder="Card Title" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Card Content</FormLabel>
              <Input variant="outline" size="lg" placeholder="Card Content" value={cardContent} onChange={(e) => setCardContent(e.target.value)}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Cancel</Button>
            <Button ml={3} colorScheme="blue" onClick={() => { onSave({title: cardTitle, content: cardContent}); handleClose()}}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}