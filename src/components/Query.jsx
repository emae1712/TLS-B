/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import { storage, db } from '../firebase/fb-configuration';
import { AuthContext } from '../Context/Auth';

const Query = () => {
  const [values, setValues] = useState('');
  const [files, setFiles] = useState([]);
  // const [links, setLinks] = useState([]);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.uid);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setValues({ ...values, [name]: value });
    console.log('values', values);
  };
  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const newFile = e.target.files[i];
      newFile.id = Math.random();
      // add an "id" property to each File object
      setFiles((prevState) => [...prevState, newFile]);
    }
  };
  console.log(files);
  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('users').add({
      user: currentUser.uid,
      values,
    });
    files.forEach(async (file) => {
      console.log(file.id);
      const promises = [];
      const storageRef = storage.ref(`doc/${file.name}`);
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then((snapshot) => {
        const url = snapshot.ref.getDownloadURL();
        promises.push(url);
      });
      console.log(promises);
    });
  };

  console.log(files);

  return (
    <div className="col-10 ">
      <Form action="post" onSubmit={handleSubmit}>
        <Form.Group as={Row} md="8" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            ID Consultas 22687
          </Form.Label>
          <Col sm={6}>
            <Form.Label column sm={6}>
              Gerente a cargo
            </Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} md="8" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Fecha de Consulta
          </Form.Label>
          <Col sm={6}>
            <Form.Label column sm={2}>
              09/03/2021
            </Form.Label>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
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
          <Form.Label column sm={2} />
          <Col sm={4}>
            <Form.Control type="text" placeholder="documento" />
          </Col>
          <Col>
            <button type="button" className="btn-gray">Adjuntar</button>
            {/* <Form.File id="exampleFormControlFile1" label="Example file input" /> */}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2} />
          <Col sm={4}>
            <Form.Control type="text" placeholder="documento" />
          </Col>
          <Col>
            <button type="button" className="btn-gray">Adjuntar</button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2} />
          <Col sm={4}>
            <Form.Control type="text" placeholder="documento" />
          </Col>
          <Col>
            <Form.File id="exampleFormControlFile1" label="Example file input" name="doc1" onChange={onFileChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalCheck" className="d-flex align-items-center">
          <Form.Label column sm={2}>
            ¿La consulta es confidentacial?
          </Form.Label>
          <Col sm={{ span: 3 }}>
            <Form.Check
              type="radio"
              label="si"
              name="yesRadio"
              id="formHorizontalRadios1"
            />
          </Col>
          <Col sm={{ span: 3 }}>
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

  );
};
export default Query;
