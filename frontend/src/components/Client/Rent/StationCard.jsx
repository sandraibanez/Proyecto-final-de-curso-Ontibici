import './StationCard.scss';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import stationimg from '../../../assets/img/station1.jpg'; 
import IncidenceStationModal from "../Incidents/IncidenceStationModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function StationCard ({ station }) {
    
    const navigate = useNavigate();
    const [modalStation, setModalStation] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const redirects = {
        details: (slug) => navigate('/stations/' + slug),
    }
    const report = station_id => {
        setOpenModal(true);
        setModalStation(station_id);
    }
    const incidence_type = 'station';
    return (
        <section id="service" className="services pt-0">
            <div className="container" data-aos="fade-up">
                <div className="row gy-4">
                    <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                        <div className="card">
                            <div className="card-img" onClick={() => redirects.details(station.slug)}>
                                    {/* <img src="/stations/img/station1.jpg"/>  */}
                                    <img src={stationimg} />
                            </div>
                            <div className="card_title">
                                <p>{station.direction}</p>
                            </div>
                            <div className="report">
                                <p className="report_button" onClick={() => report(station.id)}>
                                    <FontAwesomeIcon className='icon' icon="fa-solid fa-circle-exclamation"/>
                                    Report an incidence
                                </p>
                            </div>
                            <IncidenceStationModal openModal={openModal} setOpenModal={setOpenModal} incidenceType={incidence_type} id={modalStation}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}