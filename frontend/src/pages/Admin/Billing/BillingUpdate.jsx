import React, { useEffect } from "react";
import { useBilling } from "../../../hooks/useBilling";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BillingForm from "../../../components/Admin/Billing/BillingForm";
import './Billing.scss';
const BillingUpdate = () => {
    const { id } = useParams();
    const { useOneBilling, oneBilling, isCorrect, useUpdateBilling } = useBilling(id);
    const form_type = 'update';
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== '') {
            useOneBilling(id);
        }
        if (isCorrect) {
            navigate('/dashboard/billing');
            console.log('bill');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="billing_update_container">
            <div className="billing_update d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Update billing</h1>
                        </div>
                    </div>
                </div>
            </div>
            <BillingForm billing={oneBilling} form_type={form_type} sendData={(data) => useUpdateBilling(id, data)} />
        </div>
    )
}

export default BillingUpdate;