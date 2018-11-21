import React from 'react';
import { withSiteData, Head, RouteData } from 'react-static';
import styled from 'astroturf';
import Page from '../components/page';
import FeaturedItem from '../components/featured-item';

const FeaturedBlock = styled('div')`
  @import '../theme.scss';
  background-color: $colorBackgroundImage;
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
    render={() => (
      <React.Fragment>
        <Head>
          <title>{title} | Premium Hand-dyed Yarn</title>
        </Head>
        <Page>
          <FeaturedBlock>
            <FeaturedItem src="/gary.svg" alt="Featured Item" />
            <FeaturedItem src="/gary.svg" alt="Featured Item" />
            <FeaturedItem src="/gary.svg" alt="Featured Item" />
          </FeaturedBlock>
        </Page>
      </React.Fragment>
    )}
  />
));
