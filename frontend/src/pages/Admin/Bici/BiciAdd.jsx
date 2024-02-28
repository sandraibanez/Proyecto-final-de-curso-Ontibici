import React, { useEffect } from "react";
// import BiciForm from "../../../components/Admin/Bici/BicisForm";
import BiciForm from "../../../components/Admin/Bici/BiciForm";
import { useBici } from "../../../hooks/useBici";
import { useNavigate } from "react-router-dom";

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
            <div className="title">
                <h1>Create Bici</h1>
            </div>
            <BiciForm form_type={form_type} sendData={(data) => useAddBici(data)}/>
        </div>
    )
}

export default BiciAdd;