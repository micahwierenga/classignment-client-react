import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CourseList from '../pages/CourseList';
import Register from '../pages/Register';
import Login from '../pages/Login';

import { useRecoilValue } from 'recoil';
import { loggedInState } from '../recoil/selectors';

const Routes = props => {
  const loggedIn = useRecoilValue(loggedInState);

  return (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        {loggedIn && (
          <Switch>
            <Route path='/courses' component={CourseList} />
          </Switch>
        )}
        <Route path='*' render={() => <h1>not found</h1>} />
    </Switch>
  );
};

export default Routes;