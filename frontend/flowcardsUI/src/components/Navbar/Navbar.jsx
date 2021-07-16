import React from 'react';
import {
  container
} from './styles.module.scss';
import { IconButton } from '@chakra-ui/react';
import { CirclePlusIcon, PlayIcon, LogOutIcon } from '../../assets/icons';
import { logout } from '../../services/flow.service';
import { useHistory } from 'react-router-dom';
import { Flex, Stack, Box, useDisclosure } from '@chakra-ui/react';
import EditCardModal from '../EditCardModal';
import KnowledgeTestModal from '../KnowledgeTestModal';
import { saveCard } from '../../services/flow.service';

export default function Navbar() {
  const { isOpen: isEditModalOpen, onOpen: openEditModal, onClose: onEditClose } = useDisclosure();
  const { isOpen: isQuizOpen, onOpen: openQuizModal, onClose: onQuizClose } = useDisclosure();
  const history = useHistory();
  const onClick = async () => {
    const res = await logout();
    if(res.success) history.push('/');
  }
  
  const saveNewCard = async (data) => await saveCard(data);

  return (
    <Flex as="nav" className={container}>
      <Flex w="100%" justify="space-between" align="space-between">
        <Stack direction="row">
          <IconButton colorScheme="blue" onClick={openQuizModal} icon={<PlayIcon />}></IconButton>
          <IconButton colorScheme="green" onClick={openEditModal} icon={<CirclePlusIcon />}></IconButton>
        </Stack>
        <Box>
          <IconButton colorScheme="red" onClick={onClick} icon={<LogOutIcon />}></IconButton>
        </Box>
      </Flex>

      <KnowledgeTestModal isOpen={isQuizOpen} onClose={onQuizClose}/>
      <EditCardModal onSave={saveNewCard} isOpen={isEditModalOpen} onClose={onEditClose} />
    </Flex>
  )
}