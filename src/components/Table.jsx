/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Table,
} from 'react-bootstrap';
import Header from './Header';
import '../styles/App.scss';

const RegisterTable = () => {
  console.log('table');
  return (
    <>
      <Header />
      <div className="current__container">
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              {Array.from({ length: 12 }).map((_, index) => (
                <th key={index}>Table heading</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>
                  Table cell
                  {index}
                </td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>
                  Table cell
                  {index}
                </td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>
                  Table cell
                  {index}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default RegisterTable;
