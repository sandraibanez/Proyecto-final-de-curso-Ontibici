import React from 'react';
// import './ListIncidencias.scss';

export default function ListIncidenciasstation ({ station }) {
    return  (
        <tr>
            <td className="id_col">{station.id}</td>
            <td>{station.title}</td>
            <td className='status_field'>{station.status}</td>
            <td>{station.desc}</td>
            <td>{station.station_id}</td>
        </tr>
    )
}