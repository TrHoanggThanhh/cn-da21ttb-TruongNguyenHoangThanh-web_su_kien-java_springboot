import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateCategoryEvent = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/v1/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 0) {
          alert('Danh mục đã được thêm!')
          navigate('/dashboard')
        } else {
          alert(data.message)
        }
      })
      .catch(error => console.error('Error adding category:', error))
  }

  return (
    <div className="create-category">
      <h1>Thêm Danh Mục</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên Danh Mục:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm Danh Mục</button>
      </form>
    </div>
  )
}

export default CreateCategoryEvent
