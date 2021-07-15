import { createStore, getValue } from 'nanostores';

export const user = createStore(() => {
  user.set('');
});

export function setUser(uuid) {
  user.set(uuid);
}