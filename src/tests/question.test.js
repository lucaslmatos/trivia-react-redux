import { screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fixedQuestions from './helpers/mockData';

const State01 = {
  player: {
    email: 'lucas@lucas.com',
    name: 'Lucas',
    score: 0,
    assertions: 0,
  }
};


describe('Testes: Componente Question.', () => {
  beforeEach(() => {
    jest.spyOn(global,'fetch').mockResolvedValue({json:jest.fn().mockResolvedValue(fixedQuestions)})
  }
  )
  test('Se aparecem os dados vindos da API na Tela', async ()=>{
    renderWithRouterAndRedux(<App />,State01,'/game')
    await waitFor(()=> {
      expect(screen.getByTestId('question-text')).toBeInTheDocument();
      expect(screen.getByTestId('question-category')).toBeInTheDocument();
      expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
      expect(screen.getByText('00:30')).toBeInTheDocument();
    })
  })
  test('Se ao clicar no botão next, a próxima pergunta é mostrada', async ()=>{
    const { history } = renderWithRouterAndRedux(<App />,State01,'/game')
    await waitFor(()=> {
      userEvent.click(screen.getByTestId('correct-answer'));
      expect(screen.getByTestId('header-score')).toHaveTextContent(10);
      userEvent.click(screen.getByRole('button', {name: /next/i}));
      userEvent.click(screen.getByTestId('correct-answer'));
      expect(screen.getByTestId('header-score')).toHaveTextContent(20);
      userEvent.click(screen.getByRole('button', {name: /next/i}));
      userEvent.click(screen.getByTestId('correct-answer'));
      expect(screen.getByTestId('header-score')).toHaveTextContent(30);
      userEvent.click(screen.getByRole('button', {name: /next/i}));
      userEvent.click(screen.getByTestId('correct-answer'));
      expect(screen.getByTestId('header-score')).toHaveTextContent(40);
      userEvent.click(screen.getByRole('button', {name: /next/i}));
      userEvent.click(screen.getByTestId('wrong-answer-0'));
      expect(screen.getByTestId('header-score')).toHaveTextContent(40);
      userEvent.click(screen.getByRole('button', {name: /next/i}));
    })
    await waitFor(()=>{
      expect(history.location.pathname).toEqual('/feedback');
    });
  })
  test('O comportamento da página ao receber um token inválido', async ()=>{
    jest.spyOn(global,'fetch').mockResolvedValue({json:jest.fn().mockResolvedValue({
      "response_code":3, 
      "results":[]
    })});
    const { history } = renderWithRouterAndRedux(<App />,State01,'/game')
    await waitFor(()=>{
      expect(history.location.pathname).toEqual('/');
    });
  })
  test('Borda dos botões deve mudar ao acabar o tempo', async ()=>{
   
  })
});