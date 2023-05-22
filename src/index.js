import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { fetchUser } from './store/userSlice';
import App from './App';
import './App.css';
import store from './store/store';
store.dispatch(fetchUser());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
