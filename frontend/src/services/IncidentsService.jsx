import api from "./api"

const IncidentsService = {

    // get user
    getAllIncidentsSlots() {
        return api().get("/incidentsslot");
    },

    getAllIncidentsBici() {
        return api().get("/incidentsbici");
    },

    getAllIncidentsStation() {
        return api().get("/incidentsstation");
    },

    // create user
    createSlotIncidence(data) {
        console.log(data);
        return api().post("/slot_incidence", { 'slot_incidence': data });
    },

    createBiciIncidence(data) {
        return api().post("/bici_incidence", { 'bici_incidence': data });
    },

    createStationIncidence(data) {
        console.log(data);
        return api().post("/station_incidence", { 'station_incidence': data });
    },

    // get admin
    getAllIncidentsSlotsadmin() {
        return api().get("/incidentsadslot");
    },

    getAllIncidentsBiciadmin() {
        return api().get("/incidentsadbici");
    },

    getAllIncidentsStationadmin() {
        return api().get("/incidentsadstation");
    },
    
    // update admin
    updateSlotIncidence(id, data) {
        return api().put(`slot_incidence/${id}`, data);
    },

    updateBiciIncidence(id, data) {
        return api().put(`bici_incidence/${id}`, data);
    },

    updateStationIncidence(id, data) {
        return api().put(`station_incidence/${id}`, data);
    },

    // delete admin
    deleteSlotIncidence(id) {
        return api().delete(`slotincidence/${id}`);
    },

    deleteBiciIncidence(id) {
        return api().delete(`biciincidence/${id}`);
    },

    deleteStationIncidence(id) {
        return api().delete(`stationincidence/${id}`);
    },

    
    
};

export default IncidentsService;