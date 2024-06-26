import './ProfileForm.scss';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from "../../../hooks/useNotifications";
import { useParams } from "react-router-dom";
import Notification from "../Notifications/Notification";
import userimg from "../../../assets/img/user.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListIncidenciasslot from './ListIncidenciasslot';
import ListIncidenciasstation from './ListIncidenciasstation';
import Billing from './Billing';
const ProfileForm = ({ user, profile, sendData, errorMSG, incidents_slots, station, billing }) => {
   
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
    const Incidents_slot = incidents_slots.length > 0 ?
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
                            <ListIncidenciasslot key={index} incidence={incidence} type={"slot"} />
                        ))
                    }
                </tbody>
            </table>
        </div>
        : <p>There are no slot incidents</p>

    const Incidents_station = station.length > 0 ?
        <div className="incidents_list_container_station">
            <table className="station_table" border="1">
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
        : <p>There are no station incidents</p>

    return (
        <div className='profile_page'>
            <form onSubmit={handleSubmit(send_data)}>

                <div className="profile">
                    <div className='profile_image_'>
                        <div className='profile_image'>
                            <img className='user_image' src={userimg} alt='' />
                            {/* <span className="error">{errors.image?.message}</span> */}
                        </div>
                    </div>

                    <div className='profile_user'>
                        <br/>
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                        <div className='attribute_box'>
                            <p type="text" id="username">{user.username} </p>

                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-envelope" />
                        <div className='attribute_box'>
                            <p type="text" id="email">{user.email} </p>

                        </div>
                        <div className="error_server">{errorMSG}</div>
                    </div>
                </div>


            </form>
            <br/>
            <h2>Billing</h2>
            <div className="billing">
                <table className="billing_table" border="1">
                    <thead className="thead_incidents_list">
                        <tr>
                            <th>ID</th>
                            <th>Rent ID</th>
                            <th>User ID</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody className="tbody_incidents_list">
                        {
                            billing.map((billing, index) => (
                                <Billing key={index} billing={billing} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <h3>Notifications</h3>
            {notifications_html}

            <h3>Incidents</h3>
            <h2>Slot</h2>
            {Incidents_slot}
            {/* <div className="incidents_list_container_slot">
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
                                <ListIncidenciasslot key={index} incidence={incidence} type={"slot"} />
                            ))
                        }
                    </tbody>
                </table>
            </div> */}
            <h2>Station</h2>
            {Incidents_station}
        </div>
    )
}

export default ProfileForm;