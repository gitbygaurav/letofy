import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import ReceiveButtons from "./ReceiveButtons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const exampleMessages = {
  happy: [
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
  ],
};

export default function WriteLetter() {
  const { id } = useParams();
  const [letterData, setLetterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [letterContent, setLetterContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [continuousShake, setContinuousShake] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setContinuousShake(true);
      setTimeout(() => setContinuousShake(false), 600);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLetterData = async () => {
      try {
        const letterDoc = await getDoc(doc(db, "letters", id));

        if (!letterDoc.exists()) {
          setError("Letter not found");
          return;
        }

        const data = letterDoc.data();
        if (data.type !== "receive") {
          setError("Invalid letter type");
          return;
        }

        setLetterData(data);
      } catch (err) {
        console.error("Error fetching letter:", err);
        setError("Failed to load letter");
      } finally {
        setLoading(false);
      }
    };

    fetchLetterData();
  }, [id]);

  const handleSend = () => {
    if (!letterContent.trim()) {
      setContentError("Please write a message before sending");
      textareaRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/send/${id}`, {
      state: {
        letterContent,
        letterData,
      },
    });
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    setLetterContent(message);
    setContentError("");
  };

  if (loading)
    return (
      <>
        <div className="h-[30rem] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      </>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!letterData) return null;

  return (
    <div className="min-h-screen">
      <ReceiveButtons />

      <div className="w-[95vw] max-w-[420px] mx-auto mt-6">
        <div
          className="p-4 px-5 border-[2.5px] border-white rounded-[24px]"
          style={{ backgroundColor: letterData.bgColor }}
          ref={textareaRef}
        >
          <div className="w-full flex items-center justify-between">
            <div className="rounded-[3rem] w-36 border-[2.5px] border-white py-1 flex items-center justify-center gap-3">
              <div className="flex items-center justify-center gap-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-bold font-beVietnam text-lg">
                  {letterData.receiverName}
                </span>
              </div>
            </div>
            <img
              src={letterData.emoji}
              alt="emoji"
              className="h-8 w-8 ml-auto"
            />
          </div>
          <p className="text-white text-base text-center font-extrabold my-2">
            {letterData.letterDesc}
          </p>
          <div className="flex justify-between">
            <div className="flex items-center justify-start gap-2 rounded-full w-36 border-[2.5px] border-white py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white font-bold font-beVietnam text-lg">
                You
              </span>
            </div>
          </div>
          <div
            className={`bg-white rounded-xl p-6 relative mt-4 ${
              continuousShake ? "animate-[gentleShake_0.8s_ease-in-out]" : ""
            }`}
          >
            <textarea
              value={letterContent}
              onChange={(e) => {
                setLetterContent(e.target.value);
                setContentError("");
              }}
              className="w-full text-center font-semibold font-beVietnam min-h-[80px] text-gray-600 text-lg
              resize-none border-none focus:ring-0 focus:outline-none bg-transparent"
            />
            {!letterContent && (
              <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
                <p className="text-center font-semibold font-beVietnam text-[15px] text-gray-400">
                  Type your answer or select from the texts given below
                </p>
              </div>
            )}
          </div>
          {contentError && (
            <p className="text-white text-sm mt-2 font-beVietnam">
              {contentError}
            </p>
          )}
        </div>

        <div className="flex justify-end mr-2">
          <button
            className="w-[160px] bg-black text-white rounded-full py-3 px-8
            text-lg font-medium mt-6 block"
            onClick={handleSend}
          >
            SEND
          </button>
        </div>

        {/* Example Messages Carousel */}
        <div className="mt-8">
          <div className="relative">
            {/* Split messages into two parts */}
            {(() => {
              const messages = exampleMessages[letterData.letterType] || [];
              const midPoint = Math.ceil(messages.length / 2);
              const firstHalf = messages.slice(0, midPoint);
              const secondHalf = messages.slice(midPoint);

              return (
                <>
                  {/* Top Row Carousel */}
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={12}
                    slidesPerView={1.2}
                    className="w-full !pl-0"
                  >
                    {firstHalf.map((message, index) => (
                      <SwiperSlide key={`top-${index}`}>
                        <div
                          className={`bg-[#FF1493] font-beVietnam text-white px-4 py-3 rounded-[20px] text-center text-sm font-medium cursor-pointer transition-all duration-200 min-h-[80px] flex items-center justify-center ${
                            selectedMessage === message
                              ? "border-[3px] border-white shadow-lg scale-[1.02]"
                              : ""
                          }`}
                          style={{ backgroundColor: letterData.bgColor }}
                          onClick={() => handleMessageSelect(message)}
                        >
                          <p className="line-clamp-3">{message}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Bottom Row Carousel */}
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={12}
                    slidesPerView={1.2}
                    className="w-full mt-3 !pl-0"
                  >
                    {secondHalf.map((message, index) => (
                      <SwiperSlide key={`bottom-${index}`}>
                        <div
                          className={`bg-[#FF1493] font-beVietnam text-white px-4 py-3 rounded-[20px] text-center text-sm font-medium cursor-pointer transition-all duration-200 min-h-[80px] flex items-center justify-center ${
                            selectedMessage === message
                              ? "border-[3px] border-white shadow-lg scale-[1.02]"
                              : ""
                          }`}
                          style={{ backgroundColor: letterData.bgColor }}
                          onClick={() => handleMessageSelect(message)}
                        >
                          <p className="line-clamp-3">{message}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
