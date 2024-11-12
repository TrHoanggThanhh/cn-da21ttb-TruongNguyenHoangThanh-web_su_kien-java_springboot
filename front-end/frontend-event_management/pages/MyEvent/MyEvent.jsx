import React, { useState, useEffect } from 'react'

const MyEvent = () => {
  const [events, setEvents] = useState([])  // Lưu trữ sự kiện
  const [loading, setLoading] = useState(true)  // Trạng thái loading
  const [error, setError] = useState('')  // Lưu lỗi nếu có

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem('authToken')

        if (!token) {
          setError('Không tìm thấy token xác thực')
          setLoading(false)
          return
        }

        // Gửi yêu cầu tới API với token trong header
        const response = await fetch('http://localhost:8080/api/v1/event-registrations/me?pageNumber=1&pageSize=10', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        // Kiểm tra nếu có lỗi trong phản hồi từ API
        if (!response.ok) {
          throw new Error('Không thể lấy thông tin sự kiện')
        }

        const data = await response.json()

        // Cập nhật state với dữ liệu sự kiện
        setEvents(data.data.items)
      } catch (error) {
        setError(error.message)  // Thông báo lỗi nếu có
      } finally {
        setLoading(false)  // Kết thúc trạng thái loading
      }
    }

    fetchEvents()
  }, [])  // Chạy khi component mount

  const cancelEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('authToken')

      if (!token) {
        setError('Không tìm thấy token xác thực')
        return
      }

      const response = await fetch(`http://localhost:8080/api/v1/event-registrations/${eventId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Không thể hủy sự kiện')
      }

      // Cập nhật lại danh sách sự kiện sau khi hủy
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId))
    } catch (error) {
      setError(error.message)  // Thông báo lỗi nếu có
    }
  }

  if (loading) {
    return <div>Đang tải...</div>  // Hiển thị loading khi đang lấy dữ liệu
  }

  if (error) {
    return <div>{error}</div>  // Hiển thị thông báo lỗi nếu có
  }

  return (
    <div>
      <h1>Sự kiện của tôi</h1>
      {events.length === 0 ? (
        <p>Không có sự kiện nào</p>  // Nếu không có sự kiện
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
                  <button onClick={() => cancelEvent(event.id)}>Hủy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MyEvent
