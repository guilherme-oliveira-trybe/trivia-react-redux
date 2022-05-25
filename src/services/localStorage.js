export const tokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const infoPlayerToLocalStorage = (player) => {
  localStorage.setItem('ranking', JSON.stringify(player));
};
