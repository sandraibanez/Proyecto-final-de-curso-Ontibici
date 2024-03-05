import api from "./api"

const BillingService = {
    // admin
    getAllAdminBilling() {
        console.log('hola');
        return api().get("/billingall");
    },
    getOneBilling(id) {
        console.log(id);
        return api().get(`billing/${id}`);
    },
    updateBilling(id, data) {
        console.log(data);
        return api().put(`billing_update/${id}`,{'billing':data});
    },

    deleteBilling(id) {
        console.log(id);
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