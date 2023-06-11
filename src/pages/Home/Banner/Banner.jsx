import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.css";
import img1 from "../../../assets/banner/image1.webp";
import img2 from "../../../assets/banner/image2.webp";
import img3 from "../../../assets/banner/image3.webp";
import img4 from "../../../assets/banner/image4.webp";
import img5 from "../../../assets/banner/image5.webp";
import img6 from "../../../assets/banner/image6.webp";

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt="" />
          <div className="text-[#eee2de] absolute bg-black opacity-25 w-full h-full flex flex-col items-center justify-center">
            <h1 className=" text-3xl md:text-5xl ">
              PHOTOGRAPHY & VIDEO CLASSES
            </h1>
            <p className="text-sm md:text-lg">
              Become the photographer you've always wanted. Today's greats will
              show you how.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
          <div className=" text-[#eee2de] absolute bg-black opacity-25 w-full h-full flex flex-col items-center justify-center">
            <h1 className=" text-3xl md:text-5xl ">
              PHOTOGRAPHY & VIDEO CLASSES
            </h1>
            <p className="text-sm md:text-lg">
              Become the photographer you've always wanted. Today's greats will
              show you how.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
          <div className=" text-[#eee2de] absolute bg-black opacity-25 w-full h-full flex flex-col items-center justify-center">
            <h1 className=" text-3xl md:text-5xl ">
              PHOTOGRAPHY & VIDEO CLASSES
            </h1>
            <p className="text-sm md:text-lg">
              Become the photographer you've always wanted. Today's greats will
              show you how.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
          <div className=" text-[#eee2de] absolute bg-black opacity-25 w-full h-full flex flex-col items-center justify-center">
            <h1 className=" text-3xl md:text-5xl ">
              PHOTOGRAPHY & VIDEO CLASSES
            </h1>
            <p className="text-sm md:text-lg">
              Become the photographer you've always wanted. Today's greats will
              show you how.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
          <div className=" text-[#eee2de] absolute bg-black opacity-25 w-full h-full flex flex-col items-center justify-center">
            <h1 className=" text-3xl md:text-5xl ">
              PHOTOGRAPHY & VIDEO CLASSES
            </h1>
            <p className="text-sm md:text-lg">
              Become the photographer you've always wanted. Today's greats will
              show you how.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="" />
          <div className=" text-[#eee2de] absolute bg-black opacity-25 w-full h-full flex flex-col items-center justify-center">
            <h1 className=" text-3xl md:text-5xl ">
              PHOTOGRAPHY & VIDEO CLASSES
            </h1>
            <p className="text-sm md:text-lg">
              Become the photographer you've always wanted. Today's greats will
              show you how.
            </p>
          </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
