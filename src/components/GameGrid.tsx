import React from "react";
import { Cell } from "../types/game";
import { Howl } from "howler";

interface GameGridProps {
  grid: Cell[][];
  size: number;
  onCellChange: (row: number, col: number, value: string) => void;
}

const inputChangeSound = new Howl({
  src: ["/assets/mechanical-key-soft-80731.mp3"],
  volume: 0.7,
});

const GameGrid: React.FC<GameGridProps> = ({ grid, size, onCellChange }) => {
  const handleCellChange = (row: number, col: number, value: string) => {
    inputChangeSound.play();
    onCellChange(row, col, value);
  };

  return (
    <div className="grid place-items-center mb-8">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={cell.value || ""}
              onChange={(e) => handleCellChange(i, j, e.target.value)}
              disabled={cell.isLocked}
              className={`w-16 h-16 text-2xl text-center border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors
                ${cell.isLocked
                  ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                  : cell.isCorrect
                    ? " "
                    : "border-gray-200"
                }`}
              min="1"
              max={size * size}
              placeholder="_"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;
