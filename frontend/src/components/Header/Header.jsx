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

    const isUser = isAuth ? <li className="link nav-link" onClick={() => logout()}>Log out</li>
        : <li className="link nav-link" onClick={() => redirects.register()}>Sign up</li>;

    const isUsername = isAuth ? <li className="link nav-link position-relative" onClick={() => redirects.profile(user.id)}>{user.username}<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " hidden={badge}>{notificationsNumber}</span></li>
        : <li className="link nav-link" onClick={() => redirects.login()}>Sign in</li>;

    const isAdminUser = isAdmin ? <a className="link nav-link" onClick={() => redirects.dashboard()}>Dashboard</a> : '';

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
                            <li className="link nav-link" onClick={() => redirects.home()}>Home</li>
                            <li className="link nav-link" onClick={() => redirects.rent()}>Rent</li>
                            {isAdminUser}
                            {isUsername}
                            {isUser}
                        </ul>
                    </nav>
                </div>
                <div className="row d-lg-none d-sm-block d-md-block">
                    <nav id="navbar" className="navbar">
                        <div className="button_color">
                          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon text-white" ></span>
                        </button>   
                        </div>
                       
                        <div className="collapse navbar-collapse" id="navbarsExample01">
                            <ul className="header-container container-fluid navbar-nav me-auto mb-2">
                                <li className="link nav-link" onClick={() => redirects.home()}>Home</li>
                                <li className="link nav-link" onClick={() => redirects.rent()}>Rent</li>
                                {isAdminUser}
                                {isUsername}
                                {isUser}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}