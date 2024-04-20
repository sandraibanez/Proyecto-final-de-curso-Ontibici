import api from "./api"

const BiciService = {

    getAllBici() {
        return api().get("/bici");
    },

    getOneBici(slug) {
        return api().get(`bici/${slug}`);
    },

    createBici(data) {
     
        return api().post("/bici", { 'bici': data });
    },

    updateBici(slug, data) {
        return api().put(`bici/${slug}`, { 'bici': data });
    },

    deleteBici(slug) {
        return api().delete(`bici/${slug}`);
    },
    
};

export default BiciService;