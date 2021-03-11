/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'react-bootstrap';
import Header from './Header';
import '../styles/App.scss';
import { db } from '../firebase/fb-configuration';

const RegisterTable = () => {
  const [dataQueries, setDataQueries] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    db.collection('queries').where('status', '==', 'Atendida')
      .orderBy('time', 'desc')
      .onSnapshot((doc) => {
        const array = [];
        doc.forEach((el) => {
          array.push({
            id: el.id,
            ...el.data(),
          });
        });
        setDataQueries(array);
      });
  }, []);
  // console.log(dataQueries);

  const handleChange = (event) => {
    const { value } = event.target;
    const arrQueries = dataQueries.filter((el) => (el.query.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? el : false));
    setFilterData(arrQueries);
  };
  const titleTable = ['Fecha', 'Tema', 'Gerente a Cargo', 'Estado'];
  return (
    <>
      <Header />
      <div className="current__container">
        <div className="current-header">
          <h2>Consultas vigentes</h2>
          <input type="search" name="buscar" placeholder="Buscar" onChange={handleChange} />
        </div>
        <Table responsive>
          <thead>
            <tr className="border-table">
              <th>ID</th>
              {titleTable.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              filterData.map((querie, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>
                    {querie.time.toDate().toLocaleDateString('es', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td>{querie.sector}</td>
                  <td>{querie.adviser}</td>
                  <td>{querie.status}</td>
                  <td>
                    <Link to={
                     `/detail/${querie.id}`
}
                    >
                      Detalle
                    </Link>
                  </td>
                </tr>
              ))
              }
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default RegisterTable;
