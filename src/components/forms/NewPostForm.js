import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, TextArea, Button } from 'semantic-ui-react';
import InlineErrors from '../messages/InlineErrors';

class NewPostForm extends Component {
  state = {
    data: {
      username: this.props.username,
      title: '',
      body: ''
    },
    errors: {},
    loading: false
  };

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
    }
  }

  validate = (data) => {
    const errors = {};
    if(!data.title) errors.title = "Can't be empty";
    if(!data.body) errors.body = "Can't be empty";
    return errors;
  }

  onChange = (e) => {
    this.setState({
       ...this.state,
       data: { ...this.state.data, [e.target.name]: e.target.value }
     });
  }

  render() {
    const { username } = this.props;
    const { data, loading, errors } = this.state;
    return(
      <Form onSubmit={this.onSubmit} loading={loading} style={{ width: 400, margin: '0 auto' }}>
        <Form.Field style={{ marginBottom: 5 }}>
          <label htmlFor="username">Username</label>
          <input
            type='text'
            name='username'
            id='username'
            readOnly
            value={username}
          />
        </Form.Field>

        <Form.Field error={!!errors.title} style={{ marginBottom: 5 }}>
          <label htmlFor="title">Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={data.title}
            placeholder='Post title'
            onChange={this.onChange}
          />
          { errors.title && <InlineErrors text={errors.title} /> }
        </Form.Field>

        <Form.Field error={!!errors.body} style={{ marginBottom: 5 }}>
          <label htmlFor="body">Body</label>
          <TextArea
            autoHeight
            id='body'
            name='body'
            maxLength="450"
            value={data.body}
            placeholder='Post body'
            onChange={this.onChange}
          ></TextArea>
          { errors.body && <InlineErrors text={errors.body} /> }
        </Form.Field>

        <Button primary>Create post</Button>
      </Form>
    );
  }
}

NewPostForm.propTypes = {
  username: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    username: state.user.username
  };
}

export default connect(mapStateToProps)(NewPostForm);
