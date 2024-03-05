import api from "./api"

const BillingService = {
    // admin
    getAllAdminBilling() {
        console.log('hola');
        return api().get("/billingall");
    },
    payadmin(value){
        console.log(value);
        return api().post("billing_pay",{'billing_pay':value});
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
        const pay_value = localStorage.getItem('pay');
        const pay_id = JSON.parse(pay_value);
        // const var1 = data.pay;
        // const var2 = {...data}
        // console.log(var1,data.id,data);
        let value = {
            rent_id: data,
            pay: pay_id
        }
        return api().post("/billing_create", { 'billing_create':value});
    },

   
    getBilling() {
        return api().get("/billing");
    },

}
export default BillingService;