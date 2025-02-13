import { useState, useRef, useEffect } from "react";
import { useShareSheet } from "../context/shareSheetContext";
import { WhatsappShareButton } from "react-share";
import { Check } from "lucide-react"; // Import Check icon from lucide-react
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function ShareSheet() {
  const navigate = useNavigate();
  const {
    isShareSheetOpen,
    closeShareSheet,
    shareType,
    shareMessage,
    shareUrl,
    letterData
  } = useShareSheet();
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef(null);
  const sheetHeight = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  useEffect(() => {
    if (sheetRef.current) {
      sheetHeight.current = sheetRef.current.offsetHeight;
      setIsInitialized(true);
    }
  }, [isShareSheetOpen]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset after 2 seconds
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleDragStart = (clientY) => {
    setIsDragging(true);
    setStartY(clientY);
    setCurrentY(clientY);
  };

  const handleDrag = (clientY) => {
    if (!isDragging) return;
    setCurrentY(clientY);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const dragDistance = currentY - startY;
    const dragThreshold = sheetHeight.current * 0.4; // 40% of sheet height

    if (dragDistance > dragThreshold) {
      closeShareSheet();
    } else {
      setCurrentY(startY);
    }
  };

  const getSheetStyle = () => {
    if (!isInitialized) {
      return {
        transform: "translateY(100%)",
        transition: "none",
      };
    }

    if (!isDragging) {
      return {
        transition: "transform 0.3s ease-out",
        transform: isShareSheetOpen ? "translateY(0)" : "translateY(100%)",
      };
    }

    const dragDistance = Math.max(0, currentY - startY);
    return {
      transform: `translateY(${dragDistance}px)`,
      transition: "none",
    };
  };

  const createFirebaseDocument = async () => {
    if (!letterData || hasShared) return;

    try {
      await setDoc(doc(db, "letters", letterData.id), letterData);
      setHasShared(true);
    } catch (error) {
      console.error("Error creating letter:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleNativeShare = async (platform) => {
    try {
      await createFirebaseDocument();

      if (navigator.share) {
        await navigator.share({
          title: shareMessage,
          message: shareMessage,
          text: shareMessage,
          url: shareUrl,
        });
        closeShareSheet();
       if(shareType === "Receive"){
        navigate("/receive-letter")
       }else{
        navigate("/letter-sended")
       }
      } else {
        await navigator.clipboard.writeText(`${shareMessage}\n${shareUrl}`);
        alert(`Link copied! You can now paste it in ${platform}`);
        closeShareSheet();
        if(shareType === "Receive"){
          navigate("/receive-letter")
         }else{
          navigate("/letter-sended")
         }
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleWhatsAppShare = async () => {
    await createFirebaseDocument();
    setTimeout(() => {
      closeShareSheet();
      if(shareType === "Receive"){
        navigate("/receive-letter")
       }else{
        navigate("/letter-sended")
       }
    }, 1000);
  };

  const handleCopyLink = async () => {
    try {
      await createFirebaseDocument();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  // Reset hasShared when share sheet is opened
  useEffect(() => {
    if (isShareSheetOpen) {
      setHasShared(false);
    }
  }, [isShareSheetOpen]);

  return (
    <div className="relative">
      {/* Overlay */}
      {isShareSheetOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-50"
          onClick={closeShareSheet}
        />
      )}

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="fixed left-0 right-0 bottom-0 z-50 font-beVietnam"
        style={getSheetStyle()}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleDrag(e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        onMouseDown={(e) => handleDragStart(e.clientY)}
        onMouseMove={(e) => handleDrag(e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="bg-white rounded-t-3xl max-w-md mx-auto w-full pb-4 xs:pb-6">
          {/* Handle */}
          <div className="h-8 xs:h-12 flex items-center justify-center cursor-grab active:cursor-grabbing">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="px-4 xs:px-6 space-y-3 xs:space-y-4">
            <h2 className="text-xl xs:text-2xl font-bold mb-4 xs:mb-6">
              {shareType === "Receive"
                ? "Receive Letter from"
                : "Send Letter to"}
            </h2>

            {/* WhatsApp Button */}
            <WhatsappShareButton
              url={shareUrl}
              title={shareMessage}
              className="w-full"
              onClick={handleWhatsAppShare}
            >
              <div className="w-full bg-[#05A20B] text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-2 xs:gap-3">
                <div className="relative w-6 xs:w-8 h-6 xs:h-8">
                  <img
                    src="/socialIcons/whatsapp.svg"
                    alt="WhatsApp"
                    className="object-contain"
                  />
                </div>
                <span className="text-base xs:text-base font-medium">
                  {shareType === "Receive"
                    ? "Receive From Whatsapp"
                    : "Send To Whatsapp"}
                </span>
              </div>
            </WhatsappShareButton>

            {/* Instagram Button */}
            <button
              onClick={() => handleNativeShare("Instagram")}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-2 xs:gap-3"
            >
              <div className="relative w-6 xs:w-8 h-6 xs:h-8">
                <img
                  src="/socialIcons/instagram.svg"
                  alt="Instagram"
                  className="object-contain"
                />
              </div>
              <span className="text-base xs:text-base font-medium">
                {shareType === "Receive"
                  ? "Receive From Instagram"
                  : "Send To Instagram"}
              </span>
            </button>

            {/* Snapchat Button */}
            <button
              onClick={() => handleNativeShare("Snapchat")}
              className="w-full bg-gray-500 text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-2 xs:gap-3"
            >
              <div className="relative w-6 xs:w-8 h-6 xs:h-8">
                <img
                  src="/socialIcons/snapchat.svg"
                  alt="Snapchat"
                  className="object-contain"
                />
              </div>
              <span className="text-base xs:text-base font-medium">
                {shareType === "Receive"
                  ? "Receive From Snapchat"
                  : "Send To Snapchat"}
              </span>
            </button>

            {/* Copy Link Button */}
            <button
              className="w-full bg-[#F41AFF] text-white rounded-full py-3 xs:py-4 px-4 xs:px-6 flex items-center gap-[4px]"
              onClick={handleCopyLink}
            >
              <div className="relative w-6 xs:w-8 h-6 xs:h-8">
                {copied ? (
                  <Check className="w-6 h-6 xs:w-8 xs:h-8" />
                ) : (
                  <img
                    src="/socialIcons/link.svg"
                    alt="Copy Link"
                    className="object-contain"
                  />
                )}
              </div>
              <span className="text-[13px] xs:text-[14px] font-medium">
                {copied ? "Copied!" : "Copy link for insta & snap story"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
