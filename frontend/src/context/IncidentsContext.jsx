import React, { useState, useEffect, useContext } from 'react'
import IncidentsService from '../services/IncidentsService'
import AuthContext from './AuthContext';

const Context = React.createContext({})

export function IncidentsContextProvider({ children }) {
    const { isAdmin } = useContext(AuthContext);
    const [incidentsSlots, setIncidentsSlots] = useState([]);
    const [incidentsBici, setIncidentsBici] = useState([]);
    const [incidentsStation, setIncidentsStation] = useState([]);

    useEffect(function () {
        if (isAdmin) {
            IncidentsService.getAllIncidentsSlotsadmin()
                .then(({ data }) => {
                    setIncidentsSlots(data);
                })
        }
    }, [setIncidentsSlots, isAdmin])

    useEffect(function () {
        if (isAdmin) {
            IncidentsService.getAllIncidentsBiciadmin()
                .then(({ data }) => {
                    setIncidentsBici(data);
                })
        }
    }, [setIncidentsSlots, isAdmin])

    useEffect(function () {
        if (isAdmin) {
            IncidentsService.getAllIncidentsStationadmin()
                .then(({ data }) => {
                    setIncidentsStation(data);
                })
        }
    }, [setIncidentsSlots, isAdmin])


    return <Context.Provider value={{ incidentsSlots, setIncidentsSlots, incidentsBici, setIncidentsBici,incidentsStation, setIncidentsStation}}>
        {children}
    </Context.Provider>
}

export default Context