import { DISABLE_BUTTON } from '../actions';

const INITIAL_STATE = {
  disable: false,
};
const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_BUTTON:
    return {
      ...state,
      disable: action.disable,
    };
  default:
    return state;
  }
};
export default game;
