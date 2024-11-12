import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menu, setMenu] = useState('home'); 
  const [fullName, setFullName] = useState(''); 
  const [role, setRole] = useState(''); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const navigate = useNavigate();

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    const storedRole = localStorage.getItem('role');
    if (storedFullName && storedRole) {
      setFullName(storedFullName);
      setRole(storedRole);
    }
  }, []);

  const handleMenuClick = (menuItem, path) => {
    setMenu(menuItem);
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar-user-info')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleLogout = () => {
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    localStorage.removeItem('authToken');
    deleteCookie('sessionToken');
    deleteCookie('anotherCookie');
    window.location.reload();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to Search page with query
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className='navbar'>
      <img src="https://www.tvu.edu.vn/wp-content/uploads/2018/10/logotvu.png" className="logo" alt="Logo" />
      <ul className="navbar-menu">
        <li onClick={() => handleMenuClick('home', '/')} className={menu === 'home' ? 'active' : ''}>Trang chủ</li>
        <li onClick={() => handleMenuClick('outstand', '/outstand')} className={menu === 'outstand' ? 'active' : ''}>Sự kiện nổi bật</li>
        <li onClick={() => handleMenuClick('tvu', '/event-tvu')} className={menu === 'tvu' ? 'active' : ''}>Sự kiện TVU</li>
        <li onClick={() => handleMenuClick('clb', '/event-club')} className={menu === 'clb' ? 'active' : ''}>Sự kiện CLB</li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Tìm kiếm sự kiện" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="navbar-search-icon" onClick={handleSearch} />
          </form>
        </div>
        {fullName ? (
          <div className="navbar-user-info" onClick={toggleDropdown}>
            <span>{fullName}</span>
            <img src="https://via.placeholder.com/40" alt="Avatar" className="avatar" />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => handleMenuClick('user-infor', '/user-info')}>Thông tin tài khoản</li>
                  <li onClick={() => handleMenuClick('my-events', '/my-event')}>Các sự kiện đã đăng kí</li>
                  <li onClick={handleLogout}>Đăng xuất</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => handleMenuClick('login', '/login')} className="login">Đăng nhập</button>
            <button onClick={() => handleMenuClick('register', '/register')} className="register">Đăng ký</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
