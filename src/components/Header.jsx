import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/fb-configuration';

const Header = () => {
  console.log('Header');
  return (
    <header className="header__container">
      <div>
        <NavLink to="/" className="logo"><img src="" alt="pwc" /></NavLink>
        <button type="button" onClick={() => auth.signOut()}>sign out</button>
      </div>
      <nav>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: 'orange' }} exact to="/">  Registrar consulta </NavLink>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: 'orange' }} to="/consultasVigentes">  Consultas vigentes </NavLink>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: 'orange' }} to="/consultasHistoricas">  Consultas históricas </NavLink>
        <NavLink activeClassName="activeRoute" activeStyle={{ color: 'orange' }} to="/informacion">  Información de interés </NavLink>
      </nav>
    </header>
  );
};
export default Header;
