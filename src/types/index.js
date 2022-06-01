import {
  bool,
  number,
  objectOf,
  shape,
  string,
  func,
} from 'prop-types';

export const historyType = {
  history: shape({
    push: func,
  }),
  dispatch: func,
};

export const gameType = shape({
  historyType,
  responseTime: number,
  disabled: bool,
  nextButton: bool,
  player: objectOf(shape({
    name: string,
    score: number,
    picture: string,
  })),
  settings: objectOf(shape({
    volume: number,
  })),
});

export const feedbackType = shape({
  historyType,
  statusAcertos: number,
  score: number,
  picture: string,
});
