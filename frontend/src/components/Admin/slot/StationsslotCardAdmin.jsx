import React from 'react';
import { useNavigate } from "react-router-dom";
import './StationsslotCardAdmin.scss';
export default function StationsslotCardAdmin ({ station, index}) {
    console.log(index, station);
    const navigate = useNavigate();

    const redirects = {
        slot: (slug) => navigate('/dashboard/dashboard/stations/slot/' + slug),
    }

    return (
        <tr>
            <td className="id_col">{station.id}</td>
            <td>{station.name}</td>
            <td>{station.location}</td>
            <td> 
                <button className="buttons" onClick={() => redirects.slot(station.slug)}>Slot en esta estacion</button>
            </td>
        </tr>
    )
}