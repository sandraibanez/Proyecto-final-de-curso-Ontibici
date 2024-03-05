// import './StationsForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'; 

const BillingForm = ({billing= {id: '', rent_id: '', user_id: '', pay: ''}, form_type, sendData}) => {
    const navigate = useNavigate();

    const validators = Yup.object().shape({
        rent_id: Yup.string().required('*Rent_id is required'),
        user_id: Yup.string().required('*User_id is required'),
        pay: Yup.string().required('*Pay is required'),
    });

    const {register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: yupResolver(validators)});
    
    useEffect(() => {
        if (billing.id !== '') {
            setValue('rent_id', billing.rent_id);
            setValue('user_id', billing.user_id);
            setValue('pay',billing.pay);
            
        }
    }, [billing]);

    const send_data = data => {
        sendData(data);
    };

    const redirects = {
        billing: () => navigate('/dashboard/billing')
    };

    const button_type = form_type == 'create' ? 'Create' : 'Update';
    const read_only = form_type == 'update' ? true : false;

    return (
        <form className='billing_form' onSubmit={handleSubmit(send_data)}>
            <div className='rent_id_box'>
                <label htmlFor="rent_id" className='etiqueta'>Rent ID:</label>
                <input type="text" id="rent_id" {...register('rent_id')}/><br/>
                <span className="error">{errors.rent_id?.message}</span>
            </div>
            <div className='direction_box'>
                <label htmlFor="user_id" className='etiqueta'>User ID:</label>
                <input type="text" id="user_id" {...register('user_id')}/><br/>
                <span className="error">{errors.user_id?.message}</span>
            </div>
            
            <div className='img_box'>
                <label htmlFor='pay' className='etiqueta'>pay:</label>
                <input id='pay' name="pay" type="text" {...register('pay')}/><br/>
                <span className="error">{errors.pay?.message}</span>
            </div>
            <div className='buttons_box'>
                <button type="submit" className="btn btn-primary">{button_type}</button>
                <button type="button" className="btn btn-danger" onClick={() => redirects.billing()}>Cancel</button>
            </div>
        </form>
    )
}

export default BillingForm;