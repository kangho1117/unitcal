# UnitCal - 심플하고 예쁜 다국어 단위 변환기

Next.js(App Router)로 만든 깔끔하고 사용하기 편한 다국어 단위 변환기 프로젝트입니다. 
복잡한 요소는 걷어내고 직관적인 UI와 부드러운 애니메이션을 적용해 모바일과 데스크톱 어디서든 쾌적하게 단위를 변환할 수 있도록 만들었습니다.

---

## 💡 주요 기능

### 1. 10개 카테고리, 63개 단위 변환 지원
* **길이**: mm, cm, m, km, inch, feet, yard, mile 등
* **무게**: mg, g, kg, t, ounce, pound 등
* **넓이**: mm², cm², m², ha, km², ft², acre 등
* **부피**: ml, l, m³, gallon, pint, cup, fl oz 등
* **온도**: 섭씨(°C), 화씨(°F), 절대온도(K), 란씨(°Ra)
* **속도**: m/s, km/h, mph, knot, Mach
* **시간**: ms, 초, 분, 시간, 일, 주, 월, 년
* **데이터**: Byte, KB, MB, GB, TB, PB
* **압력**: Pa, kPa, bar, psi, atm, mmHg
* **에너지**: J, kJ, cal, kcal, Wh, kWh, BTU

### 2. 깔끔한 모던 디자인
* 눈이 편안한 어두운 테마(Dark Mode) 기반의 레이아웃
* 모바일과 PC 화면 크기에 맞춰 알아서 정렬되는 반응형 디자인
* 군더더기 없는 폼 구성과 직관적인 변환 결과 시각화

### 3. 쉬운 다국어 지원
* 한국어와 영어를 기본 제공하며, `next-intl` 라이브러리를 활용해 설계되어 다른 언어도 쉽게 확장하여 관리할 수 있습니다.

---

## 📁 프로젝트 구조

```text
unitcal/
├── messages/               # 다국어 번역 파일 (ko.json, en.json)
├── src/
│   ├── app/                # Next.js App Router 페이지 및 레이아웃
│   │   └── [locale]/       # 다국어 라우팅 (메인, 변환 페이지, 소개, 문의 등)
│   ├── components/         # 공통 컴포넌트 (변환기 본체, 헤더, 푸터 등)
│   ├── i18n/               # 다국어 내비게이션 및 라우팅 설정
│   ├── lib/
│   │   ├── siteConfig.js   # 사이트 기본 정보 설정 (이름, 메일 등)
│   │   └── units.js        # 단위 변환 공식 및 단위 데이터 정의
│   └── middleware.js       # 다국어 리다이렉션 처리를 위한 미들웨어
```

---

## ⚙️ 사이트 정보 수정하기

[`src/lib/siteConfig.js`](file:///Users/kangho/Desktop/Coding/unitcal/src/lib/siteConfig.js)에서 사이트 이름이나 도메인, 문의 메일 주소를 간편하게 수정할 수 있습니다.

```javascript
export const siteConfig = {
  name: 'UnitCal',                      // 사이트 타이틀
  url: 'https://unitcal.com',           // 사이트 주소
  contactEmail: 'contact@unitcal.com',  // 문의 수신 메일
};
```

---

## 🚀 시작하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속해 실행 화면을 확인할 수 있습니다.

### 3. 빌드 및 배포용 파일 생성
```bash
npm run build
```

---

## 🛠️ 커스텀 & 확장하기

### 새로운 단위 추가하기
[`src/lib/units.js`](file:///Users/kangho/Desktop/Coding/unitcal/src/lib/units.js) 파일 내 원하는 카테고리에 새로운 단위를 추가해 주면 변환기 목록에 자동으로 반영됩니다.

```javascript
// 예: 'pressure' 카테고리에 새 단위 추가
units: {
  pa: { nameKey: 'units.pressure.pa', ratio: 1 },
  kpa: { nameKey: 'units.pressure.kpa', ratio: 1000 },
  // 기준이 되는 단위 대비 비율(ratio)을 입력해 주면 됩니다.
}
```

### 새로운 언어 추가하기
1. `messages/` 폴더에 원하는 언어의 번역 사전을 만듭니다. (예: `ja.json`)
2. [`src/i18n/routing.js`](file:///Users/kangho/Desktop/Coding/unitcal/src/i18n/routing.js) 파일의 `locales` 리스트에 새 언어코드를 추가합니다.
   ```javascript
   export const routing = defineRouting({
     locales: ['ko', 'en', 'ja'], // ja 추가
     defaultLocale: 'ko'
   });
   ```
