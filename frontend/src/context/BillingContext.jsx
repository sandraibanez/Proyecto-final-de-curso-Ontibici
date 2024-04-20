import React, { useState, useEffect, useContext } from 'react'
import BillingService from '../services/BillingService'
import AuthContext from './AuthContext';

const Context = React.createContext({})

export function BillingContextProvider({ children }) {

    const { isAdmin } = useContext(AuthContext);
    const [billing, setbilling] = useState([]);
    const valor = localStorage.getItem('refresh');
    const profile = localStorage.getItem('refreshProfile');

    useEffect(function () {
        if (isAdmin) {
            BillingService.getAllAdminBilling()
                .then(({ data }) => {
                    setbilling(data);
                })
        }
    }, [setbilling, isAdmin])

    useEffect(function () {
        if (isAdmin) {
            BillingService.getAllAdminBilling()
                .then(({ data }) => {
                    setbilling(data);
                })
        }
    }, [valor])
    
    useEffect(function () {
        if (isAdmin) {
            BillingService.getAllAdminBilling()
                .then(({ data }) => {
                    setbilling(data);
                })
        }
    }, [profile])


    return <Context.Provider value={{ billing, setbilling}}>
        {children}
    </Context.Provider>
}

export default Context