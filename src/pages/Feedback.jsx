import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.verifyStatusAcertos = this.verifyStatusAcertos.bind(this);
    this.stateMessage = this.stateMessage.bind(this);

    this.state = {
      statusAcertos: 3,
      messageFeedaback: '',
    };
  }

  componentDidMount() {
    this.verifyStatusAcertos();
  }

  playAgain = () => {
    const { history } = this.props;
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
    const { statusAcertos } = this.state;
    const QUANTITY_ACERTOS = 3;
    if (statusAcertos >= 0 || statusAcertos < QUANTITY_ACERTOS) {
      return this.stateMessage('Could be better...');
    }
    return this.stateMessage('Well Done!');
  }

  render() {
    const { messageFeedaback } = this.state;
    return (
      <div>
        <Header />
        <strong data-testid="feedback-text">{messageFeedaback}</strong>
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
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
