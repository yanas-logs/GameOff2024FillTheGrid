import React, { useState } from "react";
import { Button, Popup, Input } from "pixel-retroui";
import { Howl } from "howler";

function FormUser() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const typingSound = new Howl({
    src: ["/assets/click-234708.mp3"],
    volume: 0.3,
  });

  const handleInputChange = () => {
    typingSound.play();
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    closePopup();
  };

  return (
    <div className="cards">
      <Button bg="gray" onClick={openPopup}>
        Open form
      </Button>
      <Popup
        bg="darkgray"
        baseBg="gray"
        isOpen={isPopupOpen}
        onClose={closePopup}
        className="text-center"
      >
        <h1 className="text-3xl mb-4">Welcome!</h1>
        <p className="mb-4"> Please login to continue.</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <Input
            className="bg-[#f2f2f2]"
            placeholder="Username"
            onChange={handleInputChange}
          />

          <Button bg="purple" type="submit" className="w-20 ">
            Submit
          </Button>
        </form>
      </Popup>
    </div>
  );
}

export default FormUser;
