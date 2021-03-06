import React from 'react';
import {
  withSiteData, Head, RouteData, Link,
} from 'react-static';
import styled from 'react-emotion';
import theme from '../theme';
import Page from '../components/page';
import FeaturedItem, { featuredLink } from '../components/featured-item';

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
    render={({ featuredProducts }) => (
      <React.Fragment>
        <Head>
          <title>{title} | Premium Hand-dyed Yarn</title>
          <meta
            name="description"
            content="Knots and Rows, where each skein is hand-dyed to be unique and, like you, beautiful with love at its core. Based in Kansas City."
          />
          <meta
            name="og:image"
            content="https://knotsandrows.com/featured-phoenix-rising.jpg"
          />
        </Head>
        <Page>
          <FeaturedBlock>
            {featuredProducts.map(fp => (
              <Link to={fp.path} key={fp.title} className={featuredLink}>
                <FeaturedItem
                  src={fp.imageUrl}
                  alt={fp.title}
                  title={fp.title}
                />
              </Link>
            ))}
          </FeaturedBlock>
        </Page>
      </React.Fragment>
    )}
  />
));
