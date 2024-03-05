import React, { useEffect } from "react";
import { useBilling } from "../../../hooks/useBilling";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BillingForm from "../../../components/Admin/Billing/BillingForm"
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
        }
    }, [isCorrect, navigate]);

    return (
        <div className="billing_update_container">
            <div className="title">
                <h1>Update billing</h1>
            </div>
            <BillingForm billing={oneBilling} form_type={form_type} sendData={(data) => useUpdateBilling(id, data)}/>
        </div>
    )
}

export default BillingUpdate;