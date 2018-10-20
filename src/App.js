import React from 'react';
import { Router, withSiteData } from 'react-static';
import { hot } from 'react-hot-loader';
import { css } from 'emotion';
import Routes from 'react-static-routes';

import initCart from './util/cart';

const body = css`
  margin: 0;
  padding: 0;
`;

const App = withSiteData(({ shopifyClientInfo }) => {
  if (typeof document !== 'undefined') {
    document.body.classList.add(body);
  }
  initCart(shopifyClientInfo);
  return (
    <Router className={body}>
      <div>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  );
});

export default hot(module)(App);
