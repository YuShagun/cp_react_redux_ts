import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Receipt from './pages/Receipt';
import Upload from './pages/ReceiptActions/Upload/Upload';
import Edit from './pages/ReceiptActions/Edit/Edit';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/receipt/:id" component={Receipt} />
        <Route path='/actions/upload' component={Upload} />
        <Route path='/actions/edit' component={Edit} />
        <Route path="/" component={Home} />
      </Switch>
    </Router >
  );
}

export default App;
