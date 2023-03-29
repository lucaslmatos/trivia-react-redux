import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';


describe('Testes: Página de Ranking.', () => {
  test('Verifica se ao clicar no botão de settings ele redireciona para rota /', async ()=>{
    const {history} = renderWithRouterAndRedux(<App />, {}, '/ranking');
    const home = screen.getByTestId('btn-go-home')
    userEvent.click(home)
    await waitFor(()=>{
      expect(history.location.pathname).toEqual('/');
    });
  })
});