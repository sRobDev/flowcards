import { createPersistent } from 'nanostores';

export const user = createPersistent({}, 'fc_');

export function setUser(data) {
  user.set(data);
}