import React from 'react';
import { CirclePlusIcon } from '../../assets/icons';
import { container } from './AddCardButton.module.scss';
import EditCardModal from '../EditCardModal';
import { useDisclosure } from '@chakra-ui/react';

export default function AddCardButton({
  onSave
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button className={container} onClick={onOpen}>
        <CirclePlusIcon />
        <span>Add Card</span>
      </button>

      <EditCardModal onSave={onSave} isOpen={isOpen} onClose={onClose} />
    </>
  )
}