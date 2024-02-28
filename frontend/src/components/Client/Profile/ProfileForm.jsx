import './ProfileForm.scss';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from "../../../hooks/useNotifications";
import { useParams } from "react-router-dom";
import Notification from "../Notifications/Notification";
import ListIncidencias from './listincidencias';
import ListIncidenciasstation from './ListIncidenciasstation';

const ProfileForm = ({ user, profile, sendData, errorMSG, incidents_slots, station }) => {
    // console.log(incidents_slots);
    const { id } = useParams();
    const [edit, setEdit] = useState(true);
    const { stats, useUserStats } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const { notifications, useSeeNotification } = useNotifications();



    const validators = Yup.object().shape({
        username: Yup.string().required('*Username is required').min(3, '*Username must be between 3 and 15 characters').max(15, '*Username must be between 3 and 15 characters'),
        email: Yup.string().email('*Email format invalid').required('*Email is required'),
        name: Yup.string(),
        surnames: Yup.string(),
        image: Yup.string().url('*Must be an url'),
        biography: Yup.string(),
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(validators) });

    useEffect(() => {
        if (user.id !== '') {
            setValue('username', user.username);
            setValue('email', user.email);
        }
        if (profile.id !== '') {
            setValue('name', profile.name);
            setValue('surnames', profile.surnames);
            setValue('image', profile.image);
            setValue('biography', profile.biography);
            setValue('stats', stats);
        }
        useUserStats(id);
    }, [user, profile]);

    const send_data = data => {
        sendData(data);
    };




    const notifications_html = notifications.length > 0 ?
        notifications.map(item => <Notification notification={item} key={item.id} />)
        : <p>No Notifications</p>;


    return (
        <div className='profile_page'>
            <form onSubmit={handleSubmit(send_data)}>
                <div className="profile">
                    <div className='profile_image'>
                        <img className='user_image' src={profile.image} alt='' />
                        <span className="error">{errors.image?.message}</span>
                    </div>
                    <div className='profile_user'>
                        <div className='attribute_box'>
                            <label htmlFor="username" className='etiqueta'>Username:</label>
                            <input type="text" id="username" {...register('username')} disabled={edit} /><br />
                            <span className="error">{errors.username?.message}</span>
                        </div>
                        <div className='attribute_box'>
                            <label htmlFor="email" className='etiqueta'>Email:</label>
                            <input type="text" id="email" {...register('email')} disabled={edit} /><br />
                            <span className="error">{errors.email?.message}</span>
                        </div>
                        <div className="error_server">{errorMSG}</div>
                    </div>
                </div>
            </form>

            <h3>Notifications</h3>
            {notifications_html}

            <h3>Incidencias</h3>
            <h2>Slot</h2>
            <div className="incidents_list_container_slot">
                <table className="slot_table" border="1">
                    <thead className="thead_incidents_list">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Slot ID</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_incidents_list">
                        {
                            incidents_slots.map((incidence, index) => (
                                <ListIncidencias key={index} incidence={incidence} type={"slot"} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <h2>Station</h2>
            <div className="incidents_list_container_station">
                <table className="slot_table" border="1">
                    <thead className="thead_incidents_list">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Station ID</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_incidents_list">
                        {
                            station.map((station, index) => (
                                <ListIncidenciasstation key={index} station={station} type={"slot"} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProfileForm;