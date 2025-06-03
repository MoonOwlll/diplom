import React, { useEffect, useState } from 'react';
import API from '../api/api';

function Result() {
  const userId = localStorage.getItem('userId');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatYakutsk = (dateStr) => {
    const date = new Date(dateStr);
    const corrected = new Date(date.getTime() + 6 * 60 * 60 * 1000); // +9 ч
    return corrected.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (!userId) return;

    API.get(`/quiz/history/${userId}`)
      .then(res => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(() => {
        setHistory([]);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 История прохождений викторины</h2>
      {loading && <p>Загрузка...</p>}
      {!loading && history.length === 0 && <p>Результатов пока нет.</p>}
      {!loading && history.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Правильные</th>
                <th>Всего</th>
                <th>Дата (Якутск)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.score}</td>
                  <td>{result.total}</td>
                  <td>{formatYakutsk(result.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Result;
