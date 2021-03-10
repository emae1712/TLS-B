/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Table,
} from 'react-bootstrap';
import Header from './Header';
// import { db } from '../firebase/fb-configuration';

const RegisterTable = () => (
  <>
    <Header />
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            {Array.from({ length: 6 }).map((_, index) => (
              <th key={index}>Table heading</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index}>
                <p>
                  {' '}
                  Table cell
                  {index}
                </p>

              </td>

            ))}
            <button type="button">Ver detalle</button>
          </tr>
          <tr>
            <td>2</td>
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index}>
                Table cell
                {index}
              </td>
            ))}
          </tr>
          <tr>
            <td>3</td>
            {Array.from({ length: 6 }).map((_, index) => (
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
export default RegisterTable;
