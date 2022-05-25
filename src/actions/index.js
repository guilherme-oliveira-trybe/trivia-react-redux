export const PLAYER = 'PLAYER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const TIMER = 'TIMER';
export const DISABLED = 'DISABLED';

export const player = (value) => ({
  type: PLAYER,
  value,
});

export const timer = (payload) => ({
  type: TIMER,
  payload,
});

export const disabled = (payload) => ({
  type: DISABLED,
  payload,
});
