import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { responseApiInvalid, responseApiValid, token, dataTestIds } from './mocks';

describe(`Teste da página de [Game]`, () => {
  it('Teste se a página "Game" é renderizada corretamente"', async () => {
    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br';

    const { history } = renderWithRouterAndRedux(<App />);

    // link: https://benjaminjohnson.me/mocking-fetc
    const mocks = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(responseApiValid) }))

    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, playerName);
    userEvent.type(email, playerEmail);
    userEvent.click(btnPlay)

    expect(mocks).toHaveBeenCalled();
    expect(mocks).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.getByRole('button', { name: /play/i }));

    expect(mocks).toHaveBeenCalledTimes(2);

    const { pathname } = history.location;
    expect(pathname).toBe('/game');

    const localStorageToken = localStorage.getItem('token');
    expect(localStorageToken).toBe(token.token);

    dataTestIds.forEach((id) => {
      const infoDataTestId = screen.getByTestId(id);
      expect(infoDataTestId).toBeInTheDocument();
    })

    const btnCorrectAnswer = screen.getByTestId('correct-answer');
    expect(btnCorrectAnswer).toBeInTheDocument();
    userEvent.click(btnCorrectAnswer);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();
  });

  it('Testa se a página é redirecionada para "/", caso o retorno da API seja de Token Inválido', () => {
    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br';

    const { history } = renderWithRouterAndRedux(<App />);

    const mocks = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(responseApiInvalid) }))

    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, playerName);
    userEvent.type(email, playerEmail);
    userEvent.click(btnPlay)

    expect(mocks).toHaveBeenCalled();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  it('Testa de a mensagem [Well Done!] aparece na tela, caso o jogador acerte todas as questões', async () => {
    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br';

    const { history } = renderWithRouterAndRedux(<App />);

    const mocks = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(responseApiValid) }))

    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, playerName);
    userEvent.type(email, playerEmail);
    userEvent.click(btnPlay)

    expect(mocks).toHaveBeenCalled();

    await waitForElementToBeRemoved(() => screen.getByRole('button', { name: /play/i }));

    const { results } = responseApiValid;
    results.forEach(() => {
      const questionText = screen.getByTestId('question-text');
      const correctAnswer = screen.getByTestId('correct-answer');
      const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
      const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
      const wrongAnswer3 = screen.getByTestId('wrong-answer-2');

      expect(questionText).toBeInTheDocument();
      expect(correctAnswer).toBeInTheDocument();
      expect(wrongAnswer1).toBeInTheDocument();
      expect(wrongAnswer2).toBeInTheDocument();
      expect(wrongAnswer3).toBeInTheDocument();

      userEvent.click(correctAnswer);

      const btnNext = screen.getByTestId('btn-next');
      expect(btnNext).toBeInTheDocument();
      userEvent.click(btnNext);
    })

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');

    const feedbackMessage = screen.getByTestId('feedback-text');
    expect(feedbackMessage).toHaveTextContent('Well Done!');
  })

  it('Testa de a mensagem [Could be better...] aparece na tela, caso o jogador erre todas as questões', async () => {
    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br';

    const { history } = renderWithRouterAndRedux(<App />);

    const mocks = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(responseApiValid) }))

    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, playerName);
    userEvent.type(email, playerEmail);
    userEvent.click(btnPlay)

    expect(mocks).toHaveBeenCalled();

    await waitForElementToBeRemoved(() => screen.getByRole('button', { name: /play/i }));

    const { results } = responseApiValid;
    results.forEach(() => {
      const questionText = screen.getByTestId('question-text');
      const correctAnswer = screen.getByTestId('correct-answer');
      const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
      const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
      const wrongAnswer3 = screen.getByTestId('wrong-answer-2');

      expect(questionText).toBeInTheDocument();
      expect(correctAnswer).toBeInTheDocument();
      expect(wrongAnswer1).toBeInTheDocument();
      expect(wrongAnswer2).toBeInTheDocument();
      expect(wrongAnswer3).toBeInTheDocument();

      userEvent.click(wrongAnswer1);

      const btnNext = screen.getByTestId('btn-next');
      expect(btnNext).toBeInTheDocument();
      userEvent.click(btnNext);
    })

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');

    const feedbackMessage = screen.getByTestId('feedback-text');
    expect(feedbackMessage).toHaveTextContent('Could be better...');
  })

  it('Testa de a API quebra quando não volta nada', () => {
    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br'

    renderWithRouterAndRedux(<App />);

    global.fetch = jest.fn(() => new Error('API Quebrou'));

    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, playerName);
    userEvent.type(email, playerEmail);
    userEvent.click(btnPlay)

    expect(global.fetch).toBeCalledTimes(1);
  });

  it('Testa se os botões de respostas são desabilitados após 30 segundos', async () => {
    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br';

    renderWithRouterAndRedux(<App />);;

    const mocks = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(token) }))
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(responseApiValid) }))

    expect(mocks).toHaveBeenCalled();

    // Documentação do jest: https://jestjs.io/docs/timer-mocks
    jest.useFakeTimers();
    const timerMock = jest.spyOn(global, 'setTimeout');

    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, playerName);
    userEvent.type(email, playerEmail);
    userEvent.click(btnPlay)

    await waitForElementToBeRemoved(() => screen.getByRole('button', { name: /play/i }));

    expect(timerMock).toHaveBeenCalled();

    const btnNext = screen.queryByRole('button', { name: /next/i });
    expect(btnNext).not.toBeInTheDocument();

    const correctAnswer = screen.getByTestId('correct-answer');
    const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
    const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
    const wrongAnswer3 = screen.getByTestId('wrong-answer-2');

    expect(correctAnswer).not.toBeDisabled();
    expect(wrongAnswer1).not.toBeDisabled();
    expect(wrongAnswer2).not.toBeDisabled();
    expect(wrongAnswer3).not.toBeDisabled();

    jest.advanceTimersByTime(32000);

    expect(correctAnswer).toBeDisabled();
    expect(wrongAnswer1).toBeDisabled();
    expect(wrongAnswer2).toBeDisabled();
    expect(wrongAnswer3).toBeDisabled();
  })
})