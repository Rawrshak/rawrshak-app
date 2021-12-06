import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3Provider } from './web3';
import { DataProvider } from './data';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Web3Provider>
        <DataProvider>
          <ToastContainer autoClose={2000} pauseOnFocusLoss={false} pauseOnHover={false} />
          <App />
        </DataProvider>
      </Web3Provider>
    </HashRouter>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();