import TopHeader from "../components/layout/TopHeader.tsx";
import Header from "../components/layout/Header.tsx";
import {Outlet} from "react-router";
import Footer from "../components/layout/Footer.tsx";
import useLayoutStore from "../store/useLayoutStore.ts";
import {twMerge} from "tailwind-merge";

function Layout() {
    // 
    const {isTopBannerVisible, topBannerHeight, showTopBanner} = useLayoutStore();


// 렌더링 파트============================================================================================================ 
    return (
       <div className={twMerge(["min-h-screen", "flex", "flex-col", ""])}>
          {/*topheader는 처음에는 fixed로 화면에 출력되기*/}
          {/*스크롤을 내리게 되면, 스크롤 Y의 값이 0보다 크면 화면에서 사라지게 하길바람*/}
          <div className={twMerge(["fixed", "top-0", "left-0", "z-60"])}>
             <TopHeader />
          </div>
          <button onClock={showTopBanner}>쇼</button>
          {/*/!*1. topheader가 나오고 있는 상황
          sticky로 해주되, top-9으로 해주기       */}

          {/*2.topheader가 나오고 있지 않은 상황*!/
          단순하게 sticky, top-0

          백그라운드 색상은 스크롤 y를 감지해서  맨위에 있을 땐 투명
          내리면 하얀배경

          */}
          <Header />
          <main>
             <Outlet />
          </main>
          <Footer />
       </div>
    );
}

export default Layout;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 