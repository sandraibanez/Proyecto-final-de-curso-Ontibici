import React, { useState, useEffect } from 'react'
import BiciService from '../services/BiciService';

const Context = React.createContext({})

export function BiciContextProvider({ children }) {
    const [bici, setBici] = useState([]);
        // console.log(bici);
    useEffect(function () {
        BiciService.getAllBici()
            .then(({data}) => {
                setBici(data);
                // console.log(data);
            })
            .catch(e => console.error(e));
    }, [setBici]);

    return <Context.Provider value={{ bici, setBici }}>
        {children}
    </Context.Provider>
}

export default Context