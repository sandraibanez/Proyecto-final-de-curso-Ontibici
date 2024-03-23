import React from 'react';
import './RentsListAdmin.scss';
import RentsCardAdmin from './RentsCardAdmin';

export default function RentsListAdmin({ rents, deleteRent }) {

    return (
        <div className="rents_list_container">
            <div className="rent_list d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Rents List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='table-responsive'>
                <table className="table" border="1">
                    <thead className="thead_rents_list">
                        <tr>
                            <th>ID</th>
                            <th>Initial Date</th>
                            <th>End Date</th>
                            <th>End Slot</th>
                            <th>Initial Slot</th>
                            <th>Bici</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_rents_list">
                        {
                            rents.map((rent, index) => (
                                <RentsCardAdmin key={index} rent={rent} deleteRent={deleteRent} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}