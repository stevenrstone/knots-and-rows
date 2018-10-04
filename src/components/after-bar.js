import styled from 'react-emotion';
import theme from '../theme';

const cls = styled('hr')`
  background: ${theme.colors.bars};
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  content: '';
  height: 2px;
  margin: 2rem auto;
  width: 90%;
`;

export default cls;
