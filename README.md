# 👟 Lecture Prospecs Frontend Project

이 프로젝트는 React와 TypeScript를 기반으로 한 현대적인 쇼핑몰 프론트엔드 애플리케이션입니다. Vite를 사용하여 빠른 개발 환경을 구축하였으며, 효율적인 상태 관리와 라우팅 설계를 통해 사용자 경험을 최적화했습니다.

---

## 🛠 기술 스택 (Tech Stack)

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Tailwind Merge
- **State Management**: Zustand (with Persist Middleware)
- **Routing**: React Router v6.4+ (Data API)
- **Form Management**: React Hook Form
- **HTTP Client**: Axios (with Interceptors)
- **Animation**: Framer Motion
- **Utilities**: qs, dayjs

---

## 📂 프로젝트 구조 (Folder Structure)

```text
src/
├── api/          # Axios 인스턴스 및 도메인별 API 호출 함수 (auth, product, cart 등)
├── components/   # 재사용 가능한 공통 컴포넌트 및 레이아웃 요소
│   ├── common/   # Button, Input, Modal, Spinner 등 공통 UI
│   ├── layout/   # Header, Footer, TopHeader 등 레이아웃 컴포넌트
│   └── modals/   # 기능별 모달 컴포넌트 (ReviewModal 등)
├── layouts/      # 페이지 전체 틀을 결정하는 레이아웃 컴포넌트
├── pages/        # 각 라우트별 페이지 컴포넌트 (Home, Login, Register, Shop 등)
├── router/       # React Router 설정 및 접근 제어(Loader) 로직
├── stores/       # Zustand 전역 상태 관리 스토어 (Auth, Cart, Layout 등)
├── types/        # TypeScript 인터페이스 및 타입 정의
└── styles/       # 글로벌 CSS 및 Tailwind 설정
```

---

## 📈 개발 단계 및 목표 (Development Milestones)

### 1단계: 프로젝트 기반 구축 (Foundation)
*   **목표**: 대규모 프로젝트로 확장 가능한 견고한 아키텍처 설계
*   **구현 전략**: Vite 도입으로 빌드 속도 최적화 및 Tailwind CSS를 통한 일관된 디자인 시스템 구축.

### 2단계: 핵심 인프라 및 인증 설계 (Infrastructure)
*   **목표**: 안전하고 자동화된 데이터 통신 및 상태 유지 시스템 구축
*   **구현 전략**: Axios Interceptors를 통한 토큰 자동 부착 및 Zustand Persist를 이용한 새로고침 대응.

### 3단계: 라우팅 및 접근 제어 (Routing & Security)
*   **목표**: 매끄러운 페이지 전환과 선제적인 사용자 접근 제어
*   **구현 전략**: Nested Routes로 레이아웃 효율화 및 Route Loaders를 활용한 페이지 진입 전 인증 체크.

### 4단계: 비즈니스 로직 구현 및 UX 최적화 (Features & UX)
*   **목표**: 복잡한 쇼핑몰 기능의 안정적 구현 및 시각적 피드백 강화
*   **구현 전략**: React Hook Form 기반의 정밀한 유효성 검사 및 Framer Motion을 활용한 인터랙티브 UI 구현.

---

## 🗺 페이지 중심 개발 흐름 (Page-Centric Workflow)

1.  **Layout & Home**: 앱의 전체 틀(Header/Footer)과 메인 페이지 구조 설계
2.  **Login & Register**: 사용자 식별을 위한 인증 시스템 및 보안 스토어(`useAuthStore`) 구축
3.  **Product List & Detail**: 카테고리별 상품 탐색 및 상세 옵션(색상, 사이즈) 기능 구현
4.  **Cart & Order**: 장바구니 상태 관리 및 결제 프로세스 구축
5.  **MyPage & Modals**: 회원 정보 관리 및 리뷰 작성 등 부가 기능 추가

---

## 🔑 핵심 설계 로직 (Key Logic)

### 1. 전역 상태 관리 (Zustand)
- **인증(Auth)**: `useAuthStore`에서 JWT 토큰을 관리하며, 모든 API 요청의 신분증 역할을 합니다.
- **장바구니(Cart)**: 상품 추가, 수량 변경, 총액 계산 등 복잡한 연산을 스토어 내부 액션으로 추상화했습니다.

### 2. API 통신 구조 (Axios)
- **중앙 집중화**: `src/api/axios.ts`에서 공통 설정(Base URL, Header)을 관리합니다.
- **자동화**: 인터셉터를 통해 로그인 토큰을 모든 요청에 자동으로 포함시킵니다.

### 3. 폼 검증 및 데이터 가공
- **React Hook Form**: 실시간 유효성 검사를 수행합니다.
- **Data Formatting**: 서버 규격에 맞게 생년월일(YYYY-MM-DD) 등의 데이터를 전송 직전 가공합니다.

---

## ✅ 오늘(2026-01-30)의 작업 내역

- **버그 수정**: `ProductDetailPage.tsx`의 import 확장자 에러 해결 및 Vite 포트 변경(`3333`).
- **인증 로직**: `auth.api.ts` 구현 및 회원가입 시 생년월일 포맷 자동 변환 로직 추가.
- **UI 개선**: `framer-motion`을 활용한 고퀄리티 `Spinner` 컴포넌트 추가.
- **문서화**: 프로젝트 전체 구조 및 개발 프로세스 상세 분석 내용 README 반영.

---

## 🚀 실행 및 설정 (Setup)

```bash
pnpm install
pnpm dev
```
*현재 개발 서버는 **http://localhost:3333**에서 구동됩니다.*
