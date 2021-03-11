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
import '../styles/App.scss';
import '../styles/Details.scss';

const Detail = () => {
  //
  const initialValue = {
    sector: '',
    query: '',
  };
  const [values, setValues] = useState(initialValue);
  const [files, setFiles] = useState([]);
  // const [links, setLinks] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const newFile = e.target.files[i];
      newFile.id = Math.random();
      // add an "id" property to each File object
      setFiles((prevState) => [...prevState, newFile]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('queries').add({
      user: currentUser.uid,
      time: new Date(),
      adviser: 'Regina Díaz',
      status: 'pendiente',
      ...values,
    }).then((docRef) => {
      const promisesArr = [];
      files.forEach((file) => {
        const storageRef = storage.ref(`doc/${file.name}`);
        const fileRef = storageRef.child(file.name);
        const promise = fileRef.put(file).then(() => fileRef.getDownloadURL());
        promisesArr.push(promise);
      });
      Promise.all(promisesArr).then((arr) => db.collection('queries').doc(docRef.id).update({
        imgs: arr,
      }));
      setValues(initialValue);
      setFiles([]);
    });
  };
  //
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
        <div className="consult-card">

          <div className="consult-container">
            <div className="consult-detail">
              <img className="avatar" src={Avatar} alt="avatar" />
              <div className="user-consult">
                <div className="name-consult">
                  <p>Maria Fernanda Cevedo</p>
                  <p>
                    Fecha:
                    {client.status}
                    Sublos Auditoria
                  </p>
                </div>
                <p className="consult-text">
                  {client.query}
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
                {client.imgs && client.imgs.map((img, index) => (
                  <tr>
                    <td>
                      Archivo
                      {index + 1}
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
        </div>
        <div className="add-consult">
          <div className="col-6">
            <Form action="post" onSubmit={handleSubmit} className="m-4">
              <Form.Group as={Row} controlId="formHorizontalEmail" className="m-2 d-flex justify-start" />
              <Form.Group className="mx-auto col-10 ">
                <Form.Group as={Row} md="8" controlId="formHorizontalEmail" />
                <Form.Group as={Row} controlId="formHorizontalPassword" />
                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={4}>
                    Consulta realizada
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={handleChange}
                      type="text"
                      name="query"
                      value={values.query}
                    />
                  </Col>
                </Form.Group>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalEmail" className="mx-auto col-10 ">
                <Form.Label column sm={4} />
                <Col>
                  <Form.File id="exampleFormControlFile1" name="doc1" onChange={onFileChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalCheck" className="d-flex align-items-center mx-auto col-10  ">
                <Col sm={{ span: 6, offset: 5 }}>
                  <button type="submit" className="btn btn-secondary">Enviar</button>
                </Col>
              </Form.Group>

            </Form>
          </div>

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
