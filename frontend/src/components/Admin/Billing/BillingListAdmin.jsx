import React from 'react';
// import './BillingListAdmin.scss';
import BillingCardAdmin from './BillingCardAdmin';
export default function BillingListAdmin({ billing, deletebilling }) {
    console.log(billing.id);
    return (
        <div className="incidents_list_container">
            <div className="incidents_list d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Billing List</h1>
                        </div>
                    </div>
                </div>
            </div>
            <table className="slot_table" border="1">
                <thead className="thead_billing_list">
                    <tr>
                        <th>ID</th>
                        <th>Rent ID</th>
                        <th>User ID</th>
                        <th>Pay</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="tbody_billing_list">
                    {
                        billing.map((billing, index) => (
                            <BillingCardAdmin key={index} billing={billing} deletebilling={deletebilling} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}