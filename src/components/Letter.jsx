import { User } from "lucide-react";
import happy from "../assets/emojis/happy.svg";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";
  
const happyMessages = [
  "You are very honest.you never use filters and always speak the truth!",
  "You have a lot of patience.you handle everything very calmly.",
  "No one can work as hard as you do.you never give up on anything.",
  "You are a very kind person.you make everyone feel so special.",
  "Your confidence is crazy,it always motivates me to believe in myself.",
  "You have great wisdom of life,and you always give the best advice.",
  "You are such a nice soul,the world needs more people like you.",
  "I love your positive thinking,it brings so much hope to everyone.",
  "I see leadership quality in you, people naturally trust and follow you.",
  "You always admit your mistakes,you don't have an ego problem.",
  "I can blindly trust you,your loyalty is rare.",
  "You are such a generous person,you give so much without expecting anything in return.",
  "You take responsibility for everything,and it shows your maturity and strength.",
  "Your adaptability is amazing,you handle changes so smoothly.",
  "I like your respectful nature,you treat everyone with so much dignity.",
  "Your open-mindedness is inspiring for me,you're always ready to understand new ideas.",
];

export default function Letter() {
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [userCount, setUserCount] = useState("0");
  const [continuousShake, setContinuousShake] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({ sender: "", receiver: "" });

  useEffect(() => {
    // Generate random number between 100000 and 999999 (6 digits only)
    const randomUserCount = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );
    const formattedCount = randomUserCount.toLocaleString("en-IN");
    setUserCount(formattedCount);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setContinuousShake(true);
      setTimeout(() => setContinuousShake(false), 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSendLetter = async () => {
    let hasError = false;
    const newErrors = { sender: "", receiver: "" };

    if (!senderName.trim()) {
      newErrors.sender = "Please enter sender's name";
      hasError = true;
    }

    if (!receiverName.trim()) {
      newErrors.receiver = "Please enter receiver's name";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const uniqueId = crypto.randomUUID().split("-").join("");
      const letterUrl = `${window.location.origin}/${uniqueId}`;

      const letterData = {
        id: uniqueId,
        senderName,
        receiverName,
        message: happyMessages[messageIndex],
        type: "happy",
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem(`letter_${uniqueId}`, JSON.stringify(letterData));

      const message = encodeURIComponent(
        `Hi 👋 ${receiverName} 👋.\n${senderName} dedicated a 😀 happy letter to you.\n${letterUrl}`
      );
      const whatsappUrl = `https://wa.me/?text=${message}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error sending letter:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSlideChange = (swiper) => {
    setMessageIndex(swiper.activeIndex);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <p className="text-lg font font-semibold text-center">
        <span className="text-[#6C00F1]">{userCount}</span> users <br />
        are currently using the website
      </p>
      <div className="space-y-6 mt-4">
        <div className="bg-[#039E09] rounded-3xl p-6 text-center border-[3px] border-white relative">
          <div className="mt-4">
            <div className="relative flex justify-center items-center  max-w-[360px] h-[54px]">
              <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="text-white" fill="currentColor" size={20} />
              </div>
              <input
                type="text"
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value);
                  if (errors.sender)
                    setErrors((prev) => ({ ...prev, sender: "" }));
                }}
                placeholder="Add your name"
                className="bg-inherit w-full h-[60px] pl-[70px] py-4 rounded-full border-2 border-white text-white text-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
              />
            </div>
            {errors.sender && (
              <p className="text-sm text-red-500 font-beVietnam mt-2 ml-4">
                {errors.sender}
              </p>
            )}
            <div className="flex gap-2 items-center justify-center text-white text-sm font-medium leading-snug font-beVietnam my-6">
              <p>Dedicate</p>
              <img src={happy} alt="happy" className="h-10" />
              <p>a Happy Letter to</p>
            </div>
            <div className="relative flex justify-center items-center  max-w-[360px] h-[54px]">
              <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="text-white" fill="currentColor" size={20} />
              </div>
              <input
                type="text"
                value={receiverName}
                onChange={(e) => {
                  setReceiverName(e.target.value);
                  if (errors.receiver)
                    setErrors((prev) => ({ ...prev, receiver: "" }));
                }}
                placeholder="Add receiver name"
                className="bg-inherit w-full h-[60px] pl-[70px] py-4 rounded-full border-2 border-white text-white text-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
              />
            </div>
            {errors.receiver && (
              <p className="text-sm text-red-500 font-beVietnam mt-2 ml-4">
                {errors.receiver}
              </p>
            )}
          </div>

          <div className="mx-auto mt-6">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={1.2}
              className="w-full !pl-0"
              onSlideChange={handleSlideChange}
            >
              {happyMessages.map((message, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-3xl px-10 py-6 text-center relative">
                    <p className="text-black text-base font-semibold leading-snug font-beVietnam">
                      {message}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <button
          onClick={handleSendLetter}
          className={`w-full bg-black text-white px-4 py-4 rounded-full text-xl font-medium flex items-center justify-center gap-3 hover:bg-black/85 transition-colors continuous-shake ${
            continuousShake ? "animate-[gentleShake_0.8s_ease-in-out]" : ""
          }`}
        >
          <img src={"whatsapp.svg"} alt="whatsapp" className="h-8" />
          Dedicate
          <img src={happy} alt="happy" className="h-8" />
          Happy Letter
        </button>
      </div>
    </div>
  );
}
