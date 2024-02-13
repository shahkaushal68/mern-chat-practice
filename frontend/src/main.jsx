
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
  // </React.StrictMode>,
)
