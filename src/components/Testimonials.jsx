import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Shreya Sharma",
    text: "Letofy has made it really easy to send and receive letters. I don't need to sign up or log in, which is perfect for me. I'd definitely recommend it!",
  },
  {
    name: "Rohit Jadhav",
    text: "Letofy's website is very simple and easy to use. I could send letters to my friends and family without creating an account, and the whole process was super smooth. Great initiative!",
  },
  {
    name: "Sana Sheikh",
    text: "Such a nice and unique website. Everyone can access it without any complications. Letters get delivered instantly, and I find it very convenient.",
  },
  {
    name: "Gashmir Jedhe",
    text: "I love the concept of Letofy! Through this website, I was able to send short and sweet letters to my family members without any hassle. The simplicity of this site is definitely a big plus.",
  },
  {
    name: "Mira Deshpande",
    text: "I really like Letofy. It's simple and keeps things private without any unnecessary features. It's a perfect platform for sending small, heartfelt letters.",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full py-4">
      <h2 className="text-lg font-bold text-center mb-8 font-readex">
        What are users saying about Letofy?
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={1.08}
        centeredSlides={false}
        loop={true}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-black",
          bulletClass: "swiper-pagination-bullet !w-3 !h-3 !bg-white !opacity-100",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.05,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3.05,
            spaceBetween: 20,
          },
        }}
        className="w-full pl-3 [&_.swiper-pagination-bullet]:!w-3 [&_.swiper-pagination-bullet]:!h-3"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="pb-12">
            <div className="bg-white rounded-[32px] p-6 h-[220px] border-2 border-black flex flex-col mr-1">
              <p className="text-black font-bold text-lg font-readex mb-3">
                {testimonial.name}
              </p>
              <p className="text-[#4A4A4A] font-beVietnam text-sm leading-relaxed overflow-y-auto text-center flex-1 flex items-center justify-center">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
