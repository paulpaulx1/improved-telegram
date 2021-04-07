import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { LandingPage } from './LandingPage'
import { Navbar } from './Navbar';
// require('dotenv').config()

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
console.log(stripePromise)

export const Routes = () => {    
    return <Elements stripe={stripePromise}>
<Router>
        <div>
        <Route render={()=><Navbar />} />
        <div className='body'>
        <Switch>
            <Route exact path='/'>
                <Redirect to='/home'/>
            </Route>
            <Route path='/home' exact component={LandingPage}/>
        </Switch>
        </div>
        </div>
    </Router>
    </Elements>
}