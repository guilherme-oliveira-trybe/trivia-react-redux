import React from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import './Feedback.css';
import { BiBarChartAlt2, BiUndo } from 'react-icons/bi';
import Header from '../components/Header';
import { newPlayer, resetAmount } from '../actions';
import successTrack from '../asserts/sounds/success.ogg';
import { feedbackType } from '../types';

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
    dispatch(resetAmount());
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
    const { score, statusAcertos, picture } = this.props;
    return (
      <div>
        <Header />
        <div className="feedback">
          <div className="feedback-message">
            <img
              className="feedback-play-image"
              data-testid="header-profile-picture"
              src={ picture }
              alt="Imagem do Jogador"
            />
            <strong data-testid="feedback-text">{messageFeedaback}</strong>
            <strong>
              <span>You got </span>
              <span data-testid="feedback-total-question">{ statusAcertos }</span>
              <span> questions right</span>
            </strong>
            <p>
              <span>Score </span>
              <span data-testid="feedback-total-score">{ score }</span>
              <span>pts</span>
            </p>
          </div>
          <div className="buttons-content">
            <button
              type="button"
              className="feedback-btn-play-again"
              data-testid="btn-play-again"
              onClick={ this.playAgain }
            >
              <BiUndo />
              Play Again
            </button>
            <button
              type="button"
              className="feedback-btn-ranking"
              data-testid="btn-ranking"
              onClick={ this.goToRanking }
            >
              <BiBarChartAlt2 />
              Ranking
            </button>
          </div>
        </div>
        <Sound
          url={ successTrack }
          playStatus="PLAYING"
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  feedbackType,
}.isRequired;

const mapStateToProps = (state) => ({
  statusAcertos: state.player.assertions,
  score: state.player.score,
  picture: state.player.picture,
});

export default connect(mapStateToProps)(Feedback);
