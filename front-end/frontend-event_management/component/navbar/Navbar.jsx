import React, { useState } from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../src/assets/assets'

const Navbar = () => {
  const [menu, setMenu] = useState('outstand')
  return (
    <div className='navbar'>
        <img src="https://www.tvu.edu.vn/wp-content/uploads/2018/10/logotvu.png" style={{ width: '80px', height: 'auto' }}/>
        <ul className="navbar-menu">
            <li onClick={() => setMenu('home')} className={menu === 'home'?'active':''}>Trang chủ</li>
            <li onClick={() => setMenu('outstand')} className={menu === 'outstand'?'active':''}>Sự kiện nổi bật</li>
            <li onClick={() => setMenu('tvu')} className={menu === 'tvu'?'active':''}>Sự kiện TVU</li>
            <li onClick={() => setMenu('clb')} className={menu === 'clb'?'active':''}>Sự kiện CLB</li>

        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '40px' }} />

            </div>
            <button>Đăng nhập</button>
        </div>
    </div>
  )
}

export default Navbar
