import React from 'react';

function Works() {
  return (
    <div className="container mt-5 biography-container">
      <h2 className="text-center mb-4">📚 Произведения Матвея Петровича Егорова</h2>

      <ul className="list-group">
        {works.map((work, index) => (
          <li key={index} className="list-group-item mb-3">
            <h5>{work.title} <span className="text-muted fs-6">({work.year})</span></h5>
            <p>{work.description}</p>
            {work.link && (
              <a href={work.link} className="btn btn-outline-success btn-sm">Читать</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Works;
