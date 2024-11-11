import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false); // Để kiểm soát trạng thái của nút resend
  const [isVerificationButtonDisabled, setIsVerificationButtonDisabled] = useState(false); // Để vô hiệu hóa nút xác thực khi đã gửi
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
        if (json.status === 200) { // Kiểm tra status là 200
          setUserInfo(json.data); // Lưu thông tin người dùng vào state
          setIsEmailVerified(json.data.verified); // Đặt trạng thái xác thực của email
        } else {
          setErrorMessage(json.message || 'Không thể lấy thông tin người dùng');
        }
      })
      .catch((error) => {
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại');
        console.error('Error:', error);
      });
  }, [navigate]);

  // Xử lý gửi mã xác thực email
  const handleResendVerification = () => {
    let token = localStorage.getItem('authToken');
    if (!token) {
      setErrorMessage('Không tìm thấy token xác thực.');
      return;
    }

    fetch('http://localhost:8080/api/v1/auth/resendEmail', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 0) {
          setErrorMessage(json.message);
          setIsResendDisabled(true); // Vô hiệu hóa nút resend sau khi gửi
          setIsVerificationButtonDisabled(false); // Kích hoạt nút xác thực
        } else {
          setErrorMessage('Gửi mã xác thực thất bại');
        }
      })
      .catch((error) => {
        setErrorMessage('Có lỗi xảy ra khi gửi mã xác thực.');
        console.error('Error:', error);
      });
  };

  // Xử lý gửi mã xác thực và cập nhật trạng thái xác thực
  const handleVerifyEmail = () => {
    const token = localStorage.getItem('authToken');
    if (!token || !verificationCode) {
      setErrorMessage('Vui lòng nhập mã xác thực.');
      return;
    }

    fetch('http://localhost:8080/api/v1/auth/verifyEmail', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userInfo.email,
        verificationCode,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          setUserInfo({ ...userInfo, verified: true });
          setIsEmailVerified(true);
          setVerificationCode(''); // Xóa mã xác thực sau khi thành công
          setIsVerificationButtonDisabled(true); // Vô hiệu hóa nút xác thực khi đã thành công
          setErrorMessage('Xác thực email thành công!');
        } else {
          setErrorMessage(json.message || 'Xác thực không thành công');
        }
      })
      .catch((error) => {
        setErrorMessage('Có lỗi xảy ra khi xác thực.');
        console.error('Error:', error);
      });
  };

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
          
          {!isEmailVerified && (
            <div>
              <button
                onClick={handleResendVerification}
                disabled={isResendDisabled}
              >
                {isResendDisabled ? 'Gửi lại mã' : 'Xác thực email'}
              </button>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Nhập mã xác thực"
              />
              <button
                onClick={handleVerifyEmail}
                disabled={isVerificationButtonDisabled}
              >
                OK
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Đang tải thông tin...</p>
      )}
    </div>
  );
};

export default UserInfo;
