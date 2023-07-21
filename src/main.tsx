import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from '../src/slices/leadSlice';
import userReducer from '../src/slices/userSlice';
import { AuthProvider } from 'react-auth-kit';

const store = configureStore({
   reducer: {
      leads: leadsReducer,
      user: userReducer,
   },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}>
         <AuthProvider
            authType="cookie"
            authName="_auth"
            cookieSecure={true}
            cookieDomain={window.location.hostname}
         >
            <BrowserRouter>
               <div className="app_container">
                  <App />
               </div>
            </BrowserRouter>
         </AuthProvider>
      </Provider>
   </React.StrictMode>,
);
