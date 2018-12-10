import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextArea, Form, Button } from 'semantic-ui-react';
import InlineErrors from '../messages/InlineErrors';
import { connect } from 'react-redux';

class CommentForm extends Component {
  state = {
    comment: '',
    loading: false,
    errors: {}
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.props.username, this.state.comment);
    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      const comment = {
        username: this.props.username,
        id: this.props.id,
        comment: this.state.comment
      };
      this.setState({ loading: true });
      this.props.submit(comment);
      this.setState({ loading: false, comment: '' });

    }
  }

  validate = (username, comment) => {
    const errors = {};
    if(!comment) errors.comment = "Can't be empty";
    if(!username) errors.username = "Login or signup to leave a comment";
    return errors;
  }

  render() {
    const { comment, loading, errors } = this.state;
    return(
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.comment || !!errors.username} style={{ marginBottom: 5 }}>
          <TextArea
            style={{ maxHeight: 50, padding: 10 }}
            autoHeight
            type='text'
            name='comment'
            id='comment'
            placeholder='What do you think about this post?'
            value={comment}
            onChange={this.onChange}
          ></TextArea>
          { (errors.comment && <InlineErrors text={errors.comment} />)
            ||
            (errors.username && <InlineErrors text={errors.username} />) }
        </Form.Field>
        <Button primary>Add comment</Button>
      </Form>
    );
  }
}

CommentForm.propTypes = {
  submit: PropTypes.func.isRequired,
  username: PropTypes.string
};

function mapStateToProps(state) {
  return {
    username: state.user.username
  };
}

export default connect(mapStateToProps)(CommentForm);
