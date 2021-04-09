import axios from 'axios'

const IF_COOKIE_SESSION = 'IF_COOKIE_SESSION';

const _ifCookieSession = (session) => ({
  type: IF_COOKIE_SESSION,
  session,
});

export const ifCookieSession = () => async (dispatch) => {
  try {
    console.log('firing cookie')
    const { data } = await axios.post('/api/auth/mount');
    dispatch(_ifCookieSession(data));
  } catch (err) {
    console.log(err);
  }
};

export default function sessionReducer(state = {}, action) {
  if (action.type === IF_COOKIE_SESSION) {
    state = action.session;
  }
  return state;
}
