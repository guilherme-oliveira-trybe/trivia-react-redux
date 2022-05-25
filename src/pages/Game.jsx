import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/apiTrivia';
import './Game.css';
// import Button from '../components/Button';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      // gameOver: false,
      loading: true,
      correctClassName: '',
      incorrectClassName: '',
      questions: [],
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

  // nextQuestion = () => {
  //   const { indexQuestion } = this.state;
  //   const numberQuestions = 5;
  //   if (indexQuestion < numberQuestions) {
  //     this.setState((prevState) => ({
  //       indexQuestion: prevState.indexQuestion + 1,
  //     }));
  //   } else {
  //     this.setState(({
  //       indexQuestion: 0,
  //       gameOver: true,
  //     }));
  //   }
  // }

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

  verifyAnswers = (answer) => {
    console.log(answer.className);
    this.setState({
      correctClassName: 'correct-answer',
      incorrectClassName: 'incorrect_answers',
    });
  }

  chooseClassName = (answer) => {
    const { correctClassName, incorrectClassName } = this.state;
    if (this.findIncorrectAndCorrectAnswers(answer)) {
      return correctClassName;
    }
    return incorrectClassName;
  }

  render() {
    const { loading, questions, indexQuestion } = this.state;
    return (
      <div>
        <span>GAME</span>
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
                  onClick={ () => this.verifyAnswers(answer) }
                  disabled={ false }
                >
                  { answer }
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// const mapStateToProps = (state) => ({
// });

export default connect(null)(Game);
