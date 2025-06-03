import React from 'react';

function Question({ question, options, onAnswer }) {
  return (
    <div className="mt-4">
      <h4>{question}</h4>
      <div className="options-grid">
        {options.map((option, index) => (
          <button
            key={index}
            className="quiz-option animated-option"
            style={{ animationDelay: `${index * 0.15}s` }}
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
