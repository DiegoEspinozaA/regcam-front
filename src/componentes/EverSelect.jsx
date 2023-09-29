import React from 'react'
import {Select, option} from 'evergreen-ui'

export default function EverSelect() {
  return (
    <Select className='shadow-lg' width={240} >
      <option value="foo" selected>Accidente de transito</option>
      <option value="bar">Robo</option>
      <option value="bar">Ilicito</option>
      <option value="bar">Congestion</option>
      <option value="bar">Poca visibilidad</option>
    </Select>
  )
}