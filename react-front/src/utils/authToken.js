export const getStoredTokens = () => JSON.parse(localStorage.getItem('tokens'));

export const storeToken = (tokens) =>
  localStorage.setItem('tokens', JSON.stringify(tokens));

export const removeToken = () => localStorage.removeItem('tokens');

export const getStoredUser = () => JSON.parse(localStorage.getItem('user'));

export const storeUser = (user) =>
  localStorage.setItem('user', JSON.stringify(user));

export const removeUser = () => localStorage.removeItem('user');
