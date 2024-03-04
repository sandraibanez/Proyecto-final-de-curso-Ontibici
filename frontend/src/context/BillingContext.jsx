import React, { useState, useEffect, useContext } from 'react'
import BillingService from '../services/BillingService'
import AuthContext from './AuthContext';

const Context = React.createContext({})

export function BillingContextProvider({ children }) {
    const { isAdmin } = useContext(AuthContext);
    const [billing, setbilling] = useState([]);

    useEffect(function () {
        if (isAdmin) {
            BillingService.getAllAdmin()
                .then(({ data }) => {
                    setbilling(data);
                })
        }
    }, [setbilling, isAdmin])



    return <Context.Provider value={{ billing, setbilling}}>
        {children}
    </Context.Provider>
}

export default Context