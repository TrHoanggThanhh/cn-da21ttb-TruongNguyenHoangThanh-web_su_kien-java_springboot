import React from 'react';
import Navbar from '../component/navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/homePage/Home';
import Outstand from '../pages/eventOutstandPage/Outstand';
import Club from '../pages/eventClubPage/club';
import Tvu from '../pages/eventTVUPage/tvu';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/outstand' element={<Outstand />} />
        <Route path='/event-tvu' element={<Tvu />} />
        <Route path='/event-club' element={<Club />} />
      </Routes>
    </div>
  );
};

export default App;
