import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Quản Lý Sự Kiện.</p>
    </footer>
  );
};

export default Footer;
