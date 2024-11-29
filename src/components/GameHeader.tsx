import React, { useCallback } from "react";
import { Home, RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "pixel-retroui";
import { Howl } from "howler";

interface GameHeaderProps {
  level: number;
  onReset: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onReset }) => {
  const clickSound = React.useMemo(() => new Howl({
    src: ["/assets/click-234708.mp3"],
    volume: 0.5,
  }), []);

  const location = useLocation();
  const username = location.state?.username || "Player";

  const navigate = useNavigate();
  const handleHomeClick = () => {
    clickSound.play();
    navigate("/");
  };

  const handleResetClick = useCallback(() => {
    clickSound.play();
    onReset();
  }, [clickSound, onReset]);

  return (
    <div className="flex justify-between items-center mb-8">
      <Button
        onClick={handleHomeClick}
        className="flex items-center gap-1 px-7 py-0.5 text-black hover:bg-purple-400"
      >
        <Home className="w-5 h-5 ml-1 mr-3" />
        Home
      </Button>

      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        Hi, {username}!
      </h1>

      <Button
        onClick={handleResetClick}
        className="flex items-center gap-2 px-8 py-1 text-black hover:bg-purple-400 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <RefreshCw className="w-5 h-5" />
        Reset
      </Button>
    </div>
  );
};

export default GameHeader;
