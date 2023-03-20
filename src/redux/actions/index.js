export const ADD_USER = 'ADD_USER';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const addUser = (email, name) => ({
  type: ADD_USER,
  email,
  name,
});

export const buttonDisable = (bool) => ({
  type: DISABLE_BUTTON,
  disable: bool,
});
