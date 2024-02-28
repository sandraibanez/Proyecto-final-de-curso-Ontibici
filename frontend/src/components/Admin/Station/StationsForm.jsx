import './StationsForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'; 

const StationsForm = ({station= {slug: '', name: '', direction: '', img: '', location: '',slots: ''}, form_type, sendData}) => {
    const navigate = useNavigate();

    const validators = Yup.object().shape({
        name: Yup.string().required('*Name is required').min(3).max(50),
        direction: Yup.string().required('*direction is required'),
        img: Yup.string().required('*img is required').min(3).max(100),
        location:Yup.string().required('*Location is required'),
        slots: Yup.number().required('*Slots number must be between 5 and 20').min(5).max(20),
        latitud: Yup.number().required('*Latitud is required').min(-180).max(180),
        long: Yup.number().required('*Longitud is required').min(-180).max(180),
    });

    const {register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: yupResolver(validators)});
    
    useEffect(() => {
        if (station.slug !== '') {
            setValue('name', station.name);
            setValue('img', station.img);
            setValue('direction',station.direction);
            setValue('location',station.location);
            setValue('slots', station.slots);
            setValue('latitud',station.latitud);
            setValue('long', station.long);
        }
    }, [station]);

    const send_data = data => {
        sendData(data);
    };

    const redirects = {
        stations: () => navigate('/dashboard/stations')
    };

    const button_type = form_type == 'create' ? 'Create' : 'Update';
    const read_only = form_type == 'update' ? true : false;

    return (
        <form className='station_form' onSubmit={handleSubmit(send_data)}>
            <div className='name_box'>
                <label htmlFor="name" className='etiqueta'>Station Name:</label>
                <input type="text" id="name" {...register('name')}/><br/>
                <span className="error">{errors.name?.message}</span>
            </div>
            <div className='direction_box'>
                <label htmlFor="direction" className='etiqueta'>direction:</label>
                <input type="text" id="direction" {...register('direction')}/><br/>
                <span className="error">{errors.direction?.message}</span>
            </div>
            
            <div className='img_box'>
                <label htmlFor='img' className='etiqueta'>img:</label>
                <input id='img' name="img" type="text" {...register('img')}/><br/>
                <span className="error">{errors.img?.message}</span>
            </div>
            <div className='Location_box'>
                <label htmlFor="Location" className='etiqueta'>Location:</label>
                <input type="text" id="Location" {...register('location')}/><br/>
                <span className="error">{errors.location?.message}</span>
            </div>
            <div className='Latitud_box'>
                <label htmlFor="Latitud" className='etiqueta'>Latitud:</label>
                <input type="latitud" id="Latitud" {...register('latitud')}/><br/>
                <span className="error">{errors.latitud?.message}</span>
            </div>
            <div className='Long_box'>
                <label htmlFor="Longitud" className='etiqueta'>Longitud:</label>
                <input type="longitud" id="long" {...register('long')}/><br/>
                <span className="error">{errors.long?.message}</span>
            </div>
            <div className='slots_box'>
                <label htmlFor='slots' className='etiqueta'>Slots:</label>
                <input id='slots' name="slots" type="text" {...register('slots')}/><br/>
                <span className="error">{errors.slots?.message}</span>
            </div> 
            <div className='buttons_box'>
                <button type="submit" className="btn btn-primary">{button_type}</button>
                <button type="button" className="btn btn-danger" onClick={() => redirects.stations()}>Cancel</button>
            </div>
        </form>
    )
}

export default StationsForm;