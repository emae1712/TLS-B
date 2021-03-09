import React from 'react';
import {
  Col, Form, Row,
} from 'react-bootstrap';

const Query = () => {
  console.log('home');
  return (
    <div className="col-10 ">
      <Form>
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
            Fecha de Respuesta
          </Form.Label>
          <Col sm={6}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Consulta realizada
          </Form.Label>
          <Col sm={6}>
            <Form.Control as="textarea" rows={3} />
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
            <button type="button" className="btn-gray">Adjuntar</button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalCheck" className="d-flex align-items-center">
          <Form.Label column sm={2}>
            ¿La consulta es confidentacial?
          </Form.Label>
          <Col sm={{ span: 3 }}>
            <Form.Check label="Si" />
          </Col>
          <Col sm={{ span: 3 }}>
            <Form.Check label="No" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 4 }}>
            <button type="button" className="btn btn-secondary">Enviar</button>
          </Col>
        </Form.Group>

      </Form>
    </div>

  );
};
export default Query;
