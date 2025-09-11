# 🏌️‍♂️ Lezuro

Lezuro는 **골프룸 예약 및 대회 참가 관리 플랫폼**입니다.  
사용자는 매장을 통해 골프룸을 예약하고 대회에 참가할 수 있으며, **비회원 예약**도 지원합니다.  
점장은 관리자의 승인을 통해 매장을 등록·운영하고, 관리자는 점장과 매장을 통합 관리합니다.

---

## 📸 Screenshots
<!-- 이미지가 있다면 경로를 교체하세요 -->
<!-- ![Lezuro Main](./docs/screenshot-main.png) -->
<!-- ![Reservation Flow](./docs/screenshot-reservation.png) -->

---

## ✨ Features

- **사용자(User)**
  - 비회원 포함 골프룸 예약
  - 대회 참가 신청
  - 내 예약 현황 확인

- **점장(Store Manager)**
  - 매장 등록 신청 및 운영
  - 룸/타임슬롯 예약 관리

- **관리자(Admin)**
  - 점장 계정 등록/승인/관리
  - 매장 승인/관리

---

## 💡 Contribution Highlights (내 기여)

- **퍼블리싱 & 반응형 구현**
  - 모바일/태블릿/데스크톱 반응형 레이아웃 구성
- **API 연동 & 예외 처리**
  - 예약/대회 관련 API 연결
  - **예약 시간 충돌 방지 로직** 및 **이전 시간대 겹침 예외 처리**
- **오류 관리 & 협업**
  - 오류 리스트(Excel)로 이슈 우선순위화 → 단계별 해결
  - 백엔드와 협업하여 누락 기능 보완 및 인터페이스 정리

> 프로젝트를 진행하며 **예약 처리 예외 상황**(룸별 예약 시간 조정, 인접 시간대 겹침 방지 등)을 다루며  
> 예외 처리 관점의 사고를 넓고 깊게 확장했습니다.

---

## 🛠 Tech Stack

- **Frontend**: Vue.js, JavaScript, CSS  
- **Backend**: NestJS, TypeORM, PostgreSQL, Redis(예약 관리)  
- **Infra/DevOps**: AWS (EC2, S3, Route53), Nginx, Docker, Jenkins (CI/CD)  
- **Design**: Figma (UI/UX 시안, 반응형 고려)  
- **Collaboration & Monitoring**: Slack (오류 알림, 협업)

---

## 🧱 Architecture

레저로(Lezuro) 프로젝트는 다음과 같은 구조로 구성되어 있습니다:

- **Client (Vue)** ↔ **API (NestJS)** ↔ **PostgreSQL, Redis**
- **AWS S3** : 이미지 전송 및 저장
- **Nginx + Docker** : 배포 및 서비스 환경 관리
- **Route53** : 도메인 라우팅
- **Jenkins + GitHub** : CI/CD 파이프라인
- **Slack** : 오류 알림 및 모니터링

![Lezuro Architecture](./docs/lezuro-architecture.png)

---

## 🚀 Getting Started

### 1) Requirements
- Node.js LTS / npm  
- PostgreSQL 14+  
- Redis 7+  
- (선택) Docker & Docker Compose  

### 2) Frontend (Vue)
```bash
# 프로젝트 루트 또는 FE 폴더에서
npm install
npm run dev
# 또는
npm run build && npm run preview
