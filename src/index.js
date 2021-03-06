import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

// Your top level component
import App from './App';

// Export your top level component as JSX (for static rendering)
export default App;

if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/krsw.js');
}

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render;
  const render = (Comp) => {
    renderMethod(<Comp />, document.getElementById('root'));
  };

  // Render!
  render(App);
}
