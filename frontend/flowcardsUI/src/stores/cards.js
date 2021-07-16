import { createStore, getValue } from 'nanostores';
import { getUserCards } from '../services/flow.service';
export const cards = createStore(async () => {
  cards.set([]);
});

export async function fetchCards() {
  let res = await getUserCards();
  if(res) cards.set(res);
}

export function setCards(data) {  
  cards.set(data);
}

export function addCard(data) {
  cards.set([...getValue(cards), data]);
}

export function modifyCard(data, idx) {
  let temp = getValue(cards);
  temp[idx] = data;
  cards.set([...temp]);
}