import React from 'react';
import SlotCard from './SlotCard';

export default function SlotsList ({ station, slots }) {
console.log({station,slots});
    return  (
        
        <div className="slots_container">
            <div id="hero" class="hero d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <div className="title">
                                <h1>Rent a Bici</h1>
                                <h3>{station.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slots_cards-list">
                {
                    slots.map(( slots, index ) => (
                        <SlotCard key={index} slot={slots}/>
                    ))
                }
            </div>
            
        </div>
                
    )
}