import { TIMER, DISABLED } from '../actions';

const INITIAL_STATE = {
  timer: '',
  disabled: false,
};

const timerReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER:
    return {
      ...state,
      timer: action.payload,
    };
  case DISABLED:
    return {
      ...state,
      disabled: action.payload,
    };
  default:
    return state;
  }
};

export default timerReduce;
