import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Event Manager</h3>
          <p>Ứng dụng quản lý sự kiện chuyên nghiệp, cung cấp đầy đủ tính năng hỗ trợ quản lý và tổ chức sự kiện một cách hiệu quả.</p>
        </div>

        <div className="footer-section contact">
          <h3>Liên hệ</h3>
          <p>Email: support@eventmanager.com</p>
          <p>Điện thoại: +84 123 456 789</p>
          <p>Địa chỉ: 123 Event St., Quận 1, TP. Hồ Chí Minh</p>
        </div>

        <div className="footer-section links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="/upcoming-events">Sự kiện sắp diễn ra</a></li>
            <li><a href="/create-event">Tạo sự kiện mới</a></li>
            <li><a href="/my-events">Sự kiện của tôi</a></li>
            <li><a href="/contact">Liên hệ hỗ trợ</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Kết nối với chúng tôi</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Event Manager | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
