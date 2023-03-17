export const ADD_USER = 'ADD_USER';
export const addUser = (email, senha) => ({
  type: ADD_USER,
  email,
  senha,
});
