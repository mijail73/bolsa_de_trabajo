import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  float: left;
  font-size: 15px;
  font-family: 'Trebuchet MS', sans-serif;
  font-weight: bold;
  text-aling: center;
  padding: 14px 16px;
  text-decoration: none;
  color: white;
  &:hover {
    background: #fff;
    color: #215ab1;
  }
`;

const TextoeIcono = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function MyNavLink(props) {
  return (
    <StyledNavLink
      exact
      to={props.ruta}
      activeStyle={{
        color: '#ffff',
        background: '#29a329',
      }}
    >
      <TextoeIcono>
        {props.nombre}
        {props.children}
      </TextoeIcono>
    </StyledNavLink>
  );
}
export {MyNavLink, TextoeIcono};
