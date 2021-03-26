import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import InfoIcon from '@material-ui/icons/Info';

const TopNav = styled.div`
  overflow: hidden;
  background: #215ab1;
  border: 1px solid #183b70;
  ${'' /* position: fixed; */}
  width: 100vw;
  ${'' /* z-index: 4; */}
`;

const SubNav = styled.div`
  float: left;
  overflow: hidden;
  ${'' /* postition: fixed; */}
  &:hover {
    background: #fff;
    color: #215ab1;
  }
`;

const SubNavButton = styled.button`
  font-size: 15px;
  font-family: 'Trebuchet MS', sans-serif;
  font-weight: bold;
  padding: 14px 16px;
  background-color: inherit;
  margin: 0;
  border: none;
  outline: none;
  color: white;
  &:hover {
    background: #fff;
    color: #215ab1;
  }
  ${SubNav}:hover & {
    color: #215ab1;
  }
`;

const MyNavLink = styled(NavLink)`
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

const SubNavContent = styled.div`
  display: none;
  position: absolute;
  left: 0;
  background-color: #02337d;
  width: 100%;
  z-index: 1;
  ${SubNav}:hover & {
    display: block;
  }
`;

const TextoeIcono = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function NavBar() {
  const year = new Date().getFullYear();
  return (
    <TopNav>
      <MyNavLink
        exact
        to="/"
        // activeStyle={{
        //   color: '#ffff',
        //   background: '#49d049',
        // }}
      >
        <TextoeIcono>
          INICIO
          <HomeIcon style={{ marginLeft: 5 }} />
        </TextoeIcono>
      </MyNavLink>
      <SubNav>
        <SubNavButton>
          <TextoeIcono>
            POSTULANTES
            <PersonIcon style={{ marginLeft: 5 }} />
          </TextoeIcono>
        </SubNavButton>
        <SubNavContent>
          <MyNavLink
            exact
            to="/"
            // activeStyle={{
            //   color: '#ffff',
            //   background: '#49d049',
            // }}
          >
            VACANTES DISPONIBLES
          </MyNavLink>
          <MyNavLink
            exact
            to="/"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            TRÁMITES DE PRACTICAS PROFESIONALES
          </MyNavLink>
          <MyNavLink
            exact
            to="/"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            EVENTOS DE BTFQ
          </MyNavLink>
        </SubNavContent>
      </SubNav>
      <SubNav>
        <SubNavButton>
          <TextoeIcono>
            EMPLEADORES
            <AssignmentIndIcon style={{ marginLeft: 5 }} />
          </TextoeIcono>
        </SubNavButton>
        <SubNavContent>
          <MyNavLink
            exact
            to="/"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            REGISTRAR UNA VACANTE O UNA PRÁCTICA PROFESIONAL
          </MyNavLink>
          <MyNavLink
            exact
            to="/"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            INFORMACIÓN DEL CORREDOR LABORAL {year}
          </MyNavLink>
          <MyNavLink
            exact
            to="/"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            QUIERO LLEVAR UN TALLER/ACTIVIDAD/WEBINAR A LA FQ
          </MyNavLink>
        </SubNavContent>
      </SubNav>
      <MyNavLink
        exact
        to="/"
        activeStyle={{
          color: '#ffff',
          background: '#49d049',
        }}
      >
        <TextoeIcono>
          CONTACTO
          <ContactMailIcon style={{ marginLeft: 5 }} />
        </TextoeIcono>
      </MyNavLink>
      <MyNavLink
        exact
        to="/"
        activeStyle={{
          color: '#ffff',
          background: '#49d049',
        }}
      >
        <TextoeIcono>
          ACERCA DE NOSOTROS
          <InfoIcon style={{ marginLeft: 5 }} />
        </TextoeIcono>
      </MyNavLink>
    </TopNav>
  );
}

export default NavBar;
