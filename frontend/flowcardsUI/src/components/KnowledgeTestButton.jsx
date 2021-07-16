import React from 'react';
// import { CirclePlusIcon } from '../../assets/icons';
import { knowledge } from './components.module.scss';
import KnowledgeTestModal from './KnowledgeTestModal';
import { useDisclosure, Text } from '@chakra-ui/react';

export default function KnowledgeTestButton({
  onSave
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button className={knowledge} onClick={onOpen}>
        <Text fontSize="xlg">🧠</Text>
      </button>

      <KnowledgeTestModal onSave={onSave} isOpen={isOpen} onClose={onClose} />
    </>
  )
}