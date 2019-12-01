import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import TodoList from './containers/TodoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/todos" component={TodoList} />
        <Redirect to="/todos" />;
      </Switch>
    </div>
  );
}

export default App;
