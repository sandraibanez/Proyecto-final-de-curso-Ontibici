import React from 'react';
import './SlotstationListAdmin.scss';

import SlotCardAdmin from './slotCardAdmin';

export default function SlotListAdmin({ station, slots }) {

    return (
        <div className="slot_list_container">
            <div class="slot_list d-flex align-items-center">
                <div class="container">
                    <div class="row gy-4 d-flex justify-content-between">
                        <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Slot List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='table-responsive'>
                <table className="table" border="1">
                    <thead className="thead_stations_list">
                        <tr>
                            <th>ID</th>
                            <th>Slot number</th>
                            <th>status</th>
                            <th>bici_id</th>
                            <th>station ID</th>
                        </tr>
                    </thead>

                    <tbody className="tbody_stations_list">
                        {
                            slots.map((slots, index) => (
                                <SlotCardAdmin key={index} slots={slots} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}