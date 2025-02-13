import happy from "../assets/emojis/happy.svg";
import funny from "../assets/emojis/funny.svg";
import sad from "../assets/emojis/sad.svg";
import sweet from "../assets/emojis/sweet.svg";
import surprise from "../assets/emojis/surprise.svg";
import angry from "../assets/emojis/angry.svg";
import cool from "../assets/emojis/cool.svg";
import emotional from "../assets/emojis/emotional.svg";
import { useState, useEffect } from "react";
import { useShareSheet } from "../context/shareSheetContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";

const cardArray = [
  {
    id: "happy",
    emoji: happy,
  messages : [
    "According to you, which is the best quality of me?",
    "In your opinion, what am I best at?",
    "What do you think is the most unique thing about me?",
    "What habit of mine do you like the most?",
  ],
    bgColor: "#039E09",
    normalEmoji: "😀",
  },
  {
    id: "funny",
    emoji: funny,
    messages: [
      "What do you think is the funniest thing about me?",
      "In your opinion, what's my most hilarious habit?",
    ],
    currentMessageIndex: 0,
    bgColor: "#FAA200",
    normalEmoji: "😁",
  },
  {
    id: "surprise",
    emoji: surprise,
    messages : [
      "What do you find the most surprising thing about me?",
      "What do you find strange about me?"
    ],
    bgColor: "#FF0000",
    normalEmoji: "😲",
  },
  {
    id: "sweet",
    emoji: sweet,
    messages : [
      "According to you, what is the sweetest thing about me?",
      "Which thing about me makes me the sweetest person you know?"
    ],
    bgColor: "#F100D8",
    normalEmoji: "❤️",
  },
  {
    id: "sad",
    emoji: sad,
    messages : [
      "Which thing about me don't you like?",
      "Which thing of mine would you change?"
    ],
    bgColor: "#6100FF",
    normalEmoji: "😑",
  },
  {
    id: "cool",
    emoji: cool,
    messages : [
      "According to you, what is the coolest and most dashing thing about me?",
      "In your opinion, what makes me look super cool?",
      "Which thing about me makes me the coolest person you know?",
    ],
    bgColor: "#000000",
    normalEmoji: "😎",
  },
  {
    id: "angry",
    emoji: angry,
     messages: [
      "Which thing of mine makes you angry?",
      "What about me makes you upset?"
     ],
    bgColor: "#00BAD3",
    normalEmoji: "😡",
  },
  {
    id: "emotional",
    emoji: emotional,
    messages: [
      "Which thing of mine makes you emotional?",
      "What about me touches your heart the most?"
    ],
    bgColor: "#800080",
    normalEmoji: "😭",
  },
];

export default function Letter({ name, onNameError }) {
  const [selectedEmoji, setSelectedEmoji] = useState("happy");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [continuousShake, setContinuousShake] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const card = cardArray.find((card) => card.id === selectedEmoji);
  const {
    openShareSheet,
    shareType,
    setShareType,
    setShareMessage,
    setShareUrl,
  } = useShareSheet();

  useEffect(() => {
    const interval = setInterval(() => {
      setContinuousShake(true);
      setTimeout(() => setContinuousShake(false), 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessageIndex(0);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
  }, [selectedEmoji, swiperInstance]);

  const generateUniqueId = () => {
    return `${crypto.randomUUID().split("-").join("")}re`;
  };

  const handleReceiveLetter = async () => {
    if (!name.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      onNameError();
      return;
    }

    try {
      if (shareType !== "Receive") {
        setShareType("Receive");
      }
      const uniqueId = generateUniqueId();
      setShareMessage(`Hi👋 ${name} here! i want a ${card.normalEmoji}${card.id.charAt(0).toUpperCase() + card.id.slice(1)} Letter from you. Can you send for me?`);
      setShareUrl(`\n${window.location.origin}/${uniqueId}`);

      // Pass letter data through context instead of creating document
      const letterData = {
        id: uniqueId,
        type: "receive",
        letterType: selectedEmoji,
        letterDesc: card.messages[messageIndex],
        receiverName: name,
        bgColor: card.bgColor,
        emoji: card.emoji,
        normalEmoji: card.normalEmoji,
        createdAt: new Date().toISOString(),
      };

      openShareSheet(letterData);
    } catch (error) {
      console.error("Error preparing letter:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSlideChange = (swiper) => {
    setMessageIndex(swiper.activeIndex);
    // If we reach the last slide
    if (swiper.activeIndex === card.messages.length - 1) {
      // Wait for the last slide to finish showing, then reset to first
      setTimeout(() => {
        swiper.slideTo(0, 0); // Go to first slide with 0 speed (instant)
      }, 5000);
    }
  };

  return (
    <>
      <div className="mx-auto mt-6">
        <Swiper
          modules={[EffectCreative, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.08}
          centeredSlides={true}
          effect={"creative"}
          loop={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            stopOnLastSlide: false,
          }}
          breakpoints={{
            // Mobile (default)
            0: {
              slidesPerView: 1.08,
              spaceBetween: 24,
            },
            // Tablet
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // Desktop
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            // Large Desktop
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 50,
            }
          }}
          creativeEffect={{
            prev: {
              translate: ["-100%", 0, -1],
              scale: 1,
            },
            next: {
              translate: ["100%", 0, 0],
              scale: 1,
            },
          }}
          grabCursor={true}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="w-full pl-3"
        >
          {card.messages.map((message, index) => (
            <SwiperSlide key={index}>
              <div
                className="rounded-3xl max-w-[500px] p-6 text-center border-[3px] border-white relative min-h-[182px]"
                style={{ backgroundColor: card.bgColor }}
              >
                <div className="mb-4 flex justify-center items-center">
                  <img className="h-14" src={card.emoji} alt={card.id} />
                </div>
                <div>
                  <p className="text-white text-lg font-medium leading-snug font-beVietnam">
                    {message}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-[90vw] max-w-[360px] mt-6 mx-auto text-center">
        <h2 className="text-lg text-left font-semibold mb-8 px-6 font-readex">
          Receive short letters from friends and family here!
        </h2>

        <div className="grid grid-cols-4 gap-3 mb-8 max-w-[280px] mx-auto">
          {cardArray.map((emoji, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer"
              onClick={() => setSelectedEmoji(emoji.id)}
            >
              <img
                src={emoji.emoji}
                alt={emoji.id}
                className={`object-contain rounded-full w-[105%] ${
                  selectedEmoji === emoji.id
                    ? "border-[3.5px] border-[#5900FF]"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex w-full items-center font-readex">
          <button
            onClick={handleReceiveLetter}
            className={`text-white px-4 sm:px-8 py-4 rounded-full text-lg sm:text-xl font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mx-auto hover:bg-green-600 transition-colors w-[90vw] max-w-[380px] text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_6px_8px_-1px_rgba(0,0,0,0.2)] border border-white ${
              isShaking || continuousShake ? 'animate-[gentleShake_0.8s_ease-in-out]' : ''
            }`}
            style={{ backgroundColor: card.bgColor }}
          >
            <span className="inline-block">Receive</span>
            <div className="relative inline-flex">
              <img
                src={card.emoji}
                alt={selectedEmoji}
                className="object-contain h-6 sm:h-8"
              />
            </div>
            <span className="inline-block">
              {card.id.charAt(0).toUpperCase() + card.id.slice(1)} Letter
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
