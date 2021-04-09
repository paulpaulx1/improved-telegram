import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, createUser } from '../../redux/authentication/user';
import store from '../../redux/index';
export const UserInfo = (props) => {

  const { type } = props 
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = async (e) => {
      e.preventDefault()
      console.log({username, password, firstName, lastName, userEmail}, createUser)
       await createUser({username, password, firstName, lastName, userEmail});
  }
    // if (!username.length || !password.length) {
    //   setMessage('all fields plz');
    // } else {
    //   setMessage('');
    //   if (type === 'login') {
    //     await login({
    //       username,
    //       password,
    //       firstName,
    //       lastName,
    //       userEmail,
    //     });
    //     if (!props.user.id) {
    //       setMessage('check username/password');
    //     } else {
    //       return <Redirect to='/home' />;
    //     }
    //   }
    //   if (type === 'create') {
    //     if (!firstName.length || !lastName.length || !userEmail.length) {
    //       setMessage('all fields plz');
    //     } else {
          
    //   }
//     }
//   };
  return (
    <>
      yoyo
      <form onSubmit={(e) => submit(e)}>
        <button type='submit' onClick={createUser({username, password, firstName, lastName, userEmail})}>
          {type === 'login' ? 'Login' : 'Create Account'}
        </button>
        <input
          onChange={(e) => setUserName(e.target.value)}
          placeholder='username'
          type='text'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          type='password'
        />
        {type === 'create' && (
   <>
            <input
              placeholder='first name'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder='last name'
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder='email'
              onChange={(e) => setUserEmail(e.target.value)}
            />
            </>
  )}
      </form>
      <>{message}</>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (loginInfo) => dispatch(login(loginInfo)),
  createUser: (newUserInfo) => dispatch(createUser(newUserInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
