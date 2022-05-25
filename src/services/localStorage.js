export const tokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const infoPlayerToLocalStorage = (player) => {
  if (JSON.parse(localStorage.getItem('ranking'))) {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify([...ranking, player]));
  } else {
    localStorage.setItem('ranking', JSON.stringify([player]));
  }
};
