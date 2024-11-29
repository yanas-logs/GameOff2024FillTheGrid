import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LevelCard from "./components/LevelCard";
import MagicSquare from "./components/MagicSquare";
import "./index.css";
import { Level } from "./types/game";
import LevelProgress from "./components/LevelProgress";
import FormUser from "./components/FormUser";

const App: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [maxUnlockedLevel] = useState(0);
  const [score] = useState(0);

  const handleLevelSelect = (level: number) => {
    console.log(`Level ${level + 1} selected`);
    setCurrentLevel(level);
  };

  const levels: Level[] = [
    { size: 3, requiredScore: 100, name: "Novice Square" },
    { size: 5, requiredScore: 100, name: "Apprentice Square" },
    { size: 7, requiredScore: 250, name: "Expert Square" },
    { size: 9, requiredScore: 450, name: "Master Square" },
    { size: 11, requiredScore: 700, name: "Grand Master Square" },
    { size: 13, requiredScore: 1000, name: "Legendary Square" },
    { size: 15, requiredScore: 1500, name: "Ultimate Square" },
  ];

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/level-card"
        element={
          <LevelCard
            levels={levels}
            currentLevel={currentLevel}
            maxUnlockedLevel={maxUnlockedLevel}
            score={score}
            onLevelSelect={handleLevelSelect}
          />
        }
      />
    
      <Route path="/game" element={<MagicSquare />} />
      <Route path="/form" element={<FormUser />} />
      <Route path="/progress" element={
        <LevelProgress 
        levels={levels}
            currentLevel={currentLevel}
            maxUnlockedLevel={maxUnlockedLevel}
            score={score}
            onLevelSelect={handleLevelSelect}
        />
        } 
        />
    </Routes>
    
  );
};

export default App;
