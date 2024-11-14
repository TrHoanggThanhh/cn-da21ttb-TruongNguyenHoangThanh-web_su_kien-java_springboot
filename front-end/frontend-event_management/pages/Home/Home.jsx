import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [events, setEvents] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(9)
  const [totalPages, setTotalPages] = useState(1)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false) // To control modal visibility
  const [modalMessage, setModalMessage] = useState('') // Message to show in modal
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/events?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((response) => response.json())
      .then((json) => {
        setEvents(json.data.items)
        setTotalPages(json.data.totalPages)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [pageNumber, pageSize])

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
        if (data.status === 200) {
          setModalMessage('Đăng ký sự kiện thành công!')
        } else {
          setModalMessage(data.message)
        }
        setIsModalOpen(true) // Open the modal after response
      })
      .catch((error) => {
        console.error(error)
        setModalMessage('Đăng ký sự kiện thất bại!')
        setIsModalOpen(true) // Open the modal after error
      })
  }

  const handleVerifyEmail = () => {
    navigate('/user-info')
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

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
                <p className="event-location">Location: {event.location}</p>
                <p className="event-quantity">Quantity: {event.quantity}</p>
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
        <span>
          Page {pageNumber} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Tiếp
        </button>
      </div>

      {/* Modal Popup for displaying messages */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="modal-close-btn">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
