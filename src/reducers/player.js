// import { player } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const playerReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default playerReduce;
