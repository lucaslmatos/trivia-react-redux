import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions, shuffleArray } from '../helpers';

const tres = 3;
class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  componentDidMount() {
    this.getData();
  }

  handleClick = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  };

  getData = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const data = await (getQuestions(token));
    this.setState({
      questions: data.results,
    }, () => {
      const { questions } = this.state;
      const a = shuffleArray(questions);
      this.setState({
        questions: a,
      });
    });
    if (data.response_code === tres) {
      history.push('/');
    }
  };

  render() {
    const { questions, index } = this.state;
    let a = '';
    if (questions.length > 0) {
      a = <Question question={ questions[index] } />;
    }
    return (
      <div>
        <Header />
        {a}
        <button onClick={ this.handleClick }>Next</button>
      </div>
    );
  }
}
export default connect()(Game);

// Codigo criado por João Ricardo,Lucas Matos, Mauricio Fernandes
