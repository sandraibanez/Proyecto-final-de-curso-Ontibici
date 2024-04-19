import React, { useEffect } from "react";
import BiciForm from "../../../components/Admin/Bici/BiciForm";
import { useBici } from "../../../hooks/useBici";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Bici.scss';
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
            console.log('bici');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="Bici_update_container">
            <div className="bici d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Update Bici</h1>
                        </div>
                    </div>
                </div>
            </div>
            <BiciForm bici={oneBici} form_type={form_type} sendData={(data) => useUpdateBici(slug, data)} />
        </div>
    )
}

export default BiciUpdate;