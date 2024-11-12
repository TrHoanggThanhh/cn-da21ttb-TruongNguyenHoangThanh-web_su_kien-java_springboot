import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Search.css';  // Đảm bảo bạn đã nhập đúng file CSS

const Search = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // Thêm state cho số trang hiện tại
  const [pageSize] = useState(9); // Số lượng sự kiện mỗi trang
  const [totalPages, setTotalPages] = useState(9); // Thêm state cho tổng số trang

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:8080/api/v1/events/search?query=${query}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 200 && data.data && data.data.items.length > 0) {
            setEvents(data.data.items);
            setTotalPages(data.data.totalPages); // Cập nhật tổng số trang
          } else {
            setError("Không tìm thấy sự kiện nào");
          }
          setLoading(false);
        })
        .catch(err => {
          setError("Có lỗi xảy ra khi tải sự kiện");
          setLoading(false);
        });
    }
  }, [query, pageNumber, pageSize]); // Thêm pageNumber và pageSize vào useEffect

  if (loading) {
    return <p>Đang tải kết quả...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="events-container">
      <h1>Kết quả tìm kiếm cho: {query}</h1>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id} className="event-card">
              <img src={event.thumbnail} alt={event.name} className="event-thumbnail" />
              <div className="event-details">
                <h2 className="event-name">{event.name}</h2>
                <p className="event-description">{event.description}</p>
                <p className="event-status">
                  {event.status === 'CANCEL' ? 'Đã hủy' : 'Đang diễn ra'}
                </p>
                <p className="event-date">
                  {new Date(event.startDate).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có sự kiện nào phù hợp với từ khóa tìm kiếm.</p>
      )}

      {/* Thêm phần phân trang */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Trang trước
        </button>
        <span>Page {pageNumber} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default Search;
