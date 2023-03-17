import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};
export default user;
