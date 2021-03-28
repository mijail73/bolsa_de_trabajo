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
  &.sticky {
    position: fixed;
    z-index: 1;
    width: 100vw;
    top: 0;
  }
`;

const SubNav = styled.div`
  float: left;
  overflow: hidden;
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
  z-index: 2;
  ${SubNav}:hover & {
    display: block;
  }
  &.sticky {
    position: fixed;
  }
`;

const TextoeIcono = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function NavBar() {
  document.addEventListener('DOMContentLoaded', () => {
    // When the event DOMContentLoaded occurs, it is safe to access the DOM

    // Get the navbar
    let navbar = document.getElementById('navbar');
    let postulantes = document.getElementById('postulantescontent');
    let empleadores = document.getElementById('empleadorescontent');

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;
    // console.log(sticky);
    // Add the sticky class to the navbar when you reach its scroll position.
    // Remove "sticky" when you leave the scroll position

    const shortSticky = function myFunctionForSticky() {
      // if (window.pageYOffset >= sticky) {
      //   console.log('window.pageYOffset >= sticky');
      // } else {
      //   console.log('Not window.pageYOffset >= sticky');
      // }
      if (window.pageYOffset >= sticky) {
        navbar.classList.add('sticky');
        postulantes.classList.add('sticky');
        empleadores.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
        postulantes.classList.remove('sticky');
        empleadores.classList.remove('sticky');
      }
    };

    // When the user scrolls the page, execute myFunction
    window.addEventListener('scroll', shortSticky);

    /*Toggle between adding and removing the "responsive" class to topnav
    when the user clicks on the icon*/

    // function myFunctionForResponsive() {
    //   navbar.classList.toggle('responsive');
    // }
  });
  const year = new Date().getFullYear();
  return (
    <TopNav id="navbar">
      <MyNavLink
        exact
        to="/"
        activeStyle={{
          color: '#ffff',
          background: '#49d049',
        }}
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
        <SubNavContent id="postulantescontent">
          <MyNavLink
            exact
            to="/vacantes"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            VACANTES DISPONIBLES
          </MyNavLink>
          <MyNavLink
            exact
            to="/tramites"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            TRÁMITES DE PRACTICAS PROFESIONALES
          </MyNavLink>
          <MyNavLink
            exact
            to="/btfq"
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
        <SubNavContent id="empleadorescontent">
          <MyNavLink
            exact
            to="/registro"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            REGISTRAR UNA VACANTE O UNA PRÁCTICA PROFESIONAL
          </MyNavLink>
          <MyNavLink
            exact
            to="/info"
            activeStyle={{
              color: '#ffff',
              background: '#49d049',
            }}
          >
            INFORMACIÓN DEL CORREDOR LABORAL {year}
          </MyNavLink>
          <MyNavLink
            exact
            to="/taller"
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
        to="/contacto"
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
        to="/acerca"
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
