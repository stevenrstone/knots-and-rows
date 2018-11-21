import React from 'react';
import { Router, withSiteData } from 'react-static';
import { hot } from 'react-hot-loader';
import { css } from 'astroturf';
import Routes from 'react-static-routes';

import initCart from './util/cart';

const styles = css`
  .body {
    margin: 0;
    padding: 0;
  }
`;

const App = withSiteData(({ shopifyClientInfo }) => {
  if (typeof document !== 'undefined') {
    document.body.classList.add(styles.body);
  }
  initCart(shopifyClientInfo);
  return (
    <Router className={styles.body}>
      <div>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  );
});

export default hot(module)(App);
