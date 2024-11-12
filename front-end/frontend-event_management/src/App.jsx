import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import Home from '../pages/Home/Home';
import Outstand from '../pages/Outstand/Outstand';
import Club from '../pages/Club/Club';
import School from '../pages/School/School';
import Register from '../pages/Register/Register';
import UserInfo from '../pages/UserInfo/UserInfo';
import MyEvent from '../pages/MyEvent/MyEvent';
import Search from '../pages/Search/Search';
import VerifiEmail from '../pages/VerifiEmail/VerifiEmail';
import Login from '../pages/Login/login';

import Dashboard from '../pages/admin/Dashboard/Dashboard';
import CreateEvent from '../pages/admin/CreateEvent/CreateEvent';
import UpdateEvent from '../pages/admin/UpdateEvent/UpdateEvent';
import CreateCategogyEvent from '../pages/admin/CreateCategogyEvent/CreateCategogyEvent';

const App = () => {
  const location = useLocation();

  return (
    <div className='app'>
      {/* Hiển thị Header nếu không phải trên các trang dashboard, tạo sự kiện, hoặc tạo danh mục */}
      {location.pathname !== '/dashboard' && location.pathname !== '/create-event' && location.pathname !== '/create-category' && <Header />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/outstand' element={<Outstand />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/event-tvu' element={<School />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path='/event-club' element={<Club />} />
        <Route path='/search' element={<Search />} />
        <Route path='/my-event' element={<MyEvent />} />
        {/* <Route path='/verifi-email' element={<VerifiEmail />} /> */}
        
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/update-event/:id' element={<UpdateEvent />} />
        <Route path='/create-category' element={<CreateCategogyEvent />} />
      </Routes>
      
      {/* <Footer /> */}
    </div>
  );
};

export default App;
