import React, { useState, useEffect } from 'react';
import './IncidentsCardAdmin.scss';
import { Popover } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useIncidents } from "../../../hooks/useIncidents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IncidentsCardAdmin({ incidence, index, deleteIncidence, type }) {
    const { useUpdateIncidenceSlot } = useIncidents();

    const id = type == 'slot' ? incidence.slot_id : incidence.bici_id;

    const validators = Yup.object().shape({
        status: Yup.string().required('*Status is required'),
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(validators) });

    // const changeStatus =

    const onSubmit = data => {
        useUpdateIncidenceSlot(incidence.id, data, type);
    };

    useEffect(() => {
        setValue('status', incidence.status);
    }, [incidence]);

    const status_icon = incidence.status === 'pending' ? <FontAwesomeIcon className='pending_icon' icon="fa-regular fa-circle" /> : incidence.status === 'in_progress' ?
        <FontAwesomeIcon className='progress_icon' icon="fa-solid fa-circle-half-stroke" /> : <FontAwesomeIcon className='resolved_icon' icon="fa-solid fa-circle-check" />;

    return (
        <tr>
            <td className="id_col">{incidence.id}</td>
            <td>{incidence.title}</td>
            <td className='status_field'>{status_icon} {incidence.status}</td>
            <td>{incidence.desc}</td>
            <td>{id}</td>
            <td>{incidence.user_id}</td>
            <td>
                <Popover className="popover">
                    {/* <div className=" d-none d-lg-block">
                        <Popover.Panel className="popover_panel">
                            <form className="popover_form" onSubmit={handleSubmit(onSubmit)}>
                                <input type="radio" value="pending" name="status" {...register('status')} />Pending
                                <input type="radio" value="in_progress" name="status" {...register('status')} />In progress
                                <input type="radio" value="resolved" name="status" {...register('status')} />Resolved
                                <span className="error">{errors.status?.message}</span>
                                <button type="submit" className="status_check"><FontAwesomeIcon icon="fa-solid fa-circle-check" /></button>
                            </form>
                        </Popover.Panel>
                    </div> */}
                    <div className=" d-lg-block d-sm-block d-md-block">
                        <Popover.Panel className="popover_panel_list">
                            <form className="popover_form_list" onSubmit={handleSubmit(onSubmit)}>
                                <ul>
                                    <li><input type="radio" value="pending" name="status" {...register('status')} />Pending </li>
                                    <li><input type="radio" value="in_progress" name="status" {...register('status')} />In progress</li>
                                    <li><input type="radio" value="resolved" name="status" {...register('status')} />Resolved</li>
                                    <span className="error">{errors.status?.message}</span>
                                    <button type="submit" className="status_check"><FontAwesomeIcon icon="fa-solid fa-circle-check" /></button>
                                </ul>
                            </form>
                        </Popover.Panel>
                    </div>
                    <Popover.Button className="button_update">Update Status</Popover.Button >
                    <button className="button_delete" onClick={() => deleteIncidence(type, incidence.id)}>Delete</button>
                </Popover>
            </td>
        </tr>
    )
}