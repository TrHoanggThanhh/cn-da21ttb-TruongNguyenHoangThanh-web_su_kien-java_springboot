import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Thêm CSS cho modal

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');

    // Kiểm tra role, nếu không phải là 'admin', hiển thị modal
    if (storedRole !== 'admin') {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    navigate('/');  // Điều hướng về trang chủ
  };

  return (
    <div>
      {/* Modal hiển thị khi người dùng không có quyền truy cập */}
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <h2>Thông báo</h2>
            <p>Bạn không có quyền truy cập trang Dashboard.</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      ) : (
        // Nội dung Dashboard chỉ hiển thị khi không có modal
        <div>
          <h1>Dashboard</h1>
          {/* Thêm các nội dung khác của Dashboard ở đây */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
