import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LoginProvider } from './context/login'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <App />
  </LoginProvider>
)
