import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../redux/categories/allCategories';
import { logout, getUser } from '../redux/authentication/user';
import { useDispatch } from 'react-redux';
import { ifCookieSession } from '../redux/authentication/session';
import store from '../redux/index';

const Navbar = (props) => {
const [stuff, setStuff] = useState({})

  useEffect(() => {
    const { fetchCategories, ifCookieSession, getUser } = props;
    console.log(ifCookieSession)
    const getStuff = async () => {
        fetchCategories()
      await ifCookieSession()
      await getUser()
    };
    getStuff()
  }, []);
    console.log(store.getState())
  return <>hello</>;
};


const mapStateToProps = (state, ownProps) => ({
    // categories: state.categories,
    user: store.getState().userReducer,
    // selectedCategoryTitle: ownProps.match.params.categoryTitle ? ownProps.match.params.categoryTitle : 'all',
    selectedCategoryTitle: 'Animals',
  });
  

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
    // logout: () => {
    //   dispatch(logout());
    // },
    getUser: () => {
      dispatch(getUser());
    },
    ifCookieSession: () => {
      dispatch(ifCookieSession());
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);