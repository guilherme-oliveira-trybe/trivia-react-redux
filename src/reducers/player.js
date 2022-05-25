import { PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      name: action.value.name,
      gravatarEmail: action.value.email,
    };
  default:
    return state;
  }
};

export default playerReduce;
