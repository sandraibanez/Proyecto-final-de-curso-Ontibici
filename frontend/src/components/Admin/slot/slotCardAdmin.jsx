import React from 'react';
// import './slotCardAdmin.scss';

export default function SlotCardAdmin ({ station, slots  }) {
        console.log("slot cart",slots);
   

    return (
        <tr>
            <td className="id_col">{slots.id}</td>
            <td>{slots.slot_number}</td>
            <td>{slots.status}</td>
            <td>{slots.bici_id}</td>
            <td>{slots.stations_id}</td>
        </tr>
    )
}