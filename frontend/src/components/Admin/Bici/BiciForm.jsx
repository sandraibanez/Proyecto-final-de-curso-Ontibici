import './BiciForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const BiciForm = ({bici= {slug: '', name: '', status: ''}, form_type, sendData}) => {
    const navigate = useNavigate();

    const validators = Yup.object().shape({
        name: Yup.string().required('*Name is required').min(3).max(15),
        status: Yup.string().required('*Status is required'),
    });

    const {register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: yupResolver(validators)});
    
    useEffect(() => {
        if (bici.slug !== '') {
            setValue('name', bici.name);
            setValue('status', bici.status);
        }
    }, [bici]);

    const send_data = data => {
        sendData(data);
    };

    const redirects = {
        Bici: () => navigate('/dashboard/Bici')
    };

    const button_type = form_type == 'create' ? 'Create' : 'Update';

    return (
        <form className='Bici_form' onSubmit={handleSubmit(send_data)}>
            <div className='name_box'>
                <label htmlFor="name" className='etiqueta'>Bici Name:</label>
                <input type="text" id="name" {...register('name')}/><br/>
                <span className="error">{errors.name?.message}</span>
            </div>
            <div className='status_box'>
                <label htmlFor='status' className='etiqueta'>Status:</label>
                <select id='status' name="status" {...register('status')} defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="in_use">In use</option>
                    <option value="vacant">Vacant</option>
                    <option value="maintenance">Maintenance</option>
                </select><br/>
                <span className="error">{errors.status?.message}</span>
            </div>
            <div className='buttons_box'>
                <button type="submit" className="btn btn-primary">{button_type}</button>
                <button type="button" className="btn btn-danger" onClick={() => redirects.Bici()}>Cancel</button>
            </div>
        </form>
    )
}

export default BiciForm;