import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste da página de [Login]', () => {
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
    renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByTestId('btn-settings');
    userEvent.click(btnSettings);
    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });

})