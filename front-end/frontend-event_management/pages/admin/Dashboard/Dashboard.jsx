import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  // Fetch events with pagination and search
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/events?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setEvents(data.data.items)
        setTotalPages(data.data.totalPages)
      })
      .catch(error => console.error('Error fetching events:', error))
  }, [pageNumber, pageSize, searchTerm])

  // Fetch categories
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories')
      .then(response => response.json())
      .then(data => setCategories(data.data.items))
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setPageNumber(1) // Reset to page 1 on search
  }

  const goToCreateEvent = () => navigate('/create-event')
  const goToCreateCategory = () => navigate('/create-category')
  const goToUpdateEvent = (id) => navigate(`/update-event/${id}`)
  const goToUpdateCategory = (id) => navigate(`/update-category/${id}`)
  
  const goToDeleteEvent = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
      fetch(`http://localhost:8080/api/v1/events/${id}`, { method: 'DELETE' })
        .then(() => {
          alert('Sự kiện đã được xóa!')
          setEvents(events.filter(event => event.id !== id))
        })
        .catch(error => console.error('Error deleting event:', error))
    }
  }
  
  const goToDeleteCategory = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      fetch(`http://localhost:8080/api/v1/categories/${id}`, { method: 'DELETE' })
        .then(() => {
          alert('Danh mục đã được xóa!')
          setCategories(categories.filter(category => category.id !== id))
        })
        .catch(error => console.error('Error deleting category:', error))
    }
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Bảng Điều Khiển</h1>
        <div className="actions">
          <button onClick={goToCreateEvent} className="action-button">Thêm Sự Kiện</button>
          <button onClick={goToCreateCategory} className="action-button">Thêm Danh Mục</button>
        </div>
      </header>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Tìm kiếm sự kiện..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Bảng Sự Kiện */}
      <section className="events-section">
        <h2>Sự Kiện</h2>
        {events.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Tên Sự Kiện</th>
                <th>Mã</th>
                <th>Mô Tả</th>
                <th>Địa Điểm</th>
                <th>Người Tổ Chức</th>
                <th>Trạng Thái</th>
                <th>Số Lượng</th>
                <th>Ngày Bắt Đầu</th>
                <th>Ngày Kết Thúc</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.code}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.organizer}</td>
                  <td>{event.status}</td>
                  <td>{event.quantity}</td>
                  <td>{new Date(event.startDate).toLocaleDateString()}</td>
                  <td>{new Date(event.endDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => goToUpdateEvent(event.id)} className="edit-button">Sửa</button>
                    <button onClick={() => goToDeleteEvent(event.id)} className="delete-button">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>Chưa có sự kiện nào.</p>}

        {/* Pagination Controls */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPageNumber(index + 1)}
              className={pageNumber === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      {/* Bảng Danh Mục */}
      <section className="categories-section">
        <h2>Danh Mục</h2>
        {categories.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Tên Danh Mục</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <button onClick={() => goToUpdateCategory(category.id)} className="edit-button">Sửa</button>
                    <button onClick={() => goToDeleteCategory(category.id)} className="delete-button">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>Chưa có danh mục nào.</p>}
      </section>
    </div>
  )
}

export default Dashboard
