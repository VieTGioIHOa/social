import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import AppContextProvider from './context/AppContext'
import { store, persistor } from './redux/store'
import GlobalStyle from './components/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppContextProvider>
                    <GlobalStyle><App /></GlobalStyle>
                </AppContextProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
