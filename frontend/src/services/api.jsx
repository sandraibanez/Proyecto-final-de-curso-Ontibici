import axios from 'axios';
import secrets from '../secrets';
import JwtService from './JwtService';
const Axios = () => {
    let api = null;
    // console.log(JwtService.getToken());
    if (JwtService.getToken()) {
        // console.log(JwtService);
        api = axios.create({
            // baseURL: 'http://localhost:8000',
            baseURL: secrets.URL_DRF,
            headers: {
                "Content-type": "application/json",  
                "Authorization": `Bearer ${JwtService.getToken()}`
            }
        });
    }
    else {
        api = axios.create({
            baseURL: secrets.URL_DRF,
            headers: {
                "Content-type": "application/json",
            }
        });
    }
    return api;
}

export default Axios;