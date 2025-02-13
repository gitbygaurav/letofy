import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useShareSheet } from "../context/shareSheetContext";
import ReceiveButtons from "./ReceiveButtons";

export default function PreviewLetter() {
  const { id } = useParams();
  const [letterData, setLetterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [continuousShake, setContinuousShake] = useState(true);
  const { openShareSheet, setShareType, setShareMessage, setShareUrl } = useShareSheet();

  useEffect(() => {
    const interval = setInterval(() => {
      setContinuousShake(true);
      setTimeout(() => setContinuousShake(false), 600);
    }, 2000);

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
        if (data.type !== "send") {
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

  const shareLetter = () => {
    setShareType("send");
    setShareMessage(`${letterData.senderName} sent a ${letterData.letterType} letter to ${letterData.receiverName}.`);
    setShareUrl(`\n${window.location.href}`);
    openShareSheet();
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

      <div className="w-[95vw] font-beVietnam max-w-[420px] mx-auto mt-6">
        <div
          className="p-6 rounded-[2rem] min-h-[300px] flex flex-col"
          style={{ backgroundColor: letterData.bgColor }}
        >
          <div className="flex items-center justify-between">
          <div className="rounded-full py-2 px-4 inline-flex border-2 border-white min-w-[110px] items-center gap-2 self-start mb-4">
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
            <span className="text-white font-medium">{letterData.receiverName}</span>
          </div>
            <img src={letterData.emoji} alt="emoji" className="h-7 w-7" />
          </div>

          <p className="text-white my-4 text-center">
            {letterData.question}
          </p>

          <div className="border-2 border-white min-w-[110px] rounded-full py-2 px-4 inline-flex items-center gap-2 self-start mb-6">
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
            <span className="text-white font-medium">{letterData.senderName}</span>
          </div>

          {/* Answer */}
          <div className="bg-white rounded-xl p-4 mb-6">
            <p className="text-black font-bold text-base text-center">
              {letterData.message}
            </p>
          </div>

          {/* Share Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={shareLetter}
              className={`bg-[#FFE600] text-black w-[80%] font-semibold rounded-lg py-3 px-8
              text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all
              ${continuousShake ? 'animate-[gentleShake_0.8s_ease-in-out]' : ''}`}
            >
              Share Letter
              <img src="/share.svg" alt="share" className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/80 text-sm text-center mt-3">
            Share letters on stories
          </p>
        </div>
      </div>
    </div>
  );
}
