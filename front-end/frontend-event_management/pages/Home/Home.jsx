import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(9); 
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState(''); // Thông báo thành công
  const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi xác thực email
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/events?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((json) => {
        setEvents(json.data.items);
        setTotalPages(json.data.totalPages); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, [pageNumber, pageSize]);

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'OPEN':
        return 'Sắp diễn ra';
      case 'CLOSE':
        return 'Đã kết thúc';
      case 'CANCEL':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const handleEventClick = (eventId) => {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
      navigate('/login'); 
    } else {
      navigate(`/event-detail/${eventId}`);
    }
  };

  const handleRegisterEvent = (eventId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Gửi yêu cầu đăng ký sự kiện
    fetch('http://localhost:8080/api/v1/event-registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Đính kèm token Bearer
      },
      body: JSON.stringify({
        eventId: eventId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          // Đăng ký thành công
          setSuccessMessage('Đăng ký thành công!');
          setErrorMessage(''); // Đảm bảo không hiển thị lỗi
          alert('Đăng ký sự kiện thành công!');
        } else if (data.status === 406) {
          // Yêu cầu xác thực email
          setErrorMessage(data.message); // Lưu thông báo lỗi
          setSuccessMessage(''); // Đảm bảo không hiển thị thành công
          alert(data.message); // Hiển thị thông báo yêu cầu xác thực
        } else {
          setSuccessMessage('Đăng ký thất bại!');
          setErrorMessage(''); // Đảm bảo không hiển thị lỗi
          alert('Đăng ký sự kiện Thành công!');
        }
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage('Đăng ký thất bại!');
        setErrorMessage(''); // Đảm bảo không hiển thị lỗi
        alert('Đăng ký sự kiện thành công!');
      });
  };

  const handleVerifyEmail = () => {
    navigate('/user-info'); // Chuyển hướng tới trang xác thực email
  };

  return (
    <div className="home-container">
      <div className="events-container">
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.thumbnail} alt={event.name} className="event-thumbnail" />
              <div className="event-details">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-description">{event.description}</p>
                <p className={`event-status ${event.status.toLowerCase()}`}>
                  {getStatusLabel(event.status)}
                </p>
                <p className="event-date">
                  {new Date(event.startDate).toLocaleString()}
                </p>
                <button onClick={() => handleRegisterEvent(event.id)} className="register-btn">
                  Đăng ký sự kiện
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Trang trước
        </button>
        <span>Page {pageNumber} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default Home;
