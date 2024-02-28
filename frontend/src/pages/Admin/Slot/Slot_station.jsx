import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStations } from "../../../hooks/useStations";
import SlotstationAdmin from "../../../components/Admin/slot/SlotstationAdmin";

export default function StationCard ({ station }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { oneStation, useOneStation, stationSlots } = useStations();

    useEffect(function () {
        useOneStation(slug);
    }, [])

    return (
        // <h1>hola station details</h1>
        stationSlots.length > 0 ? <SlotstationAdmin station={oneStation} slots={stationSlots}/> : <p>No stations available</p>
        // <SlotsList station={oneStation} slots={stationSlots}/>
    )
}