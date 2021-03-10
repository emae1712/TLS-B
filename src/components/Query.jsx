import React, { useState } from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import { storage } from '../firebase/fb-configuration';

const Query = () => {
  const initialStateValues = {
    query: '',
    doc1: '',
    doc2: '',
    doc3: '',
    confidential: '',
  };
  const [values, setValues] = useState(initialStateValues);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setValues({ ...values, [name]: value });
    console.log(values);
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
    console.log('click');
    setValidated(true);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log('click');
    setValues(initialStateValues);
  };
  const onChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const storageRef = storage.ref(`doc/${file.name}`);

    storageRef.put(file).then((snapshot) => snapshot.ref.getDownloadURL());
  };
  return (
    <div className="col-10 ">
      <Form action="post" noValidate validated={validated} onFormSubmit={onSubmit} onSubmit={handleSubmit}>
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
            <Form.File id="exampleFormControlFile1" label="Example file input" onChange={onChange} />
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
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
          </Col>
          <Col sm={{ span: 3 }}>
            <Form.Check
              type="radio"
              label="No"
              name="formHorizontalRadios"
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
