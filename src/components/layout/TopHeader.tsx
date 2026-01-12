import { twMerge } from "tailwind-merge";
import useLayoutStore from "../../store/useLayoutStore";
import { IoClose } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper } from "swiper";

const NOTICE = [
   "[공지] 네이버페이 일시 이용 중단",
   "APP 다운로드 시 3,000포인트 증정",
   "카카오톡 채널 친구 추가 시 5,000원 쿠폰 증",
];

function TopHeader() {
   const { isTopBannerVisible, hideTopBanner, topBannerHeight } = useLayoutStore();
   if (!isTopBannerVisible) return null;

   // 렌더링 파트============================================================================================================
   return (
      <div
         className={twMerge(
            ["relative", "bg-black", "text-white", "flex"],
            ["justify-center", "items-center", "h-9", ""],
         )}>
         {/*  슬라이드 파트 */}
         <Swiper
            direction={"vertical"}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className={twMerge(
               ["w-full", "h-full", "max-w-lg", ""],
               ["justify-center", "w-full", , "flex"],
            )}>
            {NOTICE.map((notice, index) => (
               <SwiperSlide>
                  <div
                     className={twMerge([
                        "items-center",
                        "text-xs hover:underline",
                        "cursor-pointer",
                     ])}>
                     {notice}
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>

         {/*   x버튼 파트 */}
         <button
            className={twMerge(["absolute", "right-4", "text-white", "cursor-pointer"])}
            onClick={hideTopBanner}>
            <IoClose />
         </button>
      </div>
   );
}

export default TopHeader;
