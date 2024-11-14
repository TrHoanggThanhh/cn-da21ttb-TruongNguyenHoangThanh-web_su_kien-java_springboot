import React, { useState, useEffect } from 'react'
import './MyEvent.css'

const MyEvent = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('') 
  const [showPopup, setShowPopup] = useState(false) // Trạng thái để điều khiển hiển thị popup
  const [eventToCancel, setEventToCancel] = useState(null) // Sự kiện muốn hủy

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          setError('Không tìm thấy token xác thực')
          setLoading(false)
          return
        }

        const response = await fetch('http://localhost:8080/api/v1/event-registrations/me?pageNumber=1&pageSize=10', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Không thể lấy thông tin sự kiện')
        }

        const data = await response.json()
        setEvents(data.data.items)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const openPopup = (eventId) => {
    setEventToCancel(eventId)
    setShowPopup(true) // Mở popup
  }

  const closePopup = () => {
    setShowPopup(false) // Đóng popup
    setEventToCancel(null)
  }

  const confirmCancelEvent = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setError('Không tìm thấy token xác thực')
        return
      }

      const response = await fetch(`http://localhost:8080/api/v1/event-registrations/${eventToCancel}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Không thể hủy sự kiện')
      }

      setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventToCancel))
      closePopup() // Đóng popup sau khi hủy thành công
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h1>Sự kiện của tôi</h1>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Đang tải...</p>
      ) : events.length === 0 ? (
        <p>Không có sự kiện nào</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Tên sự kiện</th>
              <th>Địa điểm</th>
              <th>Người tổ chức</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Ngày đăng ký</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.eventName}</td>
                <td>{event.location}</td>
                <td>{event.organizer}</td>
                <td>{new Date(event.startDate).toLocaleString()}</td>
                <td>{new Date(event.endDate).toLocaleString()}</td>
                <td>{new Date(event.registrationDate).toLocaleString()}</td>
                <td>
                  <button onClick={() => openPopup(event.id)}>Hủy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Hiển thị popup khi showPopup = true */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Xác nhận hủy sự kiện</h2>
            <p>Bạn có chắc chắn muốn hủy sự kiện này không?</p>
            <div className="popup-actions">
              <button className="cancel" onClick={closePopup}>Không</button>
              <button className="confirm" onClick={confirmCancelEvent}>Có</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyEvent
