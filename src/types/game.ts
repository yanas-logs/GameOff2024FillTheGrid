export interface Cell {
  value: number;
  isCorrect: boolean;
  isLocked: boolean;
}

export interface Level {
  size: number;
  requiredScore: number;
  name: string;
}

export interface GameState {
  currentLevel: number;
  maxUnlockedLevel: number;
  score: number;
}

export interface GameGridProps {
  grid: Cell[][];
  size: number;
  onCellChange: (row: number, col: number, value: string) => void;
}
