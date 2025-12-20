<div align="center">

# 🔗 Dev-Link

**개발자를 위한 프리미엄 링크 인 바이오 서비스**

[![Deploy](https://img.shields.io/badge/Firebase-Deployed-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://devlink.web.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)

[🌐 Demo](https://devlink.web.app) · [🐛 Issues](https://github.com/your-username/dev-link/issues) · [💡 Feature Request](https://github.com/your-username/dev-link/issues)

</div>

---

## ✨ 주요 기능

| 기능 | 설명 |
|:----:|:-----|
| 🔐 | **GitHub OAuth** 로그인으로 간편하게 시작 |
| 🎨 | **글래스모피즘 디자인** - 세련된 프리미엄 UI |
| 🛠️ | **기술 스택 배지** - Shields.io 자동 생성 |
| 🐙 | **GitHub 레포 연동** - 레포지토리 자동 가져오기 |
| 🌙 | **다크/라이트 테마** - 원하는 분위기 선택 |
| 🌍 | **다국어 지원** - 한국어/영어 |

---

## 🖼️ 스크린샷

<div align="center">
<table>
<tr>
<td align="center"><strong>🏠 랜딩 페이지</strong></td>
<td align="center"><strong>👤 프로필 페이지</strong></td>
</tr>
<tr>
<td><img src="docs/landing.png" width="400"/></td>
<td><img src="docs/profile.png" width="400"/></td>
</tr>
</table>
</div>

---

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18+
- Firebase 프로젝트
- GitHub OAuth App

### 설치

```bash
# 저장소 클론
git clone https://github.com/baetab/dev-link.git
cd dev-link

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 Firebase 설정 입력

# 개발 서버 실행
npm run dev
```

### 환경 변수

`.env` 파일에 다음 값을 설정하세요:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🛠️ 기술 스택

<div align="center">

| 분류 | 기술 |
|:----:|:-----|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, Framer Motion |
| **Backend** | Firebase (Auth, Firestore, Hosting) |
| **API** | GitHub REST API |
| **i18n** | i18next |

</div>

---

## 📁 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── dashboard/       # 대시보드 관련
│   └── ui/              # 공통 UI (shadcn/ui)
├── pages/               # 페이지 컴포넌트
├── services/            # 외부 API 서비스
├── lib/                 # 유틸리티
├── locales/             # 다국어 파일
└── firebase.ts          # Firebase 설정
```

---

## 📜 스크립트

| 명령어 | 설명 |
|:------:|:-----|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 미리보기 |
| `npm run deploy` | Firebase 배포 |
| `npm run lint` | ESLint 검사 |

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

본 프로젝트는 **개인적/비상업적 용도**로만 사용 가능합니다. 상업적 이용은 엄격히 금지되며, 관련 문의는 저작권자에게 연락 바랍니다. (자세한 내용은 [LICENSE](LICENSE) 파일 확인)

---

<div align="center">

**Made with ❤️ by Developers, for Developers**

[⬆️ 맨 위로](#-dev-link)

</div>
