export const getStoredAccessToken = () => localStorage.getItem('accessToken');

export const storeAccessToken = (accessToken) =>
  localStorage.setItem('accessToken', accessToken);

export const removeAccessToken = () => localStorage.removeItem('accessToken');

export const getStoredRefreshToken = () => localStorage.getItem('refreshToken');

export const storeRefreshToken = (refreshToken) =>
  localStorage.setItem('refreshToken', refreshToken);

export const removeRefreshToken = () => localStorage.removeItem('refreshToken');
