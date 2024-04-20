import api from "./api"

const StationService = {

    getAllStations() {
        return api().get("/stations");
    },

    getOneStation(slug) {
       
        return api().get(`stations/${slug}`);
    },

    createStation(data, slots=0) {
        return api().post("stations/", { 'station': data, 'slot': { 'num_slots': slots } });
    },

    updateStation(slug, data) {
        return api().put(`stations/${slug}`, { 'station': data });
    },

    deleteStation(slug) {
        return api().delete(`stations/${slug}`);
    },
    
};
export default StationService;