import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';
import settings from './settings';
import amountQuestions from './amountQuestions';

const rootReducer = combineReducers({
  player,
  timer,
  settings,
  amountQuestions,
});

export default rootReducer;
