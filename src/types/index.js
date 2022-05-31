import {
  bool,
  number,
  objectOf,
  shape,
  string,
  func,
} from 'prop-types';

const gameType = shape({
  dispatch: func,
  history: shape({
    push: func,
  }),
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

export default gameType;
