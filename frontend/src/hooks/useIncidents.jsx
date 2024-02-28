import React, { useEffect, useCallback, useState, useContext } from "react";
import IncidentsContext from '../context/IncidentsContext';
import IncidentsService from '../services/IncidentsService';
import { toast } from 'react-toastify'
import AuthContext from "../context/AuthContext";

export function useIncidents() {
    const { isAuth } = useContext(AuthContext);
    const { incidentsSlots,incidentsBici,incidentsStation, setIncidentsSlots, setIncidentsBici,setIncidentsStation } = useContext(IncidentsContext);
    const [userIncidents, setUserIncidents] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [incidentsSlotsUser, setIncidentsSlotsUser] = useState([]);
    const [incidentsStationsUser, setIncidentsStationUser] = useState([]);
    useEffect(function () {
        if (isAuth) {
            IncidentsService.getAllIncidentsSlots()
                .then(({ data }) => {
                    setIncidentsSlotsUser(data);
                    // console.log( data);
                })
        }
    }, [setIncidentsSlotsUser,isAuth])

    useEffect(function () {
        if (isAuth) {
            IncidentsService.getAllIncidentsStation()
                .then(({ data }) => {
                    setIncidentsStationUser(data);
                    // console.log( data);
                })
        }
    }, [setIncidentsStationUser,isAuth])
    // create user

    const useAddSlotIncidence = useCallback((data) => {
        if (isAuth) {
            IncidentsService.createSlotIncidence(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
                        setIncidentsSlots([...incidentsSlots, data]);
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useAddBiciIncidence = useCallback((data) => {
        if (isAuth) {
            IncidentsService.createBiciIncidence(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
                        setIncidentsBici([...incidentsBici, data]);
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useAddStationIncidence = useCallback((data) => {
        if (isAuth) {
            IncidentsService.createStationIncidence(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
                        setIncidentsStation([...incidentsStation, data]);
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                        console.log(data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    // update admin

    const useUpdateIncidenceSlot = (id, data, type) => {
        if (isAuth) {
            IncidentsService.updateSlotIncidence(id, data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        let old_incidents = [...incidentsSlots];
                        const remove_old = old_incidents.findIndex(incidence => incidence.id === id);
                        if (remove_old !== -1) {
                            old_incidents[remove_old] = data;
                            setIncidentsSlots(old_incidents);
                            // toast.success('Slot incidence status updated');
                        }
                    }
                })
                .catch((e) => {
                    toast.error(e.response.data[0]);
                });
        }
    }

    const useUpdateIncidenceBici = (id, data, type) => {
        if (isAuth) {
            IncidentsService.updateBiciIncidence(id, data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        let old_incidents = [...incidentsBici];
                        const remove_old = old_incidents.findIndex(incidence => incidence.id === id);
                        if (remove_old !== -1) {
                            old_incidents[remove_old] = data;
                            setIncidentsBici(old_incidents);
                            // toast.success('bici incidence status updated');
                        }
                    }
                })
                .catch((e) => {
                    toast.error(e.response.data[0]);
                });
        }
    }

    const useUpdateIncidenceStation = (id, data, type) => {
        if (isAuth) {
            IncidentsService.updateStationIncidence(id, data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        let old_incidents = [...incidentsStation];
                        const remove_old = old_incidents.findIndex(incidence => incidence.id === id);
                        if (remove_old !== -1) {
                            old_incidents[remove_old] = data;
                            setIncidentsStation(old_incidents);
                            // toast.success('Slot incidence status updated');
                        }
                    }
                })
                .catch((e) => {
                    toast.error(e.response.data[0]);
                });
        }
    }

    // delete admin

    const useDeleteIncidenceSlot = (type, id) => {
        if (isAuth) {
            IncidentsService.deleteSlotIncidence(id)
                .then(({ data, status }) => {
                    if (status === 200) {
                        // toast.success(data.data);
                        setIncidentsSlots(incidentsSlots.filter(incidence => incidence.id !== id));
                    }
                })
                .catch(e => console.error(e));
            
        }
    }

    const useDeleteIncidenceBici = (type, id) => {
        if (isAuth) {
            IncidentsService.deleteBiciIncidence(id)
                .then(({ data, status }) => {
                    if (status === 200) {
                        // toast.success(data.data);
                        setIncidentsBici(incidentsBici.filter(incidence => incidence.id !== id));
                    }
                })
                .catch(e => console.error(e));
            
        }
    }

    const useDeleteIncidenceStation = (type, id) => {
        if (isAuth) {
            IncidentsService.deleteStationIncidence(id)
                .then(({ data, status }) => {
                    if (status === 200) {
                        // toast.success(data.data);
                        setIncidentsStation(incidentsStation.filter(incidence => incidence.id !== id));
                    }
                })
                .catch(e => console.error(e));
            
        }
    }


    return { isCorrect,incidentsStationsUser, setIncidentsStationUser,incidentsSlotsUser, setIncidentsSlotsUser, incidentsSlots,incidentsBici,incidentsStation, setIncidentsSlots, setIncidentsBici,setIncidentsStation, userIncidents, setUserIncidents, useAddSlotIncidence,useAddBiciIncidence,useAddStationIncidence, useUpdateIncidenceSlot,useUpdateIncidenceBici,useUpdateIncidenceStation,useDeleteIncidenceSlot,useDeleteIncidenceBici,useDeleteIncidenceStation };  
}