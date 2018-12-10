import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewPostForm from '../forms/NewPostForm';
import axios from 'axios';


class NewPostPage extends Component {

  submit = (post) =>
    axios.post('/api/posts', { post })
    .then(() => this.props.history.push('/'));

  render() {
    return(
      <NewPostForm submit={this.submit} />
    );
  }
}

NewPostPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};


export default NewPostPage;
