import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(0.001, 0.001),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function Foo() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" align="center">
          {new Date().getFullYear()}
          {
            ' - UNAM. Facultad de Química. Secretaría de Planeación e informatica. Todos los derechos reservados. |'
          }
          <Link
            color="blue"
            href="https://quimica.unam.mx/aviso-de-privacidad/"
          >
            {' Aviso de privacidad'}
          </Link>
          {'.'}
        </Typography>
      </Container>
    </footer>
  );
}
export default Foo;
