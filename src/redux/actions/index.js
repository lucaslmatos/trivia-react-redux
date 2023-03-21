export const ADD_PLAYER = 'ADD_PLAYER';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const HANDLE_POINT = 'HANDLE_POINT';
export const addUser = (email, name) => ({
  type: ADD_PLAYER,
  email,
  name,
});

export const buttonDisable = (bool) => ({
  type: DISABLE_BUTTON,
  disable: bool,
});

export const handlePoints = (point) => ({
  type: HANDLE_POINT,
  score: point,
});
