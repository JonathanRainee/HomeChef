import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom'


const App = () => {

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/Login');
  }

  const goToRegis = () => {
    navigate('/Register');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">HOME CHEF</h1>
      <div className="mt-4 flex flex-col">
        <button onClick={goToLogin} className="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          LOGIN
        </button>
        <button onClick={goToRegis} className="w-48 mt-2 bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default App;
