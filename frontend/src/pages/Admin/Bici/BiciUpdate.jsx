import React, { useEffect } from "react";
import BiciForm from "../../../components/Admin/Bici/BiciForm";
import { useBici } from "../../../hooks/useBici";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BiciUpdate = () => {
    const { slug } = useParams();
    const { useOneBici, oneBici, isCorrect, useUpdateBici } = useBici(slug);
    const form_type = 'update';
    const navigate = useNavigate();

    useEffect(() => {
        if (slug !== '') {
            useOneBici(slug);
        }
        if (isCorrect) {
            navigate('/dashboard/Bici');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="Bici_update_container">
            <div className="title">
                <h1>Update Bici</h1>
            </div>
            <BiciForm bici={oneBici} form_type={form_type} sendData={(data) => useUpdateBici(slug, data)}/>
        </div>
    )
}

export default BiciUpdate;