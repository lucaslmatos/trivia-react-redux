export const ADD_USER = 'ADD_USER';
export const addUser = (email, name) => ({
  type: ADD_USER,
  email,
  name,
});
