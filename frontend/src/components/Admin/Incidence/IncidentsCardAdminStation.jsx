import React, { useState, useEffect } from 'react';
import './IncidentsCardAdminStation.scss';
import { Popover } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useIncidents } from "../../../hooks/useIncidents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IncidentsCardAdminStation ({ incidence_station, index, deleteIncidence, type }) {
    const { useUpdateIncidenceStation } = useIncidents();

    const id = type == 'station' ? incidence_station.station_id : incidence_station.station_id;

    const validators = Yup.object().shape({
        status: Yup.string().required('*Status is required'),
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(validators) });

    // const changeStatus =

    const onSubmit = data => {
        useUpdateIncidenceStation(incidence_station.id, data, type);
    };

    useEffect(() => {
        setValue('status', incidence_station.status);
    }, [incidence_station]);

    const status_icon_station = incidence_station.status === 'pending' ? <FontAwesomeIcon className='pending_icon' icon="fa-regular fa-circle"/> : incidence_station.status === 'in_progress' ? 
    <FontAwesomeIcon className='progress_icon' icon="fa-solid fa-circle-half-stroke"/> : <FontAwesomeIcon className='resolved_icon' icon="fa-solid fa-circle-check"/>;

    return (
        <tr>
            <td className="id_col">{incidence_station.id}</td>
            <td>{incidence_station.title}</td>
            <td className='status_field'>{status_icon_station} {incidence_station.status}</td>
            <td>{incidence_station.desc}</td>
            <td>{id}</td>
            <td>{incidence_station.user_id}</td>
            <td>
                <Popover className="popover">
                    <Popover.Panel className="popover_panel_station">
                        <form className="popover_form" onSubmit={handleSubmit(onSubmit)}>
                            <input type="radio" value="pending" name="status" {...register('status')}/>Pending
                            <input type="radio" value="in_progress" name="status" {...register('status')}/>In progress
                            <input type="radio" value="resolved" name="status" {...register('status')}/>Resolved
                            <span className="error">{errors.status?.message}</span>
                            <button type="submit" className="status_check"><FontAwesomeIcon icon="fa-solid fa-circle-check"/></button>
                        </form>
                    </Popover.Panel>
                    <Popover.Button  className="button_update">Update Status</Popover.Button >
                    <button className="button_delete" onClick={() => deleteIncidence(type, incidence_station.id)}>Delete</button>
                </Popover>
            </td>
        </tr>
    )
}