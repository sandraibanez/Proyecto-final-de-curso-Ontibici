import React from 'react';
import './SlotListAdmin.scss';
import StationsslotCardAdmin from './StationsslotCardAdmin';

export default function StationsListAdmin({ stations }) {

    return (
        <div className="stations_list_containeradmin">
            <div class="station_listadmin d-flex align-items-center">
                <div class="container">
                    <div class="row gy-4 d-flex justify-content-between">
                        <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Stations List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='table-responsive'>
                <table className="table" border="1">
                    <thead className="thead_stations_list">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody className="tbody_stations_list">
                        {
                            stations.map((station, index) => (
                                <StationsslotCardAdmin key={index} station={station} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}