import React from 'react';
import ReactDOM from 'react-dom';
import decode from 'jwt-decode';
import { userLoggedIn } from './actions/auth';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import { Route } from 'react-router-dom';
import rootReducer from './rootReducer';
import * as serviceWorker from './serviceWorker';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.token) {
  const decoded = decode(localStorage.token);
  const user = {username: decoded.username, email: decoded.email, token: localStorage.token};
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
