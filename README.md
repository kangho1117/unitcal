# UnitCal - Modern Multi-Language Unit Converter

UnitCal은 React 19와 Next.js 16 (App Router)을 기반으로 제작된 빠르고 스타일리시한 다국어 단위 변환 웹 어플리케이션입니다. 모던한 Glassmorphism 디자인, 부드러운 애니메이션, 검색엔진 최적화(SEO) 및 구글 애드센스(Google AdSense) 승인을 위해 필요한 모든 요소를 포함하고 있습니다.

UnitCal is a fast, modern, and responsive multi-language unit converter built with React 19 and Next.js 16 (App Router). It features a sleek glassmorphic UI, smooth micro-interactions, SEO optimization, and meets all prerequisites for Google AdSense approval.

---

## 주요 기능 (Key Features)

### 1. 10가지 카테고리 & 63개 단위 지원 (10 Categories & 63 Units)
- **길이 (Length)**: mm, cm, m, km, in, ft, yd, mile, ch, fur 등
- **무게 (Weight)**: mg, g, kg, t, oz, lb, stone, grain 등
- **넓이 (Area)**: mm², cm², m², ha, km², in², ft², yd², acre 등
- **부피 (Volume)**: ml, l, m³, gal, qt, pt, cup, fl oz, tbsp, tsp 등
- **온도 (Temperature)**: °C, °F, K, °Ra 등
- **속도 (Speed)**: m/s, km/h, mph, knot, Mach 등
- **시간 (Time)**: ms, s, min, h, day, week, month, year 등
- **데이터 (Data)**: b, KB, MB, GB, TB, PB 등
- **압력 (Pressure)**: Pa, kPa, bar, psi, atm, mmHg 등
- **에너지 (Energy)**: J, kJ, cal, kcal, Wh, kWh, BTU 등

### 2. 고도로 최적화된 성능 & SEO (Performance & SEO Optimized)
- **정적 페이지 생성 (SSG)**: 모든 단위 변환 및 소개/정책 페이지가 `generateStaticParams`를 통해 빌드 타임에 100% 정적 페이지로 사전 렌더링되어 초고속 로딩 성능을 제공합니다.
- **검색엔진 최적화 (SEO)**:
  - 동적 `sitemap.xml` 및 `robots.txt` 구성
  - 다국어 지원을 위한 `hreflang` 태그 자동 생성
  - 각 카테고리 및 단위 설명 페이지 맞춤형 메타 태그 (Title, Description) 설정
  - 구조화된 데이터(JSON-LD Structured Data) 지원으로 구글 검색 노출 최적화

### 3. 완벽한 구글 애드센스 승인 대비 (Google AdSense Ready)
구글 애드센스 파트너 프로그램 승인을 위해 필수적인 정적 정보 페이지들을 완벽하게 수록하고 있습니다:
- **개인정보처리방침 (Privacy Policy)** (다국어)
- **이용약관 (Terms of Service)** (다국어)
- **사이트 소개 (About Us)** (다국어)
- **문의하기 (Contact Us)**: 이메일 전송 API 연동을 위한 모던 피드백 폼 제공

### 4. 세련된 UX/UI 디자인 (Premium Glassmorphic Design)
- Tailwind CSS를 사용하지 않는 순수 Vanilla CSS와 CSS Modules 기반의 가볍고 고도로 제어 가능한 UI 디자인
- 다크 모드(Dark Mode) 및 세련된 그라디언트 배경
- 모바일, 태블릿, 데스크톱 등 모든 화면 크기에 최적화된 반응형 레이아웃
- 호버 효과 및 부드러운 입출력 micro-animations 적용

---

## 프로젝트 구조 (Directory Structure)

```text
unitcal/
├── messages/               # 다국어 번역 리소스 파일
│   ├── ko.json             # 한국어 리소스 (기본값)
│   └── en.json             # 영어 리소스
├── public/                 # 정적 파일 (파비콘 등)
├── src/
│   ├── app/                # Next.js App Router 페이지 및 레이아웃
│   │   ├── [locale]/       # 다국어 라우팅 그룹
│   │   │   ├── convert/    # 단위 변환 상세 페이지 (동적 카테고리)
│   │   │   ├── about/      # 사이트 소개 페이지
│   │   │   ├── contact/    # 문의하기 페이지
│   │   │   ├── privacy/    # 개인정보처리방침 페이지
│   │   │   ├── terms/      # 이용약관 페이지
│   │   │   ├── layout.js   # 루트 레이아웃 (애드센스/GA 주입)
│   │   │   └── page.js     # 메인 홈 페이지 (카테고리 목록)
│   │   ├── robots.js       # robots.txt 생성기
│   │   └── sitemap.js      # sitemap.xml 생성기
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   ├── Header/         # 상단 네비게이션 & 언어 선택기
│   │   ├── Footer/         # 하단 정책 링크 & 저작권 정보
│   │   ├── UnitConverter/  # 단위 변환 핵심 로직 컴포넌트
│   │   ├── CategoryCard/   # 홈 화면용 카테고리 카드
│   │   └── AdBanner/       # 구글 애드센스 반응형 광고 배너
│   ├── i18n/               # next-intl 설정 (routing, navigation)
│   ├── lib/
│   │   ├── siteConfig.js   # 전역 사이트 설정 (이름, 애드센스ID, GA ID 등)
│   │   └── units.js        # 변환 공식, 단위 데이터, 계산 로직
│   └── middleware.js       # 다국어 라우팅을 위한 Next.js 미들웨어
├── next.config.mjs         # Next.js 구성 파일 (next-intl 플러그인 포함)
└── package.json            # 의존성 및 스크립트 정의
```

---

## 사이트 전역 설정 (Configuration)

[`src/lib/siteConfig.js`](file:///Users/kangho/Desktop/Coding/unitcal/src/lib/siteConfig.js) 파일을 수정하여 사이트 이름, 도메인 주소, 구글 애드센스 ID, 구글 애널리틱스 ID 등을 한 곳에서 쉽게 변경하고 관리할 수 있습니다.

```javascript
export const siteConfig = {
  name: 'UnitCal',                      // 사이트 이름 (타이틀 등에 사용됨)
  url: 'https://unitcal.com',           // 실제 배포할 사이트 도메인 URL (SEO 및 사이트맵에 필수)
  contactEmail: 'contact@unitcal.com',  // 문의 수신용 공식 이메일
  adsenseId: 'ca-pub-XXXXXXXXXX',      // 구글 애드센스 클라이언트 ID
  analyticsId: 'G-XXXXXXXXXX',          // 구글 애널리틱스 (GA4) 측정 ID
};
```

---

## 시작하기 (Getting Started)

### 의존성 패키지 설치 (Install Dependencies)
```bash
npm install
```

### 개발 서버 실행 (Run Development Server)
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 로컬 개발 상태를 확인할 수 있습니다.

### 프로덕션 빌드 (Production Build)
```bash
npm run build
```
정적 페이지 생성이 정상적으로 완료되고 배포 파일이 생성됩니다.

### 서비스 실행 (Start Production Server)
```bash
npm run start
```

---

## 단위 및 언어 확장 가이드 (Extending the Application)

### 1. 새로운 단위 카테고리 또는 단위 추가하기
[`src/lib/units.js`](file:///Users/kangho/Desktop/Coding/unitcal/src/lib/units.js) 내에 정의된 데이터 구조에 추가하고자 하는 단위와 공식을 명시하면 자동으로 변환기와 계산 수식이 렌더링됩니다.

```javascript
// 예: 'pressure' 카테고리에 새로운 단위 추가
units: {
  pa: { nameKey: 'units.pressure.pa', ratio: 1 },
  kpa: { nameKey: 'units.pressure.kpa', ratio: 1000 },
  // ...새로운 단위 ratio(기준단위 파스칼 대비 배율) 입력
}
```

### 2. 신규 다국어 추가하기
현재는 한국어(`ko`)와 영어(`en`)를 기본 지원합니다. 일본어(`ja`) 등 제3의 언어를 추가하려면:
1. `messages/ja.json` 파일을 복사하여 일본어 번역 사전을 작성합니다.
2. [`src/i18n/routing.js`](file:///Users/kangho/Desktop/Coding/unitcal/src/i18n/routing.js) 파일의 `locales` 배열에 `'ja'`를 추가합니다.
   ```javascript
   export const routing = defineRouting({
     locales: ['ko', 'en', 'ja'],
     defaultLocale: 'ko'
   });
   ```

---

## 배포 (Deployment on Vercel)

이 프로젝트는 **Vercel** 배포에 완전히 최적화되어 있습니다. GitHub 저장소와 연결하면 클릭 한 번으로 배포가 가능합니다.

1. **GitHub 저장소**를 생성하고 프로젝트 코드를 푸시합니다.
2. **[Vercel Dashboard](https://vercel.com/new)**에 로그인하여 `Import Project`를 진행합니다.
3. 빌드 세팅은 기본값(`Next.js`)을 유지합니다.
4. **Deploy** 버튼을 누르면 정적 최적화가 포함된 프로덕션 빌드가 시작되고 몇 초 만에 배포가 완료됩니다!
5. 도메인을 연결한 후 [`src/lib/siteConfig.js`](file:///Users/kangho/Desktop/Coding/unitcal/src/lib/siteConfig.js)의 설정값들을 실제 환경에 맞춰 업데이트하고 다시 푸시(자동 재배포)하십시오.

---

## 라이선스 (License)

이 프로젝트는 개인 혹은 상업적 용도로 자유롭게 사용이 가능합니다. (MIT License)
