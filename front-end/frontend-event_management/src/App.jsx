import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from '../component/Header/Header';
// import Footer from '../component/Footer/Footer';
import Home from '../pages/Home/Home';
import Outstand from '../pages/Outstand/Outstand';
import Club from '../pages/Club/Club';
import School from '../pages/School/School';
import Register from '../pages/Register/Register';
import UserInfo from '../pages/UserInfo/UserInfo';
//import VerifiEmail from '../pages/VerifiEmail/VerifiEmail';
import Login from '../pages/Login/login'

import Dashboard from '../pages/Dashboard/Dashboard';

const App = () => {
  const location = useLocation();

  return (
    <div className='app'>
      {location.pathname !== '/dashboard' && <Header />}

      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/outstand' element={<Outstand />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/event-tvu' element={<School />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path='/event-club' element={<Club />} />
        {/* //<Route path='/verifi-email' element={<VerifiEmail />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
