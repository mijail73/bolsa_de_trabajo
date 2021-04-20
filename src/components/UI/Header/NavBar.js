import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import InfoIcon from '@material-ui/icons/Info';
import React, { useState, useRef } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import {MyNavLink, TextoeIcono} from './MyNavLink';

const TopNav = styled.div`
  overflow: hidden;
  background: #215ab1;
  border: 1px solid #183b70;
`;

const SubNavA = styled.div`
  float: left;
  overflow: hidden;
  &:hover {
    background: #fff;
    color: #215ab1;
  }
  ${props => {
    if(props.toggle){
      return`
      ${SubNavContentA}{
        display: block;
      }
      `;
    }
  }}
`;

const SubNavB = styled.div`
  float: left;
  overflow: hidden;
  &:hover {
    background: #fff;
    color: #215ab1;
  }
  ${props => {
    if(props.toggle){
      return`
      ${SubNavContentB}{
        display: block;
      }
      `;
    }
  }}
`;

const SubNavContentA = styled.div`
  display: none;
  position: absolute;
  left: 0;
  background-color: #02337d;
  width: 100%;
  z-index: 500;
`;

const SubNavContentB = styled.div`
  display: none;
  position: absolute;
  left: 0;
  background-color: #02337d;
  width: 100%;
  z-index: 500;
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
  ${SubNavA}:hover & {
    color: #215ab1;
  }
  ${SubNavB}:hover & {
    color: #215ab1;
  }
`;

function NavBar() {
  const [mostrarSubNavA, setmostrarSubNavA] = useState(false);
  const handleToggleA = () => {
    setmostrarSubNavA(!mostrarSubNavA);
  };
  const refA = useRef();
  useOutsideClick(refA, () => {
    if(mostrarSubNavA) setmostrarSubNavA(false);
  });
  const [mostrarSubNavB, setmostrarSubNavB] = useState(false);
  const handleToggleB = () => {
    setmostrarSubNavB(!mostrarSubNavB);
  };
  const refB = useRef();
  useOutsideClick(refB, () => {
    if(mostrarSubNavB) setmostrarSubNavB(false);
  });
  const year = new Date().getFullYear();
  return (
    <TopNav id="navbar">
      <MyNavLink ruta="/" nombre="INICIO">
        <HomeIcon style={{ marginLeft: 5 }} />
      </MyNavLink>
      <SubNavA toggle={mostrarSubNavA} onClick={handleToggleA}>
        <SubNavButton>
          <TextoeIcono>
            POSTULANTES
            <PersonIcon style={{ marginLeft: 5 }} />
          </TextoeIcono>
        </SubNavButton>
        <SubNavContentA ref={refA}>
          <MyNavLink ruta="/vacantes" nombre="VACANTES DISPONIBLES" />
          <MyNavLink ruta="/tramites" nombre="TRÁMITES DE PRACTICAS PROFESIONALES" />
          <MyNavLink ruta="/btfq" nombre="EVENTOS DE BTFQ" />
        </SubNavContentA>
      </SubNavA>
      <SubNavB toggle={mostrarSubNavB} onClick={handleToggleB}>
        <SubNavButton>
          <TextoeIcono>
            EMPLEADORES
            <AssignmentIndIcon style={{ marginLeft: 5 }} />
          </TextoeIcono>
        </SubNavButton>
        <SubNavContentB ref={refB}>
          <MyNavLink ruta="/registro_vacantes" nombre="REGISTRAR UNA VACANTE O UNA PRÁCTICA PROFESIONAL" />
          <MyNavLink ruta="/info" nombre={`INFORMACIÓN DEL CORREDOR LABORAL ${year}`} />
          <MyNavLink ruta="/taller" nombre="QUIERO LLEVAR UN TALLER/ACTIVIDAD/WEBINAR A LA FQ" />
        </SubNavContentB>
      </SubNavB>
      <MyNavLink ruta="/contacto" nombre="CONTACTO">
        <ContactMailIcon style={{ marginLeft: 5 }} />
      </MyNavLink>
      <MyNavLink ruta="/acerca" nombre="ACERCA DE NOSOTROS">
        <InfoIcon style={{ marginLeft: 5 }} />
      </MyNavLink>
    </TopNav>
  );
}

export default NavBar;
