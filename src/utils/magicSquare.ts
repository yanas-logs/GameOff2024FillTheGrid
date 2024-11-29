export const generateMagicSquare = (n: number): number[][] => {
  const magicSquare = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  if (n % 2 === 1) {
    let num = 1;
    let i = Math.floor(n / 2);
    let j = n - 1;

    while (num <= n * n) {
      if (i === -1 && j === n) {
        j = n - 2;
        i = 0;
      } else {
        if (j === n) {
          j = 0;
        }
        if (i < 0) {
          i = n - 1;
        }
      }

      if (magicSquare[i][j] !== 0) {
        j -= 2;
        i++;
        continue;
      } else {
        magicSquare[i][j] = num;
        num++;
      }

      j++;
      i--;
    }
  } else {
    // For even order magic squares
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        magicSquare[i][j] =
          (i * n + j + 1 + Math.floor(j / 4) * (2 * n * n - 2 * n)) % (n * n);
        if (magicSquare[i][j] === 0) magicSquare[i][j] = n * n;
      }
    }
  }

  return magicSquare;
};

const rotatePattern = (
  pattern: [number, number][],
  n: number
): [number, number][] => {
  return pattern.map(([i, j]) => [j, n - 1 - i] as [number, number]);
};

const mirrorPattern = (
  pattern: [number, number][],
  n: number
): [number, number][] => {
  return pattern.map(([i, j]) => [i, n - 1 - j] as [number, number]);
};

export const getInitialHints = (
  solution: number[][],
  n: number
): [number, number][] => {
  const numHints = Math.max(2, Math.floor(n * n * 0.2));

  // Strategic positions for 3x3 grid
  if (n === 3) {
    const basePatterns: [number, number][][] = [
      [
        [0, 0],
        [1, 2],
      ], // L-shape pattern
      [
        [0, 1],
        [2, 1],
      ], // Vertical line
      [
        [1, 0],
        [1, 2],
      ], // Horizontal line
      [
        [0, 0],
        [2, 2],
      ], // Diagonal
      [
        [0, 2],
        [2, 0],
      ], // Anti-diagonal
      [
        [1, 1],
        [2, 2],
      ], // Corner-center
      [
        [0, 1],
        [1, 2],
      ], // L-shape variant
      [
        [2, 0],
        [1, 1],
      ], // Reverse L-shape
    ];

    // Select a random base pattern
    let pattern = [
      ...basePatterns[Math.floor(Math.random() * basePatterns.length)],
    ];

    // Randomly apply transformations
    if (Math.random() < 0.5) {
      pattern = rotatePattern(pattern, n);
    }
    if (Math.random() < 0.5) {
      pattern = mirrorPattern(pattern, n);
    }

    // Occasionally add a third hint for increased variety
    if (Math.random() < 0.3) {
      const availablePositions = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => [i, j] as [number, number])
      )
        .flat()
        .filter(([i, j]) => !pattern.some(([pi, pj]) => pi === i && pj === j));

      if (availablePositions.length > 0) {
        const extraHint =
          availablePositions[
            Math.floor(Math.random() * availablePositions.length)
          ];
        pattern.push(extraHint);
      }
    }

    return pattern;
  }

  // For larger grids
  const positions: [number, number][] = [];
  const usedPositions = new Set<string>();

  // Strategic placement for larger grids
  const strategies = [
    // Center and corners strategy
    () => {
      if (n % 2 === 1) {
        const center = Math.floor(n / 2);
        positions.push([center, center]);
        usedPositions.add(`${center},${center}`);
      }
      // Random corner
      const corners: [number, number][] = [
        [0, 0],
        [0, n - 1],
        [n - 1, 0],
        [n - 1, n - 1],
      ];
      const corner = corners[Math.floor(Math.random() * corners.length)];
      if (!usedPositions.has(`${corner[0]},${corner[1]}`)) {
        positions.push(corner);
        usedPositions.add(`${corner[0]},${corner[1]}`);
      }
    },
    // Diagonal strategy
    () => {
      const diagonalPos = Math.floor(Math.random() * n);
      const pos: [number, number] = [diagonalPos, diagonalPos];
      if (!usedPositions.has(`${pos[0]},${pos[1]}`)) {
        positions.push(pos);
        usedPositions.add(`${pos[0]},${pos[1]}`);
      }
    },
    // Anti-diagonal strategy
    () => {
      const pos: [number, number] = [
        Math.floor(Math.random() * n),
        n - 1 - Math.floor(Math.random() * n),
      ];
      if (!usedPositions.has(`${pos[0]},${pos[1]}`)) {
        positions.push(pos);
        usedPositions.add(`${pos[0]},${pos[1]}`);
      }
    },
  ];

  // Apply random strategies
  strategies.forEach((strategy) => {
    if (positions.length < numHints && Math.random() < 0.7) {
      strategy();
    }
  });

  // Fill remaining positions randomly
  while (positions.length < numHints) {
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    const key = `${i},${j}`;

    if (!usedPositions.has(key)) {
      positions.push([i, j]);
      usedPositions.add(key);
    }
  }

  return positions;
};

export const calculateMagicConstant = (size: number): number => {
  return (size * (size * size + 1)) / 2;
};

export const calculateRowSum = (row: number[]): number => {
  return row.reduce((sum, num) => sum + num, 0);
};
