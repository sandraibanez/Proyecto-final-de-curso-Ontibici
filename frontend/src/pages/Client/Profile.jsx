import React, { useEffect } from "react";
import ProfileForm from "../../components/Client/Profile/ProfileForm";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useIncidents } from "../../hooks/useIncidents";
import './Profile.scss';
const Profile = () => {
    const { id } = useParams();
    const { isCorrect, user, useProfile, profile, useUpdateProfile, errorMSG } = useAuth(id);
    const navigate = useNavigate();
    const { incidentsSlotsUser } = useIncidents();
    const { incidentsStationsUser } = useIncidents();
    // console.log(incidentsSlotsUser);
    useEffect(() => {
        useProfile(id);
        if (isCorrect) {
            navigate('/rent');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="profile_container">
            <div class="profiles d-flex align-items-center">
                <div class="container">
                    <div class="row gy-4 d-flex justify-content-between">
                        <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <div className="title">
                                <h1>Profile</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ProfileForm'>
                <ProfileForm incidents_slots={incidentsSlotsUser} station={incidentsStationsUser} user={user} profile={profile} errorMSG={errorMSG} />
            </div>
        </div>
    )
}

export default Profile;