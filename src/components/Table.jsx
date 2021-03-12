/* eslint-disable no-nested-ternary */
/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
} from 'react-bootstrap';
import { BsFillEyeFill } from 'react-icons/bs';
import Header from './Header';
import '../styles/App.scss';
import { db } from '../firebase/fb-configuration';

const RegisterTable = () => {
  const [dataQueries, setDataQueries] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    db.collection('queries').where('status', '!=', 'Resuelta').orderBy('status').orderBy('time', 'desc').onSnapshot((doc) => {
      const array = [];
      doc.forEach((el) => {
        array.push({
          id: el.id,
          ...el.data(),
        });
      });
      setDataQueries(array);
      setFilterData(array);
    });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    const arrQueries = dataQueries.filter((el) => (
      el.query.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? el : false
        || el.status.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? el : false
        || el.sector.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? el : false
        || el.adviser.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? el : false
        || el.fecha.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? el : false
    ));
    setFilterData(arrQueries);
  };
  const titleTable = ['Fecha', 'Tema', 'Gerente a Cargo', 'Estado', 'Detalle'];
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
                    {querie.fecha}
                  </td>
                  <td>{querie.sector}</td>
                  <td>{querie.adviser}</td>
                  <td className={querie.status === 'Atendida' ? 'atendida' : 'pendiente'}>{querie.status}</td>
                  <td>
                    <Link
                      className="view"
                      to={
                     `/detail/${querie.id}`
}
                    >
                      <BsFillEyeFill />
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
