import React, { useState } from 'react';
import { 
  DeleteIcon,
  EditIcon
} from '../../assets/icons';
import {
  container,
  body,
  controls
} from './card.module.scss';

import {
  useDisclosure
} from '@chakra-ui/react';

import EditCardModal from '../EditCardModal';

export default function Card({title, content, _id: id, topic, onRemove}) {
  const [showContent, setShowContent] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <div className={container}>
      <div className={body} onClick={() => setShowContent(!showContent)}>
        {showContent ? content : title}
      </div>

      <div className={controls}>
        <button onClick={onRemove}><DeleteIcon/></button>
        <button onClick={onOpen}><EditIcon/></button>
      </div>

      <EditCardModal title={title} content={content} id={id} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}