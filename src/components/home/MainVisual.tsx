import img01 from "../../assets/images/home/mainVisual01.png";
import img02 from "../../assets/images/home/mainVisual02.png";
import img03 from "../../assets/images/home/mainVisual03.png";
import img04 from "../../assets/images/home/mainVisual04.png";
import img05 from "../../assets/images/home/mainVisual05.png";
import img06 from "../../assets/images/home/mainVisual06.png";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Controller, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const SLIDES = [
    { id: 1, image: img01, title: "WINTER RUNNING", sub: "겨울 러닝을 위한 퍼포먼스 웨어" },
    { id: 2, image: img02, title: "WINTER OUTER", sub: "따뜻한 일상을 위한 겨울 아이템" },
    {
        id: 3,
        image: img03,
        title: "INFINITE RUSH",
        sub: "강력한 추진력과 에너지 리턴의 레이싱 파트너",
    },
    { id: 4, image: img04, title: "사패2", sub: "한국타이어 기술력을 담은 트레일 러닝화" },
    { id: 5, image: img05, title: "HYPER RUSH 2", sub: "지칠 때 더 가볍게, 탄력적인 카본 러닝화" },
    { id: 6, image: img06, title: "MARATHON 220", sub: "클래식이 만든 새로운 속도" },
];

function MainVisual() {
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);

    return (
        <section className={twMerge(["w-full", "flex", "flex-col", "group"])}>
            {/* Image Slider */}
            <div
                className={twMerge([
                    "w-full",
                    "h-[500px]",
                    "md:h-[700px]",
                    "relative",
                    "bg-gray-200",
                ])}>
                <style>
                    {`
                        .swiper-pagination-bullet {
                            width: 12px !important;
                            height: 12px !important;
                            background: rgba(255,255,255,0.5) !important;
                            opacity: 1 !important;
                            margin: 0 4px !important;
                        }
                        .swiper-pagination-bullet-active {
                            width: 30px !important; /* Elongated active dot for modern feel */
                            border-radius: 6px !important;
                            background: #d62828 !important;
                        }
                    `}
                </style>
                <Swiper
                    modules={[Autoplay, EffectFade, Controller, Pagination, Navigation]}
                    effect="fade"
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    onSwiper={(swiper: any) => setFirstSwiper(swiper)}
                    controller={{ control: secondSwiper }}
                    allowTouchMove={false}
                    className="h-full w-full">

                    {SLIDES.map(slide => (
                        <SwiperSlide key={slide.id} className="relative h-full w-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out transform scale-100 group-hover:scale-105"
                                style={{ backgroundImage: `url(${slide.image})` }}>
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Text Slider */}
            <div
                className={twMerge(["w-full", "py-10", "border-b", "border-gray-100", "bg-white"])}>
                <div className="container mx-auto px-4">
                    <Swiper
                        modules={[Controller]}
                        onSwiper={(swiper: any) => setSecondSwiper(swiper)}
                        controller={{ control: firstSwiper }}
                        loop={true}
                        className="w-full">
                        {SLIDES.map(slide => (
                            <SwiperSlide key={slide.id}>
                                <div className="flex flex-col items-center justify-center text-center cursor-pointer">
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">
                                        {slide.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg md:text-xl font-medium">
                                        {slide.sub}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default MainVisual;
