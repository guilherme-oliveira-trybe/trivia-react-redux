import { ADD_AMOUNT, RESET_AMOUNT } from '../actions';

const INITIAL_STATE = {
  amount: 1,
};

const amountQuestionsReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_AMOUNT:
    return {
      amount: state.amount + 1,
    };
  case RESET_AMOUNT:
    return {
      amount: 1,
    };
  default:
    return state;
  }
};

export default amountQuestionsReduce;
