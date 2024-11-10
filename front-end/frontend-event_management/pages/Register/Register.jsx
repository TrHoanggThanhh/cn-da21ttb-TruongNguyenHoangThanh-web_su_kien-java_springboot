import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roleId, setRoleId] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      studentCode: studentCode,
      password: password,
      firstName: firstName,
      lastName: lastName,
      roleId: roleId,
    };

    fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 0) {
          navigate('/login');
        } else {
          setErrorMessage(json.message || 'Đăng ký thất bại');
        }
      })
      .catch((error) => {
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại');
        console.error('Error:', error);
      });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Đăng ký</h2>
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
          <label>Mã sinh viên:</label>
          <input
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            required
            placeholder="Nhập mã sinh viên"
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="form-group">
          <label>Họ:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Nhập họ"
          />
        </div>
        <div className="form-group">
          <label>Tên:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Nhập tên"
          />
        </div>
        <button type="submit" className="register-button">
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
