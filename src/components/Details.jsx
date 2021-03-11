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
                {client.time && new Date(client.time.seconds * 1000).toDateString('es', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
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
            <a href="#/">Descargar consulta</a>
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
        <Answer querieId={id} />
        <div className="add-consult">
          <TableDetail querieId={id} />
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
