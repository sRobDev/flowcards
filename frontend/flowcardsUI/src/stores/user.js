import { createStore, getValue } from 'nanostores';

export const user = createStore(() => {
  user.set('');
});

export function setUser(data) {
  console.log('Turbo Console Log: setUser -> data', data);
  user.set(data);
}