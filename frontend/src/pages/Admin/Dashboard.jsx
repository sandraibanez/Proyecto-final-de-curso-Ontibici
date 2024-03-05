import React from "react";
import './Dashboard.scss';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const redirects = {
        stations: () => navigate('/dashboard/stations'),
        bici: () => navigate('/dashboard/bici'),
        users: () => navigate('/dashboard/users'),
        rents: () => navigate('/dashboard/rents'),
        slot: () => navigate('/dashboard/slot'),
        icidents: () => navigate('/dashboard/incidents'),
        billing: () => navigate('/dashboard/billing'),
    }

    return (
        <div className="dashboard_container">
            <div className="dashboard d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"></div>
                        <div className="title">
                            <h1>Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons_box">
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="400">
                <button className="button" onClick={() => redirects.stations()}><span>Stations List</span></button>
            </div>
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="400">
                <button className="button" onClick={() => redirects.bici()}><span>Bici List</span></button>
            </div>
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="400">
                <button className="button" onClick={() => redirects.users()}><span>Users List</span></button>
            </div>
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="400">
                <button className="button" onClick={() => redirects.rents()}><span>Rents List</span></button>
            </div>
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="400">
                <button className="button" onClick={() => redirects.slot()}><span>Slot List</span></button>
            </div> 
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <button className="button" onClick={() => redirects.icidents()}><span>Incidents List</span></button>
            </div> 
            <div className="col-lg-12 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <button className="button" onClick={() => redirects.billing()}><span>Billing List</span></button>
            </div> 
            </div>
        </div>
    )
}

export default Dashboard