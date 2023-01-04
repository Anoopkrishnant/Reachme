import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { DarkModeContextProcider } from './context/darkModeContext';
import store from './redux/store/ReduxStore';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProcider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContextProcider>
  </React.StrictMode>
);

