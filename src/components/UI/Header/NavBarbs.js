import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const NavBarStyle = {
  padding: '0',
};

const HorizontalBar = styled.div`
  display: block;
  width: 144px;
  height: 1px;
  border: 0;
  border-top: 3px solid #215ab1;
  padding: 0;
`;

const ingresar = {
  color: '#425A7E',
  backgroundColor: 'transparent',
  marginRight: '5px',
  border: 'none',
};

const empresa = {
  backgroundImage:
    'linear-gradient(90deg, hsla(216, 69%, 41%, 1) 0%, hsla(230, 66%, 13%, 1) 100%)',
  color: 'white',
  borderRadius: '8px',
};

function NavBarbs() {
  return (
    <Navbar
      bg="light"
      sticky="top"
      style={NavBarStyle}
      className="shadow"
      expand="md"
    >
      <Container style={{ padding: '5px' }}>
        <Col>
          <Row>
            <NavLink
              exact
              to="/"
              style={{ textDecoration: 'none', color: '#215ab1' }}
            >
              Bolsa de Trabajo
            </NavLink>
          </Row>
          <Row>
            <NavLink exact to="/">
              <HorizontalBar></HorizontalBar>
            </NavLink>
          </Row>
          <Row>
            <NavLink
              exact
              to="/"
              style={{ textDecoration: 'none', color: '#215ab1' }}
            >
              Facultad de Química
            </NavLink>
          </Row>
        </Col>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav" style={{borderColor: '#215ab1'}}
        >
          <MenuIcon style={{color: '#215ab1'}}/>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="d-flex justify-content-end">
            <NavLink exact to="/">
              <Button variant="outline-light" style={ingresar}>
                Ingresar
              </Button>{' '}
            </NavLink>
            <NavLink exact to="/">
              <Button variant="outline-light" style={empresa}>
                Soy Empresa
              </Button>{' '}
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarbs;
