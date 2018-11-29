// import React from 'react'
import GoogleAnalytics from 'react-ga';

const Analytics = () => {
  if (typeof window !== 'undefined') {
    GoogleAnalytics.set({ page: window.location.pathname });
    GoogleAnalytics.pageview(window.location.pathname);
  }
  return null;
};

export default Analytics;
