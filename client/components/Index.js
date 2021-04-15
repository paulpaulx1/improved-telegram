import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { LandingPage } from './LandingPage';
import  Navbar  from './Navbar';
import { Login } from './authentication/Login';
import { CreateUser } from './authentication/CreateUser';
// require('dotenv').config()

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
console.log(stripePromise);

export const Routes = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div>
          <Route render={() => <Navbar />} />
          <div className='body'>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/home' />
              </Route>
              <Route path='/home' exact component={LandingPage} />
              <Route path='/login' component={Login} />
              <Route path='/createuser' component={CreateUser} />
            </Switch>
          </div>
        </div>
      </Router>
     </Elements>
  );
};

const mapStateToProps = (state) => ({
    session: state.session,
  });

const mapDispatchToProps = (dispatch) => ({
    createGuestSession: () => {
      dispatch(createGuestSession());
    },
    refreshSession: (sessionId) => {
      dispatch(refreshSession(sessionId));
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Routes);