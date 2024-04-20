import React, { useEffect, useContext,useState } from "react";
import Modal from 'react-modal';
import './RentModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useIncidents } from "../../../hooks/useIncidents";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { useAuth } from "../../../hooks/useAuth";
import { useRent } from "../../../hooks/useRent";
import { useNavigate } from "react-router-dom";
import {useBilling} from "../../../hooks/useBilling"
Modal.setAppElement('#root');

export default function RentModal ({ openModalRent, setOpenModalRent, rent }) {
  
    const { id } = useParams();
    const {  user } = useAuth(id);
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const { isCorrect, useRentBici, useBringBackBici } = useRent();
    const {useAddBilling} = useBilling();
    const [refresh, useRefresh] =useState(false);
    let status_type = '';

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(150, 150, 150, 0.75)',
            zIndex: '999',
            border: 'none'
        }
    };

    const handleClose = () => {
        setOpenModalRent(false);
    }

    if (rent != null) {
        status_type = rent.status === 'in_use' ? <p>You are going to rent a Bici</p>
        : <p>You are going to bring back the Bici</p>
    }

    const rent_bici = () => {
        if (isAuth) {
            if (rent != null) {
                if (rent.status == 'in_use') {
                    useRentBici(rent);
                } else {
                    useBringBackBici(rent);
                    useAddBilling(rent.id);
                  
                }
            }
        } else {
            console.log('login');
        }
    }
    const refreshBilling = ()=>{
        useRefresh(!refresh);
    }
    useEffect(() => {
        if (isCorrect) {
            navigate('/profile/'+ user.id);
            localStorage.setItem('refreshProfile',refresh);
        }

    }, [isCorrect, navigate]);

    return (
        <div className="modal">
            <Modal className="rentModal" isOpen={openModalRent} onRequestClose={() => handleClose()} style={customStyles}>
                <div className="rent_box">
                    <button className="modal_button" onClick={() => handleClose()}>
                        <FontAwesomeIcon className="cross_button" icon="fa-solid fa-square-xmark"/>
                    </button>
                    {status_type}
                    <div className='buttons_box'>
                        <button type="button" className="btn btn-primary" onClick={() => { rent_bici(), refreshBilling() }}>Accept</button>
                        <button type="button" className="btn btn-danger" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}