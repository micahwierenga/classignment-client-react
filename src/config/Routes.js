import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import CourseList from '../pages/CourseList';

const Routes = props => {
  return (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/courses' component={CourseList} />
        <Route path='*' render={() => <h1>not found</h1>} />
    </Switch>
  );
};

export default Routes;