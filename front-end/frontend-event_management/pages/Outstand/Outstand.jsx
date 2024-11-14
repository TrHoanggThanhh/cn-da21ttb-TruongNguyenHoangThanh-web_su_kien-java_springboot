import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Outstand.css'

const Outstand = () => {
  const [events, setEvents] = useState([]) // Sự kiện đã lọc
  const [pageNumber, setPageNumber] = useState(1) // Số trang hiện tại
  const [pageSize] = useState(9) // Số sự kiện mỗi trang
  const [totalPages, setTotalPages] = useState(1) // Tổng số trang
  const [successMessage, setSuccessMessage] = useState('') // Thông báo thành công
  const [errorMessage, setErrorMessage] = useState('') // Thông báo lỗi
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllEvents = async () => {
      const allEvents = []
      let currentPage = 1
      let totalPages = 1

      // Lặp qua tất cả các trang để lấy sự kiện
      while (currentPage <= totalPages) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/events?pageNumber=${currentPage}&pageSize=${pageSize}`
          )
          const data = await response.json()

          // Lọc sự kiện quan trọng từ mỗi trang
          const importantEvents = data.data.items.filter(
            (event) => event.important === true
          )
          allEvents.push(...importantEvents) // Thêm sự kiện quan trọng vào mảng
          totalPages = data.data.totalPages
          currentPage += 1
        } catch (error) {
          console.error('Error fetching events:', error)
        }
      }

      setEvents(allEvents) // Cập nhật danh sách sự kiện quan trọng sau khi lấy xong
    }

    fetchAllEvents()
  }, [pageSize])

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'OPEN':
        return 'Sắp diễn ra'
      case 'CLOSE':
        return 'Đã kết thúc'
      case 'CANCEL':
        return 'Đã hủy'
      default:
        return 'Không xác định'
    }
  }

  const handleEventClick = (eventId) => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
    } else {
      navigate(`/event-detail/${eventId}`)
    }
  }

  const handleRegisterEvent = (eventId) => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
      return
    }

    fetch('http://localhost:8080/api/v1/event-registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventId: eventId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          setSuccessMessage('Đăng ký thành công!')
          setErrorMessage('')
          alert('Đăng ký sự kiện thành công!')
        } else if (data.status === 406) {
          setErrorMessage(data.message)
          setSuccessMessage('')
          alert(data.message)
        } else {
          setSuccessMessage('Đăng ký thất bại!')
          setErrorMessage('')
          alert('Đăng ký sự kiện thất bại!')
        }
      })
      .catch((error) => {
        console.error(error)
        setSuccessMessage('Đăng ký thất bại!')
        setErrorMessage('')
        alert('Đăng ký sự kiện thất bại!')
      })
  }

  const handleVerifyEmail = () => {
    navigate('/user-info')
  }

  return (
    <div className="home-container">
      <div className="events-container">
        {events.length === 0 ? (
          <p>No important events available</p> // Thông báo nếu không có sự kiện quan trọng
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.thumbnail}
                alt={event.name}
                className="event-thumbnail"
              />
              <div className="event-details">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-description">{event.description}</p>
                <p className={`event-status ${event.status.toLowerCase()}`}>
                  {getStatusLabel(event.status)}
                </p>
                <p className="event-date">
                  {new Date(event.startDate).toLocaleString()}
                </p>
                <p className="event-location">Location: {event.location}</p>
                <p className="event-quantity">Quantity: {event.quantity}</p>
                <button
                  onClick={() => handleRegisterEvent(event.id)}
                  className="register-btn"
                >
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
        <span>
          Page {pageNumber} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={pageNumber === totalPages}
        >
          Tiếp
        </button>
      </div>
    </div>
  )
}

export default Outstand
