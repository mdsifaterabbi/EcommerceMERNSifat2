import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './authContextAPI.jsx'
import { SearchContextProvider } from './searchContextAPI.jsx'
import { CartContextProvider } from './CartContextAPI.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SearchContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartContextProvider>
    </SearchContextProvider>
  </AuthContextProvider>,
)
