import { ChevronDown, User } from "lucide-react";
import happy from "../assets/emojis/happy.svg";
import funny from "../assets/emojis/funny.svg";
import sad from "../assets/emojis/sad.svg";
import sweet from "../assets/emojis/sweet.svg";
import surprise from "../assets/emojis/surprise.svg";
import angry from "../assets/emojis/angry.svg";
import cool from "../assets/emojis/cool.svg";
import emotional from "../assets/emojis/emotional.svg";

export default function HowToUse() {
  return (
    <>
      <div className="w-full mt-5 mx-auto text-center py-6">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-base font-semibold font-beVietnam">
            How to use?
          </h2>
          <span className="rounded-full border-2 border-black flex items-center justify-center">
            <ChevronDown className="w-4 h-4" />
          </span>
          <div className="w-full py-4 bg-neutral-100">
            <div className="h-1 bg-black rounded-xl w-1/2 mx-auto" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto px-5 ">
        <h1 className="text-lg ml-4 font-bold mb-6 font-beVietnam">
          How to receive letters?
        </h1>

        <div className="bg-white rounded-3xl p-5 border-2 py-12 border-black">
          <h2 className="text-lg font-bold mb-6 font-beVietnam">
            1. Add your name.
          </h2>

          <div className="relative mb-2 pointer-events-none">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={20} fill="currentColor" />
            </div>
            <input
              type="text"
              placeholder="Add your name"
              className="w-full px-12 py-4 rounded-[24px] pl-[54px] h-[60px] border-2 border-black text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
            />
          </div>

          <p className="text-xs font-semibold font-readex text-center text-gray-600">
            Enter your name to start receiving letters.
          </p>
        </div>

        <div className="bg-white mt-5 rounded-3xl p-5 border-2 border-black">
          <h2 className="text-lg font-bold mb-8 font-beVietnam flex gap-1">
           <span>2.</span>
           <span>Select the letter you want to receive.</span>
          </h2>

          <div className="grid grid-cols-4 mb-8 max-w-[270px] mx-auto">
            {[
              { src: happy, alt: "Happy face" },
              { src: funny, alt: "Laughing face" },
              { src: surprise, alt: "Surprised face" },
              { src: sweet, alt: "Love eyes face" },
              { src: cool, alt: "Cool face" },
              { src: angry, alt: "Angry face" },
              { src: sad, alt: "Sad face" },
              { src: emotional, alt: "Emotional face" },
            ].map((emoji, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer transition-transform flex items-center justify-center"
              >
                <img
                  src={emoji.src}
                  alt={emoji.alt}
                  className={`object-contain ${
                    index === 0
                      ? "border-[3.5px] rounded-full border-[#5900FF]"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>
          <button className="text-white bg-[#039E09] px-4 sm:px-8 py-4 rounded-full text-lg sm:text-xl font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mx-auto transition-colors w-full max-w-[300px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_6px_8px_-1px_rgba(0,0,0,0.2)] border border-white">
            <span className="inline-block">Receive</span>
            <div className="relative inline-flex">
              <img
                src={happy}
                alt="Happy emoji"
                className="object-contain h-6 sm:h-8"
              />
            </div>
            <span className="inline-block">Happy Letter</span>
          </button>
        </div>

        <div className="bg-white mt-5 rounded-3xl p-5 border-2 border-black">
          <h2 className="text-lg font-bold mb-8 font-beVietnam flex gap-1">
            <span>3.</span>
            <span>
              Send a message on WhatsApp or Instagram to the person for the
              letter.
            </span>
          </h2>

          <div className="bg-neutral-100 rounded-3xl p-2 w-full">
            {/* Line at top */}
            <div className="w-12 h-1 bg-black rounded-full mx-auto mb-6"></div>

            <h2 className="text-lg font-bold mb-6">Receive Letter from</h2>

            <div className="space-y-3 xs:space-y-4">
              {/* WhatsApp Button */}
              <button className="w-full bg-[#05A20B] text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-2 xs:gap-3">
                <div className="relative w-5 xs:w-6 h-5 xs:h-6">
                  <img
                    src="/socialIcons/whatsapp.svg"
                    alt="WhatsApp"
                    className="object-contain"
                  />
                </div>
                <span className="text-sm xs:text-base font-medium">
                  Receive From What&apos;s App
                </span>
              </button>

              {/* Instagram Button */}
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-2 xs:gap-3">
                <div className="relative w-5 xs:w-6 h-5 xs:h-6">
                  <img
                    src="/socialIcons/instagram.svg"
                    alt="Instagram"
                    className="object-contain"
                  />
                </div>
                <span className="text-sm xs:text-base font-medium">
                  Receive From Instagram
                </span>
              </button>

              {/* Snapchat Button */}
              <button className="w-full bg-gray-500 text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-2 xs:gap-3">
                <div className="relative w-5 xs:w-6 h-5 xs:h-6">
                  <img
                    src="/socialIcons/snapchat.svg"
                    alt="Snapchat"
                    className="object-contain"
                  />
                </div>
                <span className="text-sm xs:text-base font-medium">
                  Receive from snapchat
                </span>
              </button>

              {/* Copy Link Button */}
              <button className="w-full bg-[#F41AFF] text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-2 xs:gap-3">
                <div className="relative w-5 xs:w-6 h-5 xs:h-6">
                  <img
                    src="/socialIcons/link.svg"
                    alt="Copy Link"
                    className="object-contain"
                  />
                </div>
                <span className="text-xs xs:text-sm font-medium">
                  Copy link for insta & snap story
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-8 text-center">
          <h2 className="text-4xl font-bold mb-2 font-aclonica">Boom!</h2>
          <p className="text-base mb-8 font-bold font-readex">
            &quot;Your inbox will be filled with letters.&quot;
          </p>
        </div>
      </div>

    </>
  );
}
