import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let token;
    
    // Kiểm tra nếu localStorage khả dụng
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('authToken');
    } else {
      setErrorMessage('localStorage không khả dụng.');
      return;
    }

    // Kiểm tra nếu không có token
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8080/api/v1/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ server');
        }
        return response.json();
      })
      .then((json) => {
        if (json.status === 200) {  // Thay đổi kiểm tra status thành 200
          setUserInfo(json.data);   // Lưu thông tin người dùng vào state
        } else {
          setErrorMessage(json.message || 'Không thể lấy thông tin người dùng');
        }
      })
      .catch((error) => {
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại');
        console.error('Error:', error);
      });
  }, [navigate]);

  return (
    <div className="user-info-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {userInfo ? (
        <div className="user-info">
          <h2>Thông tin người dùng</h2>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Mã sinh viên:</strong> {userInfo.studentCode}</p>
          <p><strong>Họ tên:</strong> {userInfo.fullName}</p>
          <p><strong>Vai trò:</strong> {userInfo.role}</p>
          <p><strong>Xác thực:</strong> {userInfo.verified ? 'Đã xác thực' : 'Chưa xác thực'}</p>
        </div>
      ) : (
        <p>Đang tải thông tin...</p>
      )}
    </div>
  );
};

export default UserInfo;
