import React from 'react';
import { useNavigate } from "react-router-dom";
import './StationsCardAdmin.scss';

export default function StationsCardAdmin ({ station, index, deleteStation }) {
    console.log(index, station);
    const navigate = useNavigate();

    const redirects = {
        update: (slug) => navigate('/dashboard/stations/update/' + slug),
    }

    return (
        
            <tr>
                <td className="id_col">{station.id}</td>
                <td>{station.slug}</td>
                <td>{station.name}</td>
                <td>{station.img}</td>
                <td>{station.location}</td>
                <td>{station.latitud}</td>
                <td>{station.long}</td>
                <td> 
                    <button className="buttons" onClick={() => redirects.update(station.slug)}>Edit</button>
                    <button className="buttons" onClick={() => deleteStation(station.slug)}>Delete</button>
                </td>
            </tr>
     
        
    
    )
}