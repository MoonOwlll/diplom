import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function WorksList() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/works')
      .then(res => setWorks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📚 Произведения</h2>
      <ul className="list-group">
        {works.map(work => (
          <li key={work.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/works/${work.id}`} className="btn btn-outline-success btn-sm w-25">
              {work.title}
            </Link>
            <span className="badge bg-secondary">{work.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorksList;
