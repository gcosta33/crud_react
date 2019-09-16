import './Nav.css'
import Navitem from './Navitem'
import React from 'react'

export default props => (
  <aside className="menu-area">
    <nav className="menu">
      <Navitem
        link="#/"
        itemIcon="fa-home"
        itemName="Inicio">
      </Navitem>
      <Navitem
        link="#/users"
        itemIcon="fa-users"
        itemName="Usuários">
      </Navitem>
    </nav>
  </aside>
)