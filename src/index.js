import ReactDOM from 'react-dom/client'
// import BaseRouter from './router'
import Router from './router';
import './assets/base.css'
// import store from './store'
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit'

const container = document.getElementById('root');

// const preloadedState = window.__PRELOADED_STATE__
// serverState={preloadedState}

// Create a root.
const root = ReactDOM.createRoot(container);
root.render(
    <Router />
);