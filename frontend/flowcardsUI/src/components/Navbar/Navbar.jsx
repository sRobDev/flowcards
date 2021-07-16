import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import {
  container
} from './styles.module.scss';
import { Button } from '@chakra-ui/react';
import { logout } from '../../services/flow.service';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  const history = useHistory();
  const onClick = async () => {
    const res = await logout();
    if(res.success) history.push('/');
  }
  
  return (
    <div className={container}>
      <SearchBox />
      <Button onClick={onClick}>Log Out</Button>
    </div>
  )
}