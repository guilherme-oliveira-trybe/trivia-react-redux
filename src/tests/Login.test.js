import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste da página de [Login]', () => {
  it('se a rota "/" é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  it(`Deve renderizar os inputs de [name] e [email],
  com os respectivos data-test-ids [input-player-name]
  e [input-gravatar-email]`, () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it(`Deve renderizar o botão de [Play] e [Settings]
  com os respectivos data-test-ids [btn-play] e [btn-settings] e 
  `, () => {
    renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  });

  it(`Deve verificar se o botão [Play] estar desabilitado
  quando os inputs não estão preenchidos`, () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(btnPlay).toHaveAttribute('disabled');
  });

  it(`Deve testar se quando preenchido os inputs
  o botão de [Play] é habilitado.'`, () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'trybe');
    userEvent.type(emailInput, 'teste@teste.com');
    expect(btnPlay).not.toHaveAttribute('disabled');
  });

  it('se a rota "/game" é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  })

  it(`Deve ser redirencionado para a rota /settings ao 
  clicar no botão [Settings]`, () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByTestId('btn-settings');
    userEvent.click(btnSettings);
    expect(screen.getByTestId('settings-title')).toBeInTheDocument();

    history.push('/settings');
    const { pathname } = history.location;
    expect(pathname).toBe('/settings')
  });

  it(`Salve o nome e email no estado da aplicação, com a chave name e gravatarEmail, assim que o jogador clicar em [Play]`, () => {
    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br';

    const { store } = renderWithRouterAndRedux(<App />);
    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, 'teste');
    userEvent.type(email, 'teste@teste.com.br');
    userEvent.click(btnPlay)

    expect(store.getState().player.name).toBe(playerName);
    expect(store.getState().player.gravatarEmail).toBe(playerEmail);
  })

  it(`Se é feita a requisição a API através da função "fetchToken"`, () => {
    const token = 'a10a31947807e2ce4c1e8f1bb5a6f98a769fbcbf735411397e41ff15937a9c01';

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(token)
    });

    const playerName = 'teste';
    const playerEmail = 'teste@teste.com.br';

    renderWithRouterAndRedux(<App />);

    const name = screen.getByLabelText(/nome:/i);
    const email = screen.getByLabelText(/email:/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, playerName);
    userEvent.type(email, playerEmail);
    userEvent.click(btnPlay)

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  })

})