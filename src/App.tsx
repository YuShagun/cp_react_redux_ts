import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import About from './pages/About';
import Home from './pages/Home';
import Receipt from './pages/Receipt';
import ReceiptUpload from './pages/ReceiptUpload/ReceiptUpload';

import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';



function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/receipt/:id" component={Receipt} />
        <Route path='/upload' component={ReceiptUpload} />
        <Route path="/about" component={About} />
        <Route path="/app">

          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <Counter />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <span>
                <span>Learn </span>
                <a
                  className="App-link"
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>
                <span>, </span>
                <a
                  className="App-link"
                  href="https://redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux
                </a>
                <span>, </span>
                <a
                  className="App-link"
                  href="https://redux-toolkit.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux Toolkit
                </a>
                ,<span> and </span>
                <a
                  className="App-link"
                  href="https://react-redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Redux
                </a>
              </span>
            </header>
          </div>

        </Route>
        <Route path="/" component={Home} />
      </Switch>
    </Router >
  );
}

export default App;
