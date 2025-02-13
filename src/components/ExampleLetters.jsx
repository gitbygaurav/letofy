import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import happy from "../assets/emojis/happy.svg";
import funny from "../assets/emojis/funny.svg";
import sad from "../assets/emojis/sad.svg";
import sweet from "../assets/emojis/sweet.svg";
import surprise from "../assets/emojis/surprise.svg";
import angry from "../assets/emojis/angry.svg";
import cool from "../assets/emojis/cool.svg";
import emotional from "../assets/emojis/emotional.svg";

const exampleLetters = [
  {
    senderName: "Khushi",
    receiverName: "Sayli",
    message:
      "Your style is effortlessly cool! You rock unique outfits, always mix bold colors, and carry yourself with confidence.",
    emoji: cool,
    bgColor: "#000000",
    letterType: "Cool",
  },
  {
    senderName: "Samir",
    receiverName: "Neha",
    message:
      "You are such a great friend! Your smile makes everyone happy, and you’re always there to help others. You’re fun to be around!",
    emoji: happy,
    bgColor: "#039E09",
    letterType: "Happy",
  },
  {
    senderName: "Mangesh",
    receiverName: "Riya",
    message:
      "Riya once entered the wrong class confidently, sat down, and started taking notes until she realized—everyone was staring! 😂",
    emoji: funny,
    bgColor: "#FAA200",
    letterType: "Funny",
  },
  {
    senderName: "Raghav",
    receiverName: "Tripti",
    message:
      "Remember that late night study session? We barely studied, ended up chatting and laughing the whole time. Such a sweet memory!",
    emoji: sweet,
    bgColor: "#F100D8",
    letterType: "Sweet",
  },
  {
    senderName: "Kunal",
    receiverName: "Samay",
    message:
      "Remember that wow moment when we randomly ran into each other at that concert? Neither of us knew the other would be there, and we ended up having an epic time together.",
    emoji: surprise,
    bgColor: "#FF0000",
    letterType: "Surprise",
  },
  {
    senderName: "Jack",
    receiverName: "Alina",
    message:
      "I miss our times together. Life feels empty without those moments. Just wanted you to know you’re missed deeply.",
    emoji: sad,
    bgColor: "#6100FF",
    letterType: "Sad",
  },
  {
    senderName: "Mac",
    receiverName: "Juan",
    message:
      "You’ve disappeared! Are you a secret ninja now? Next time, coffee's on you—no excuses!",
    emoji: angry,
    bgColor: "#00BAD3",
    letterType: "Angry",
  },
  {
    senderName: "Pooja",
    receiverName: "Mayur",
    message:
      "You mean so much to me. Through every high and low, your support has been everything. Thank you for being there, always.",
    emoji: emotional,
    bgColor: "#800080",
    letterType: "Emotional",
  },
];

const ExampleLetters = () => {
  return (
    <div className="w-full py-4 font-beVietnam">
      <h2 className=" max-w-lg mx-auto text-[0.9rem] font-bold border border-black rounded-full py-2 px-6 mb-8 font-readex">
        This type of letters you will receive from your friends & family
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={1.08}
        centeredSlides={false}
        loop={true}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-black",
          bulletClass: "swiper-pagination-bullet !w-3 !h-3 !bg-white !opacity-100",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.05,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3.05,
            spaceBetween: 20,
          },
        }}
        className="w-full pl-3 [&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-3"
      >
        {exampleLetters.map((letter, index) => (
          <SwiperSlide key={index} className="pb-12">
            <div
              className="rounded-[2rem] p-5 border-2 border-white h-[360px] mr-1 flex flex-col bg-black"
              style={{ backgroundColor: letter.bgColor }}
            >
              {/* Header with names and emoji */}
              <div className="rounded-[2rem] w-[90%] mx-auto border-2 border-white py-5 px-5 flex items-center gap-2">
                <div className="flex flex-col text-white">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base">{letter.senderName}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">To</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base">{letter.receiverName}</span>
                  </div>
                </div>
                <img
                  src={letter.emoji}
                  alt="emoji"
                  className="h-8 w-8 ml-auto"
                />
              </div>

              {/* Letter message */}
              <div className="text-white flex-1 flex items-center justify-center px-3">
                <p className="text-center font-semibold font-beVietnam text-base leading-relaxed">
                  {letter.message}
                </p>
              </div>

              {/* Letter type button */}
              <div className="flex justify-center">
                <button className="bg-white text-black rounded-xl py-2.5 px-14 text-base font-medium font-beVietnam flex items-center gap-2">
                  {letter.letterType}
                  <img src={letter.emoji} alt="emoji" className="h-6 w-6" />
                  Letter
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExampleLetters;
