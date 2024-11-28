import React from 'react'
import './styles/global.css'
import CreateEmployee from './components/CreateEmployee/CreateEmployee.jsx'


const App = () => {
  return (
    <div className="App">
      <h1>HRNet</h1>
      <CreateEmployee />
    </div>
  );
};

export default App