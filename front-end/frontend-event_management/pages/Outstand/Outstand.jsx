import React, { useState, useEffect } from 'react';
import './Outstand.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Outstand = () => {
  const [events, setEvents] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/events?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((json) => {
        const filteredEvents = json.data.items.filter(event => event.quantity > 100);
        setEvents(filteredEvents);
        setTotalPages(Math.ceil(filteredEvents.length / pageSize));
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

  const handleRegisterEvent = (eventId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8080/api/v1/event-registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          alert('Đăng ký sự kiện thành công!');
        } else if (data.status === 406) {
          alert(data.message);
        } else {
          alert('Đăng ký thất bại!');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Đăng ký thất bại!');
      });
  };

  return (
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
              <p className="event-date">{new Date(event.startDate).toLocaleString()}</p>
              <button onClick={() => handleRegisterEvent(event.id)} className="register-btn">
                Đăng ký sự kiện
              </button>
            </div>
          </div>
        ))
      )}

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

export default Outstand;
