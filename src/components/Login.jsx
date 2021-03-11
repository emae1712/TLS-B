/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
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
        swal({
          title: 'Error!',
          text: 'There is no user record corresponding to this identifier. The user may have been deleted.',
          icon: 'warning',
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
          <h2 className="fw-bold text-center py-5 text-light">Bienvenido al Portal de Consultas PwC</h2>
          <p className="text-light">LogIn</p>
          <form onSubmit={handleLogin}>
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
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Log In</button>
            </div>
            <div className="my-3">
              <Link to="/recoverPassword">Olvidaste tu contraseña</Link>
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
