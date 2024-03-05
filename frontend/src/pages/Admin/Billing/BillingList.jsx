import React from "react";
import { useBilling } from "../../../hooks/useBilling";
import BillingListAdmin from "../../../components/Admin/Billing/BillingListAdmin";

const BillingList = () => {
    
    const {billing,  useDeletebilling } = useBilling();
    // console.log(useDeletebilling);

    // useEffect(() => {
    //     if (data !== '') {
    //         useAddBilling(data);
    //     }
    //     if (isCorrect) {
    //         navigate('/dashboard/billing');
    //     }
    // }, [isCorrect, navigate]);
    return (
        <BillingListAdmin billing={billing} deletebilling={useDeletebilling} />
    )
}

export default BillingList;
