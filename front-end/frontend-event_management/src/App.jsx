import React from 'react';
import Header from '../component/Header/Header';
// import Footer from '../component/Footer/Footer';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import Outstand from '../pages/Outstand/Outstand';
import Club from '../pages/Club/Club';
import School from '../pages/School/School';
import Register from '../pages/Register/Register';
import UserInfo from '../pages/UserInfo/UserInfo';
import Login from '../pages/Login/login';


const App = () => {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/outstand' element={<Outstand />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register  />} />
        <Route path='/event-tvu' element={<School />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path='/event-club' element={<Club />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
