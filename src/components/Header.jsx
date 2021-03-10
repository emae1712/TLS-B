import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/fb-configuration';
import Logo from '../img/pwc-logo.jpg';
import Avatar from '../img/avatar.jpg';
import '../styles/Header.scss';

const Header = () => {
  console.log('Header');
  return (
    <header className="header__container">
      <div className="logo-logout">
        <NavLink to="/" className="logo"><img src={Logo} alt="pwc" /></NavLink>
        <div className="logout">
          <button type="button" onClick={() => auth.signOut()}>Cerrar sesión</button>
          <img src={Avatar} alt="avatar" />
        </div>
      </div>
      <nav>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: '#ffffff' }} exact to="/">  Registrar consulta </NavLink>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: '#ffffff' }} to="/consultasVigentes">  Consultas vigentes </NavLink>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: '#ffffff' }} to="/consultasHistoricas">  Consultas históricas </NavLink>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: '#ffffff' }} to="/informacion">  Información de interés </NavLink>
      </nav>
    </header>
  );
};
export default Header;
