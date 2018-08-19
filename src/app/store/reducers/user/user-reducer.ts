const initial = {};

export default function counter(state = initial, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, authenticated: true };
    case 'LOGIN_FAILED':
      return { ...state, authenticated: false };
    default:
      return state;
  }
}
