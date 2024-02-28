import './SlotCard.scss';
import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../../context/AuthContext";
import { useRent } from "../../../hooks/useRent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import slotimg from '../../../assets/img/Bici.jpg';
import IncidenceSlotModal from "../Incidents/IncidenceSlotModal";
import RentModal from "./RentModal";

export default function SlotCard ({ slot }) {
    // console.log(slot);
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const { isCorrect, useRentBici, useBringBackBici } = useRent();
    const [openModal, setOpenModal] = useState(false);
    const [openModalRent, setOpenModalRent] = useState(false);
    const [modalSlot, setModalSlot] = useState(null);

    const incidence_type = 'slot';
    console.log(slot.status);
    const img_background = slot.status === 'in_use' ? '#27EE27' : slot.status === 'vacant' ? '#FF1818' : '#FFFF37';
    const slot_status = slot.status === 'in_use' ? 'Bici available' : slot.status === 'vacant' ? 'Vacant' : 'Maintenance';

    const rent_bici = (slot) => {
        if (isAuth) {
            if (slot.status == 'in_use') {
                useRentBici(slot);
                setOpenModalRent(true);
                setModalSlot(slot);
            } else {
                // useBringBackBici(slot);
                setOpenModalRent(true);
                setModalSlot(slot);
            }
        } else {
            console.log('login');
        }
    }

    useEffect(() => {
        if (isCorrect) {
            navigate('/rent');
        }
    }, [isCorrect, navigate]);

    const report = slot_id => {
        setOpenModal(true);
        setModalSlot(slot_id);
    }

    return (
        // <h1>hola</h1>
        <div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                <div className="slot">
                    <div className="card" onClick={() => { rent_bici(slot) }}>
                        <div className="card_image">
                            <img src={slotimg} style={{ backgroundColor: `${img_background}` }}/> 
                        </div>
                        <div className="card_title">
                            <p>slot: {slot.slot_number}</p>
                            <p>{slot_status}</p>
                        </div>
                    </div>
                    <div className="report">
                        <p className="report_button" onClick={() => report(slot.id)}>
                            <FontAwesomeIcon className='icon' icon="fa-solid fa-circle-exclamation"/>
                            Report an incidence
                        </p>
                    </div>
                    <IncidenceSlotModal openModal={openModal} setOpenModal={setOpenModal} incidenceType={incidence_type} id={modalSlot}/>
                    <RentModal openModalRent={openModalRent} setOpenModalRent={setOpenModalRent} rent={modalSlot}/>
                </div>
            </div>
        </div>
    )
}