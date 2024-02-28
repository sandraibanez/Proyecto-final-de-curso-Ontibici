import React, { useState } from 'react';
import Map, { GeolocateControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./StationsMap.scss";
import { useNavigate } from "react-router-dom";
import stationimg from '../../assets/img/station1.jpg'; 

export default function StationsMap({ stations = [], stationview }) {
    const [selectedStation, setSelectedStation] = useState(null);
    const navigate = useNavigate();

    const redirectToDetails = (slug) => {
        navigate('/stations/' + slug);
    }

    return (
        <div className="maps_content">
            <Map
                mapboxAccessToken="pk.eyJ1Ijoic2FsbXUxMCIsImEiOiJjbGRqNmZpZ2wxbDM5M3BwaXBmZXNpaGR3In0.6uyL22hZV1D-Z0yiM-hgew"
                initialViewState={{ longitude: -0.603869, latitude: 38.820219, zoom: 13.5 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true}/>
                {stations.map((station, id) => {
                    return <Marker key={id} latitude={station.latitud} longitude={station.long} color={"#0e1d34"}/>
                })}
                {stations.map((station, index) => (
                    <Marker
                        key={index}
                        latitude={station.latitud}
                        longitude={station.long}
                    >
                        <button
                            className="marker_button"
                            onClick={() => {
                                setSelectedStation(station);
                                stationview(station.id);
                            }}
                        >
                            <div style={{ backgroundColor: 'transparent', width: 25, height: 50, borderRadius: '50%', color:'#0e1d34'}}/>
                        </button>
                    </Marker>
                ))}

                {selectedStation && (
                    <Popup
                        latitude={selectedStation.latitud}
                        longitude={selectedStation.long}
                        closeButton={true}
                        closeOnClick={false} 
                        onClose={() => {
                            setSelectedStation(null);
                            stationview(null);
                        }}
                        anchor="top"
                    >
                        <div className="popup" onClick={() => redirectToDetails(selectedStation.slug)}>
                            <div className='popup_name'>
                                <h5>{selectedStation.name}</h5>
                            </div>
                            <div className='popup_image'>
                                <img src={stationimg} alt="Station" /> 
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
