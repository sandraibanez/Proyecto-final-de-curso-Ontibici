import React, { useEffect } from "react";
import ProfileForm from "../../components/Client/Profile/ProfileForm";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useIncidents } from "../../hooks/useIncidents";
import { useBilling } from "../../hooks/useBilling"
import './Profile.scss';
const Profile = () => {
    const { id } = useParams();
    const { isCorrect, user, useProfile, profile, errorMSG } = useAuth(id);
    const navigate = useNavigate();
    const { incidentsSlotsUser } = useIncidents();
    const { incidentsStationsUser } = useIncidents();
    const { userBilling } = useBilling();
   
    useEffect(() => {
        useProfile(id);
        if (isCorrect) {
            navigate('/rent');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="profile_container">
            <div className="profiles d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <div className="title">
                                <h1>Profile</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ProfileForm'>
                <ProfileForm incidents_slots={incidentsSlotsUser} station={incidentsStationsUser} user={user} profile={profile} errorMSG={errorMSG} billing={userBilling}/>
            </div>
        </div>
    )
}

export default Profile;