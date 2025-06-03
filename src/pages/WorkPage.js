import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function WorkPage() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/works/${id}`)
      .then(res => {
        setWork(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-5">Загрузка...</p>;
  if (!work) return <p className="text-center mt-5">Произведение не найдено.</p>;

  return (
    <div className="container mt-5">
      <div className="text-center mt-4">
        <Link to="/works" className="btn btn-outline-primary">⬅ Назад к произведениям</Link>
      </div>
      <h2 className="text-center mb-3">📝 {work.title}</h2>
      <p className="text-center"><strong>Автор:</strong> {work.author} • <strong>Год:</strong> {work.year}</p>
      <div className="bg-light p-4 rounded text-center poem-text">
        <p className='text-center'>{work.preface}</p>
        <p dangerouslySetInnerHTML={{ __html: work.content.replace(/\n/g, '<br/>') }} />
      </div>
      <div className="text-center mt-4">
        <Link to="/works" className="btn btn-outline-primary">⬅ Назад к произведениям</Link>
      </div>
    </div>
  );
}

export default WorkPage;
