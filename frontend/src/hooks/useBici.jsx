import {useContext, useCallback, useEffect, useState} from 'react';
import BiciService from '../services/BiciService';
import BiciContext from "../context/BiciContext";
import { toast } from "react-toastify";

export function useBici() {
    const {bici, setBici} = useContext(BiciContext);
    const [oneBici, setOneBici] = useState({});
    const [isCorrect, setIsCorrect] = useState(false);

    const useOneBici = useCallback((slug) => {
        BiciService.getOneBici(slug)
            .then(({data}) => {
                setOneBici(data);
            })
            .catch(e => console.error(e));
    }, [oneBici]);

    const useAddBici = useCallback(data => {
        BiciService.createBici(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    // toast.success('Bici added successfully');
                    setBici([...bici, data]);
                    setIsCorrect(true);
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch(e => {
                console.error(e);
                // toast.error('Add new Bici error');
            });
    }, []);

    const useUpdateBici = useCallback((slug, data) => {
        BiciService.updateBici(slug, data)
            .then(({ data, status }) => {
                if (status === 200) {
                    let old_Bici = [...bici];
                    const index = old_Bici.findIndex(item => item.slug === slug);
                    if (index !== -1) {
                        old_Bici[index] = data;
                        setBici(old_Bici);
                    }
                    // toast.success('Bici updated successfully');
                    setIsCorrect(true);
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch(e => {
                console.error(e);
                // toast.error('Update Bici error');
            });
    }, []);

    const useDeleteBici = (slug) => {
        BiciService.deleteBici(slug)
            .then(({ data, status }) => {
                if (status === 200) {
                    // toast.success(data.data);
                    setBici(bici.filter(bici => bici.slug !== slug));
                }
            })
            .catch(e => console.error(e));
    } 

    return {  bici, setBici,isCorrect,useOneBici, oneBici, setOneBici, useAddBici, useUpdateBici, useDeleteBici }}