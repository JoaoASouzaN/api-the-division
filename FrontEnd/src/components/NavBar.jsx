import React from 'react';
import { Nav, NavLink } from 'styled-components';

const NavBar = () => (
  <Nav>
    <NavLink to="/armas">Armas</NavLink>
    <NavLink to="/builds">Builds</NavLink>
    <NavLink to="/equipamentos">Equipamentos</NavLink>
  </Nav>
);

export default NavBar;