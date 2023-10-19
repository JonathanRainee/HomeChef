import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Login } from './page/Login';
import reportWebVitals from './reportWebVitals';
import { Routes, Route , BrowserRouter as Router} from "react-router-dom"
import { Register } from './page/Register';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
