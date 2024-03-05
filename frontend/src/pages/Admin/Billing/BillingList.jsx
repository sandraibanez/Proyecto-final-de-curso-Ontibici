import React from "react";
import { useBilling } from "../../../hooks/useBilling";
import BillingListAdmin from "../../../components/Admin/Billing/BillingListAdmin";

const BillingList = () => {
    
    const {billing,  useDeletebilling } = useBilling();
    console.log(useDeletebilling);
    return (
        <BillingListAdmin billing={billing} deletebilling={useDeletebilling}/>
    )
}

export default BillingList;
