import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Main entry point for the React application
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/scrollbar.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
