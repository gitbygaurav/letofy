import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import happy from "../assets/emojis/happy.svg";
import funny from "../assets/emojis/funny.svg";
import sad from "../assets/emojis/sad.svg";
import sweet from "../assets/emojis/sweet.svg";
import surprise from "../assets/emojis/surprise.svg";
import angry from "../assets/emojis/angry.svg";
import cool from "../assets/emojis/cool.svg";
import emotional from "../assets/emojis/emotional.svg";

const cardArray = [
  {
    id: "happy",
    emoji: happy,
    bgColor: "#039E09",
  },
  {
    id: "funny",
    emoji: funny,
    bgColor: "#FAA200",
  },
  {
    id: "surprise",
    emoji: surprise,
    bgColor: "#FF0000",
  },
  {
    id: "sweet",
    emoji: sweet,
    bgColor: "#F100D8",
  },
  {
    id: "sad",
    emoji: sad,
    bgColor: "#6100FF",
  },
  {
    id: "cool",
    emoji: cool,
    bgColor: "#000000",
  },
  {
    id: "angry",
    emoji: angry,
    bgColor: "#00BAD3",
  },
  {
    id: "emotional",
    emoji: emotional,
    bgColor: "#800080",
  },
];

const ReceiveButtons = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardArray.length);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentCard = cardArray[currentIndex];

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="flex w-full items-center font-readex">
      <button
        onClick={handleClick}
        className={`text-white px-4 sm:px-8 py-4 rounded-full text-lg sm:text-xl font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mx-auto hover:opacity-90 transition-colors w-[90vw] max-w-[380px] text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_6px_8px_-1px_rgba(0,0,0,0.2)] border border-white ${
          isShaking ? 'animate-[gentleShake_0.8s_ease-in-out]' : ''
        }`}
        style={{ backgroundColor: currentCard.bgColor }}
      >
        <span className="inline-block">Receive</span>
        <div className="relative inline-flex">
          <img
            src={currentCard.emoji}
            alt={currentCard.id}
            className="object-contain h-6 sm:h-8"
          />
        </div>
        <span className="inline-block">
          {currentCard.id.charAt(0).toUpperCase() + currentCard.id.slice(1)} Letter
        </span>
      </button>
    </div>
  );
}

export default ReceiveButtons