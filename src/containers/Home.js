import React from 'react';
import { withSiteData, Head, RouteData } from 'react-static';
import styled from 'react-emotion';
import theme from '../theme';
import Page from '../components/page';
import FeaturedItem from '../components/featured-item';

const FeaturedBlock = styled('div')`
  background-color: ${theme.colors.backgroundImage};
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  padding: 2rem 0;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default withSiteData(({ title }) => (
  <RouteData
    render={types => (
      <React.Fragment>
        <Head>
          <title>{title} | Premium Hand-dyed Yarn</title>
        </Head>
        <Page>
          <FeaturedBlock>
            <FeaturedItem src="/gary.jpg" alt="Featured Item" />
            <FeaturedItem src="/gary.jpg" alt="Featured Item" />
            <FeaturedItem src="/gary.jpg" alt="Featured Item" />
          </FeaturedBlock>
        </Page>
      </React.Fragment>
    )}
  />
));
