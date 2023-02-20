import styled from 'styled-components';
import theme from '../theme';

const Container = styled.main`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;
  padding: ${theme.spacing(4)};
`;

export default Container;
