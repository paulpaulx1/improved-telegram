import axios from 'axios';

const LOGIN = 'LOGIN';
const CREATE_USER = 'CREATE_USER';
const LOGOUT = 'LOGOUT';
const GET_USER = 'GET_USER';

const _login = (loginUser) => ({
  type: LOGIN,
  loginUser,
});

const _createUser = (newUser) => ({
  type: CREATE_USER,
  newUser,
});

const _logout = (emptyUser) => ({
  type: LOGOUT,
  emptyUser,
});

const _getUser = (thisUser) => ({
  type: GET_USER,
  thisUser,
});

const login = (loginInfo) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/auth/login', loginInfo);
    dispatch(_login(data));
  } catch (err) {
    console.log(err);
  }
};

const createUser = (newUserInfo) => async (dispatch) => {
  try {
      console.log('createuser')
    const { data } = await axios.post('/api/auth/createuser', newUserInfo);
    dispatch(_createUser(data));
  } catch (err) {
    console.error(err);
  }
};

const logOut = () => async (disaptch) => {
  try {
    await axios.post('/api/auth/logout');
    const emptyUser = {};
    dispatch(_logout(emptyUser));
  } catch (err) {
    console.error(err);
  }
};

const getUser = () => async (dispatch) => {
  try {    console.log('yoooooo')
    const { data } = await axios.get('/api/auth/thisUser');

    dispatch(_getUser(data));
  } catch (err) {
    console.error(err);
  }
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.loginUser;
    case CREATE_USER:
      return action.newUser;
    case LOGOUT:
      return action.emptyUser;
    case GET_USER:
      return action.thisUser;
    default:
      return state;
  }
}

export { login, createUser, logOut, getUser };
