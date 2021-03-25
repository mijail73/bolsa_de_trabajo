import styled from 'styled-components';
import quimica from '../../../img/logo_quimica.png';
import unam from '../../../img/logo_unam.png';

const HeaderFondoAzul = styled.div`
  height: 145px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-image: linear-gradient(
    180deg,
    rgba(26, 59, 136, 1) 0%,
    rgba(38, 79, 145, 1) 35%,
    rgba(51, 101, 154, 1) 100%
  );
  color: #fff;
  font-size: 18px;
  overflow: auto;
  font-family: 'Trebuchet MS', sans-serif;
  @media screen and (max-width: 500px) {
    padding: 0px;
    font-size: 11px;
    justify-content: center;
    height: 65px;
    h1 {
      margin: 0px;
    }
    h2 {
      margin: 0px;
    }
    img {
      display: none;
    }
  }
  @media screen and (min-width: 501px) and (max-width: 630px) {
    height: 65px;
    font-size: 0.6rem;
    h1 {
      margin-top: 0px;
    }
  }
  @media screen and (min-width: 631px) and (max-width: 930px) {
    font-size: 0.8rem;
  }
`;

function TopHeader() {
  return (
    <HeaderFondoAzul>
      <img src={quimica} alt="" />
      <div>
        <h1>FACULTAD DE QUÍMICA</h1>
        <h2>BOLSA DE TRABAJO Y PRÁCTICAS PROFESIONALES</h2>
      </div>
      <img src={unam} alt="" />
    </HeaderFondoAzul>
  );
}

export default TopHeader;
