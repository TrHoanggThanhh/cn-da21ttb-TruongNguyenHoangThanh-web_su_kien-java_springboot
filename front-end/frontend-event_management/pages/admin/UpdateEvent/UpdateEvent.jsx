import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEvent = () => {
  const { id } = useParams(); // Lấy ID sự kiện từ URL
  const [event, setEvent] = useState(null); // Lưu dữ liệu sự kiện
  const navigate = useNavigate(); // Hook điều hướng

  // Lấy dữ liệu sự kiện từ API khi component mount
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data.data)) // Lưu dữ liệu sự kiện vào state
      .catch(error => console.error('Error fetching event data:', error));
  }, [id]);

  // Xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Xử lý thay đổi tệp tin hình ảnh
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: files[0],
    }));
  };

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(); // Tạo đối tượng FormData để gửi dữ liệu form
    formData.append('name', event.name);
    formData.append('code', event.code);
    formData.append('description', event.description);
    formData.append('location', event.location);
    formData.append('organizer', event.organizer);
    formData.append('status', event.status); // Trạng thái sự kiện
    formData.append('fileImage', event.fileImage); // Hình ảnh
    formData.append('thumbnail', event.thumbnail); // Thumbnail của sự kiện
    formData.append('categoryId', event.categoryId);
    formData.append('startDate', event.startDate);
    formData.append('endDate', event.endDate);

    // Gửi formData qua PUT request
    fetch(`http://localhost:8080/api/v1/events/${id}`, {
      method: 'PUT',
      body: formData, // Gửi FormData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Sự kiện đã được cập nhật thành công!');
          navigate('/dashboard'); // Quay lại trang Dashboard sau khi cập nhật thành công
        } else {
          alert('Đã có lỗi xảy ra khi cập nhật sự kiện!');
        }
      })
      .catch(error => console.error('Error updating event:', error));
  };

  return event ? (
    <div>
      <h1>Cập Nhật Sự Kiện</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleChange}
          placeholder="Tên Sự Kiện"
          required
        />
        <input
          type="text"
          name="code"
          value={event.code}
          onChange={handleChange}
          placeholder="Mã Sự Kiện"
          required
        />
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          placeholder="Mô Tả"
          required
        />
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleChange}
          placeholder="Địa Điểm"
          required
        />
        <input
          type="text"
          name="organizer"
          value={event.organizer}
          onChange={handleChange}
          placeholder="Tổ Chức"
          required
        />
        <input
          type="date"
          name="startDate"
          value={event.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={event.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="fileImage"
          onChange={handleFileChange}
        />
        <input
          type="file"
          name="thumbnail"
          onChange={handleFileChange}
        />
        <button type="submit">Cập Nhật Sự Kiện</button>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default UpdateEvent;
