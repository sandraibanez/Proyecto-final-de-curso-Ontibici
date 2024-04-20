
import {useContext, useCallback, useEffect, useState} from 'react';
import BillingContext from "../context/BillingContext";
import BillingService from '../services/BillingService';
import AuthContext from "../context/AuthContext";
export function useBilling() {
    const { isAuth } = useContext(AuthContext);
    const [userBilling, setUserBilling] = useState([]);
    const [oneBilling, setOneBilling] = useState({});
    const {billing, setbilling} = useContext(BillingContext);
    const [isCorrect, setIsCorrect] = useState(false);
    const [localBillingData, setLocalBillingData] = useState([]);
    const valor = localStorage.getItem('refreshProfile');

    useEffect(() => {
        setLocalBillingData(billing);
    }, [billing]);
    
    const useOneBilling = useCallback((id) => {
      
        BillingService.getOneBilling(id)
            .then(({data}) => {
                setOneBilling(data);
               
            })
            .catch(e => console.error(e));
    }, [oneBilling]);
    useEffect(function () {
        if (isAuth) {
            BillingService.getBilling()
                .then(({ data }) => {
                    setUserBilling(data);
                })
        }
    }, [setUserBilling,isAuth])
    useEffect(function () {
        if (isAuth) {
            BillingService.getBilling()
                .then(({ data }) => {
                    setUserBilling(data);
                })
        }
    }, [valor])
    
    const useAddBilling = useCallback((data) => {
      
        if (isAuth) {
            BillingService.createBilling(data)
                .then(({ data, status }) => {
                  
                    if (status === 200) {
                        setUserBilling([...userBilling, data]);
                        // setPay(newPay);
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useUpdateBilling = useCallback((id,data, type) => {
        if (isAuth) {
            BillingService.updateBilling(id, data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        
                        let old_billing = [...billing];
                        const remove_old = old_billing.findIndex(billing => billing.id === id);
                        if (remove_old !== -1) {
                            old_billing[remove_old] = data;
                            setbilling(old_billing);
                        }
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch((e) => {
                    // toast.error(e.response.data[0]);
                });
        }
    },[isAuth]);

    

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
    };

    
   
    return { isCorrect,setbilling,billing,oneBilling,useOneBilling,setOneBilling,useAddBilling, useUpdateBilling,useDeletebilling,userBilling,setUserBilling};  
}