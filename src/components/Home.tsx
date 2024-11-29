import { useState } from "react";
import { Button, Card, Popup } from "pixel-retroui";
import { Gamepad2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const maxUsernameLength = 15;
  const navigate = useNavigate();

  const clickSound = new Howl({
    src: ["/assets/typing-sound-01-229863.mp3"],
    volume: 0.5,
  });

  const openPopup = () => {
    clickSound.play();
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    clickSound.play();
    setError("");
    setIsPopupOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxUsernameLength) {
      setUsername(inputValue);
    }
  };

  const handleSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    clickSound.play();
    if (!username.trim()) {
      setError("Please, fill in the blank!");
    } else {
      setError("");
      closePopup();
      navigate("/game", { state: { username } });
    }
  };

  return (
    <div className="retro-container">
      <Card
        bg="#2D1B69"
        className="p-8 items-center flex flex-col max-w-md w-full"
        shadowColor="#1a103d"
      >
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          <h1 className="text-4xl font-bold text-white">Magic Square</h1>
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur"></div>
          <div className="relative bg-black/30 p-6 rounded-lg backdrop-blur-sm text-white">
            <p className="text-center leading-relaxed">
              The ancient puzzle of magic squares. Fill the grid so all rows,
              columns, and diagonals sum to the same magical number!
            </p>
          </div>
        </div>

        <Button
          className="retro-button group flex items-center gap-3"
          onClick={openPopup}
        >
          <Gamepad2 className="w-6 h-6 transform group-hover:rotate-12 transition-transform" />
          Start Your Quest
        </Button>

        <Popup
          bg="darkgray"
          baseBg="gray"
          isOpen={isPopupOpen}
          onClose={closePopup}
          className="text-center"
        >
          <h1 className="text-3xl mb-4">Welcome to the Quest!</h1>
          <p className="mb-4">Please enter your username to start.</p>
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmitClick}
          >
            <input
              className="bg-[#f2f2f2] px-4 py-2"
              placeholder="Username"
              maxLength={maxUsernameLength}
              value={username}
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-500"></p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button bg="gray" type="submit" className="w-20">
              Submit
            </Button>
          </form>
        </Popup>
      </Card>
    </div>
  );
}

export default Home;
