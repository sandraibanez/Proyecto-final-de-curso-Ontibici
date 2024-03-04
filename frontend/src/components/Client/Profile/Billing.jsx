import React from 'react';
// import './ListIncidencias.scss';

export default function Billing ({ billing }) {
    return  (
        <tr>
            <td className="id_col">{billing.id}</td>
            <td>{billing.rent_id}</td>
            <td>{billing.user_id}</td>
            <td>{billing.pay}</td>
        </tr>
    )
}