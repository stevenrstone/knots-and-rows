import styled from 'react-emotion';
import theme from '../theme';

const cls = styled('hr')`
  background: ${theme.colors.bars};
  box-shadow: ${theme.styling.boxShadow};
  content: '';
  height: 2px;
  margin: 2rem auto;
  width: 90%;
`;

export default cls;
