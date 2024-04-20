
import {useContext, useCallback, useEffect, useState} from 'react';
import StationContext from "../context/StationsContext";
import StationService from '../services/StationService';
import SlotService from '../services/SlotService';
import { useSlots } from './useSlots';

export function useStations() {
    const {stations, setStations} = useContext(StationContext);
    const [oneStation, setOneStation] = useState({});
    const { slots, setSlots } = useSlots();
    const [isCorrect, setIsCorrect] = useState(false);
    const [stationSlots, setStationSlots] = useState([]);
    useEffect(() => {
        const station = { 'station_id': oneStation.id };
        SlotService.getAllSlots(station)
            .then(({ data, status }) => {
                if (status === 200) {
                    setStationSlots(data);
                    
                }
            })
            .catch(e => console.error(e));
    }, [oneStation]);

    const useOneStation = useCallback((slug) => {
     
        StationService.getOneStation(slug)
            .then(({data}) => {
                setOneStation(data);
             
            })
            .catch(e => console.error(e));
    }, [oneStation]);

    
    const useAddStation = useCallback(data => {
        let station_data = {
            "station":{
                direction: data.direction ,
                location: data.location,
                name: data.name,
                img: data.img
            }

        //    "slot":{
        //         num_slot: data.slots
        //    }
        }

        StationService.createStation(data,data.slots)
            .then(({ data, status }) => {
                if (status === 200) {
                    // toast.success('Station created successfully');
                    setStations([...stations, data]);
                    setIsCorrect(true);
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch(e => {
                console.error(e);
                // toast.error('Create station error');
            });
    }, []);

    const useUpdateStation = useCallback((slug, data) => {
        let station_data = {
            "station":{
                direction: data.direction ,
                location: data.location,
                name: data.name,
                img: data.img
            },
           "slot":{
                num_slot: data.num_slot
           }
        }

        StationService.updateStation(slug, data)
            .then(({ data, status }) => {
                if (status === 200) {
                    let old_stations = [...stations];
                    const index = old_stations.findIndex(station => station.slug === slug);
                    if (index !== -1) {
                        old_stations[index] = data;
                        setStations(old_stations);
                    }
                    // toast.success('Station updated successfully');
                    setIsCorrect(true);
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch(e => {
                console.error(e);
                // toast.error('Create station error');
            });
            setIsCorrect(true);
            setTimeout(() => { setIsCorrect(false); }, 1000);
        }, []);

    const useDeleteStation = (slug) => {
        StationService.deleteStation(slug)
        .then(({ data, status }) => {
            if (status === 200) {
                // toast.success(data.data);
                setStations(stations.filter(station => station.slug !== slug));
            }
        })
        .catch(e => console.error(e));
    }

    return { isCorrect,stations, setStations, useOneStation, oneStation,setOneStation, setStationSlots, stationSlots,useAddStation, useDeleteStation, useUpdateStation}
}