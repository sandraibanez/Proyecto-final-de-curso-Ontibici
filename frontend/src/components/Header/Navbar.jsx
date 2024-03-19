// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";
// import { useNotifications } from "../../hooks/useNotifications";
// import stationimg from '../../assets/img/Logo.jpg';
// import "./Navbar.css"

// const Navbar = () => {
//     const navigate = useNavigate();
//     const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
//     const { notificationsNumber } = useNotifications();

//     const redirects = {
//         home: () => navigate('/home'),
//         rent: () => navigate('/rent'),
//         dashboard: () => navigate('/dashboard'),
//         login: () => navigate('/login'),
//         register: () => navigate('/register'),
//         profile: (id) => navigate('/profile/' + id),
//     }
//     const badge = notificationsNumber == 0 ? true : false;

//     const isUser = isAuth ? <li className="link nav-link" onClick={() => logout()}>Log out</li>
//         : <li className="link nav-link" onClick={() => redirects.register()}>Sign up</li>;

//     const isUsername = isAuth ? <li className="link nav-link position-relative" onClick={() => redirects.profile(user.id)}>{user.username}<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger " hidden={badge}>{notificationsNumber}</span></li>
//         : <li className="link nav-link" onClick={() => redirects.login()}>Sign in</li>;

//     const isAdminUser = isAdmin ? <a className="link nav-link" onClick={() => redirects.dashboard()}>Dashboard</a> : '';

//     return (
//         <div className="navbar">
//             <div className="nav_logo"> CODEA.APP </div>
//             <div className="nav_items">
//                 <li className="link nav-link" onClick={() => redirects.home()}>Home2</li>
//                 <li className="link nav-link" onClick={() => redirects.rent()}>Rent2</li>
//                 {isAdminUser}
//                 {isUsername}
//                 {isUser}
//             </div>
//             <div className="nav_toggle" >
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//         </div>
//     )

// }
// export default Navbar