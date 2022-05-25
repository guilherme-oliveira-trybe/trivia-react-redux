import fetchQuestions from '../services/apiTrivia';

export const PLAYER = 'PLAYER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const INVALID_TOKEN = 'INVALID_TOKEN';

export const player = (value) => ({
  type: PLAYER,
  value,
});

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});

const invalidToken = () => ({
  type: INVALID_TOKEN,
});

export function addQuestionsThunk() {
  // const token = JSON.parse(localStorage.getItem('token'));
  const token = localStorage.getItem('token');

  console.log(token);
  return async (dispatch) => {
    try {
      const questions = await fetchQuestions(token);
      console.log(questions.response_code);
      const number = 3;
      if (questions.response_code === number) {
        dispatch(invalidToken());
        return;
      }
      // console.log(questions.results.category);
      dispatch(addQuestions(questions.results));
    } catch (error) {
      console.log(error);
    }
  };
}
