import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import ReceiveButtons from "./ReceiveButtons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const exampleMessages = {
  happy: [
    "You are very honest.you never use filters and always speak the truth!",
    "You have a lot of patience.you handle everything very calmly.",
    "No one can work as hard as you do.you never give up on anything.",
    "You are a very kind person.you make everyone feel so special.",
    "Your confidence is crazy,it always motivates me to believe in myself.",
    "You have great wisdom of life,and you always give the best advice.",
    "You are such a nice soul,the world needs more people like you.",
    "I love your positive thinking,it brings so much hope to everyone.",
    "I see leadership quality in you, people naturally trust and follow you.",
    "You always admit your mistakes,you don't have an ego problem.",
    "I can blindly trust you,your loyalty is rare.",
    "You are such a generous person,you give so much without expecting anything in return.",
    "You take responsibility for everything,and it shows your maturity and strength.",
    "Your adaptability is amazing,you handle changes so smoothly.",
    "I like your respectful nature,you treat everyone with so much dignity.",
    "Your open-mindedness is inspiring for me,you're always ready to understand new ideas.",
  ],
  funny: [
    "Your sarcastic humor always makes me laugh, you're really good at it!",
    "Even your funny mistakes are so entertaining, how do you do that?",
    "You're so careless, but honestly, it's the funniest thing about you.",
    "Your overacting makes me laugh every time.you should be in movies.",
    "Your accidental wordplay is so funny,you don't even notice it.",
    "Your creative insults are so funny,i can't stop laughing.",
    "Your pranks are harmless but so funny,you're such a troublemaker.",
    "That funny laugh of yours is so contagious, it makes everyone laugh too.",
    "I love how you randomly talk in accents, it's just so unexpected and funny.",
    "You're great at breaking awkward silences with something silly, it's a real talent!",
    "Your jokes are so bad they're actually funny, please keep them coming.",
    "How do you come up with jokes so quickly? it's like a superpower!",
    "Your funny facial expressions can make anyone's day better.",
    "Even your accidental humor makes people laugh a lot.",
    "You laugh at everything, and it makes everything so much more fun.",
  ],
  sweet: [
    "You take care people so nicely and it makes everyone valued.",
    "Your smiling habit brings hope even in tough situations.",
    "You always find happiness in small things,you don't need big things to be happy.",
    "Your shy nature is so sweet; it adds to your charm.",
    "Your selflessness nature is so good, you always put others before yourself.",
    "I really like your forgiving nature,you never hold anything in your heart.",
    "You are such a good listener,you always listen to others so well.",
    "You always appreciate people,and it makes them feel good.",
    "Your emotional support has helped me through tough times, thank you for always being there.",
    "Your soft heart is your greatest strength,it makes you truly special.",
    "You speak very politely, and it feel so good to talk to you.",
    "You're amazing at sharing happiness, your joy spreads like sunshine.",
    "You are very playful,you bring so much fun to every moment.",
    "You never forget special days.how do you remember every date?",
    "You are always ready to help others, it means a lot to everyone.",
    "You always encourage me,and it helps me believe in myself.",
    "Anyone can always rely on you,and i completely trust you.",
  ],
  surprise: [
    "You have a really sharp memory,you never forget a single detail,and it always surprise me.",
    "How you use both hands for tasks is so cool.not everyone can do that!",
    "your energy is so high,you bring excitement to everyone around you.",
    "You always ask unique questions,and let me tell you,it's a sign of genius.",
    "You explain things and events so well,your storytelling skills are amazing.",
    "Your quiet strength is inspiring, you handle everything so gracefully.",
    "Your creative thinking is amazing ,your creativity shows in everything you do.",
    "Your mind works so fast in tricky situations,i am always surprised to see it.",
    "Your beautiful smile can make anyone's mood better.it's really nice.",
    "You are really good at finding patterns that others can't see.",
    "Your love for animals shows how gentle and caring you are.",
    "Your strong focus helps you achieve things most people only dream of.",
    "Your hidden talents surprise me every time, you're so full of surprises!",
    "You always understand hidden meanings,it's like you see things that others don't.",
    "How do you guess the future so accurately? It's almost magical!",
    "You always see beauty in simple things, it makes life feel more special.",
    "Staying calm under pressure is your superpower, you make everything feel manageable.",
    "Your unique voice makes everything you say so memorable.",
    "You're always stay  positive, even in tough times, it gives everyone hope.",
  ],
  sad: [
    "Sometimes your anger hurts people,you should try to stay calm when you are angry.",
    "Sometimes you lie ,but you should always tell the truth,no matter what.",
    "You let your ego get in the way in some matters,you should be more humble.",
    "Value what you have,greed is not a good thing.",
    "Jealousy won't change anything, focus on your own goals instead.",
    "Gossiping about others isn't nice, it's better to talk about positive things.",
    "You can't be irresponsible all the time, people count on you.",
    "Your harsh words hurt people,you should speak more sofly.",
    "You make quick decisions without thinking, slowing down will help you avoid mistakes.",
    "Being stubborn isn't always good, try to listen to other ideas too.",
    "You overthink on small things,there is no point.let some things just happen.",
    "You keep thinking about the work,it's better to just do it.",
    "You take unnecessary stress,everything happens for the best.",
    "You want people attention,just be yourself,and people will come to you naturally.",
    "Hypocrisy isn't good; follow what you tell others to do.",
    "You spend money carelessly,and it creates problems for you.saving money will help you in the future.",
    "Being too dominating makes people uncomfortable, let others share their thoughts too.",
    "Thinking negatively all the time isn't helping,try to see the good side.",
    "You judge people too quickly,which isn't fair.you should try to understand them first.",
  ],
  cool: [
    "You are very self confident,and that's why everyone believe you.",
    "You have such a good dressing sense; you always look impressive.",
    "Your quick wit amazes me; you always know the perfect thing to say.",
    "I love your carefree attitude; you handle life without unnecessary stress.",
    "Your physical fitness is amazing,it shows your discipline and dedication to yourself.",
    "You're so goal-driven, you always inspire others to work towards their dreams.",
    "Your impactful voice grabs attention and leaves a lasting impression.",
    "You connect with people so easily, it feels like you've known them forever.",
    "Your unique style makes you stand out, you're truly one of a kind.",
    "I admire your risk-taking ability, you're not afraid to chase big opportunities.",
    "You have a charismatic personality,you automatically stand out in a crowd.",
    "You mix humor with style so well, it makes you unforgettable.",
    "You are very confident in public speaking,everyone listens to you so carefully.",
    "You are very fearless,you face every challenge without hesitation.",
    "I just love your adventurous nature,you don't like a boring life.",
    "You don't miss anything,you catch every detail.your observation skills are amazing.",
    "You're such a quick learner, you learn things faster than anyone I know.",
    "You have such a commanding aura,people naturally respect you.",
    "You have really innovative thinking.it's always  brings new and creative ideas.",
    "Your expressive eyes say so much without you even speaking.",
  ],
  emotional: [
    "you really understand other people's feelings and you relate to their emotions.",
    "I really like how you're always so thankful,you never take anything for granted.",
    "You are very sensitive,it makes you really kind and caring towards others.",
    "You should be proud of yourself,you have worked so hard for everything.",
    "You always dream big,and i love it.it shows you believe anything is possible!",
    "You cry very easily,and it's totally okay.it just shows you have a big heart!",
    "You fear sometimes,but you should face it,you will be stronger!",
    "You feel guilty sometimes,but it's okay,you care about doing right things.",
    "You feel every emotion deeply,and that's why you cry in happy movements.it's beautiful.",
    "Don't feel alone,remember i am with you in every situation.",
    "You give so much love and get attached to people so quickly.",
    "You regret things,but don't.they teach you lessons,learn from them and move on.",
    "You have a strong desire for some important things,and you will definitely achieve them.just don't give up.",
    "Sometimes you feel insecure,and that's normal.just believe in yourself and overcome it!",
    "You understand people's problems as if they were your own.",
    "You never lose hope in any situation,and it always gives me positive vibes.",
    "You depend on others for emotional support,which is natural,but you should also find your own emotional strength.",
    "Your mood swings show how deeply you feel; just take time for yourself.",
    "You always empower others to follow their dreams,and that's your great quality.",
  ],
  angry: [
    "You interrupt people a lot; it's frustrating when they can't finish talking.",
    "You don't respect personal space; it makes others uncomfortable.",
    "You keep flaunting about yourself; it gets annoying after a point.",
    "You're always late; it wastes everyone's time and patience.",
    "You give fake compliments; people can tell when it's not genuine.",
    "You ask too many personal questions; it feels disturbing sometimes.",
    "You take credit for others' efforts; that's really unfair to them.",
    "You never say sorry; it annoys people when you avoid apologizing.",
    "You blame others often; it's frustrating when you don't own up to mistakes.",
    "You try to control everything; it makes others feel pressured and annoyed.",
    "You play the victim card too often; people get tired of it.",
    "You don't listen properly; it annoys people when they feel unheard.",
    "You complain about everything; the negativity puts others off.",
    "You break promises often; people lose trust when you don't keep your word.",
    "You make everything competitive; it feels unnecessary and tiring.",
    "You force your opinions on others; it annoys people who think differently.",
    "You avoid taking responsibility; blaming others is just unfair.",
    "You overreact a lot; small things don't always need such big reactions.",
  ],
};

export default function WriteLetter() {
  const { id } = useParams();
  const [letterData, setLetterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [letterContent, setLetterContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [continuousShake, setContinuousShake] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setContinuousShake(true);
      setTimeout(() => setContinuousShake(false), 600);
    }, 1500);

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
        if (data.type !== "receive") {
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

  const handleSend = () => {
    if (!letterContent.trim()) {
      setContentError("Please write a message before sending");
      textareaRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/send/${id}`, {
      state: {
        letterContent,
        letterData,
      },
    });
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    setLetterContent(message);
    setContentError("");
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

      <div className="w-[95vw] max-w-[420px] mx-auto mt-6">
        <div
          className="p-4 px-5 border-[2.5px] border-white rounded-[24px]"
          style={{ backgroundColor: letterData.bgColor }}
          ref={textareaRef}
        >
          <div className="w-full flex items-center justify-between">
            <div className="rounded-[3rem] w-36 border-[2.5px] border-white py-1 flex items-center justify-center gap-3">
              <div className="flex items-center justify-center gap-2 rounded-full">
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
                <span className="text-white font-bold font-beVietnam text-lg">
                  {letterData.receiverName}
                </span>
              </div>
            </div>
            <img
              src={letterData.emoji}
              alt="emoji"
              className="h-8 w-8 ml-auto"
            />
          </div>
          <p className="text-white text-base text-center font-extrabold my-2">
            {letterData.letterDesc
              .replace(/\b(am I)\b/gi, `is ${letterData.receiverName}`)
              .replace(/\b(my|mine)\b/gi, `${letterData.receiverName}'s`)
              .replace(/\bwe\b/gi, `you and ${letterData.receiverName}`)}
          </p>
          <div className="flex justify-between">
            <div className="flex items-center justify-start gap-2 rounded-full w-36 border-[2.5px] border-white py-1 px-2">
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
              <span className="text-white font-bold font-beVietnam text-lg">
                You
              </span>
            </div>
          </div>
          <div
            className={`bg-white rounded-xl p-6 relative mt-4 ${
              continuousShake ? "animate-[gentleShake_0.8s_ease-in-out]" : ""
            }`}
          >
            <textarea
              value={letterContent}
              onChange={(e) => {
                setLetterContent(e.target.value);
                setContentError("");
              }}
              className="w-full text-center font-semibold font-beVietnam min-h-[120px] text-gray-600 text-lg
              resize-none border-none focus:ring-0 focus:outline-none bg-transparent"
            />
            {!letterContent && (
              <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                <p className="text-center font-semibold font-beVietnam text-[15px] text-gray-400">
                  Type your answer or select from the texts given below
                </p>
              </div>
            )}
          </div>
          {contentError && (
            <p className="text-white text-sm mt-2 font-beVietnam">
              {contentError}
            </p>
          )}
        </div>

        <div className="flex justify-end mr-2">
          <button
            className="w-[160px] bg-black text-white rounded-full py-3 px-8
            text-lg font-medium mt-6 block"
            onClick={handleSend}
          >
            SEND
          </button>
        </div>

        {/* Example Messages Carousel */}
        <div className="mt-8">
          <div className="relative">
            {/* Split messages into two parts */}
            {(() => {
              const messages = exampleMessages[letterData.letterType] || [];
              const midPoint = Math.ceil(messages.length / 2);
              const firstHalf = messages.slice(0, midPoint);
              const secondHalf = messages.slice(midPoint);

              return (
                <>
                  {/* Top Row Carousel */}
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={12}
                    slidesPerView={1.2}
                    className="w-full !pl-0"
                  >
                    {firstHalf.map((message, index) => (
                      <SwiperSlide key={`top-${index}`}>
                        <div
                          className={`bg-[#FF1493] font-beVietnam text-white px-4 py-3 rounded-[20px] text-center text-sm font-medium cursor-pointer transition-all duration-200 min-h-[80px] flex items-center justify-center ${
                            selectedMessage === message
                              ? "border-[3px] border-white shadow-lg scale-[1.02]"
                              : ""
                          }`}
                          style={{ backgroundColor: letterData.bgColor }}
                          onClick={() => handleMessageSelect(message)}
                        >
                          <p className="line-clamp-3">{message}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Bottom Row Carousel */}
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={12}
                    slidesPerView={1.2}
                    className="w-full mt-3 !pl-0"
                  >
                    {secondHalf.map((message, index) => (
                      <SwiperSlide key={`bottom-${index}`}>
                        <div
                          className={`bg-[#FF1493] font-beVietnam text-white px-4 py-3 rounded-[20px] text-center text-sm font-medium cursor-pointer transition-all duration-200 min-h-[80px] flex items-center justify-center ${
                            selectedMessage === message
                              ? "border-[3px] border-white shadow-lg scale-[1.02]"
                              : ""
                          }`}
                          style={{ backgroundColor: letterData.bgColor }}
                          onClick={() => handleMessageSelect(message)}
                        >
                          <p className="line-clamp-3">{message}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
