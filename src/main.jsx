import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { DiaryProvider } from './state/DiaryContext.jsx';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><HashRouter><DiaryProvider><App /></DiaryProvider></HashRouter></React.StrictMode>,
);
