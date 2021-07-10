import React, { useState } from 'react';
import { removeCard } from '../../services/flow.service';
import { 
  DeleteIcon,
  EditIcon
} from '../../assets/icons';
import {
  container,
  body,
  controls
} from './card.module.scss';
export default function Card({title, content, topic, onRemove}) {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className={container}>
      <div className={body} onClick={() => setShowContent(!showContent)}>
        {showContent ? content : title}
      </div>

      <div className={controls}>
        <button onClick={onRemove}><DeleteIcon/></button>
        <button><EditIcon/></button>
      </div>
    </div>
  )
}