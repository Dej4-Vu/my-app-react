import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InlineErrors from '../messages/InlineErrors';

class SignupForm extends Component {
  state = {
    data: {
      username: '',
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
      .catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
    }
  }

  validate = (data) => {
    const errors = {};
    if(!data.username) errors.username = "Can't be empty";
    if(!isEmail(data.email)) errors.email = 'Invalid email';
    if(!data.password) errors.password = "Can't be empty";
    if(data.password.length > 0 && data.password.length < 5) errors.password = "Password is too short"
    return errors;
  }

  render() {
    const { data, loading, errors } = this.state;
    return(
      <Form onSubmit={this.onSubmit} loading={loading} style={{ width: 400, margin: '0 auto' }}>
        <Form.Field error={!!errors.username} style={{ marginBottom: 5 }}>
          <label htmlFor="username">Username</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='FallenAngel2000'
            value={data.username}
            onChange={this.onChange}
          />
          { errors.username && <InlineErrors text={errors.username} /> }
        </Form.Field>

        <Form.Field error={!!errors.email} style={{ marginBottom: 5 }}>
          <label htmlFor="email">Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='example@example.com'
            value={data.email}
            onChange={this.onChange}
          />
          { errors.email && <InlineErrors text={errors.email} /> }
        </Form.Field>

        <Form.Field error={!!errors.password} style={{ marginBottom: 5 }}>
          <label htmlFor="password">Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter your password'
            value={data.password}
            onChange={this.onChange}
          />
          { errors.password && <InlineErrors text={errors.password} /> }
        </Form.Field>

        <Button primary>Signup</Button>
      </Form>
    );
  }
}

export default SignupForm;
