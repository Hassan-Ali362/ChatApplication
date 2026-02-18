import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" />
    </BrowserRouter>
  </StrictMode>,
)


// using router in index.jsx to wrap the entire app with BrowserRouter.
// not in App.jsx because we want to keep the routing logic separate from the app logic, and also to avoid wrapping the entire app with BrowserRouter, which can cause performance issues.
// performance issues because BrowserRouter uses the HTML5 history API to keep the UI in sync with the URL, and it can cause unnecessary re-renders of the entire app when the URL changes, which can lead to performance issues. By wrapping only the components that need routing with BrowserRouter, we can avoid unnecessary re-renders and improve the performance of the app.
// also, by keeping the routing logic separate from the app logic, we can make the code more modular and easier to maintain. We can easily change the routing logic without affecting the app logic, and vice versa.
