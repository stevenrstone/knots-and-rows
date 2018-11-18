import styled from 'react-emotion';
import theme from '../theme';

const Paragraph = styled('p')`
  color: ${theme.colors.copy};
  font-family: ${theme.fonts.primary};
  font-size: 16px;
  padding: 0 0.5rem;
`;

export default Paragraph;
