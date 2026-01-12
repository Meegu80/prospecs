// 
import {create} from "zustand/react";

interface LayoutState {
    isTopBannerVisible:boolean;
    hideTopBanner:()=> void;
    showTopBanner:VoidFunction;
    topBannerHeight:number;
}

//
const useLayoutStore = create<LayoutState>(set => ({
    isTopBannerVisible: true,
    topBannerHeight: 36,
    hideTopBanner: () => set({ isTopBannerVisible: false }),
    showTopBanner : () => set({ isTopBannerVisible: false })
}))

export default useLayoutStore;