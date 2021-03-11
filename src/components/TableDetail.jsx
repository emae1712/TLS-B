import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
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
  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('queries').doc(querieId).collection('answer').add({
      user: currentUser.uid,
      time: new Date(),
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
  return (
    <div className="col-10">
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
                name="answer"
                value={values.answer}
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
  );
};
export default TableDetail;
TableDetail.propTypes = {
  querieId: PropTypes.string.isRequired,
};
