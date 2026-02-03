export type InquiryStatus = "PENDING" | "ANSWERED";

// 문의 유형 정의
export type InquiryType = "PRODUCT" | "DELIVERY" | "ORDER" | "OTHER" | "EXCHANGE_RETURN" | "MEMBER";

/**
 * 문의 등록 요청 데이터 타입 (Request)
 */
export interface InquiryRequest {
   type: InquiryType;
   title: string;
   content: string;
   images?: string[]; // 이미지 URL 배열 (선택사항)
}

/**
 * 문의 상세 정보 및 응답 데이터 타입 (Response)
 */
export interface Inquiry {
   id: number;
   type: InquiryType;
   title: string;
   content: string;
   status: InquiryStatus;
   answer: string | null;
   answeredAt: string | null;
   createdAt: string;
   updatedAt: string;
   images: InquiryImage[];
   user: InquiryUser;
}


export interface InquiryImage {
   id: number;
   url: string;
}

export interface InquiryUser {
   name: string;
   email: string;
}

//
export interface InquiryMeta {
   lastPage: number;
   page: number;
   total: number;
   images?: string[];
}

// 
export interface getInquiryParams {
   id:number;
}

