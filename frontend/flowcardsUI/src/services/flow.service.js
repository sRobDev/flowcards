import { api } from '../../config.json';

const {
  url,
  getAllCards: getAllCardsEndpoint,
  createCard,
  deleteCard,
} = api;

function saveCard(data) {
  try {
    return fetch(url + createCard, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
     }).then(res => res.json()).then(card => card);
  } catch (error) {
    console.error(error);
  }
}

function getAllCards() {
  try {
    return fetch(url + getAllCardsEndpoint).then(res => res.json()).then(data => data);
  } catch (e) {
    console.error(e);
  }
}

function removeCard({ _id }) {
  try {
    return fetch(url + deleteCard + _id, { method: 'POST' }).then(res => res.json()).then(data => data);
  } catch (error) {
    console.error(error);
  }
}

export { getAllCards, removeCard, saveCard }