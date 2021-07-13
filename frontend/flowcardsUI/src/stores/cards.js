import { createStore, getValue } from 'nanostores';
import { getAllCards } from '../services/flow.service';
export const cards = createStore(async () => {
  cards.set([]);
  // let res = await getAllCards();
  // if(res.length) cards.set(res);  
  // else cards.set([]);
  // return () => {};
});

export async function fetchCards() {
  let res = await getAllCards();
  if(res.length) cards.set(res);
}

export function addCard(data) {
  cards.set([...getValue(cards), data]);
}

export function modifyCard(data, idx) {
  let temp = getValue(cards);
  temp[idx] = data;
  cards.set([...temp]);
}