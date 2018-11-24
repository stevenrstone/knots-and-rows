import { css } from 'react-emotion';
import theme from '../theme';

const linkStyle = css`
  color: ${theme.colors.link};
  font-family: ${theme.fonts.primary};
  text-decoration: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &:visited {
    color: ${theme.colors.linkVisited};
  }
`;

export default linkStyle;
