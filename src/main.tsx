import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from 'react-auth-kit';
import store from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

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
               <PersistGate loading={null} persistor={persistor}>
                  <div className="app_container">
                     <App />
                  </div>
               </PersistGate>
            </BrowserRouter>
         </AuthProvider>
      </Provider>
   </React.StrictMode>,
);
