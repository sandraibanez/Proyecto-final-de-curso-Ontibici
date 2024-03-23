import React from 'react';
import './IncidentsListAdmin.scss';
import IncidentsCardAdmin from './IncidentsCardAdmin';
import IncidentsCardAdminStation from './IncidentsCardAdminStation';
export default function IncidentsListAdmin({ incidents_slots, deleteIncidenceslot, deleteIncidencestation, incidents_station }) {
    console.log(incidents_station);
    return (
        <div className="incidents_list_container">
            <div className="incidents_list d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Incidents List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Incidents Slots List</h3>
            <div className='table-responsive'>
                <table className="slot_table" border="1">
                    <thead className="thead_incidents_list">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Slot ID</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_incidents_list">
                        {
                            incidents_slots.map((incidence, index) => (
                                <IncidentsCardAdmin key={index} incidence={incidence} deleteIncidence={deleteIncidenceslot} type={"slot"} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <h3>Incidents Stations List</h3>
            <div className='table-responsive'>
                <table className="slot_table" border="1">
                    <thead className="thead_incidents_list">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Station ID</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_incidents_list">
                        {
                            incidents_station.map((incidence_station, index) => (
                                <IncidentsCardAdminStation key={index} incidence_station={incidence_station} deleteIncidence={deleteIncidencestation} type={"station"} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}