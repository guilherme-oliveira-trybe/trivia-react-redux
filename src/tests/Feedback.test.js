import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe(`Teste da página de [Feedback]`, () => {
  it('Teste se a página "Feedback" é renderizada com o pathname "/feedback"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback')
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  });

  it('Teste de ao clicar no botão [Play Again] a página é redirecionada para "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnPlayAgain = screen.getByRole('button', { name: /play again/i});
    userEvent.click(btnPlayAgain);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  it('Teste de ao clicar no botão [Ranking] a página é redirecionada para "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const btnRanking = screen.getByRole('button', { name: /ranking/i});
    userEvent.click(btnRanking);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })

  it('Teste se a frase "Could be better..." é renderizada na tela', () => {
    const phrase = /could be better.../i
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const feedbackPhrase = screen.getByText(phrase);
    expect(feedbackPhrase).toBeInTheDocument();
  })

  it('Teste se a frase "Well Done" é renderizada na tela', () => {
    const phrase = /well done/i

    const { history } = renderWithRouterAndRedux(<App />, { player: { name: '', assertions: 4, score: 0, gravatarEmail:'', picture: '' }});
    history.push('/feedback');

    const feedbackPhrase = screen.getByText(phrase);
    expect(feedbackPhrase).toBeInTheDocument();
  })
})