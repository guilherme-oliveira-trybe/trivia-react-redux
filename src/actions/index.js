export const PLAYER = 'PLAYER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const TIMER = 'TIMER';
export const DISABLED = 'DISABLED';
export const NEXT_BUTTON = 'NEXT_BUTTON';
export const UPDATE_SCORE_ASSERTIONS = 'UPDATE_SCORE_ASSERTIONS';
export const NEW_PLAYER = 'NEW_PLAYER';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';
export const ADD_AMOUNT = 'ADD_AMOUNT';
export const RESET_AMOUNT = ' RESET_AMOUNT';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';

export const player = (value) => ({
  type: PLAYER,
  value,
});

export const newPlayer = () => ({
  type: NEW_PLAYER,
});

export const timer = (payload) => ({
  type: TIMER,
  payload,
});

export const disabled = (payload) => ({
  type: DISABLED,
  payload,
});

export const disabledNextButton = (payload) => ({
  type: NEXT_BUTTON,
  payload,
});

export const updateScoreAssertions = (payload) => ({
  type: UPDATE_SCORE_ASSERTIONS,
  payload,
});

export const changeSettings = (payload) => ({
  type: CHANGE_SETTINGS,
  payload,
});

export const addAmount = () => ({
  type: ADD_AMOUNT,
});

export const resetAmount = () => ({
  type: RESET_AMOUNT,
});

export const changeMusicVolume = (payload) => ({
  type: CHANGE_VOLUME,
  payload,
});
