export const fetchToken = async () => {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const { token } = await response.json();
    return token;
  } catch (err) {
    console.error(err);
  }
};

export async function fetchQuestions(token, settings) {
  // const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}&token=${token}`);
  const data = await response.json();
  return data;
}
