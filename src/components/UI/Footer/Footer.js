import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const Stylefooter = styled.div`
  margin-top: 1rem;
  background-color: rgb(192, 192, 192, 0.4);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

function Foo() {
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
export default Foo;
