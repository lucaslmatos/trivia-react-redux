import { ADD_PLAYER, HANDLE_POINT } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
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
  default:
    return state;
  }
};
export default player;
