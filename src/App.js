import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import NewPostPage from './components/pages/NewPostPage';
import { connect } from 'react-redux';
import Navigation from './components/nav/Navigation';
import PropTypes from 'prop-types';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import './App.css';


const App = ({ isAuthenticated, location }) => (
    <div className='ui container'>
      { isAuthenticated && <Navigation /> }
        <Route location={location} path='/' exact component={HomePage} />
        <GuestRoute location={location} path='/login' exact component={LoginPage} />
        <GuestRoute location={location} path='/signup' exact component={SignupPage} />
        <UserRoute location={location} path='/newpost' exact component={NewPostPage} />
    </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
