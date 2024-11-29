import React, { useState, useEffect, useCallback } from "react";
import { Check, Clock, Footprints, Trophy } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import GameHeader from "./GameHeader";
import GameGrid from "./GameGrid";
import { Card, Button } from "pixel-retroui";
import { Cell, GameState } from "../types/game";
import { generateMagicSquare, getInitialHints } from "../utils/magicSquare";
import { levels, calculateScore } from "../utils/levels";
import { Howl } from "howler";

const MagicSquare: React.FC = () => {
  const location = useLocation();
  const level = location.state?.level || 0;

  const [gameState, setGameState] = useState<GameState>({
    currentLevel: level,
    maxUnlockedLevel: 0,
    score: 0,
  });
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [solution, setSolution] = useState<number[][]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();
  const currentSize = levels[gameState.currentLevel].size;

  const completionSound = new Howl({
    src: ["/assets/shine-7-268909.mp3"],
    volume: 0.3,
  });

  const playCompletionSound = () => {
    completionSound.play();
  };

  useEffect(() => {
    if (isComplete) {
      playCompletionSound();
    }
  }, [isComplete]);


  const backgroundMusic = new Howl({
    src: ["/assets/Pixel Dreams.mp3"],
    volume: 0.3,
    loop: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      backgroundMusic.play();
    }, 2000);

    return () => {
      clearTimeout(timer);
      backgroundMusic.stop();
    };
  }, []);

  const initializeGrid = useCallback((n: number) => {
    const newSolution = generateMagicSquare(n);
    const emptyGrid = Array(n)
      .fill(0)
      .map(() =>
        Array(n)
          .fill(0)
          .map(() => ({
            value: 0,
            isCorrect: false,
            isLocked: false,
          }))
      );

    const hintPositions = getInitialHints(newSolution, n);

    hintPositions.forEach(([row, col]) => {
      emptyGrid[row][col] = {
        value: newSolution[row][col],
        isCorrect: true,
        isLocked: true,
      };
    });

    setGrid(emptyGrid);
    setSolution(newSolution);
    setIsComplete(false);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    initializeGrid(currentSize);
  }, [currentSize, initializeGrid]);

  useEffect(() => {
    let timer: number;
    if (isPlaying && !isComplete) {
      timer = window.setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isComplete]);

  const handleCellChange = (row: number, col: number, value: string) => {
    if (grid[row][col].isLocked) return;

    const numValue = parseInt(value) || 0;
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      value: numValue,
      isCorrect: numValue === solution[row][col],
    };
    setGrid(newGrid);
    setMoves((m) => m + 1);

    const isAllCorrect = newGrid.every((row, i) =>
      row.every((cell, j) => cell.value === solution[i][j])
    );

    if (isAllCorrect) {
      setIsComplete(true);
      setIsPlaying(false);
      const levelScore = calculateScore(currentSize, moves, time);
      setGameState((prev) => ({
        ...prev,
        score: prev.score + levelScore,
        maxUnlockedLevel: Math.max(
          prev.maxUnlockedLevel,
          prev.currentLevel + 1
        ),
      }));
    }
  };

  const handleNextLevel = () => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
    navigate("/");
  };

  return (
    <Card className="min-h-screen bg-gradient-to-br from-green-500 via-purple-500 to-pink-500 p-8">
      <div className="">
        <GameHeader
          level={gameState.currentLevel + 1}
          onReset={() => initializeGrid(currentSize)}
        />
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-7 h-7 text-yellow-500" />
            <span className="text-xl font-bold text-gray-800">
              Score: {gameState.score}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-11 ">
            <div className="flex items-center gap-3">
              <Clock className="w-7 h-7 text-black-500" />
              <span>
                {Math.floor(time / 60)}:
                {(time % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Footprints className="w-7 h-7 text-black-500" />
              <span>{moves} Moves</span>
            </div>
          </div>
        </div>

        <GameGrid
          grid={grid}
          size={currentSize}
          onCellChange={handleCellChange}
        />
        <p className="text-lg text-gray-600 text-center px-1 py-1">
          Fill in the grid so that each row, column, and diagonal sums
        </p>
        {isComplete && (
          <div className="text-center">
            <div className="inline-flex items-center gap-1 px-6 py-3 bg-green-500 text-white rounded-lg">
              <Check className="w-5 h-5" />
              Congratulations!
              {gameState.currentLevel < levels.length - 1 && (
                <Button
                  onClick={handleNextLevel}
                  className="ml-4 px-4 py-2 text-black hover:bg-purple-400 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Done
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MagicSquare;
