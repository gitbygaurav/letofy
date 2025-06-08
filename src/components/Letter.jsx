import { User } from "lucide-react";
import happy from "../assets/emojis/happy.svg";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";

const happyMessages = [
  "You are very honest. You never use filters and always speak the truth!",
  "You have a lot of patience. You handle everything very calmly.",
  "No one can work as hard as you do. You never give up on anything.",
  "You are a very kind person. You make everyone feel so special.",
  "Your confidence is amazing. It always motivates me to believe in myself.",
];

export default function Letter() {
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [userCount, setUserCount] = useState("0");

  useEffect(() => {
    const randomUserCount = Math.floor(
      Math.random() * (999999 - 10000 + 1) + 10000
    );
    const formattedCount = randomUserCount.toLocaleString("en-IN");
    setUserCount(formattedCount);
  }, []);

  const handleSendLetter = async () => {
    if (!senderName.trim() || !receiverName.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

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
      <p className="text-sm font font-semibold text-center">
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
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Add your name"
                className="bg-inherit w-full h-[60px] pl-[70px] py-4 rounded-full border-2 border-white text-white text-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
              />
            </div>
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
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder="Add your name"
                className="bg-inherit w-full h-[60px] pl-[70px] py-4 rounded-full border-2 border-white text-white text-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
              />
            </div>
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
          className="w-full bg-black text-white px-8 py-4 rounded-full text-xl font-medium flex items-center justify-center gap-3 hover:bg-black/85 transition-colors continuous-shake"
        >
          <img src={"whatsapp-icon.png"} alt="whatsapp" className="h-8" />
          Share on WhatsApp
          <img src={happy} alt="happy" className="h-8" />
        </button>
      </div>
    </div>
  );
}
