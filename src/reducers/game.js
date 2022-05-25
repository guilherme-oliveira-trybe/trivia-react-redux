import { ADD_QUESTIONS, INVALID_TOKEN } from '../actions';

const INITIAL_STATE = {
  questions: [],
  invlidToken: false,
};

const gameReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      invlidToken: false,
    };
  case INVALID_TOKEN:
    return {
      ...state,
      invlidToken: true,
    };
  default:
    return state;
  }
};

export default gameReduce;
