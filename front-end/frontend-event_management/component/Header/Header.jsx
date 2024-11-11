import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menu, setMenu] = useState('home'); // Trạng thái của menu hiện tại
  const [fullName, setFullName] = useState(''); // Lưu tên người dùng
  const [role, setRole] = useState(''); // Lưu vai trò người dùng
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái mở/đóng dropdown
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage khi component được render
  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    const storedRole = localStorage.getItem('role');
    if (storedFullName && storedRole) {
      setFullName(storedFullName);
      setRole(storedRole);
    }
  }, []);

  // Xử lý sự kiện khi nhấn vào các mục menu
  const handleMenuClick = (menuItem, path) => {
    setMenu(menuItem);
    navigate(path);
  };

  // Toggle trạng thái dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Đóng dropdown khi người dùng click ra ngoài
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Thêm sự kiện để đóng dropdown khi người dùng click ra ngoài
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

  // Hàm để xóa cookie
  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa dữ liệu người dùng trong localStorage
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    localStorage.removeItem('authToken'); // Xóa token khỏi localStorage
    
    // Xóa cookie
    deleteCookie('sessionToken'); // Xóa cookie tên là 'sessionToken', bạn có thể thay thế tên này nếu cần
    deleteCookie('anotherCookie'); // Thêm bất kỳ cookie nào khác bạn muốn xóa

    // Reload lại trang để làm mới giao diện
    window.location.reload();

    // Điều hướng về trang chủ (tùy chọn, nếu không dùng reload)
    navigate('/');
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
        {fullName ? (
          <div className="navbar-user-info" onClick={toggleDropdown}>
            <span>{fullName}</span>
            <img src="https://via.placeholder.com/40" alt="Avatar" className="avatar" />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => handleMenuClick('user-infor', '/user-info')}>Thông tin tài khoản</li>
                  <li onClick={() => handleMenuClick('my-events', '/my-events')}>Các sự kiện đã đăng kí</li>
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
