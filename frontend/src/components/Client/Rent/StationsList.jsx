import React from 'react';
import StationCard from './StationCard';
export default function StationsList ({ stations }) {
    return  (
        <div className="stations_cards-list">
            {
                stations.map(( station, slug ) => (
                    <StationCard key={slug} station={station}/>
                ))
            }
        </div>
    )
}