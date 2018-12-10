import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/user';
import { connect } from 'react-redux';


class SignupPage extends Component {

  submit = user =>
    this.props.signup(user).then(() => this.props.history.push('/'));

  render() {
    return(
      <div>
        <h2 style={{ margin: 20, textAlign: 'center' }}>Signup Page</h2>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};


export default connect(null, { signup })(SignupPage);
