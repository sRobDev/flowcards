import { createStore, createPersistent, getValue } from 'nanostores';

export const user = createPersistent({}, 'fc_');

export function setUser(data) {
  console.log('Turbo Console Log: setUser -> data', data);
  user.set(data);
  console.log(getValue(user));
}