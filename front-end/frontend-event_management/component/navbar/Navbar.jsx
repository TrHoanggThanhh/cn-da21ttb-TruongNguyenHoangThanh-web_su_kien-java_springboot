import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate từ react-router-dom
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const navigate = useNavigate();

  const handleMenuClick = (menuItem, path) => {
    setMenu(menuItem);  // Đặt trạng thái menu được chọn
    navigate(path);     // Điều hướng đến đường dẫn tương ứng
  };

  return (
    <div className='navbar'>
        <img src="https://www.tvu.edu.vn/wp-content/uploads/2018/10/logotvu.png" style={{ width: '80px', height: 'auto' }} />
        <ul className="navbar-menu">
            <li onClick={() => handleMenuClick('home', '/')} className={menu === 'home' ? 'active' : ''}>Trang chủ</li>
            <li onClick={() => handleMenuClick('outstand', '/outstand')} className={menu === 'outstand' ? 'active' : ''}>Sự kiện nổi bật</li>
            <li onClick={() => handleMenuClick('tvu', '/event-tvu')} className={menu === 'tvu' ? 'active' : ''}>Sự kiện TVU</li>
            <li onClick={() => handleMenuClick('clb', '/event-club')} className={menu === 'clb' ? 'active' : ''}>Sự kiện CLB</li>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '40px' }} />
            </div>
            <button>Đăng nhập</button>
        </div>
    </div>
  );
};

export default Navbar;
