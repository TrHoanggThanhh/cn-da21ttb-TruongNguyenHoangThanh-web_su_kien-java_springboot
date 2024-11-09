import React from 'react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import Outstand from '../pages/Outstand/Outstand';
import Club from '../pages/Club/Club';
import School from '../pages/School/School';


const App = () => {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/outstand' element={<Outstand />} />
        <Route path='/event-tvu' element={<School />} />
        <Route path='/event-club' element={<Club />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
