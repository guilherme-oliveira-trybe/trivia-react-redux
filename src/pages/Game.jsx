import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addQuestionsThunk } from '../actions/index';
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
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI = async () => {
    const { dispacthAddQuestions } = this.props;
    await dispacthAddQuestions();
    this.setState({
      loading: false,
    }, () => this.verifyToken());
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
    const { questions } = this.props;
    const { indexQuestion } = this.state;
    // console.log(questions[indexQuestion].category);
    const number = 0.5;
    const answers = [...questions[indexQuestion]
      .incorrect_answers, questions[indexQuestion]
      .correct_answer]
      .sort(() => Math.random() - number);
    // console.log(answers);
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
    const { questions } = this.props;
    const { indexQuestion } = this.state;
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
      correctClassName: 'correct_answer',
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

  verifyToken = () => {
    const { invalidToken, history } = this.props;
    // console.log(invalidToken);
    if (invalidToken) {
      history.push('/');
      localStorage.removeItem('token');
    }
  }

  render() {
    const { questions } = this.props;
    const { indexQuestion, loading } = this.state;
    // const answers = this.getAnswers();
    // this.verifyToken();
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
                  onClick={ this.verifyAnswers }
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
  dispacthAddQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  invalidToken: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispacthAddQuestions: () => dispatch(addQuestionsThunk()),
});

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  invalidToken: state.game.invalidToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
