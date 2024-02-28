import React from 'react';
import { useNavigate } from "react-router-dom";
import './BiciCardAdmin.scss';

export default function BiciCardAdmin ({ bici, index, deleteBici }) {

    const navigate = useNavigate();

    const redirects = {
        update: (slug) => navigate('/dashboard/bici/update/' + slug),
    }

    return (
        <tr>
            <td className="id_col">{bici.id}</td>
            <td>{bici.slug}</td>
            <td>{bici.name}</td>
            <td>{bici.status}</td>
            <td> 
                <button className="buttons" onClick={() => redirects.update(bici.slug)}>Edit</button>
                <button className="buttons" onClick={() => deleteBici(bici.slug)}>Delete</button>
            </td>
        </tr>
    )
}