import ReactDOM from 'react-dom/client'
// import BaseRouter from './router'
import Router from './router';
import './assets/base.css'

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);
root.render( <Router /> );