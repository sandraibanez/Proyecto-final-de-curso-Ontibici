import React from 'react';
// import './ListIncidencias.scss';

export default function ListIncidenciasslot ({ incidence }) {
  
    return  (
        <tr>
            <td className="id_col">{incidence.id}</td>
            <td>{incidence.title}</td>
            <td className='status_field'>{incidence.status}</td>
            <td>{incidence.desc}</td>
            <td>{incidence.slot_id}</td>
        </tr>
    )
}