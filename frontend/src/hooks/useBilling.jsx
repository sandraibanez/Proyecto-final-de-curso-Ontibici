
import {useContext, useCallback, useEffect, useState} from 'react';
import BillingContext from "../context/BillingContext";
import BillingService from '../services/BillingService';
import AuthContext from "../context/AuthContext";
export function useBilling() {
    const { isAuth } = useContext(AuthContext);
    const [userBilling, setUserBilling] = useState([]);
    const {billing, setbilling} = useContext(BillingContext);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(function () {
        if (isAuth) {
            BillingService.getBilling()
                .then(({ data }) => {
                    setbilling(data);
                    // console.log( data);
                })
        }
    }, [setbilling,isAuth])

    const useAddBilling = useCallback((data) => {
        console.log(data);
        if (isAuth) {
            BillingService.createBilling(data)
                .then(({ data, status }) => {
                    console.log(data);
                    if (status === 200) {
                        setUserBilling([...userBilling, data]);
                        console.log(data);
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useUpdateBilling = (id, data, type) => {
        if (isAuth) {
            BillingService.updateBilling(id, data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        let old_billing = [...billing];
                        const remove_old = old_billing.findIndex(billing => billing.id === id);
                        if (remove_old !== -1) {
                            old_billing[remove_old] = data;
                            setbilling(old_billing);
                            // toast.success('Slot incidence status updated');
                        }
                    }
                })
                .catch((e) => {
                    toast.error(e.response.data[0]);
                });
        }
    }

    const useDeletebilling = (type, id) => {
        if (isAuth) {
            BillingService.deleteBilling(id)
                .then(({ data, status }) => {
                    if (status === 200) {
                        // toast.success(data.data);
                        setbilling(billing.filter(billing => billing.id !== id));
                    }
                })
                .catch(e => console.error(e));
            
        }
    }

    return { isCorrect,billing,setbilling,useAddBilling, useUpdateBilling,useDeletebilling,userBilling,setUserBilling};  
}