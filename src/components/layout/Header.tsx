import Logo from "../../assets/images/logo_bk.svg";
import { Link, useLocation, useNavigate } from "react-router";
import useLayoutStore from "../../stores/useLayoutStore.ts";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoMenu, IoSearch } from "react-icons/io5";
import useAuthStore from "../../stores/useAuthStore.ts";

const MENU = [
    {
        name: "RUNNING",
        path: "",
        subMenu: [
            { name: "신발", path: "/category/6" },
            { name: "의류", path: "/running/clothes" },
            { name: "악세사리", path: "/running/accessories" },
        ],
    },
    {
        name: "SPORTS STYLE",
        path: "/sports-style",
        subMenu: [
            { name: "신발", path: "/sports-style/shoes" },
            { name: "의류", path: "/sports-style/clothes" },
            { name: "악세사리", path: "/sports-style/accessories" },
        ],
    },
    {
        name: "HERITAGE",
        path: "/heritage",
        subMenu: [
            { name: "마라톤 110 파리", path: "/heritage/110-paris" },
            { name: "마라톤 110", path: "/heritage/110" },
            { name: "마라톤 220", path: "/heritage/220" },
            { name: "그랜드 슬램 82", path: "/heritage/grand-slam-82" },
        ],
    },
    {
        name: "SPORTS",
        path: "/sports",
        subMenu: [
            { name: "야구", path: "/sports/baseball" },
            { name: "축구", path: "/sports/football" },
            { name: "농구", path: "/sports/basketball" },
            { name: "기타", path: "/sports/other" },
        ],
    },
    { name: "ONE SPEC", path: "/one-spec", subMenu: [] },
    {
        name: "OUR STORY",
        path: "/our-story",
        subMenu: [
            { name: "공식 후원", path: "/our-story/sponsorship" },
            { name: "브랜드 선언", path: "/our-story/manifesto" },
            { name: "시즌 컬렉션", path: "/our-story/collection" },
            { name: "브랜드 가이드", path: "/our-story/guide" },
            { name: "이벤트", path: "/our-story/event" },
        ],
    },
];

function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { isTopBannerVisible } = useLayoutStore();
    const { isLoggedIn, user, logout } = useAuthStore();

    const handleLogout = () => {
        const confirm = window.confirm("로그아웃 하시겠습니까?");
        if (confirm) {
            logout();
            alert("로그아웃 되었습니다.");
            navigate("/");
        }
    };

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const isMenuOpen = hoveredMenu !== null;
    const isHome = pathname === "/";
    const isTransparent = isHome && !isScrolled;

    return (
        <header
            onMouseLeave={() => setHoveredMenu(null)}
            className={twMerge(
                ["fixed", "left-0", "right-0", "z-60"],
                ["transition-all", "duration-300", "border-b"],
                isTransparent
                    ? ["bg-transparent", "border-transparent", "text-white"]
                    : ["bg-white", "border-gray-100"],
                isMenuOpen && ["bg-white", "border-gray-100", "text-gray-600"],
                isTopBannerVisible ? ["top-9"] : ["top-0"],
            )}>
            {/* 
                [수정] 상단 헤더 컨테이너 
                - w-full에서 container mx-auto로 변경하여 하단 메가메뉴와 중앙 정렬 기준을 맞춤
            */}
            <div
                className={twMerge(
                    ["container", "mx-auto", "px-4", "h-20"],
                    ["flex", "justify-between", "items-center"],
                )}>
                {/* 왼쪽 영역 */}
                <div className={twMerge(["flex", "items-center", "gap-5"])}>
                    <button className={twMerge(["lg:hidden", "text-2xl"])}>
                        <IoMenu />
                    </button>
                    <Link to={"/"} className={"w-40"}>
                        <img src={Logo} alt={"Logo"} />
                    </Link>

                    <nav
                        className={twMerge(
                            ["hidden", "lg:flex", "flex-1"],
                            ["justify-center", "gap-10"],
                            ["font-bold"],
                        )}>
                        {MENU.map(menu => (
                            <div
                                onMouseEnter={() => setHoveredMenu(menu.name)}
                                key={menu.name}
                                className={twMerge(
                                    ["relative", "w-30"],
                                    ["h-full", "flex", "items-center"],
                                )}>
                                <Link
                                    to={menu.path}
                                    className={twMerge(
                                        ["relative"],
                                        ["py-7", "hover:text-red-600", "transition-colors"],
                                    )}>
                                    {menu.name}
                                    <span
                                        className={twMerge(
                                            ["absolute", "bottom-0", "left-0", "h-[2px]"],
                                            hoveredMenu === menu.name ? "w-full" : "w-0",
                                            ["bg-red-600", "transition-all", "duration-300"],
                                        )}
                                    />
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* 오른쪽 영역 */}
                <div className={twMerge(["w-100", "flex", "justify-end", "items-center", "gap-5"])}>
                    <div className={twMerge(["relative", "hidden", "md:block"])}>
                        <input
                            className={twMerge(
                                ["w-40", "py-1"],
                                ["border-b", "border-black"],
                                ["focus:w-60", "focus:outline-none"],
                                ["transition-all"],
                                isTransparent
                                    ? [
                                          "bg-transparent",
                                          "border-white",
                                          "text-white",
                                          "placeholder:text-white",
                                      ]
                                    : ["border-gray-300"],
                                isMenuOpen && ["border-gray-300"],
                            )}
                            placeholder={"검색"}
                        />
                        <button className={twMerge(["absolute", "right-0", "top-2"])}>
                            <IoSearch />
                        </button>
                    </div>
                    {isLoggedIn && user ? (
                        <>
                            <Link to={"/my"} className={twMerge(["text-sm", "font-bold"])}>
                                MYPAGE
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-bold hover:text-gray-500 transition-colors">
                                LOGOUT
                            </button>
                        </>
                    ) : (
                        <Link
                            to={"/login"}
                            className={twMerge(["text-sm", "font-bold", "hidden", "md:block"])}>
                            LOGIN
                        </Link>
                    )}
                    <Link
                        to={"/cart"}
                        className={twMerge(["text-sm", "font-bold", "hidden", "md:block"])}>
                        CART
                    </Link>
                </div>
            </div>

            {/* 
                [수정] 메가 메뉴 영역 
                - 상단 헤더와 동일한 container 구조를 사용하여 부모-자식 메뉴 간 수직 정렬(일직선)을 맞춤
            */}
            <div
                className={twMerge(
                    ["absolute", "left-0", "w-full", "z-50", "overflow-hidden"],
                    "top-20", 
                    ["bg-white", "text-gray-600"],
                    ["transition-all", "duration-300"],
                    isMenuOpen
                        ? ["h-64", "opacity-100", "border-b", "border-gray-100"]
                        : ["h-0", "opacity-0", "border-b-0"],
                )}>
                <div
                    className={twMerge(
                        ["container", "mx-auto", "px-4"],
                        ["flex", "justify-between"],
                    )}>
                    {/* 
                        [수정] 왼쪽 영역 정렬 
                        - 상단 헤더의 로고 너비(w-40)와 메뉴 간격(gap-5, gap-10)을 동일하게 유지하여 일직선 정렬
                    */}
                    <div className={twMerge(["flex", "items-start", "gap-5", "pt-8"])}>
                        {/* 상단 로고(w-40)와 동일한 공간 확보 */}
                        <div className={twMerge(["w-40"])} />
                        
                        <div
                            className={twMerge(
                                ["hidden", "lg:flex", "flex-1"],
                                ["justify-center", "gap-10"],
                            )}>
                            {MENU.map(menu => (
                                <ul
                                    key={menu.name}
                                    className={twMerge(["flex", "flex-col", "gap-3", "w-30"])}>
                                    {menu.subMenu.map(subMenu => (
                                        <li key={subMenu.name}>
                                            <Link
                                                to={subMenu.path}
                                                className={twMerge([
                                                    "block",
                                                    "text-sm",
                                                    "text-gray-500",
                                                    "hover:text-black",
                                                    "transition-colors"
                                                ])}>
                                                {subMenu.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>

                    {/* [수정] 오른쪽 영역: 상단 우측 메뉴 너비(w-100)와 동일하게 공간 확보 */}
                    <div className={twMerge(["w-100"])} />
                </div>
            </div>
        </header>
    );
}

export default Header;
