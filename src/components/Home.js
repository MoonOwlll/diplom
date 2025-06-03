import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-hero">
      <div className="text-center">
        <h1>«Ийэ тыл кэрэһитэ»</h1>
        <p className="lead mt-3 mb-4">
          Веб-приложение, посвящённое жизни и творчеству олонхосута и писателя<br />
          <strong>Матвея Петровича Егорова</strong>
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/quiz" className="btn btn-success btn-lg">🧠 Пройти викторину</Link>
          <Link to="/about" className="btn btn-outline-light btn-lg">📚 Узнать больше</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
