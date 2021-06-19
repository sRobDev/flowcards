import React, { useState } from 'react';
import {
  CirclePlusIcon
} from '../../assets/icons';
import {
  container
} from './AddCardButton.module.scss';

import Portal from '../Popup/Portal';
import CreateCard from '../CreateCard/CreateCard';

export default function AddCardButton({
  onClick
}) {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <>
      <button className={container} onClick={() => setShowCreate(true)}>
        <CirclePlusIcon />
        <span>Add Card</span>
      </button>
      {showCreate && <Portal><CreateCard /></Portal>}
    </>
  )
}