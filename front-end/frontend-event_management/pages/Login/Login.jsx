import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    const requestBody = {
      email: email,
      password: password,
    };
  
    fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          const token = `${json.data.token}`;
          if (typeof window !== 'undefined' && window.localStorage) {
            try {
              localStorage.setItem('authToken', token);
              navigate('/');
            } catch (error) {
              setErrorMessage('Không thể lưu token vào localStorage');
              console.error('Error saving to localStorage:', error);
            }
          } else {
            setErrorMessage('localStorage không khả dụng');
          }
        } else {
          setErrorMessage(json.message || 'Đăng nhập thất bại');
        }
      })
      .catch((error) => {
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại');
        console.error('Error:', error);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Đăng nhập</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
