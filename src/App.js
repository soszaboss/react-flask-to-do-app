import React, { Component } from 'react';
import './App.css';
import Header from "./component/header/Header"; // Corrected import statement
import Task from './component/task/Task';

class App extends Component {
  render() {
    return (
        <Task />
    );
  }
}

export default App;
