import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const Navigation = ({ user, logout }) => (
  <Menu className='navigation'>
    <Menu.Item as={Link} to='/'>
      Home page
    </Menu.Item>

    <Menu.Menu position='right'>
      <Dropdown item pointing trigger={user.username}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/newpost'>
            Add post
          </Dropdown.Item>
          <Dropdown.Item onClick={() => logout()}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

Navigation.propTypes = {
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(Navigation);
