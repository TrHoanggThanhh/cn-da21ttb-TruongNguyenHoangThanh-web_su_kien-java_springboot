import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.css';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/events/${eventId}`)
      .then((response) => response.json())
      .then((json) => {
        setEvent(json.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eventId]);

  const handleRegisterEvent = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Bạn cần đăng nhập để đăng ký sự kiện!');
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
        } else {
          alert('Vui lòng xác thực email trước khi đăng ký sự kiện.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Đăng ký sự kiện thất bại!');
      });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-detail-container">
      <h1>{event.name}</h1>
      <img src={event.thumbnail} alt={event.name} className="event-thumbnail" />
      <p>{event.description}</p>
      <p><strong>Địa điểm:</strong> {event.location}</p>
      <p><strong>Người tổ chức:</strong> {event.organizer}</p>
      <p><strong>Trạng thái:</strong> {event.status}</p>
      <p><strong>Ngày bắt đầu:</strong> {new Date(event.startDate).toLocaleString()}</p>
      <p><strong>Ngày kết thúc:</strong> {new Date(event.endDate).toLocaleString()}</p>
      <button onClick={handleRegisterEvent} className="register-btn">Đăng ký sự kiện</button>
    </div>
  );
};

export default EventDetail;
