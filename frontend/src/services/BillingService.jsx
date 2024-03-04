import api from "./api"

const BillingService = {
    // admin
    getAllAdmin() {
        return api().get("/billingall");
    },

    updateBilling(id, data) {
        return api().put(`billing/${id}`,{'billing':data});
    },

    deleteBilling(id) {
        return api().delete(`billingdelete/${id}`);
    },

    // user
    createBilling(data) {
        let var1 = {
            rent_id: data,
            pay: 20
        }
        console.log({ "billing_create":var1 });
        return api().post("/billing_create", { 'billing_create':var1});
    },

   
    getBilling() {
        return api().get("/billing");
    },

}
export default BillingService;