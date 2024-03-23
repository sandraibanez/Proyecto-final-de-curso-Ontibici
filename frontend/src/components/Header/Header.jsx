import React, { useContext } from "react";
import './Header.css';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import stationimg from '../../assets/img/Logo.jpg';
export default function Header() {
    const navigate = useNavigate();
    const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
    const { notificationsNumber } = useNotifications();

    const redirects = {
        home: () => navigate('/home'),
        rent: () => navigate('/rent'),
        dashboard: () => navigate('/dashboard'),
        login: () => navigate('/login'),
        register: () => navigate('/register'),
        profile: (id) => navigate('/profile/' + id),
    }
    const badge = notificationsNumber == 0 ? true : false;

    const isUser = isAuth ? <a onClick={() => logout()} type="button">Log out</a>
        : <a onClick={() => redirects.register()}>Sign up</a>;

    const isUsername = isAuth ? <a className=" position-relative" onClick={() => redirects.profile(user.id)} type="button">{user.username}<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " hidden={badge}>{notificationsNumber}</span></a>
        : <a onClick={() => redirects.login()} type="button">Sign in</a>;

    const isAdminUser = isAdmin ? <a onClick={() => redirects.dashboard()} type="button">Dashboard</a> : '';

    // plantilla
    const selectHeader = document.querySelector('#header');
    if (selectHeader) {
        document.addEventListener('scroll', () => {
            window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
        });
    }

    return (
        <header id="header" className="container-fluid header d-flex align-items-center fixed-top">

            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                <a className="logo d-flex align-items-center" onClick={() => redirects.rent()}>
                    <img src={stationimg} alt="logo" />
                </a>
                <div className="row d-none d-lg-block">
                    <nav id="navbar" className="navbar">
                        <ul className="header-container container-fluid">
                            <li className="link nav-link" onClick={() => redirects.home()} type="button">Home</li>
                            <li className="link nav-link" onClick={() => redirects.rent()} type="button">Rent</li>
                            <li className="link nav-link">{isAdminUser}</li>
                            <li className="link nav-link">{isUsername}</li>
                            <li className="link nav-link">{isUser}</li>
                        </ul>
                    </nav>
                </div>
                <div className="row d-lg-none d-sm-block d-md-block">
                    <div className='header-responsive'>
                        <nav id="navbar" className="navbar">
                            <div className="button_color">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation" >
                                    <span className="navbar-toggler-icon text-white" ></span>
                                </button>
                            </div>


                            <div className="collapse navbar-collapse" id="navbarsExample01">
                                <div className="header-container d-flex gap-1">
                                    <a onClick={() => redirects.home()} type="button">Home</a>
                                    <a onClick={() => redirects.rent()} type="button">Rent</a>
                                    <a >{isAdminUser}</a>
                                    <a>{isUsername}</a>
                                    <a >{isUser}</a>
                                </div>
                            </div>
                        </nav>
                    </div>

                </div>
            </div>
        </header>
    )
}