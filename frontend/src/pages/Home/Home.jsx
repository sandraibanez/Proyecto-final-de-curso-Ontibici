import React, { useState } from 'react';
import './Home.scss';
import { useStations } from "../../hooks/useStations.jsx";
import StationsMap from "../../components/Map/StationsMap.jsx";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading.jsx";

export default function Home() {
    const { stations } = useStations();
    const [view, stationview] = useState(null);
    console.log(stations);
    return (
        stations.length === 0 ? <SpinnerLoading />
            : <div className="home_container">
                <div className="home d-flex align-items-center">
                    <div className="container">
                        <div className="row gy-4 d-flex justify-content-between">
                            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                <div className="title">
                                    <h1>Stations Map</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='maps'>
                    <StationsMap stations={stations} stationview={stationview} />
                </div>
                <br/>
            </div>
    )
}