import React from "react";
import Feedback from "../pages/Feedback";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { act, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const State01 = {
  player: {
    email: '',
    name: '',
    score: 0,
    assertions: 0,
  }
};

const State02 = {
  player: {
    email: '',
    name: '',
    score: 300,
    assertions: 4,
  }
};

describe('Testando a página Feedback', () => {
  it('testando se ao clicar no botao "play again", o jogador é redirecionado a pagina inicial', () => {
    const {history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/feedback')
    })
    const playAgainBtn = screen.getByRole('button', {
      name: /play again/i
    })
    userEvent.click(playAgainBtn)
    const pathname = history.location.pathname
    expect(pathname).toBe('/')
  });

  it('testando se ao clicar no botao "Ranking", o jogador é redirecionado a tela de ranking', () => {
    const {history } = renderWithRouterAndRedux(<App/>)
    act(() => {
      history.push('/feedback')
    })
    const rankingBtn = screen.getByRole('button', {
      name: /ranking/i
    })
    userEvent.click(rankingBtn)
    const pathname = history.location.pathname
    expect(pathname).toBe('/ranking')
  })

  it('Testando se pontuação menor que 3 acertos mostra mensagem de COuld be better', () => {
    renderWithRouterAndRedux(<App/>,State01, '/feedback')
    const goodText = screen.getByText('Could be better...');
    expect(goodText).toBeInTheDocument();
  })

  it('Testando se pontuação maior que 3 acertos mostra mensagem de well done', () => {
    renderWithRouterAndRedux(<App/>,State02, '/feedback')
    const goodText = screen.getByText('Well Done!');
    expect(goodText).toBeInTheDocument();
  })
});
