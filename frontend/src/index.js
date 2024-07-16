import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateForm from './CreateForm';
import AnswerForm from './AnswerForm';
import './styles.css';

const App = () => (
  <Router>
    <Switch>
      <Route path="/create-form" component={CreateForm} />
      <Route path="/form/:url" component={AnswerForm} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
