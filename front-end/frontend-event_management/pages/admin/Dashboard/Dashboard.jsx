import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])

  // Lấy danh sách sự kiện từ API
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/events')
      .then(response => response.json())
      .then(data => setEvents(data.data.items))
      .catch(error => console.error('Error fetching events:', error))
  }, [])

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories')
      .then(response => response.json())
      .then(data => setCategories(data.data.items))
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const goToCreateEvent = () => navigate('/create-event')
  const goToCreateCategory = () => navigate('/create-category')
  const goToUpdateEvent = (id) => navigate(`/update-event/${id}`)
  const goToUpdateCategory = (id) => navigate(`/update-category/${id}`)
  const goToDeleteEvent = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
      fetch(`http://localhost:8080/api/v1/events/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          alert('Sự kiện đã được xóa!')
          setEvents(events.filter(event => event.id !== id))
        })
        .catch(error => console.error('Error deleting event:', error))
    }
  }
  const goToDeleteCategory = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      fetch(`http://localhost:8080/api/v1/categories/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          alert('Danh mục đã được xóa!')
          setCategories(categories.filter(category => category.id !== id))
        })
        .catch(error => console.error('Error deleting category:', error))
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>Danh Sách Sự Kiện</h1>
      <button onClick={goToCreateEvent} className="add-event-button">Thêm Sự Kiện</button>
      <button onClick={goToCreateCategory} className="add-category-button">Thêm Danh Mục</button>

      {/* Bảng Sự Kiện */}
      <h2>Sự Kiện</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Tên Sự Kiện</th>
            <th>Ngày Bắt Đầu</th>
            <th>Ngày Kết Thúc</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{new Date(event.startDate).toLocaleDateString()}</td>
              <td>{new Date(event.endDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => goToUpdateEvent(event.id)}>Sửa</button>
                <button onClick={() => goToDeleteEvent(event.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bảng Danh Mục */}
      <h2>Danh Mục</h2>
      <table className="categories-table">
        <thead>
          <tr>
            <th>Tên Danh Mục</th>
            <th>Mô Tả</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => goToUpdateCategory(category.id)}>Sửa</button>
                <button onClick={() => goToDeleteCategory(category.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
