import React, { useEffect, useState } from "react";
import { Button, Card } from "pixel-retroui";
import { Trophy, Lock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Level } from "../types/game";

interface LevelCardProps {
  levels: Level[];
  currentLevel: number;
  maxUnlockedLevel: number;
  score: number;
  onLevelSelect: (level: number) => void;
}

const LevelCard: React.FC<LevelCardProps> = ({
  levels,
  currentLevel: initialCurrentLevel,
  maxUnlockedLevel: initialMaxUnlockedLevel,
  score: initialScore,
  onLevelSelect,
}) => {
  const navigate = useNavigate();

  const [currentLevel, setCurrentLevel] = useState(initialCurrentLevel);
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(
    initialMaxUnlockedLevel
  );
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    const savedGameState = localStorage.getItem("gameState");
    if (savedGameState) {
      const parsedState = JSON.parse(savedGameState);
      setCurrentLevel(parsedState.currentLevel || 0);
      setMaxUnlockedLevel(parsedState.maxUnlockedLevel || 0);
      setScore(parsedState.score || 0);
    }
  }, []);

  const handleClick = () => {
    navigate("/game");
  };

  return (
    <div className="cards">
      <Card
        bg="#77DD77"
        className="p-4 items-center flex flex-col"
        shadowColor="#c381b5"
      >
        <h2 className="text-2xl font-bold mb-2">Levels</h2>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-xl font-bold text-gray-800">
              Score: {score}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {levels.map((level, index) => (
              <button
                key={index}
                onClick={() => onLevelSelect(index)}
                disabled={index > maxUnlockedLevel}
                className={`p-4 rounded-lg transition-all ${index === currentLevel
                    ? "bg-purple-500 text-white shadow-lg scale-105"
                    : index <= maxUnlockedLevel
                      ? "bg-white border-2 border-purple-200 hover:border-purple-500"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">Level {index + 1}</span>
                  {index > maxUnlockedLevel ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : index < currentLevel ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : null}
                </div>
                <div className="text-sm">{level.name}</div>
                <div className="text-xs mt-1">
                  {index <= maxUnlockedLevel
                    ? `${level.size}x${level.size} Grid`
                    : `Requires ${level.requiredScore} points`}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              className="flex items-center px-4 py-2 rounded-md font-medium text-black hover:bg-purple-400 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={handleClick}
            >
              Start
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LevelCard;
