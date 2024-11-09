import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const loginData = { email, password };

    fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem('authToken', data.data.token); 
          navigate('/');
        } else {
          setErrorMessage('Đăng nhập không thành công!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại.');
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const registerData = { email, studentCode, password, firstName, lastName, roleId };

    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          navigate('/login'); 
        } else {
          setErrorMessage('Đăng ký không thành công!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại.');
      });
  };

  return (
    <div>
      <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
      <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Mã sinh viên"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Họ"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tên"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
      </button>
    </div>
  );
};

export default Login;
