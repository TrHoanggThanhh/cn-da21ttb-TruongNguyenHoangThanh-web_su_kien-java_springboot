import React, { useState, useEffect } from 'react'

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    location: '',
    organizer: '',
    status: 'CANCEL',
    fileImage: null,
    thumbnail: '',
    categoryId: '',
    startDate: '',
    endDate: ''
  })

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/categories/find')
        const result = await response.json()

        if (result.status === 0) {
          setCategories(result.data)
        } else {
          console.error('Không thể lấy danh mục')
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files) {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key])
      }
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/events', {
        method: 'POST',
        body: data
      })

      if (response.ok) {
        alert('Sự kiện đã được tạo thành công!')
      } else {
        alert('Đã có lỗi xảy ra khi tạo sự kiện!')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Đã có lỗi xảy ra!')
    }
  }

  return (
    <div>
      <h1>Thêm Sự Kiện</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sự kiện:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mã sự kiện:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mô tả:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Địa điểm:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Nhà tổ chức:</label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Trạng thái:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="CANCEL">CANCEL</option>
            <option value="CLOSE">CLOSE</option>
            <option value="OPEN">OPEN</option>
          </select>
        </div>

        <div>
          <label>Danh mục:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Hình ảnh:</label>
          <input
            type="file"
            name="fileImage"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>Ảnh đại diện:</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ngày bắt đầu:</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ngày kết thúc:</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Tạo sự kiện</button>
      </form>
    </div>
  )
}

export default CreateEvent
