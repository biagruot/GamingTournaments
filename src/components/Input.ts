import styled from 'styled-components';
import theme from '../theme';

// Hide the label visually but still make it available to screen reader user
export const Label = styled.label`
  position: absolute;
  left: -9999px;
  visibility: hidden;
`;

const Input = styled.input`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(2)};
  border: none;
  color: ${theme.palette.text.primary};
`;

export default Input;
