import { twMerge } from "tailwind-merge";
import { Link } from "react-router";

function Footer() {
    return (
        <footer className={twMerge(["bg-white", "border-t", "border-gray-200", "pt-16", "pb-10"])}>
            <div className={twMerge(["container", "mx-auto", "px-4"])}>
                {/* 상단: 고객센터 및 메뉴 영역 */}
                <div className={twMerge(["flex", "flex-wrap", "justify-between", "gap-10", "mb-16"])}>
                    {/* 고객센터 정보 */}
                    <div className={twMerge(["space-y-6"])}>
                        <div className={twMerge(["flex", "gap-10"])}>
                            <div>
                                <p className={twMerge(["text-xs", "text-gray-500", "mb-1"])}>구매 / 배송 문의</p>
                                <p className={twMerge(["text-xl", "font-bold"])}>080-710-1020</p>
                            </div>
                            <div>
                                <p className={twMerge(["text-xs", "text-gray-500", "mb-1"])}>상품정보 / AS문의</p>
                                <p className={twMerge(["text-xl", "font-bold"])}>080-023-1020</p>
                            </div>
                        </div>
                        <div className={twMerge(["text-xs", "text-gray-500", "leading-relaxed"])}>
                            <p>MON - FRI 09:00 ~ 17:00</p>
                            <p>BREAK TIME : 12:30 ~ 13:30 (주말, 공휴일 휴무)</p>
                        </div>
                    </div>

                    {/* 메뉴 링크 영역 */}
                    <div className={twMerge(["flex", "gap-20"])}>
                        {/* SUPPORT */}
                        <div>
                            <h4 className={twMerge(["font-bold", "text-sm", "mb-4"])}>SUPPORT</h4>
                            <ul className={twMerge(["text-xs", "text-gray-500", "space-y-2"])}>
                                <li><Link to="#">매장안내</Link></li>
                                <li><Link to="#">A/S 안내</Link></li>
                                <li><Link to="#">고객센터</Link></li>
                                <li><Link to="#">APP 다운로드</Link></li>
                                <li><Link to="#">GIFT CARD</Link></li>
                            </ul>
                        </div>
                        {/* INFO */}
                        <div>
                            <h4 className={twMerge(["font-bold", "text-sm", "mb-4"])}>INFO</h4>
                            <ul className={twMerge(["text-xs", "text-gray-500", "space-y-2"])}>
                                <li><Link to="#" className="text-black font-bold">개인정보처리방침</Link></li>
                                <li><Link to="#">이용약관</Link></li>
                                <li><Link to="#">공지사항</Link></li>
                                <li><Link to="#">뉴스</Link></li>
                            </ul>
                        </div>
                        {/* SOCIAL */}
                        <div>
                            <h4 className={twMerge(["font-bold", "text-sm", "mb-4"])}>SOCIAL</h4>
                            <ul className={twMerge(["text-xs", "text-gray-500", "space-y-2"])}>
                                <li><Link to="#">FACEBOOK</Link></li>
                                <li><Link to="#">YOUTUBE</Link></li>
                                <li><Link to="#">INSTAGRAM</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 중단: 기업 정보 영역 */}
                <div className={twMerge(["border-t", "border-gray-100", "pt-8", "mb-8"])}>
                    <div className={twMerge(["text-[11px]", "text-gray-400", "leading-relaxed", "space-y-1"])}>
                        <p>
                            (주)LS네트웍스 | 대표이사 문성준 | 사업자등록번호 622-81-04805 | 경상남도 김해시 호계로 428, 1층(부원동) | 전화 080-710-1020
                        </p>
                        <p>
                            통신판매업신고번호 2016-경남김해-0229 | 개인정보관리 책임자 유승호 | 마케팅/제휴 문의 prospecs.brand@gmail.com
                        </p>
                    </div>
                </div>

                {/* 하단: 보증 및 카피라이트 */}
                <div className={twMerge(["flex", "justify-between", "items-end"])}>
                    <div className={twMerge(["max-w-2xl"])}>
                        <h5 className={twMerge(["text-[11px]", "font-bold", "mb-2"])}>SGI 서울보증안내</h5>
                        <p className={twMerge(["text-[10px]", "text-gray-400", "leading-relaxed"])}>
                            현금 등으로 결제하신 경우, 안전 거래를 위해 프로스펙스닷컴 쇼핑몰에서 가입한 소비자피해보상보험 서비스를 이용하실 수 있습니다.
                        </p>
                    </div>
                    <div className={twMerge(["text-right"])}>
                        <p className={twMerge(["text-[11px]", "font-bold", "mb-1"])}>FAMILY SITE</p>
                        <p className={twMerge(["text-[11px]", "text-gray-400"])}>MONT-BELL</p>
                    </div>
                </div>

                <div className={twMerge(["mt-10", "text-[10px]", "text-gray-400"])}>
                    프로스펙스닷컴 | COPYRIGHT© LS NETWORKS CO. ALL RIGHTS RESERVED
                </div>
            </div>
        </footer>
    );
}

export default Footer;
