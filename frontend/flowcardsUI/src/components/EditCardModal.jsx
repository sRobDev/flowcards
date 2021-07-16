import React, { useState } from 'react';
import {
  saveCard,
  updateCard
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

export default function EditCardModal({title, content, id, isOpen, onClose, index}) {
  const [cardTitle, setCardTitle] = useState(title || '');
  const [cardContent, setCardContent] = useState(content || '');

  const handleSave = async () => {
    let payload = {
      title: cardTitle,
      content: cardContent
    }
    if(id) {
      await updateCard({
        id: id,
        ...payload
      }, index);
      onClose();
    } else {
      await saveCard(payload);
      clearContent();
    }
  }

  const clearContent = () => {
    onClose();
    setCardTitle('');
    setCardContent('');
  }

  return (
    <Modal returnFocusOnClose={false} blockScrollOnMount isOpen={isOpen} onClose={onClose} isCentered>
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