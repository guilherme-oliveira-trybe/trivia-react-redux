import { CHANGE_SETTINGS, CHANGE_VOLUME } from '../actions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
  volume: 60,
};

const settingsReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_SETTINGS:
    return {
      ...state,
      category: action.payload.category,
      difficulty: action.payload.difficulty,
      type: action.payload.type,
    };
  case CHANGE_VOLUME:
    return {
      ...state,
      volume: action.payload,
    };
  default:
    return state;
  }
};

export default settingsReduce;
