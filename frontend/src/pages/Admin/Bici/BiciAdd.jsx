import React, { useEffect } from "react";
// import BiciForm from "../../../components/Admin/Bici/BicisForm";
import BiciForm from "../../../components/Admin/Bici/BiciForm";
import { useBici } from "../../../hooks/useBici";
import { useNavigate } from "react-router-dom";
import './Bici.scss';
const BiciAdd = () => {
    const { isCorrect, useAddBici } = useBici();
    const form_type = 'create';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/dashboard/Bici');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="Bici_add_container">
            <div className="bici d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Create Bici</h1>
                        </div>
                    </div>
                </div>
            </div>
            <BiciForm form_type={form_type} sendData={(data) => useAddBici(data)} />
        </div>
    )
}

export default BiciAdd;