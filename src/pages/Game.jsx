import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/apiTrivia';
import './Game.css';
import Header from '../components/Header';
import Timer from '../components/Timer';

import { timer, disabled as diabledAction } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      loading: true,
      correctClassName: '',
      incorrectClassName: '',
      questions: [],
      nextButton: false,
      stopTimer: false,
      mountedTimer: true,
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
      console.log(questions);
      const number = 3;
      if (questions.response_code === number) {
        history.push('/');
        localStorage.removeItem('token');
        return;
      }
      this.setState({
        loading: false,
        questions: questions.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  nextQuestion = () => {
    const { indexQuestion } = this.state;
    console.log(indexQuestion);
    const number = 4;
    if (indexQuestion < number) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
        correctClassName: '',
        incorrectClassName: '',
        nextButton: false,
      }));
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }

    this.resetTimerState();
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
    return answers;
  }

  getAnswers = () => {
    const { loading } = this.state;
    if (!loading) {
      const answers = this.mixAnswers();
      return answers;
    }
  }

  findIncorrectAndCorrectAnswers = (answer) => {
    const { indexQuestion, questions } = this.state;
    if (answer === questions[indexQuestion]
      .correct_answer) {
      return true;
    }
    return false;
  }

  dataTestid = (answer, index) => {
    if (this.findIncorrectAndCorrectAnswers(answer)) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  verifyAnswers = () => {
    this.setState({
      correctClassName: 'correct-answer',
      incorrectClassName: 'incorrect_answers',
      nextButton: true,
    });
  }

  handleClickAnswers = () => {
    this.verifyAnswers();
    this.setState({ stopTimer: true });
  }

  chooseClassName = (answer) => {
    const { correctClassName, incorrectClassName } = this.state;
    if (this.findIncorrectAndCorrectAnswers(answer)) {
      return correctClassName;
    }
    return incorrectClassName;
  }

  render() {
    const { loading, questions, indexQuestion,
      nextButton, stopTimer, mountedTimer } = this.state;
    const { disabled } = this.props;
    return (
      <div>
        <Header />
        { mountedTimer && !loading ? <Timer stop={ stopTimer } /> : ''}
        {!loading
        && (
          <div>
            <h2 data-testid="question-category">{questions[indexQuestion].category}</h2>
            <p data-testid="question-text">{questions[indexQuestion].question}</p>
            <div data-testid="answer-options">
              {this.getAnswers().map((answer, index) => (
                <button
                  className={ this.chooseClassName(answer) }
                  key={ index }
                  data-testid={ this.dataTestid(answer, index) }
                  type="button"
                  onClick={ this.handleClickAnswers }
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
}.isRequired;

const mapStateToProps = (state) => ({
  disabled: state.timer.disabled,
});

export default connect(mapStateToProps)(Game);
