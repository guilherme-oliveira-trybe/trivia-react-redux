import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { players } from './mocks';

describe(`Teste da página de [Ranking]`, () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify(players));
  })

  afterEach(() => localStorage.clear());

  it('Teste se a página "Feedback" é renderizada com o pathname "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });

  it('Teste de ao clicar no botão [Home] a página é redirecionada para "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btnHome = screen.getByRole('button', { name: /home/i});
    userEvent.click(btnHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  it('Teste se é renderizado o "Ranking" com o nome dos jogadores', () => {
    JSON.parse(localStorage.getItem('ranking'));

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const playerOne = screen.getByRole('heading', { level: 2, name:/guilherme/i});
    expect(playerOne).toBeInTheDocument();

    const playerTwo = screen.getByRole('heading', { level: 2, name:/teste/i });
    expect(playerTwo).toBeInTheDocument();
  })

  it('Teste se é renderizado o "Ranking" com a Imagem dos jogadores', () => {
    JSON.parse(localStorage.getItem('ranking'));

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const imgPlayerOne = screen.getByAltText(/guilherme/i);
    expect(imgPlayerOne).toHaveAttribute('src', expect.stringContaining('https://www.gravatar.com/avatar/8292a81cf09a02db5ccefac6b27cb95d'));

    const imgPlayerTwo = screen.getByAltText(/teste/i);
    expect(imgPlayerTwo).toHaveAttribute('src', expect.stringContaining('https://www.gravatar.com/avatar/10b9231267e5844f485572e2c3ae14b1'));
  })

  it('Teste se é renderizado o "Ranking" com o Score dos jogadores', () => {
    JSON.parse(localStorage.getItem('ranking'));

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const scorePlayerOne = screen.getByRole('heading', { level: 2, name: 100 });
    expect(scorePlayerOne).toBeInTheDocument();

    const scorePlayerTwo = screen.getByRole('heading', { level: 2, name: 99 });
    expect(scorePlayerTwo).toBeInTheDocument();
    
  })
})