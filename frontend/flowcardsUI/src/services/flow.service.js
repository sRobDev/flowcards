import { api } from '../../config.json';

const {
  url,
  getAllCards: getAllCardsEndpoint,
  deleteCard,
} = api;

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

export { getAllCards, removeCard }