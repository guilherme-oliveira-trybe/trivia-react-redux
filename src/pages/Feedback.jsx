import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { newPlayer } from '../actions';

class Feedback extends React.Component {
  constructor() {
    super();

    this.verifyStatusAcertos = this.verifyStatusAcertos.bind(this);
    this.stateMessage = this.stateMessage.bind(this);

    this.state = {
      messageFeedaback: '',
    };
  }

  componentDidMount() {
    this.verifyStatusAcertos();
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(newPlayer());
    history.push('/');
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  stateMessage(message) {
    this.setState({
      messageFeedaback: message,
    });
  }

  verifyStatusAcertos() {
    const { statusAcertos } = this.props;
    const QUANTITY_ACERTOS = 3;
    if (statusAcertos < QUANTITY_ACERTOS) {
      return this.stateMessage('Could be better...');
    }
    return this.stateMessage('Well Done!');
  }

  render() {
    const { messageFeedaback } = this.state;
    const { score, statusAcertos } = this.props;
    return (
      <div>
        <Header />
        <strong data-testid="feedback-text">{messageFeedaback}</strong>
        <strong data-testid="feedback-total-score">{ score }</strong>
        <strong data-testid="feedback-total-question">{ statusAcertos }</strong>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  statusAcertos: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  statusAcertos: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
