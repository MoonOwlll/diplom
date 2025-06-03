import React, { useState } from 'react';
import Question from './Question';
import API from '../api/api';
import './Quiz.css';

const questionsData = [
  {
      question: "Ханнык сылга төрөөбүтэй Маппыай Дьөгүөрэп?",
      options: ["1910", "1908", "1907", "1905"],
      answer: "1908",
  },
  {
      question: "Ханнык сылга ыҥырыллыбытай аармыйаҕа?",
      options: ["1943", "1944", "1941", "1945"],
      answer: "1943",
  },
  {
      question: "1943 сыллаахха ханнык стрелковай полкатыгар сылдьыбытай?",
      options: ["1262-й стрелковый полк", "123-й гвардейский стрелковый полк", "84-й стрелковой дивизия", "425-й артиллерийский полк"],
      answer: "1262-й стрелковый полк",
  },
  {
      question: "1944 сылга от ыйыттан ким командующий этэй кини полкатыгар?",
      options: ["Л.А. Говорилов", "К.К. Рокоссовский", "К.Е. Ворошилов", "Г.К. Жуков"],
      answer: "Г.К. Жуков",
  },
  {
      question: "1944 сыла ханнык фроҥҥа сылдьыбытай?",
      options: ["Северо-Западный фронт", "Ленинградский фронт", "Брянский фронт", "Карельский фронт"],
      answer: "Ленинградский фронт",
  },
  {
      question: "Маппыай Дьөгүөрэп ханна төрөөбүтэй?",
      options: ["Нам", "Элгээйи", "Сунтаар", "Түбэй Дьаархан"],
      answer: "Түбэй Дьаархан",
  },
  {
      question: "Маппый Дьөгөөрэпкэ С.А. Зверев - Кыыл Уола ким буоларый?",
      options: ["доҕор", "быраат", "Олонхоһут", "Билбэт киhитэ"],
      answer: "быраат",
  },
  {
      question: "Маппый Дьөгөөрэп ойоҕо?",
      options: ["Василисса Михайловна", "Маргарита Ивановна", "Анастасия Потапова", "Мария Константиновна"],
      answer: "Василисса Михайловна",
  },
  {
      question: "Маппыай Дьөгүөрэп эһээтэ кимий?",
      options: ["Иллиарионов Василий Васильевич", "Егоров Алексей Петрович", "Игнатьев Алексей Егорович", "Софронов Василий Егорович"],
      answer: "Игнатьев Алексей Егорович",
  },
  {
      question: "Маппыай Дьөгүөрэп эбээтэ кимий?",
      options: ["Игнатьева Мария Константиновна", "Амвросьева Валентина Кузьмичина", "Игнатьева Мария Алексеевна", "Егорова Екатерина Васильевна"],
      answer: "Игнатьева Мария Константиновна",
  },
];

function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [animate, setAnimate] = useState(true); // Анимация появления

  const current = questionsData[index];

  const handleAnswer = async (selected) => {
    setAnimate(false);

    setTimeout(async () => {
      const correct = selected === current.answer;
      const nextIndex = index + 1;
      const newScore = correct ? score + 1 : score;

      if (nextIndex < questionsData.length) {
        setScore(newScore);
        setIndex(nextIndex);
        setAnimate(true);
      } else {
        setScore(newScore);
        setIsFinished(true);

        const userId = localStorage.getItem('userId') || null;
        try {
          await API.post('/quiz/results', {
            userId,
            score: newScore,
            total: questionsData.length,
          });
        } catch (err) {
          console.error('Ошибка при сохранении результата:', err);
        }
      }
    }, 300);
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setIsFinished(false);
    setAnimate(true);
  };

  return (
  <>
      {isFinished ? (
        <div className="result-box fade-in text-center">
          <h2>Викторина завершена!</h2>
          <p className="fs-5">Вы набрали <strong>{score}</strong> из <strong>{questionsData.length}</strong></p>
          <button className="btn btn-success mt-3" onClick={restartQuiz}>Пройти снова</button>
        </div>
      ) : (
        <div className={`quiz-container ${animate ? 'fade-in' : 'fade-out'}`}>
          <div className="quiz-progress mb-4 d-flex justify-content-between align-items-center">
            <progress value={index + 1} max={questionsData.length}></progress>
            <span className="ms-3">{index + 1} / {questionsData.length}</span>
          </div>
          <Question
            question={current.question}
            options={current.options}
            onAnswer={handleAnswer}
          />
        </div>
      )}
    
  </>
  );
}

export default Quiz;
