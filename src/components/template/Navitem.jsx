import React from 'react'

export default props=>(
  <a href={props.link}>
      <i className={`fa ${props.itemIcon}`}></i> {props.itemName}
  </a>
)