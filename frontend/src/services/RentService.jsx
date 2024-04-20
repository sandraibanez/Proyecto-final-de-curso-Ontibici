import api from "./api"

const RentService = {

    getAllRents() {
        return api().get("/rents");
    },

    rentBici(slot) {
     
        return api().post(`rent/${slot.id}`);
    },

    getOneRent() {
        return api().get("/rent");
    },

    bringBackBici(slot) {
       
        return api().post("bringbackBicis", { "bici": { "end_slot": slot.id, "bici_id": slot.bici_id } });
    },

    deleteRent(id) {
        return api().delete(`deleteRent/${id}`);
    },

};

export default RentService;