import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-header shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <Link to="/" className="logo">Ийэ тыл кэрэһитэ</Link>

        {/* Бургер */}
        <div className={`burger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Навигация */}
        <nav ref={navRef} className={`nav-links ${menuOpen ? 'show' : ''}`}>
          {token ? (
            <>
              <Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>Биография Егорова. М. П</Link>
              <Link to="/book" className={isActive('/book')} onClick={() => setMenuOpen(false)}>О книге</Link>
              <Link to="/works" className={isActive('/works')} onClick={() => setMenuOpen(false)}>Произведения</Link>
              <Link to="/quiz" className={isActive('/quiz')} onClick={() => setMenuOpen(false)}>Викторина</Link>
              <Link to="/results" className={isActive('/results')} onClick={() => setMenuOpen(false)}>Результат</Link>
              <Link to="/profile" className={isActive('/profile')} onClick={() => setMenuOpen(false)}>Профиль</Link>
              <button onClick={handleLogout} className="btn btn-sm btn-outline-danger ms-3">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/signup" className={isActive('/signup')} onClick={() => setMenuOpen(false)}>Регистрация</Link>
              <Link to="/login" className={isActive('/login')} onClick={() => setMenuOpen(false)}>Вход</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
