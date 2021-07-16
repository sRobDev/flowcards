import React, { useState } from 'react';
import { 
  DeleteIcon,
  EditIcon
} from '../../assets/icons';
import {
  container,
  body,
  controls,
  hover
} from './card.module.scss';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';

import {
  useDisclosure,
  Box
} from '@chakra-ui/react';

import EditCardModal from '../EditCardModal';

const MotionBox = motion(Box);

export default function Card({title, content, _id: id, topic, onRemove, index, controls: hasControls, disableHover, disableClick}) {
  const [showContent, setShowContent] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleClick = () => {
    if(!disableClick) setShowContent(!showContent);
  }

  return (
    <AnimateSharedLayout type="crossfade">
      <MotionBox 
        layout
        minW="10rem"
        minH="10rem"
        w="100%"
        className={`${container} ${disableHover ? '' : hover}`}>
        <div className={body} onClick={handleClick}>
          {showContent ? content : title}
        </div>

        { hasControls && (
          <div className={controls}>
            <button onClick={onRemove}><DeleteIcon/></button>
            <button onClick={onOpen}><EditIcon/></button>
          </div>
        )}
      </MotionBox>
      <AnimatePresence>
        <EditCardModal layout title={title} content={content} id={id} isOpen={isOpen} onClose={onClose} index={index}/>
      </AnimatePresence>
    </AnimateSharedLayout>
    
  )
}