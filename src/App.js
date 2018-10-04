import React from 'react';
import { Router } from 'react-static';
import { hot } from 'react-hot-loader';
import { css } from 'emotion';

import Routes from 'react-static-routes';

const body = css`
  margin: 0;
  padding: 0;
`;

const App = () => {
  if (typeof document !== 'undefined') {
    document.body.classList.add(body);
  }
  return (
    <Router className={body}>
      <div>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  );
};

export default hot(module)(App);
