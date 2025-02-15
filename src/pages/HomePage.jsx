import { User } from "lucide-react";
import Letter from "../components/Letter";
import HowToUse from "../components/HowToUse";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import ExampleLetters from "../components/ExampleLetters";
import Footer from "../components/Footer";
import { useState, useRef } from "react";

const HomePage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  const handleNameError = () => {
    setError("Please enter your name to receive letters");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div
        className="mt-6 flex flex-col items-center gap-2 w-full max-w-md mx-auto"
        ref={inputRef}
      >
        <div
          className={`relative flex justify-center w-[90vw] max-w-[360px] ${
            isShaking ? "animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]" : ""
          }`}
        >
          <div className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400">
            <User fill="currentColor" size={20} />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Add your name"
            className="w-full px-12 py-4 rounded-[24px] pl-[54px] h-[60px] border-2 border-black text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
          />
        </div>
        {error ? (
          <p
            className={`text-sm mt-1 text-red-500 font-beVietnam ${
              isShaking
                ? "animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]"
                : ""
            }`}
          >
            {error}
          </p>
        ) : (
          <p className="text-sm mt-1 text-gray-700 font-beVietnam">
            Enter your name to start receiving letters.
          </p>
        )}
      </div>
      <Letter name={name} onNameError={handleNameError} />
      <HowToUse />
      <div className="px-4">
        <ExampleLetters />
        <Testimonials />
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
