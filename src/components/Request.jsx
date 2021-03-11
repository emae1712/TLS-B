/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { BsFileEarmarkArrowDown } from 'react-icons/bs';
import { db } from '../firebase/fb-configuration';
import Avatar from '../img/avatar.jpg';
import '../styles/App.scss';
import '../styles/Details.scss';

const Answer = (props) => {
  const { querieId } = props;
  const [answer, setAnswer] = useState([]);
  useEffect(() => {
    db.collection('queries').doc(querieId).collection('answer').onSnapshot((querySnapshot) => {
      const comment = [];
      querySnapshot.forEach((doc) => {
        comment.push({ id: doc.id, ...doc.data() });
      });
      setAnswer(comment);
    });
  }, []);
  return (
    <>
      {answer.map((childQuery) => (
        <div className="consult-card">
          <div className="consult-container">
            <div className="consult-detail">
              <img className="avatar" src={Avatar} alt="avatar" />
              <div className="user-consult">
                <div className="name-consult">
                  <p>Maria Fernanda Cevedo</p>
                  <Moment format="DD/MM/YYYY">{childQuery.time}</Moment>
                </div>
                <p className="consult-text">
                  {childQuery.answer}
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
                { childQuery.imgs && childQuery.imgs.map((img, i) => (
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
        </div>
      ))}
    </>

  );
};
export default Answer;
