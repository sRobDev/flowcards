import React, { useState } from 'react';
import {
  saveCard
} from '../services/flow.service';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

export default function EditCardModal({title, content, id, isOpen, onClose}) {
  const [cardTitle, setCardTitle] = useState(title || '');
  const [cardContent, setCardContent] = useState(content || '');

  const handleSave = async () => {
    await saveCard({
      id: id || null,
      title: cardTitle,
      content: cardContent
    });
    handleClose();
  }

  const handleClose = () => {
    onClose();
    setCardTitle('');
    setCardContent('');
  }

  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button ml={3} colorScheme="blue" onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}