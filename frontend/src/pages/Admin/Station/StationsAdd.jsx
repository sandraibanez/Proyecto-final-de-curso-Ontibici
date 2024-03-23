import React, { useEffect } from "react";
import StationsForm from "../../../components/Admin/Station/StationsForm";
import { useStations } from "../../../hooks/useStations";
import { useNavigate } from "react-router-dom";
import './StationsAdd.scss';
const StationsAdd = () => {
    const { isCorrect, useAddStation } = useStations();
    const form_type = 'create';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/dashboard/stations');
        }
    }, [isCorrect, navigate]);


    return (
        <div className="station_add_container" >
            <div className="stat_add d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Create Station</h1>
                        </div>
                    </div>
                </div>
            </div>
            <StationsForm form_type={form_type} sendData={(data) => useAddStation(data)} />
        </div>
    )
}

export default StationsAdd;