import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import { fetchQuestions } from '../services/apiTrivia';
import './Game.css';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { infoPlayerToLocalStorage } from '../services/localStorage';
import { timer, disabled as diabledAction,
  disabledNextButton, updateScoreAssertions, addAmount } from '../actions';
import { gameType } from '../types';
import track01 from '../asserts/sounds/track-01.wav';
import timerOver from '../asserts/sounds/timer-over.wav';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      loading: true,
      correctClassName: '',
      incorrectClassName: '',
      questions: [],
      mixedAnswers: [],
      stopTimer: false,
      mountedTimer: true,
      incorrectAnswers: [],
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI = async () => {
    const { history, settings } = this.props;
    const token = localStorage.getItem('token');
    try {
      const questions = await fetchQuestions(token, settings);
      this.getIncorretAnswer(questions);
      const number = 3;
      if (questions.response_code === number) {
        history.push('/');
        localStorage.removeItem('token');
        return;
      }
      this.setState({
        loading: false,
        questions: questions.results,
      }, () => this.mixAnswers());
    } catch (error) {
      console.log(error);
    }
  }

  nextQuestion = () => {
    const { indexQuestion } = this.state;
    const { dispatch } = this.props;
    const number = 4;
    if (indexQuestion < number) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
        correctClassName: '',
        incorrectClassName: '',
      }), () => this.mixAnswers());
      dispatch(disabledNextButton(false));
      dispatch(addAmount());
    } else {
      this.allInfoToStorage();
      dispatch(disabledNextButton(false));
      const { history } = this.props;
      history.push('/feedback');
    }
    this.resetTimerState();
  }

  allInfoToStorage = () => {
    const { player: { name, score, picture } } = this.props;
    infoPlayerToLocalStorage({ name, score, picture });
  }

  resetTimerState = () => {
    const MAX_TIMER = 30;
    const { dispatch } = this.props;
    this.setState({ stopTimer: false, mountedTimer: false }, () => {
      this.setState({ mountedTimer: true });
    });
    dispatch(timer(MAX_TIMER));
    dispatch(diabledAction(false));
  }

  mixAnswers = () => {
    const { indexQuestion, questions } = this.state;
    const number = 0.5;
    const answers = [...questions[indexQuestion]
      .incorrect_answers, questions[indexQuestion].correct_answer]
      .sort(() => Math.random() - number);
    this.setState({
      mixedAnswers: answers,
    });
    return answers;
  }

  findIncorrectAndCorrectAnswers = (answer) => {
    const { indexQuestion, questions } = this.state;
    if (answer === questions[indexQuestion]
      .correct_answer) {
      return true;
    }
    return false;
  }

  dataTestid = (answer) => {
    const { incorrectAnswers, indexQuestion } = this.state;
    if (incorrectAnswers[indexQuestion].includes(answer)) {
      return `wrong-answer-${incorrectAnswers[indexQuestion].indexOf(answer)}`;
    }
    return 'correct-answer';
  }

  verifyAnswers = (answer) => {
    const { dispatch } = this.props;
    this.setState({
      correctClassName: 'correct-answer',
      incorrectClassName: 'incorrect_answers',
    });
    dispatch(disabledNextButton(true));
    if (this.findIncorrectAndCorrectAnswers(answer)) {
      this.calculateScoreAssertions();
    }
  }

  handleClickAnswers = (answer) => {
    this.verifyAnswers(answer);
    this.setState({ stopTimer: true });
  }

  chooseClassName = (answer) => {
    const { correctClassName, incorrectClassName } = this.state;
    if (this.findIncorrectAndCorrectAnswers(answer)) {
      return correctClassName;
    }
    return incorrectClassName;
  }

  verifyDificult = () => {
    const { questions, indexQuestion } = this.state;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (questions[indexQuestion].difficulty === 'hard') {
      return hard;
    }
    if (questions[indexQuestion].difficulty === 'medium') {
      return medium;
    }
    return easy;
  }

  calculateScoreAssertions = () => {
    const { responseTime, dispatch } = this.props;
    const dificult = this.verifyDificult();
    const number = 10;
    const score = number + (responseTime * dificult);
    dispatch(updateScoreAssertions(score));
  }

  getIncorretAnswer = ({ results }) => {
    const incorrectAnswers = Object.values(results);
    const arrIncorrectAnswer = incorrectAnswers.map((result) => result.incorrect_answers);
    this.setState({
      incorrectAnswers: arrIncorrectAnswer,
    });
  }

  render() {
    const { loading, questions, indexQuestion, stopTimer, mountedTimer, mixedAnswers,
    } = this.state;
    const { disabled, nextButton,
      responseTime: seconds, settings: { volume } } = this.props;
    return (
      <>
        <Header />
        <div className="game-container">
          <div className="game-content">
            { mountedTimer && !loading
              ? <Timer stop={ stopTimer } loading={ loading } />
              : ''}
            {!loading
          && (
            <div className="game-question-answer">
              <div className="question-and-category">
                <h2 data-testid="question-category">
                  { questions[indexQuestion].category }
                </h2>
                <div className="questions-card">
                  <p data-testid="question-text">{questions[indexQuestion].question}</p>
                </div>
              </div>
              <div className="answer-options" data-testid="answer-options">
                {mixedAnswers.map((answer, index) => (
                  <button
                    className={
                      this.chooseClassName(answer) || 'answer-options-button-defult-style'
                    }
                    key={ index }
                    data-testid={ this.dataTestid(answer, index) }
                    type="button"
                    onClick={ () => this.handleClickAnswers(answer) }
                    disabled={ disabled }
                  >
                    { answer }
                  </button>
                ))}
              </div>
              {nextButton
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  className="btn-next"
                  onClick={ this.nextQuestion }
                >
                  Next
                </button>
              )}
            </div>
          )}
          </div>
        </div>
        <Sound
          url={ seconds > 0 ? track01 : timerOver }
          playStatus="PLAYING"
          volume={ volume }
        />
      </>
    );
  }
}

Game.propTypes = {
  gameType,
}.isRequired;

const mapStateToProps = (state) => ({
  disabled: state.timer.disabled,
  responseTime: state.timer.timer,
  nextButton: state.timer.nextButton,
  player: state.player,
  settings: state.settings,
});

export default connect(mapStateToProps)(Game);
