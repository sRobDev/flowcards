import { api } from '../../config.json';
import { fetchCards, addCard, modifyCard } from '../stores/cards';

const {
  url,
  getAllCardsApi,
  updateCardApi,
  createCardApi,
  deleteCardApi,
} = api;

function saveCard(data) {  
  try {
    return fetch(url + createCardApi, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
     }).then(res => res.json()).then(card => fetchCards());
  } catch (error) {
    console.error(error);
  }
}

function updateCard(data, index) {
  try {
    return fetch(url + updateCardApi + data.id, { 
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
     }).then(res => res.json()).then(card => fetchCards());
  } catch (error) {
    console.error(error);
  }
}

function getAllCards() {
  try {
    return fetch(url + getAllCardsApi).then(res => res.json()).then(data => data);
  } catch (e) {
    console.error(e);
  }
}

function removeCard({ _id }) {
  try {
    return fetch(url + deleteCardApi + _id, { method: 'POST' }).then(res => res.json()).then(data => fetchCards());
  } catch (error) {
    console.error(error);
  }
}

export { getAllCards, removeCard, saveCard, updateCard }