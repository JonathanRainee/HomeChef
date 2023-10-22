import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Login } from './page/Login';
import reportWebVitals from './reportWebVitals';
import { Routes, Route , BrowserRouter as Router} from "react-router-dom"
import { Register } from './page/Register';
import {AuthContextProvider} from "./context/authContext"
import ProtectedRoute from './middleware/ProtectesRoute';
import { Home } from './page/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path = '/Home' element = {<ProtectedRoute><Home /></ProtectedRoute>}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
