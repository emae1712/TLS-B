/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from '../firebase/fb-configuration';
import { AuthContext } from '../Context/Auth';
import imgLogin from '../img/login detalle.jpg';

const Login = (props) => {
  const { history } = props;
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await
        auth.signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'No hay ningún registro de usuario que corresponda a este correo electrónico.',
          icon: 'warning',
          confirmButtonColor: '#D04A02',
        });
      }
    },
    [history],
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <div className="row g-0">
        <div className="col-lg-6 imgLogin">
          <img src={imgLogin} alt="" />
        </div>
        <div className="col-lg-6 register">
          <h2 className="fw-bold text-center pb-5 text-light">Bienvenido al Portal de Consultas PwC</h2>
          <h4 className="text-light text-center">Login</h4>
          <form onSubmit={handleLogin} className="box-form">
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-light">
                Email
                <input name="email" className="form-control" type="email" placeholder="email" />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-light">
                Password
                <input name="password" className="form-control" type="password" placeholder="password" />
              </label>
            </div>
            <div className="my-3">
              <Link to="/recoverPassword" className="text-light">Olvidaste tu contraseña?</Link>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn-login">CONTINUAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
Login.propTypes = {
  history: PropTypes.string.isRequired,
};
