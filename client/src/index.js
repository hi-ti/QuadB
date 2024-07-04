import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/index.css';
import App from './App';
import AllState from './Context/AllState';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './Pages/Admin/contexts/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <AllState>
          <App />
        </AllState>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
