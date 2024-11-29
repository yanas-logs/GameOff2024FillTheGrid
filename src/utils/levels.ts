import { Level } from "../types/game";

export const levels: Level[] = [
  { size: 3, requiredScore: 0, name: "Novice Square" },
  { size: 5, requiredScore: 100, name: "Apprentice Square" },
  { size: 7, requiredScore: 250, name: "Expert Square" },
  { size: 9, requiredScore: 450, name: "Master Square" },
  { size: 11, requiredScore: 700, name: "Grand Master Square" },
  { size: 13, requiredScore: 1000, name: "Legendary Square" },
  { size: 15, requiredScore: 1500, name: "Ultimate Square" },
];

export const calculateScore = (
  size: number,
  moves: number,
  timeSeconds: number
): number => {
  const baseScore = size * size * 10;
  const timeBonus = Math.max(0, 300 - timeSeconds) * size;
  const movesPenalty = Math.max(0, moves - size * size) * 5;
  return Math.max(0, baseScore + timeBonus - movesPenalty);
};
