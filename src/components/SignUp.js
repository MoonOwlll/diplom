import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordColor, setPasswordColor] = useState('');  
  const evaluatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;

    if (strength <= 2) {
      setPasswordStrength('Слабый');
      setPasswordColor('red');
    } else if (strength === 3 || strength === 4) {
      setPasswordStrength('Средний');
      setPasswordColor('orange');
    } else {
      setPasswordStrength('Сильный');
      setPasswordColor('green');
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'password') evaluatePasswordStrength(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Простая проверка
    if (!name || !email || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('Пароль должен содержать минимум 8 символов, включая заглавную букву, цифру и спецсимвол.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/auth/register', formData);
      alert('Регистрация прошла успешно!');
      setFormData({ name: '', email: '', password: '' });
      setError('');
      navigate('/login');
    } catch (err) {
      setError('Ошибка регистрации. Возможно, email уже используется.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Регистрация</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <div className="input-group mb-3">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {formData.password && (
          <small style={{ color: passwordColor }}>
            Надёжность пароля: {passwordStrength}
          </small>
        )}
        <button type="submit" className="btn btn-success w-100">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default SignUp;
