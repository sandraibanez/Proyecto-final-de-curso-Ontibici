import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.scss'

// librerias para la plantilla
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import './assets/vendor/aos/aos.css';

// fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SpinnerLoading from './components/SpinnerLoading/SpinnerLoading';

import { StationContextProvider } from './context/StationsContext';
import { SlotContextProvider } from './context/SlotsContext';
import { BiciContextProvider } from './context/BiciContext';
import { AuthContextProvider } from './context/AuthContext';
import { IncidentsContextProvider } from './context/IncidentsContext';
import { NotificationsContextProvider } from './context/NotificationsContext';
import {BillingContextProvider} from './context/BillingContext';
//Guards
import AuthGuard from './services/guards/AuthGuard';
import AdminGuard from './services/guards/AdminGuard';
import Profile from './pages/Client/Profile';

// rutas de la aplicacion
const Home = React.lazy(() => import("./pages/Home/Home"));
const Rent = React.lazy(() => import("./pages/Rent/Rent"));
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Login/Register"));

const StationsList = React.lazy(() => import('./pages/Admin/Station/StationsList'));
const StationsAdd = React.lazy(() => import('./pages/Admin/Station/StationsAdd'));
const StationsUpdate = React.lazy(() => import('./pages/Admin/Station/StationsUpdate'));
const StationDetails = React.lazy(() => import('./pages/Client/StationDetails'));


const BiciList = React.lazy(() => import('./pages/Admin/Bici/BiciList'));
const BiciAdd = React.lazy(() => import('./pages/Admin/Bici/BiciAdd'));
const BiciUpdate = React.lazy(() => import('./pages/Admin/Bici/BiciUpdate'));

const UsersList = React.lazy(() => import('./pages/Admin/User/UsersList'));
const RentsList = React.lazy(() => import('./pages/Admin/Rent/RentsList'));

const SlotList = React.lazy(() => import('./pages/Admin/Slot/SlotList'))
const Slot_station = React.lazy(() => import('./pages/Admin/Slot/Slot_station'))

const IncidentsList = React.lazy(() => import('./pages/Admin/Incidence/IncidentsList'))

const BillingList = React.lazy(() => import('./pages/Admin/Billing/BillingList'))
const BillingUpdate = React.lazy(() => import('./pages/Admin/Billing/BillingUpdate'))
function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App">
      <Suspense fallback={<SpinnerLoading />}>
        <BrowserRouter>
          <AuthContextProvider>
            <StationContextProvider>
              <BiciContextProvider>
                <SlotContextProvider>
                  <IncidentsContextProvider>
                    <BillingContextProvider>
                      <NotificationsContextProvider>
                        <Header />
                        <Routes>
                          {/* rutas del header */}
                          <Route path="/" element={<Rent />} />
                          <Route path="/home" element={<Home />} />
                          <Route path="/rent" element={<Rent />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          {/* rutas salto de las paginas */}
                          <Route element={<AuthGuard />}>
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/stations/:slug" element={<StationDetails />} />
                          </Route>

                          <Route element={<AdminGuard />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/stations" element={<StationsList />} />
                            <Route path="/dashboard/stations/add" element={<StationsAdd />} />
                            <Route path="/dashboard/stations/update/:slug" element={<StationsUpdate />} />
                            <Route path="/dashboard/bici" element={<BiciList />} />
                            <Route path="/dashboard/bici/add" element={<BiciAdd />} />
                            <Route path="/dashboard/bici/update/:slug" element={<BiciUpdate />} />
                            <Route path="/dashboard/users" element={<UsersList />} />
                            <Route path="/dashboard/rents" element={<RentsList />} />
                            <Route path="/dashboard/slot" element={<SlotList />} />
                            <Route path="/dashboard/dashboard/stations/slot/:slug" element={<Slot_station />} />
                            <Route path="/dashboard/incidents" element={<IncidentsList />} />
                            <Route path="/dashboard/billing" element={<BillingList />} />
                            <Route path="/dashboard/billing/update/:id" element={<BillingUpdate />} />
                          </Route>
                        </Routes>
                        <Footer />
                      </NotificationsContextProvider>
                    </BillingContextProvider>
                  </IncidentsContextProvider>
                </SlotContextProvider>
              </BiciContextProvider>
            </StationContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;