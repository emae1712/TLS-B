/* eslint-disable react/forbid-prop-types */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Col, Form, Row,
} from 'react-bootstrap';
import { storage, db } from '../firebase/fb-configuration';
import { AuthContext } from '../Context/Auth';
import '../styles/App.scss';

const TableDetail = (props) => {
  const { querieId } = props;
  const initialValue = {
    answer: '',
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

  const today = moment().format('DD MM YYYY hh:mm:ss');
  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('queries').doc(querieId).collection('answer').add({
      user: currentUser.uid,
      time: new Date(),
      fecha: today,
      timeRequest: '',
      status: 'pendiente',
      ...values,
    })
      .then((docRef) => {
        const promisesArr = [];
        files.forEach((file) => {
          const storageRef = storage.ref(`doc/${file.name}`);
          const fileRef = storageRef.child(file.name);
          const promise = fileRef.put(file).then(() => fileRef.getDownloadURL());
          promisesArr.push(promise);
        });
        Promise.all(promisesArr).then((arr) => db.collection('queries').doc(querieId).collection('answer').doc(docRef.id)
          .update({
            imgs: arr,
          }));
        setValues(initialValue);
        setFiles([]);
      });
  };

  localStorage.setItem('data', JSON.stringify(files));
  return (
    <div className="col-12">
      <Form action="post" onSubmit={handleSubmit} className="m-4">
        <Form.Group className="mx-auto col-12 ">
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={12}>
              Añadir consulta
            </Form.Label>
            <Col sm={12}>
              <Form.Control
                as="textarea"
                className="color-input"
                rows={3}
                onChange={handleChange}
                type="text"
                name="answer"
                value={values.answer}
              />
            </Col>
          </Form.Group>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail" className="mx-auto col-10 ">
          <Form.Label column sm={4} />
          <Col>
            <Form.File id="exampleFormControlFile1" name="doc1" multiple="multiple" onChange={onFileChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalCheck" className="d-flex align-items-center mx-auto col-10  ">
          <Col sm={{ span: 6, offset: 5 }}>
            <button type="submit" className="btn btn-secondary">Enviar</button>
          </Col>
        </Form.Group>

      </Form>
    </div>
  );
};
export default TableDetail;
TableDetail.propTypes = {
  querieId: PropTypes.string.isRequired,
};
