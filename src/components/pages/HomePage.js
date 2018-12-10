import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Post from '../elements/Post';

class HomePage extends Component {
  _isMounted = false;

  state = {
    posts: []
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get('api/posts')
    .then(res => res.data.posts)
    .then(posts => {
      if(this._isMounted) {
        this.setState({ posts });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deletePost = (_id) => {
    axios.delete('api/posts', { data: { id: _id } });
    const posts = this.state.posts.filter(item => item._id !== _id )
    this.setState({ posts })
  }


  render() {
    const { posts } = this.state;
    const { isAuthenticated } = this.props;

    return(
      <div>
        {
          isAuthenticated ?
            <div></div>
          :
          <Message info size='small'>
            <Message.Header>Welcome to my React app!</Message.Header>
            <p>
              <Link to='/login'>Login</Link> or <Link to='/signup'>Signup</Link> to start using this app.
            </p>
          </Message>
        }

        <ul className='ui grid posts'>
          {
            posts.map((item, index) => (
              <li className='sixteen wide column' key={index}>
                <Post postItem={item} delete={this.deletePost} />
              </li>
            ))
          }
        </ul>



      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps)(HomePage);
