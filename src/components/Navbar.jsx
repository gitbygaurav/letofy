import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isInstalled) {
      alert("Letofy is already installed on your device!");
      return;
    }

    if (!deferredPrompt) {
      alert("Installation is not available at the moment. Try opening this website in a supported browser.");
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // We no longer need the prompt. Clear it up
    setDeferredPrompt(null);

    // Update installed state if user accepted
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
  };

  return (
    <nav className="w-full px-4 py-3 flex flex-col xs:flex-row items-center gap-3 xs:gap-0 xs:justify-between bg-[#F0F507]">
      <Link to="/" className="flex items-center">
        <div className="relative h-[50px] w-[50px] rounded-full flex items-center justify-center">
          <img
            src="/letofy.svg"
            alt="Letofy Logo"
            width={52}
            height={52}
          />
        </div>
        <span className="text-2xl mt-[6px] font-normal text-black font-aclonica">Letofy</span>
      </Link>
      <button
        onClick={handleInstallClick}
        className="bg-black w-[11.3rem] h-11 border border-white text-white hover:bg-black/90 rounded-full px-4 py-2 text-sm font-medium transition-colors"
      >
        Add to home screen
      </button>
    </nav>
  );
}