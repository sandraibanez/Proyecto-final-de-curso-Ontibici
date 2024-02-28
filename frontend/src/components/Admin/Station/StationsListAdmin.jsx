import React from 'react';
import './StationsListAdmin.scss';
import { useNavigate } from "react-router-dom";

import StationsCardAdmin from './StationsCardAdmin';

export default function StationsListAdmin({ stations, deleteStation }) {

    const navigate = useNavigate();

    const redirects = {
        add_station: () => navigate('/dashboard/stations/add'),
    }

    return (
        <div className="stations_list_container">
            <div className="station_list d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Stations List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <button className="button add_button" onClick={() => redirects.add_station()}>Add station</button>
            <table className="table" border="1">
                <thead className="thead_stations_list">
                    <tr>
                        <th>ID</th>
                        <th>slug</th>
                        <th>Name</th>
                        <th>img</th>
                        <th>Location</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                
                <tbody className="tbody_stations_list">
                    {
                        stations.map((station, index) => (
                            <StationsCardAdmin key={index} station={station} deleteStation={deleteStation} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}