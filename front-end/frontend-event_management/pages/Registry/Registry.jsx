import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [email, setEmail] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleSubmit = (e) => {
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
          navigate('/login'); // Chuyển hướng đến trang login sau khi đăng ký thành công
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
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mã sinh viên"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
          <option value="0">Người dùng</option>
          <option value="1">Quản trị viên</option>
        </select>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
