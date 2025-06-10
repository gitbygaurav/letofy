import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import happy from "../assets/emojis/happy.svg";

export default function PreviewLetter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [letterData, setLetterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [continuousShake, setContinuousShake] = useState(true);
  const [userCount, setUserCount] = useState("0");

  useEffect(() => {
    // Generate random number between 10000 and 99999 (5 digits only)
    const randomUserCount = Math.floor(
      Math.random() * (99999 - 10000 + 1) + 10000
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

  useEffect(() => {
    const fetchLetterData = () => {
      try {
        const saved = localStorage.getItem(`letter_${id}`);
        if (saved) {
          const data = JSON.parse(saved);
          setLetterData(data);
        } else {
          setError("Letter not found");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        console.error("Error fetching letter:", err);
        setError("Failed to load letter");
      } finally {
        setLoading(false);
      }
    };

    fetchLetterData();
  }, [id, navigate]);

  const shareLetter = () => {
    const message = encodeURIComponent(
      `Hi 👋 Check out this Happy Letter!\n${window.location.href}`
    );
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="h-[30rem] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!letterData) return null;

  return (
    <div className="min-h-screen">
      <div className="w-[95vw] font-beVietnam max-w-[420px] mx-auto mt-6">
        <p className="text-lg font font-semibold text-center">
          <span className="text-[#6C00F1]">{userCount}</span> users <br />
          are currently using the website
        </p>
        <button onClick={() => navigate('/')} className={`w-full p-4 bg-gradient-to-b from-[#BE00A5] to-[#58004C] text-white rounded-full mt-2 ${continuousShake ? "animate-[gentleShake_0.8s_ease-in-out]" : ""}`}>Now dedicate your letter</button>
        <div className="bg-[#039E09] p-6 rounded-[2rem] min-h-[300px] flex flex-col mt-6">
          <div className="relative flex justify-center items-center max-w-[360px] h-[54px] mt-4">
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400">
              <User className="text-white" fill="currentColor" size={20} />
            </div>
            <input
              type="text"
              value={letterData.senderName}
              className="bg-inherit w-full h-[60px] pl-[70px] py-4 rounded-full border-2 border-white text-white text-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
              disabled
            />
          </div>

          <div className="flex gap-2 items-center justify-center text-white text-sm font-medium leading-snug font-beVietnam my-6">
            <p>Dedicated</p>
            <img src={happy} alt="happy" className="h-10" />
            <p>a Happy Letter to</p>
          </div>

          <div className="relative flex justify-center items-center max-w-[360px] h-[54px]">
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400">
              <User className="text-white" fill="currentColor" size={20} />
            </div>
            <input
              type="text"
              value={letterData.receiverName}
              className="bg-inherit w-full h-[60px] pl-[70px] py-4 rounded-full border-2 border-white text-white text-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
              disabled
            />
          </div>

          <div className="bg-white rounded-xl px-5 py-6 mb-6 mt-6">
            <p className="text-black font-bold text-base text-center">
              {letterData.message}
            </p>
          </div>
          <img onClick={shareLetter} className="h-7 w-7 self-center mt-4 cursor-pointer" src="share.png" alt="share-logo" />
          {/* <div className="flex items-center justify-center">
            <button
              onClick={shareLetter}
              className={`bg-black text-white w-[80%] font-semibold rounded-full py-3 px-8
              text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all
              ${
                continuousShake ? "animate-[gentleShake_0.8s_ease-in-out]" : ""
              }`}
            >
              <img src={"whatsapp.svg"} alt="whatsapp" className="h-8" />
              Share on WhatsApp
              <img src={happy} alt="happy" className="h-8" />
            </button>
          </div> */}
          {/* <p className="text-white/80 text-sm text-center mt-3">
            Share letters with friends
          </p> */}
        </div>
      </div>
    </div>
  );
}
