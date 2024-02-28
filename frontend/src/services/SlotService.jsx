import api from "./api"

const SlotService = {

    getAllSlots(station = 0) {
        console.log(station);
        let num = station.station_id !== undefined ? station.station_id : 0;
        return api().get(`/slot?stations_id=${num}`);
    },

    getOneSlot(id) {
        return api().get(`slot/${id}`);
    },

};

export default SlotService;