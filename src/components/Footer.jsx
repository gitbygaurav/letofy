import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full mt-12 px-4 font-beVietnam">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-start pl-1 gap-4 mb-4">
          <Link
            to="/privacy-policy"
            className="text-blue-800 font-bold hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="hidden sm:inline text-black">•</span>
          <Link
            to="/terms"
            className="text-blue-800 font-bold hover:text-gray-900 transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
        <p className="text-center mt-10 font-bold font-readex text-base text-black">
          © 2024 Letofy. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
