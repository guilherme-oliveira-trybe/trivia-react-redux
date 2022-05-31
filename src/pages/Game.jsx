import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/apiTrivia';
import './Game.css';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { infoPlayerToLocalStorage } from '../services/localStorage';
import { timer, disabled as diabledAction,
  disabledNextButton, updateScoreAssertions } from '../actions';

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
    const { history } = this.props;
    const token = localStorage.getItem('token');
    try {
      const questions = await fetchQuestions(token);
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
      .incorrect_answers, questions[indexQuestion]
      .correct_answer]
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
    const { loading,
      questions,
      indexQuestion,
      stopTimer,
      mountedTimer,
      mixedAnswers,
    } = this.state;
    const { disabled, nextButton } = this.props;
    return (
      <div>
        <Header />
        { mountedTimer && !loading
          ? <Timer stop={ stopTimer } loading={ loading } />
          : ''}
        {!loading
        && (
          <div>
            <h2 data-testid="question-category">{questions[indexQuestion].category}</h2>
            <p data-testid="question-text">{questions[indexQuestion].question}</p>
            <div data-testid="answer-options">
              {mixedAnswers.map((answer, index) => (
                <button
                  className={ this.chooseClassName(answer) }
                  key={ index }
                  data-testid={ this.dataTestid(answer, index) }
                  type="button"
                  onClick={ () => this.handleClickAnswers(answer) }
                  disabled={ disabled }
                >
                  { answer }
                </button>
              ))}
              {nextButton
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  responseTime: PropTypes.number,
  disabled: PropTypes.bool,
  nextButton: PropTypes.bool,
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  disabled: state.timer.disabled,
  responseTime: state.timer.timer,
  nextButton: state.timer.nextButton,
  player: state.player,
});

export default connect(mapStateToProps)(Game);
