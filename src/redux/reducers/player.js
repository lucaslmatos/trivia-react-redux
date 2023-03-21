import { ADD_PLAYER, HANDLE_POINT, CORRECT_ANSWER, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
};
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case HANDLE_POINT:
    return {
      ...state,
      score: action.score + state.score,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      assertions: action.assertions + state.assertions,
    };
  case RESET_SCORE:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };
  default:
    return state;
  }
};
export default player;
