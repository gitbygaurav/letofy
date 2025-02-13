import Tick from "../assets/tick.svg"
import letter from "../assets/letterSended.svg"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const LetterSended = () => {
  const [continuousShake, setContinuousShake] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setContinuousShake(true);
      setTimeout(() => setContinuousShake(false), 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex font-readex flex-col justify-center items-center pt-10 gap-4">
        <img src={letter} alt="Letter Sended" className="h-[12rem]"/>
        <h1 className="text-2xl font-bold">Letter Sended</h1>
        <img src={Tick} alt="Tick" />
        <Link to="/">
          <button className={`bg-[#B1013F] text-white font-semibold rounded-full py-4 px-8 w-[90vw] max-w-[500px] mt-4
            shadow-[0_4px_9px_-4px_#B1013F] hover:shadow-[0_8px_9px_-4px_rgba(177,1,63,0.3),0_4px_18px_0_rgba(177,1,63,0.2)]
            transition-all duration-300 ${continuousShake ? 'animate-[gentleShake_0.8s_ease-in-out]' : ''}`}>
            Receive Your Letter Now
          </button>
        </Link>
      </div>
    </>
  )
}

export default LetterSended