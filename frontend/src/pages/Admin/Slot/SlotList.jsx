import React from "react";
// import { useSlots } from "../../../hooks/useSlots";
import { useStations } from "../../../hooks/useStations";
import SlotListAdmin from "../../../components/Admin/slot/slotListAdmin";

const SlotList = () => {

    const {stations} = useStations();
        
    return (
        // <h1>hola</h1>
        <SlotListAdmin stations={stations}/>
    )
}

export default SlotList;
