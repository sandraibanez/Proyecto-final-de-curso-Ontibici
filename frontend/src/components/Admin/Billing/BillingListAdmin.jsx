
import React, { useEffect, useRef } from 'react';
import './BillingListAdmin.scss';
import BillingCardAdmin from './BillingCardAdmin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function BillingListAdmin({ billing = [], deletebilling }) {

    const validators = Yup.object().shape({
        pay: Yup.string().required('*Pay is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(validators) });
    const payRef = useRef('');
    const send_data = (data) => {
        console.log('jla',data);
        localStorage.setItem('pay', data.pay);

    };
    const valor = localStorage.getItem('pay');

    return (
        <div className="billing_list_container">
            <div className="billing_list d-flex align-items-center">
                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>Billing List</h1>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <h1>Current value of Pay: {valor}</h1>
            <div className='table-responsive'>
                <table className="table" border="1">
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
            <form className='billing_form ' onSubmit={handleSubmit(send_data)}>
                <div className='billing'>
                    <div className='img_box '>
                        <label htmlFor='pay' className='pay'>New pay value:</label>
                        <br />
                        <input id='pay' name="pay" type="text" {...register('pay')} /><br />
                        <span className="error">{errors.pay?.message}</span>
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
