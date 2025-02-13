import { User } from 'lucide-react';
import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShareSheet } from "../context/shareSheetContext";

const SendLetter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const { openShareSheet, shareType, setShareType, setShareMessage, setShareUrl } = useShareSheet();

  // If someone tries to access this page directly without state, redirect to home
  if (!location.state?.letterContent || !location.state?.letterData) {
    navigate('/');
    return null;
  }

  const { letterContent, letterData } = location.state;
  console.log(letterData);

  const generateUniqueId = () => {
    return `${crypto.randomUUID().split("-").join("")}sd`;
  };

  const handleSendLetter = async () => {
    if (!name.trim()) {
      setError("Please enter your name to send the letter");
      inputRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    try {
      if (shareType !== "Send") {
        setShareType("Send");
      }
      const uniqueId = generateUniqueId();
      setShareMessage(`${name} sent a ${letterData.normalEmoji}${letterData.letterType} letter to ${letterData.receiverName}.`);
      setShareUrl(`\n${window.location.origin}/${uniqueId}`);

      // Pass letter data through context instead of creating document
      const shareLetterData = {
        id: uniqueId,
        type: "send",
        letterType: letterData.letterType,
        question: letterData.letterDesc,
        message: letterContent,
        senderName: name,
        receiverName: letterData.receiverName,
        bgColor: letterData.bgColor,
        emoji: letterData.emoji,
        createdAt: new Date().toISOString(),
      };

      openShareSheet(shareLetterData);
    } catch (error) {
      console.error("Error preparing letter:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-2 w-full max-w-md mx-auto" ref={inputRef}>
      <div className="relative flex justify-center items-center w-[90vw] max-w-[360px] h-[54px]">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
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
          className="w-full h-[60px] px-12 py-4 rounded-[22px] border-2 border-black text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 font-readex"
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 font-beVietnam">{error}</p>
      )}
      <div className="w-full flex justify-end mr-16">
        <button
          onClick={handleSendLetter}
          className="w-[160px] bg-black text-white rounded-full py-3 px-8
          text-lg font-medium mt-6 block"
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default SendLetter;