import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  senha: '',
};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.email,
      senha: action.senha,
    };
  default:
    return state;
  }
};
export default user;
