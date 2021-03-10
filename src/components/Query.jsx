/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import { storage, db } from '../firebase/fb-configuration';
import { AuthContext } from '../Context/Auth';
import Header from './Header';
import '../styles/App.scss';

const Query = () => {
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
  // console.log(files);
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
    });
  };
  // console.log(files);

  return (
    <>
      <Header />
      <div className="col-10  query__container">
        <Form action="post" onSubmit={handleSubmit}>
          <Form.Group as={Row} md="8" controlId="formHorizontalEmail">
            <Form.Label>
              ID Consultas 22687
            </Form.Label>
          </Form.Group>
          <Form.Group as={Row} md="8" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Fecha de Consulta
            </Form.Label>
            <Col sm={6}>
              <Form.Label column sm={2}>
                09/03/2021
              </Form.Label>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={4}>
              Tema
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                rows={3}
                onChange={handleChange}
                type="text"
                name="sector"
                value={values.sector}
              />
            </Col>
          </Form.Group>
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
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={4} />
            <Col>
              <Form.File id="exampleFormControlFile1" name="doc1" onChange={onFileChange} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCheck" className="d-flex align-items-center">
            <Form.Label column sm={4}>
              ¿La consulta es confidentacial?
            </Form.Label>
            <Col sm={{ span: 2 }}>
              <Form.Check
                type="radio"
                label="si"
                name="yesRadio"
                id="formHorizontalRadios1"
              />
            </Col>
            <Col sm={{ span: 2 }}>
              <Form.Check
                type="radio"
                label="No"
                name="noRadio"
                id="formHorizontalRadios2"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 4 }}>
              <button type="submit" className="btn btn-secondary">Enviar</button>
            </Col>
          </Form.Group>

        </Form>
      </div>
    </>
  );
};
export default Query;
