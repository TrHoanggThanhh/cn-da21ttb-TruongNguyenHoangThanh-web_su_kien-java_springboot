import React, { useState, useEffect } from 'react';
import './VerifiEmail.css';

const VerifiEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resendEmailVerification = async () => {
    setLoading(true);
    setMessage('');

    // Lấy token từ localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      setMessage('Token không hợp lệ hoặc hết hạn');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/resendEmail', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const jsonResponse = await response.json();

      if (jsonResponse.status === 0) {
        setMessage('Đã gửi mã xác thực đến email của bạn.');
      } else {
        setMessage(jsonResponse.message || 'Không thể gửi mã xác thực');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-email-container">
      <h2>Xác thực Email</h2>
      {loading ? (
        <p>Đang xử lý...</p>
      ) : (
        <button onClick={resendEmailVerification}>Gửi lại mã xác thực</button>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default VerifiEmail;
