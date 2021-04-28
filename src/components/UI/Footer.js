import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const Stylefooter = styled.div`
  background-color: rgb(238, 238, 238);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

function Footer() {
  return (
    <Stylefooter>
      <footer>
        <Container>
          <Typography variant="body2" color="textSecondary" align="center">
            {new Date().getFullYear()}
            {
              ' - UNAM. Facultad de Química. Secretaría de Planeación e informatica. Todos los derechos reservados. |'
            }
            <Link
              target="_blank"
              color="initial"
              href="https://quimica.unam.mx/aviso-de-privacidad/"
            >
              {' Aviso de privacidad'}
            </Link>
            {'.'}
          </Typography>
        </Container>
      </footer>
    </Stylefooter>
  );
}
export default Footer;
