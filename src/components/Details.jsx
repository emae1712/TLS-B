/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState, useContext } from 'react';
import {
  Link, useParams,
} from 'react-router-dom';
import {
  Col, Form, Row,
} from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { AiOutlineArrowLeft, AiOutlineClockCircle } from 'react-icons/ai';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import { AuthContext } from '../Context/Auth';
import { storage, db } from '../firebase/fb-configuration';
import Avatar from '../img/avatar.jpg';
import Header from './Header';
import TableDetail from './TableDetail';
import Answer from './Request';
import '../styles/App.scss';
import '../styles/Details.scss';

const Detail = () => {
  // base de datos del detalle de la consulta
  const { id } = useParams();
  const [client, setClient] = useState([]);

  const prueba = () => {
    switch (client.status) {
      case 'pendiente': return <a rel="noopener noreferrer" target="_blank" href="https://drive.google.com/file/d/1IlHjeDOkk2GD5U2Cu_KYADcKFmOJCos6/view?usp=sharing">Descargar consulta</a>;
      case 'Atendida': return <a rel="noopener noreferrer" target="_blank" href="https://drive.google.com/file/d/171i1wxedrW9O_aq4f7NBAb-jJVwTr29e/view?usp=sharing">Descargar consulta</a>;
      case 'Resuelta': return <a rel="noopener noreferrer" target="_blank" href="https://drive.google.com/file/d/19n7kTn36dlSPtqimIDOShxyXuQlTwMCO/view?usp=sharing">Descargar consulta</a>;

      default: return <h1> </h1>;
    }
  };

  useEffect(() => {
    db.collection('queries').doc(id).get()
      .then((doc) => setClient(doc.data()));
  }, [id]);
  return (
    <>
      <Header />
      <section className="detail__container">
        <div className="detail-card">
          {
          client.status === 'Resuelta'
            ? <Link to="/consultasHistoricas" className="return"><AiOutlineArrowLeft /></Link>

            : <Link to="/consultasVigentes" className="return"><AiOutlineArrowLeft /></Link>
          }
          <div className="detail">
            <h2>Detalle de consulta</h2>
            <p>ID 132</p>
            <div>
              <p>
                Fecha:
                {client.fecha}
              </p>
              <p>
                Tema:
                { client.sector }
              </p>
              <p>Sublos: Tributario</p>
              <p>Socio a cargo: Cristina Yang Aval</p>
              <p>Gerente a cargo: Maria Alejendra Rivera Lopez</p>
            </div>
          </div>
          <div className="detail-state">
            {prueba()}
            <table>
              <tr>
                <th>
                  {' '}
                  <AiOutlineClockCircle />
                  {' '}
                </th>
                <th className={client.status === 'Atendida' ? 'atendida' : 'pendiente'}>{ client.status }</th>
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
                  <p>{client.userName}</p>
                  <p>
                    {client.fecha}
                  </p>
                </div>
                <p className="consult-text">
                  {client.query}
                </p>
              </div>
            </div>
          </div>
          { client.imgs && client.imgs.length === 0 ? ''
            : (
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
                    { client.imgs && client.imgs.map((img, i) => (
                      <tr index={i}>
                        <td>
                          Archivo
                          {i + 1}
                        </td>
                        <td>
                          {' '}
                          <BsFileEarmarkArrowDown fontSize="1.5rem" />
                          {' '}
                          <a rel="noopener noreferrer" href={img} target="_blank">Ver</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}
        </div>
        <Answer querieId={id} />
        <div className="add-consult">
          <TableDetail querieId={id} />
        </div>
        <button type="button">Finalizar consulta</button>
      </section>
    </>
  );
};
export default Detail;
// Detail.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   id: PropTypes.object.isRequired,
// };
