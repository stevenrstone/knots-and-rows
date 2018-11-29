import React from 'react'; // eslint-disable-line
import { Router, withSiteData } from 'react-static';
import { Route } from 'react-router';
import { hot } from 'react-hot-loader';
import { css } from 'emotion';
import Routes from 'react-static-routes'; // eslint-disable-line
import GoogleAnalytics from 'react-ga';
import theme from './theme';
import Analytics from './components/analytics';

import initCart from './util/cart';

const body = css`
  background-color: ${theme.colors.background};
  margin: 0;
  padding: 0;
`;

const App = withSiteData(({ shopifyClientInfo }) => {
  if (typeof document !== 'undefined') {
    document.body.classList.add(body);
  }
  if (typeof window !== 'undefined') {
    GoogleAnalytics.initialize('UA-130057173-1');
    GoogleAnalytics.pageview('initial load');
  }
  initCart(shopifyClientInfo);
  return (
    <Router className={body}>
      <div>
        <div className="content">
          <Route path="/" component={Analytics} />
          <Routes />
        </div>
      </div>
    </Router>
  );
});

export default hot(module)(App);
