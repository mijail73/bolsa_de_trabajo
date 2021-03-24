import styled from 'styled-components';
import quimica from '../../../img/logo_quimica.png';
import unam from '../../../img/logo_unam.png';

const HeaderFondoAzul = styled.div`
  height: 250px;
  padding: 30px;
  margin: 0px;
  display: flex;
  justify-content: center;
  text-align: center;
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  color: #fff;
  font-size: 25px;
  z-index: 1;
  grid-template-columns: repeat(3, 1fr); */}
  font-family: 'Trebuchet MS', sans-serif;
  @media screen and (max-width: 600px) {
    height: 65px;
    font-size: .8rem;
    padding-top: 10px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const LogoQuimica = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  background-image: url(${quimica});
  z-index: 1;
  left: 0px;
  top: 0px;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    left: -150px;
  }
`;

const LogoUnam = styled.div`
  width: 250px;
  height: 300px;
  position: absolute;
  background-image: url(${unam});
  z-index: 1;
  right: 0px;
  top: 0px;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    right: -120px;
  }
`;

const Titulo = styled.h1`
  position: relative;
  margin-top: 0px;
  z-index: 2;
  @media screen and (max-width: 825px) and (min-width: 600px) {
    -webkit-text-stroke: 2px black;
  }
`;

const Subtitulo = styled.h2`
  position: relative;
  z-index: 2;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 825px) and (min-width: 600px) {
    -webkit-text-stroke: 2px black;
  }
`;

const SubtituloCelular = styled.h2`
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

function TopHeader() {
  return (
    <HeaderFondoAzul>
      <LogoQuimica />
      <div>
        <Titulo>FACULTAD DE QUÍMICA</Titulo>
        <Subtitulo>BOLSA DE TRABAJO</Subtitulo>
        <Subtitulo>Y PRÁCTICAS PROFESIONALES</Subtitulo>
        <SubtituloCelular>
          BOLSA DE TRABAJO Y PRÁCTICAS PROFESIONALES
        </SubtituloCelular>
      </div>
      <LogoUnam />
    </HeaderFondoAzul>
  );
}

export default TopHeader;
