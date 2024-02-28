import React, { useState } from 'react';
import './Home.scss';
import { useStations } from "../../hooks/useStations.jsx";
import StationsMap from "../../components/Map/StationsMap.jsx";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading.jsx";

export default function Home() {
    const {stations} = useStations();
    const [view, stationview] = useState(null);
    console.log(stations);
    return (
        stations.length === 0 ? <SpinnerLoading />
        :<div className="home_container">
            <div className="title">
                <h1>Stations Map</h1>
            </div>
            <div className='maps'>
                <StationsMap stations={stations} stationview={stationview}/>
            </div>
        </div>
    )
}