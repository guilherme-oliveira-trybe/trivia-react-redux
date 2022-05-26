import { TIMER, DISABLED, NEXT_BUTTON } from '../actions';

const INITIAL_STATE = {
  timer: 30,
  disabled: false,
  nextButton: false,
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
  case NEXT_BUTTON:
    return {
      ...state,
      nextButton: action.payload,
    };
  default:
    return state;
  }
};

export default timerReduce;
