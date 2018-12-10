import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';


class LoginPage extends Component {

  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/'));

  render() {
    return(
      <div>
        <h2 style={{ margin: 20, textAlign: 'center' }}>Login Page</h2>
        <LoginForm submit={this.submit}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};


export default connect(null, { login })(LoginPage);
