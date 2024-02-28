import React, { useState, useEffect, useCallback } from 'react'
import JwtService from '../services/JwtService';
import AuthService from '../services/AuthService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Context = React.createContext({})

export function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [token, setToken] = useState(JwtService.getToken ? JwtService.getToken : flase);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { useLogout } = useAuth();
    
    useEffect(() => {
    // JwtService.destroyToken();
    // JwtService.destroyRefreshToken();
        if (token) {
            console.log(token);
            AuthService.getUser()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setToken(data.token);
                        setUser(data.user);
                        setIsAuth(true);
                        setIsAdmin(data.user.type === 'admin');
                    }
                })
                .catch(({ error }) => {
                    console.log('hola refresh');
                    if (JwtService.getRefreshToken()) {
                        refresh_token();
                    } else {
                        logout();
                    }
                });
        }
    }, [token]);

    const refresh_token = async () => {
        JwtService.destroyToken();
        await AuthService.refreshToken()
            .then(({ data }) => {
                setToken(data.token);
                JwtService.saveToken(data.token);
                navigate('/rent');
            })
            .catch(({ }) => {
                logout();
            });
    }

    const logout = useCallback(() => {
        JwtService.destroyToken();
        JwtService.destroyRefreshToken();
        setUser({});
        setToken(false);
        setIsAuth(false);
        setIsAdmin(false);
        toast.success('Loged out successfully');
        navigate('/rent');
    }, []);

    return <Context.Provider value={{ user, setUser, token, setToken, isAuth, setIsAuth, isAdmin, setIsAdmin, logout }}>
        {children}
    </Context.Provider>
}

export default Context