import React from 'react';
import styled from 'react-emotion';
import Afterbar from './after-bar';
import theme from '../theme';

const LegalCopy = styled('p')`
  color: ${theme.colors.copy};
  margin: 1rem auto;
  max-width: 80%;
`;

export default () => (
  <React.Fragment>
    <Afterbar />
    <LegalCopy>Le Legal Info</LegalCopy>
  </React.Fragment>
);
