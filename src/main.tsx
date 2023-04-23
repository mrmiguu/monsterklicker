import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <App />
    <Toaster
      containerClassName="toaster text-4xl"
      toastOptions={{
        className: 'rounded-none shadow-none drop-shadow-pixel',
      }}
    />
  </ErrorBoundary>,
  // </React.StrictMode>,
)
