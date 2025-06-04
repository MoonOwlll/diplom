import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Home from './components/Home';
import About from './components/About';
import Book from './components/Book';
import Result from './components/Result';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import WorksList from './pages/WorksList';
import WorkPage from './pages/WorkPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter basename="/diplom">
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<Book />} />
            <Route path="/works" element={<WorksList />} />
            <Route path="/works/:id" element={<WorkPage />} />
            <Route path="/quiz" element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            } />
            <Route path="/results" element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
