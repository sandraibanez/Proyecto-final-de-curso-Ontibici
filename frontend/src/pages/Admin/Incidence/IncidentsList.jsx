import React from "react";
import { useIncidents } from "../../../hooks/useIncidents";
import IncidentsListAdmin from "../../../components/Admin/Incidence/IncidentsListAdmin";

const IncidentsList = () => {
    
    const {incidentsSlots,  useDeleteIncidenceSlot,useDeleteIncidenceStation, incidentsStation, } = useIncidents();

    return (
        <IncidentsListAdmin incidents_slots={incidentsSlots} incidents_station={incidentsStation} deleteIncidenceslot={useDeleteIncidenceSlot} deleteIncidencestation={useDeleteIncidenceStation}/>
    )
}

export default IncidentsList;
