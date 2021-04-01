import React from 'react';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon  from '@material-ui/icons/Person';
import './../App.css';

const Contacto = () => {
  return (
    <section className="Contacto">
      <div className="Contacto-info">
        <h1>Contacto</h1>
      </div>
      <div>
        <p className="Descripcion-info">
          Para cualquier duda que tengas con respecto a la Bolsa de
          Trabajo y Prácticas Profesionales puedes dirigirte con:
        </p>
      </div>
      <div className="Datos-info">
        <PersonIcon></PersonIcon>
        <strong> Nombre</strong>
        <p className="Combo-info">
          Maestro Javier Olguin Huerta, Encargada de BTYPP
        </p>
        <br />
        <EmailIcon /> <strong> Correo</strong>
        <p className="Combo-info">bolsatradebajofq@unam.mx</p>
        <br />
        <CallIcon></CallIcon>
        <strong> Teléfono</strong>
        <p className="Combo-info">55 55 55 55 55</p>
      </div>
    </section>
  );
};

export default Contacto;
