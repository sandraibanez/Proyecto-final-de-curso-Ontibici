import React from 'react';
import { useNavigate } from "react-router-dom";
// import './BillingCardAdmin.scss';

export default function BillingCardAdmin ({ billing, index, deletebilling }) {
    console.log(billing.id);
    const navigate = useNavigate();

    const redirects = {
        update: (id) => navigate('/dashboard/billing/update/' + id),
    }
    
    return (
        <tr>
            <td className="id_col">{billing.id}</td>
            <td>{billing.rent_id}</td>
            <td>{billing.user_id}</td>
            <td>{billing.pay}</td>
            <td> 
                <button className="buttons" onClick={() => redirects.update(billing.id)}>Edit</button>
                {/* <button className="button_delete" onClick={() => deletebilling(billing.id)}>Delete</button> */}
            </td>
        </tr>
    )
}