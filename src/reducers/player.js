import { PLAYER, UPDATE_SCORE_ASSERTIONS, NEW_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',
};

const playerReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      name: action.value.name,
      gravatarEmail: action.value.email,
      picture: action.value.picture,
    };
  case NEW_PLAYER:
    return {
      ...state,
      score: 0,
    };
  case UPDATE_SCORE_ASSERTIONS:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReduce;
