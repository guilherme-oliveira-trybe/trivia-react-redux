export const players = [
  {
    name: 'Guilherme',
    picture: 'https://www.gravatar.com/avatar/8292a81cf09a02db5ccefac6b27cb95d',
    score: 100,
  },
  {
    name: 'teste',
    picture: 'https://www.gravatar.com/avatar/10b9231267e5844f485572e2c3ae14b1',
    score: 99,
  }
];

export const token = {
  response_code: 0,
  response_message: "Token Generated Successfully!",
  token: "a10a31947807e2ce4c1e8f1bb5a6f98a769fbcbf735411397e41ff15937a9c01",
};

export const responseApiValid = {
  response_code: 0,
  results: [{
    category: "Geography",
    correct_answer: "Murcia",
    difficulty: "medium",
    incorrect_answers: ["Asturias", "Navarre", "Rio de Janeiro"],
    question: "The following Spanish provinces are located in the northern area of Spain except:",
    type: "multiple"
  }, 
  {
    category: "Entertainment: Music",
    correct_answer: "Shine On You Crazy Diamond",
    difficulty: "medium",
    incorrect_answers: ["Wish You Were Here", "Have A Cigar", "Welcome to the Machine"],
    question: "Pink Floyd made this song for their previous lead singer Syd Barrett.",
    type: "multiple"
  }, 
  {
    category: "Science & Nature",
    correct_answer: "The presence or absence of a nucleus",
    difficulty: "easy",
    incorrect_answers: ["The overall size", "The presence or absence of certain organelles", "The mode of reproduction"],
    question: "The biggest distinction between a eukaryotic cell and a prokaryotic cell is:",
    type: "multiple"
  }, 
  {
    category: "Entertainment: Comics",
    correct_answer: "Thomas Hobbes",
    difficulty: "medium",
    incorrect_answers: ["David Hobbes", "John Hobbes", "Nathaniel Hobbes"],
    question: "The stuffed tiger in Calvin and Hobbes is named after what philosopher?",
    type: "multiple"
  }, 
  {
    category: "History",
    correct_answer: "England, Germany, Russia",
    difficulty: "hard",
    incorrect_answers: ["France, Russia, Germany", "Serbia, Russia, Croatia", "Germany, Spain, Austria"],
    question: "During World War I, which nation&#039;s monarchs were blood related?",
    type: "multiple"
  }]
};

export const responseApiInvalid = {
  "response_code": 3,
  "results":[],
};

export const dataTestIds = [
  "question-category",
  "question-text",
  "answer-options",
  "correct-answer",
  "wrong-answer-0",
  "wrong-answer-1",
  "wrong-answer-2",
];