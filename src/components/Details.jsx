/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import Avatar from '../img/avatar.jpg';
import Header from './Header';
import '../styles/App.scss';
import '../styles/Details.scss';

const Detail = (props) => {
  // const { id } = props;
  console.log(props);

  return (
    <>
      <Header />
      <section className="detail__container">
        <div className="detail-card">
          <Link to="/consultasVigentes"><AiOutlineArrowLeft /></Link>
          <div className="detail">
            <h2>Detalle de consulta</h2>
            <p>ID 132</p>
            <div>
              <p>Fecha: 23/03/2021</p>
              <p>Tema: Modificación tributaria</p>
              <p>Sublo Tributario</p>
              <p>Socio a cargo: Cristina Yang Aval</p>
              <p>Gerente a cargo: Maria Alejendra Rivera Lopez</p>
            </div>
          </div>
          <div className="detail-state">
            <button type="button">Descargar consulta</button>
            <table>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
              </tr>
              <tr>
                <td>Total</td>
                <td>Estado</td>
              </tr>
            </table>
          </div>

        </div>
        <div className="consult-card">

          <div className="consult-container">
            <div className="consult-detail">
              <img className="avatar" src={Avatar} alt="avatar" />
              <div className="user-consult">
                <div className="name-consult">
                  <p>Maria Fernanda Cevedo</p>
                  <p>
                    Fecha: 23/03/2021 Hora: 10:56 Sublos Auditoria
                  </p>
                </div>
                <p className="consult-text">
                  Revisar el Decreto 90, considero que en una norma de emisión no se pueden medir todos los parámetros contaminantes,
                  frente a ello existe la alternativa de someter a las descargas a test ecotoxicológicos, a través de un principio que
                  lamentablemente no aparece en la modificación de la norma, como es el de no descargar efluentes tóxicos agudos a los
                  cuerpos de agua superficial. En mi experiencia efluentes que cumplen con la norma de emisión, no necesariamente protegen
                  la calidad ambiental, que es el objetivo de esta norma, por lo que agregar la obligación de realizar test de toxicidad con
                  el efluente final debiera ser un requisito para garantizar el cumplimiento de la norma de emisión y que contribuye a su
                  objetivo. Solo aquellas fuentes emisoras que tienen RCA donde se requieren ensayos de toxicidad en sus programas de vigilancia
                  lo realizan, ¿por que no extender esta obligación a todas las fuentes emisoras que emitan mas de un volumen anual que determine
                  la norma (de la misma forma que el volumen descargado determina el numero de monitoreos mensuales que se deben ejecutar?). Así nos
                  aseguramos que efluentes que cumplen con los parámetros físicos y químicos exigidos son también no-tóxicos para el cuerpo receptor,
                  a forma que regulaciones mas avanzadas, como por ejemplo, la canadiense, lo exigen. Ser sostenibles requiere de esfuerzos adicionales.
                </p>
              </div>
            </div>
          </div>
          <div className="attachment">
            <h2>Archivos adjuntos</h2>
            <table className="table">
              <thead>
                <tr className="border-table">
                  <th scope="col">Nombre del archivo</th>
                  <th scope="col">Archivo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Comercio exterior</td>
                  <td>
                    {' '}
                    <BsFileEarmarkArrowDown fontSize="1.5rem" />
                    {' '}
                    <a href="#/">Ver</a>
                  </td>
                </tr>
                <tr>
                  <td>Modificación de procesos internos</td>
                  <td>
                    {' '}
                    <BsFileEarmarkArrowDown fontSize="1.5rem" />
                    {' '}
                    <a href="#/">Ver</a>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
        <div className="add-consult">
          <p>Formulario</p>

        </div>
      </section>
    </>
  );
};
export default Detail;
// Detail.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   id: PropTypes.object.isRequired,
// };
