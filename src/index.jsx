import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './Home.jsx';
import NewRow from './NewRow.jsx';
import NewUser from './NewUser.jsx';

render(
  <Router history={ hashHistory }>
    <Route path="/" component={App} >
      <IndexRoute component={Home}/>
      <Route path="/row" component={NewRow}/>
      <Route path="/row/:id" component={NewRow}/>
      <Route path="/user/add" component={NewUser}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
