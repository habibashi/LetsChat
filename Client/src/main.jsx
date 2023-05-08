import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './app/store'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
)
