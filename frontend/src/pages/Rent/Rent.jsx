import './Rent.scss';
import { useStations } from "../../hooks/useStations.jsx";
import StationsList from "../../components/Client/Rent/StationsList.jsx";

export default function Rent() {
    
    const {stations} = useStations();

    return (
        <div className="rent_container">
            <div className="rent d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <div className="title">
                                <h1>Stations</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='stations-list-container'>
                <StationsList stations={stations}/>
            </div>
        </div>
    )
}