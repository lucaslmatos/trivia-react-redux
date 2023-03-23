import { screen,waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
const email = 'lucaslopesm_22@hotmail.com';
const playerName = 'Lucas';
describe('Testes: Página de Login.', () => {
  test('Deve existir o campo de email, nome, botão de jogar e botão de configuração', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Settings/i })).toBeInTheDocument();
  });
  test('O botão de entrar deve estar habilitado apenas após o usuário digitar email e senha válidos', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('button', { name: /Play/i })).toBeDisabled();
    userEvent.type(screen.getByTestId('input-player-name'), playerName );
    userEvent.type(screen.getByTestId('input-gravatar-email'), email );
    expect(screen.getByRole('button', { name: /Play/i })).toBeEnabled();
  });
  test('Verifica se ao clicar no botão de settings ele redireciona para rota /settings',()=>{
    renderWithRouterAndRedux(<App />);
    const settings = screen.getByTestId('btn-settings')
    userEvent.click(settings)
    const titleSettings =  screen.getByTestId('settings-title')
    expect(titleSettings).toBeInTheDocument();
  })
  test('Verifica se ao clicar no botão de game ele redireciona para rota /game', async()=>{
    const {history} = renderWithRouterAndRedux(<App />);
    const play = screen.getByTestId('btn-play')
    userEvent.type(screen.getByTestId('input-player-name'), playerName );
    userEvent.type(screen.getByTestId('input-gravatar-email'), email );
    userEvent.click(play)
    await waitFor(()=>{
      expect(history.location.pathname).toEqual('/game');
    });
  })
});