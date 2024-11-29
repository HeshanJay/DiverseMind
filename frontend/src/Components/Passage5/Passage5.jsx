import React, { useState } from "react";
import "./Passage5.css"; // Additional styling
import backgroundImage from "../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Passage5 = ({ onPrevious, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "මියෝ ගැඹුරු බිම් තුළ සැඟවීම",
    "මියෝ ඉතා වේගයෙන් පලායාම",
    "හෙනේ මාමාගේ උපකරණ පිළිසකර නොවීම",
    "මියෝ වගාව ආරක්ෂා කිරීම",
  ];

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-3xl text-center border-4 border-yellow-400">
        <h1 className="text-3xl font-extrabold text-yellow-600 mb-6">
          හෙනේ මාමාට මියෝ අල්ලා ගැනීමට නොහැකි වීමට හේතුව කුමක්ද?
        </h1>
        <div className="grid grid-cols-1 gap-4 text-lg">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`p-4 rounded-lg border-2 transition-transform duration-300 shadow-md hover:scale-105 ${
                selectedOption === index
                  ? "bg-yellow-500 text-white border-yellow-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onPrevious}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>

      <button
        onClick={() => onNext("B")} // Pass the selected index
        disabled={selectedOption === null}
        className={`absolute bottom-10 right-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300 ${
          selectedOption === null ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <MdArrowForward size={40} color="white" />
      </button>
    </div>
  );
};

export default Passage5;
