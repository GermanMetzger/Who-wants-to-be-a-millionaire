import React from 'react'
import './Button.css'
import { useState } from 'react';

export default function Button({ onClick, children, style, estadoActual }) {
  return (
    <button
      onClick={onClick}
      className={estadoActual || "button-inactivo"}
      style={style}
    >
      {children}
    </button>
  )
}
