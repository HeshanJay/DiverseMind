import React, { useState, useEffect } from "react";
import backImg from "../assets/background_images/back3.jpg"; // Background image
import question1Image from "../assets/Questions2_images/1.jpg";
import question2Image from "../assets/Questions2_images/2.jpg";
import question3Image from "../assets/Questions2_images/3.jpg";
import question4Image from "../assets/Questions2_images/4.jpg";
import ScoreBoard from "../Components/Score_board"; // Import the ScoreBoard component

const SpeedMeasurementActivity = () => {
  const questions = [
    {
      image: question1Image,
      answers: ["↑", "↓", "←", "→"],
      correctAnswer: "↓",
    },
    {
      image: question2Image,
      answers: ["⬜", "🔺", "◯", "⬛"],
      correctAnswer: "⬜",
    },
    {
      image: question3Image,
      answers: ["R", "r", "A", "h"],
      correctAnswer: "R",
    },
    {
      image: question4Image,
      answers: ["★", "✰", "⬜", "⚫"],
      correctAnswer: "★",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (showImage) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowImage(false);
            setShowAnswers(true);
            setTimer(15);
            clearInterval(id);
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [showImage]);

  useEffect(() => {
    if (showAnswers) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            moveToNextQuestion();
            clearInterval(id);
          }
          return prevTimer - 1;
        });
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [showAnswers]);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Increment the score silently
    }
    clearInterval(intervalId); // Clear the timer
    moveToNextQuestion(); // Move to the next question
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(10);
    } else {
      setIsCompleted(true); // Mark the activity as completed
    }
  };

  const restartActivity = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowImage(true);
    setShowAnswers(false);
    setTimer(10);
    setIsCompleted(false);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        {isCompleted ? (
          <ScoreBoard score={score} totalQuestions={questions.length} onRestart={restartActivity} />
        ) : (
          <>
            {/* Header */}
            <h1 className="text-4xl font-bold mb-6">
              {showAnswers
                ? "නිවැරදි පිළිතුර තෝරන්න" // Display this text during the answer part
                : `ප්‍රශ්නය: ${currentQuestion + 1}/${questions.length}`} {/* Display question number otherwise */}
            </h1>

            {/* Image Display */}
            {showImage && (
              <img
                src={questions[currentQuestion].image}
                alt={`Question ${currentQuestion + 1}`}
                className="w-3/4 md:w-1/2 max-h-64 object-contain rounded-md shadow-lg mb-8 border-4 border-white"
                style={{
                  padding: "10px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                }}
              />
            )}

            {/* Answer Display */}
            {showAnswers && (
              <div className="grid grid-cols-2 gap-6 bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-full text-3xl hover:scale-105 transition-transform shadow-md"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            )}

            {/* Timer */}
            <div className="absolute bottom-10 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-md shadow-lg">
              කාලය: {timer} තත්පර
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpeedMeasurementActivity;
