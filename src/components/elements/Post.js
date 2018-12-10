import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import CommentForm from '../forms/CommentForm';
import { connect } from 'react-redux';

class Post extends Component {

  state = {
    comments: []
  }

  componentDidMount() {
    axios.get('api/comments')
    .then(res => res.data.comments)
    .then(comments => {
      this.setState({ comments });
    });
  }

  submit = (comment) => {
    axios.post('/api/comments', { comment })
    .then(res => res.data.comment)
    .then(comment => this.setState({ comments: [...this.state.comments, comment] }))
  }

  deletePost = (_id) => {
    axios.delete('api/comments', { data: { id: _id } });
    const comments = this.state.comments.filter(item => this.props.postItem._id !== item.id)
    this.setState({ comments })
    this.props.delete(_id);
  }

  deleteComment = (_id) => {
    axios.delete('api/comments', { data: { _id: _id } });
    const comments = this.state.comments.filter(item => item._id !== _id)
    this.setState({ comments })
  }

  render() {
    const { postItem, username } = this.props;
    const { comments } = this.state;

    return(
      <div className='posts-item'>
        {
          this.props.username === postItem.username ?
            <div className='icon-delete'>
              <Icon name="delete" link onClick={() => this.deletePost(postItem._id)} />
            </div>
          :
            <div></div>
        }

          <p className='post-title'>{postItem.title}</p>
          <p className='post-body'>{postItem.body}</p>
          <p className='post-author'>Posted by {postItem.username}</p>

        <CommentForm className='comment-form' submit={this.submit} id={postItem._id} />

        <ul className='comments'>
          {
            comments.map((item, index) => {
              if(postItem._id === item.id) {
                return(
                  <div className='comments-item' key={index}>
                    <p>
                      <span><b>{item.username}:</b></span> {item.comment}
                      {
                        (username === item.username || username === postItem.username) ?
                        <Icon name="delete" link onClick={() => this.deleteComment(item._id)} />
                          :
                        <span></span>
                      }
                    </p>
                  </div>
                );
              }
            })
          }
        </ul>

      </div>
    );
  }
}

Post.propTypes = {
  token: PropTypes.string
};

function mapStateToProps(state) {
  return {
    username: state.user.username
  };
}

export default connect(mapStateToProps)(Post);
