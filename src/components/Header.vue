<template>
  <div class="view">
    <div class="frame-7504">
      <router-link to="/">
        <img class="lezuro_logo_black-1"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/lezuro-logo-black-1@2x.png"
          alt="Lezuro_logo_black 1" />
      </router-link>
      <div class="bar" @click="toggleMenu">
        <img src="../../img/bar.png" alt="Menu bar icon" />
      </div>

      <!-- 메뉴가 열리면 보여질 모바일 메뉴 -->
      <div class="mobile-menu" v-if="menuOpen">
        <!-- 닫기 버튼 -->
        <div class="close-menu-btn" @click="toggleMenu">✕</div>

        <!-- 사용자 정보 -->
        <div class="user-info">
          <div class="login-info">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/majesticons-user-line.svg"
              alt="User icon" />
            <span v-if="isLoggedIn" class="pretendard-regular-normal-log-cabin-14px">{{ userName }}님 어서오세요.</span>
            <span v-else class="pretendard-regular-normal-log-cabin-14px">
              <!-- 24.12.16 수정 - class 추가 -->
              <router-link to="/login" class="router-link-class">로그인해주세요</router-link></span>
          </div>

          <div class="arrow-bg" @click="toGoMyprofile" v-if="isLoggedIn">
            <img src="../../img/Group 687rightarrow.png" class="arrow" alt="arrow" />
          </div>
        </div>

        <!-- 메뉴 항목 -->
        <div class="menu-content">
          <div class="main-item" @click="toggleMainMenu('record')">
            <div class="menu-header pretendard-semi-bold-log-cabin-16px" :class="{
              active: mainMenuOpen === 'record' || activeMenu === 'record',
            }">
              기록실
              <img v-if="mainMenuOpen !== 'record'" src="../../img/Vector 3.png" alt="Arrow down" />
              <!-- 클릭했을 때 보이는 이미지 -->
              <img v-else src="../../img/Vector3-1.png" alt="Arrow up" />
            </div>
            <div v-if="mainMenuOpen === 'record'" class="dropdownmenu">
              <router-link to="/myscorecard">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">스코어 카드</div>
              </router-link>
              <router-link to="/myswingvideos-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">나의 스윙 영상</div>
              </router-link>
            </div>
          </div>

          <div class="main-item" @click="toggleMainMenu('game')">
            <div class="menu-header pretendard-semi-bold-log-cabin-16px" :class="{
              active: mainMenuOpen === 'game' || activeMenu === 'game',
            }">
              대회
              <img v-if="mainMenuOpen !== 'game'" src="../../img/Vector 3.png" alt="Arrow down" />
              <!-- 클릭했을 때 보이는 이미지 -->
              <img v-else src="../../img/Vector3-1.png" alt="Arrow up" />
            </div>
            <div v-if="mainMenuOpen === 'game'" class="dropdownmenu">
              <router-link to="/game-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">대회</div>
              </router-link>
              <router-link to="/mygame-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">나의 대회</div>
              </router-link>
            </div>
          </div>

          <div class="main-item" @click="toggleMainMenu('shop')">
            <router-link to="/map-list">
              <div class="menu-header pretendard-semi-bold-log-cabin-16px" :class="{
                active: mainMenuOpen === 'shop' || activeMenu === 'shop',
              }">
                매장·예약
                <!-- <img v-if="mainMenuOpen !== 'shop'" src="../../img/Vector 3.png" alt="Arrow down" /> -->
                <!-- 클릭했을 때 보이는 이미지 -->
                <!-- <img v-else src="../../img/Vector3-1.png" alt="Arrow up" /> -->
              </div>
            </router-link>
          </div>

          <div class="main-item">
            <router-link to="/course-list">
              <div class="menu-header pretendard-semi-bold-log-cabin-16px" :class="{
                active: mainMenuOpen === 'course' || activeMenu === 'course',
              }">
                코스
                <!-- <img v-if="mainMenuOpen !== 'course'" src="../../img/Vector 3.png" alt="Arrow down" /> -->
                <!-- 클릭했을 때 보이는 이미지 -->
                <!-- <img v-else src="../../img/Vector3-1.png" alt="Arrow up" /> -->
              </div>
            </router-link>
          </div>

          <div class="main-item" @click="toggleMainMenu('guide')">
            <div class="menu-header pretendard-semi-bold-log-cabin-16px" :class="{
              active: mainMenuOpen === 'guide' || activeMenu === 'guide',
            }">
              가이드
              <img v-if="mainMenuOpen !== 'guide'" src="../../img/Vector 3.png" alt="Arrow down" />
              <!-- 클릭했을 때 보이는 이미지 -->
              <img v-else src="../../img/Vector3-1.png" alt="Arrow up" />
            </div>
            <div v-if="mainMenuOpen === 'guide'" class="dropdownmenu">
              <router-link to="/system-preparing">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">시스템 소개</div>
              </router-link>
              <router-link to="/gameintro-preparing">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">게임 소개</div>
              </router-link>
              <router-link to="/gameguide-preparing">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">게임 가이드</div>
              </router-link>
            </div>
          </div>

          <div class="main-item" @click="toggleMainMenu('community')">
            <div class="menu-header pretendard-semi-bold-log-cabin-16px" :class="{
              active:
                mainMenuOpen === 'community' || activeMenu === 'community',
            }">
              커뮤니티
              <img v-if="mainMenuOpen !== 'community'" src="../../img/Vector 3.png" alt="Arrow down" />
              <!-- 클릭했을 때 보이는 이미지 -->
              <img v-else src="../../img/Vector3-1.png" alt="Arrow up" />
            </div>
            <div v-if="mainMenuOpen === 'community'" class="dropdownmenu">
              <router-link to="/events-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">이벤트</div>
              </router-link>
              <router-link to="/board-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">자유 게시판</div>
              </router-link>
              <router-link to="/swingvideo-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">스윙영상</div>
              </router-link>
            </div>
          </div>

          <div class="main-item" @click="toggleMainMenu('customer')">
            <div class="menu-header pretendard-semi-bold-log-cabin-16px" :class="{
              active:
                mainMenuOpen === 'customer' || activeMenu === 'customer',
            }">
              고객센터
              <img v-if="mainMenuOpen !== 'customer'" src="../../img/Vector 3.png" alt="Arrow down" />
              <!-- 클릭했을 때 보이는 이미지 -->
              <img v-else src="../../img/Vector3-1.png" alt="Arrow up" />
            </div>
            <div v-if="mainMenuOpen === 'customer'" class="dropdownmenu">
              <router-link to="/notice-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">공지사항</div>
              </router-link>
              <router-link to="/contact-write">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">1:1 문의</div>
              </router-link>
              <router-link to="/faq-list">
                <div class="dropdownmenu-item pretendard-regular-normal-log-cabin-14px">FAQ</div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 하단 관리자와 로그아웃 -->
        <div class="menu-footer" v-if="isLoggedIn">
          <!-- <router-link to="/admin" v-if="userName === 'root'"> -->
          <!-- <div class="menu-footer-item pretendard-regular-normal-granite-gray-14px">
            <img src="../../img/lets-icons_setting-line-light.png" alt="" />관리자
          </div> -->
          <!-- </router-link> -->
          <div class="menu-footer-item pretendard-regular-normal-granite-gray-14px" @click="logOut()">
            <img src="../../img/hugeicons_logout-04.png" alt="" />
            로그아웃
          </div>
        </div>
      </div>

      <div class="frame-7371">
        <div class="menu-item" @click="setActiveMenu('record')">
          <router-link to="/myscorecard" class="nav-text" :class="{ active: activeMenu === 'record' }">
            <div class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
              :class="{ active: activeMenu === 'record' }">
              기록실
            </div>
          </router-link>
          <div class="submenu">
            <router-link to="/myscorecard" class="pretendard-regular-normal-mine-shaft-16px"
              @click="setActiveSubMenu('scorecard')">
              <div class="submenu-item" :class="{ active: activeSubMenu === 'scorecard' }">
                스코어 카드
              </div>
            </router-link>
            <router-link to="/myswingvideos-list" class="pretendard-regular-normal-mine-shaft-16px"
              @click="setActiveSubMenu('myswingvideos')">
              <div class="submenu-item" :class="{ active: activeSubMenu === 'myswingvideos' }"
                v-if="checkLogin">
                나의 스윙 영상
              </div>
            </router-link>
          </div>
        </div>
        <div class="menu-item" @click="setActiveMenu('game')">
          <router-link to="/game-list" :class="{ active: activeMenu === 'game' }">
            <div class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
              :class="{ active: activeMenu === 'game' }">
              대회
            </div>
          </router-link>
          <div class="submenu">
            <router-link to="/game-list" @click="setActiveSubMenu('gamelist')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'gamelist' }">
                대회
              </div>
            </router-link>
            <router-link to="/mygame-list" @click="setActiveSubMenu('mygamelist')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px" v-if="checkLogin"
                :class="{ active: activeSubMenu === 'mygamelist' }">나의 대회</div>
            </router-link>
          </div>
        </div>
        <router-link to="/map-list">
          <div class="text-2 valign-text-middle pretendard-semi-bold-mine-shaft-18px"
            :class="{ active: activeMenu === 'shop' }">
            매장·예약
          </div>
        </router-link>
        <router-link to="/course-list">
          <div class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
            :class="{ active: activeMenu === 'course' }">
            코스
          </div>
        </router-link>
        <!-- <router-link to="/system-preparing">
        <div
          class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
        >
          가이드
        </div>
        </router-link> -->

        <div class="menu-item">
          <router-link to="/system-preparing" class="nav-text">
            <div class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
              :class="{ active: activeMenu === 'guide' }">
              가이드
            </div>
          </router-link>
          <div class="submenu">
            <router-link to="/system-preparing" @click="setActiveSubMenu('systempreparing')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'systempreparing' }">시스템 소개</div>
            </router-link>
            <router-link to="/gameintro-preparing" @click="setActiveSubMenu('gameintropreparing')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'gameintropreparing' }">게임 소개</div>
            </router-link>
            <router-link to="/gameguide-preparing" @click="setActiveSubMenu('gameguidepreparing')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'gameguidepreparing' }">게임 가이드</div>
            </router-link>
          </div>
        </div>

        <div class="menu-item">
          <router-link to="/events-list" class="nav-text">
            <div class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
              :class="{ active: activeMenu === 'community' }">
              커뮤니티
            </div>
          </router-link>
          <div class="submenu">
            <router-link to="/events-list" @click="setActiveSubMenu('eventslist')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'eventslist' }">이벤트</div>
            </router-link>
            <router-link to="/board-list" @click="setActiveSubMenu('boardlist')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'boardlist' }">자유 게시판</div>
            </router-link>
            <router-link to="/swingvideo-list" @click="setActiveSubMenu('swingvideolist')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'swingvideolist' }">스윙영상</div>
            </router-link>
          </div>
        </div>

        <div class="menu-item">
          <router-link to="/notice-list" class="nav-text">
            <div class="text-2 valign-text-middle pretendard-semi-bold-log-cabin-18px"
              :class="{ active: activeMenu === 'customer' }">
              고객센터
            </div>
          </router-link>
          <div class="submenu">
            <router-link to="/notice-list" @click="setActiveSubMenu('noticelist')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'noticelist' }">공지사항</div>
            </router-link>
            <router-link to="/contact-write" @click="setActiveSubMenu('contactwrite')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'contactwrite' }">1:1문의</div>
            </router-link>
            <router-link to="/faq-list" @click="setActiveSubMenu('faqlist')">
              <div class="submenu-item pretendard-regular-normal-mine-shaft-16px"
                :class="{ active: activeSubMenu === 'faqlist' }">FAQ</div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="frame-7372">
        <div class="menu-item" v-if="isLoggedIn">
          <!-- 로그인 상태 -->
          <div class="info">
              <img class="majesticonsuser-line"
                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/majesticons-user-line.svg"
                alt="majesticons:user-line" />
              <div class="text-9 valign-text-middle pretendard-regular-normal-mine-shaft-16px">
                {{ userName }}님
              </div>
              <img class="vector-3"
                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-3.svg"
                alt="Vector 3" />
          </div>
          <!-- 드롭다운 메뉴 -->
          <div class="submenu">
            <router-link to="/myprofile">
              <!-- 24.12.16 수정 - padding 삭제 -->
              <div class="submenu-item" >
                <img src="../../img/majesticons_user-linemypage.png" alt="" />
                <div class="pretendard-regular-normal-mine-shaft-16px">마이페이지</div>
              </div>
            </router-link>
            <router-link to="/admin" v-if="userName === 'root'">
              <div class="submenu-item" style="padding-bottom: 20px">
                <img src="../../img/Vectoradmin.png" alt="" />
                <div class=pretendard-regular-normal-mine-shaft-16px>관리자</div>
              </div>
            </router-link>
            <router-link to="/">
              <div class="submenu-item" style="border-top: 1px solid #ddd" @click="logOut()">
                <img src="../../img/hugeicons_logout-04logout.png" alt="" />
                <!-- 24.11.13 수정 - 글씨색 변경 -->
                <div class="pretendard-regular-normal-mine-shaft-16px" @click="logOut()">로그아웃</div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- 로그인되지 않은 상태 -->
        <div v-else class="frame-7279">
          <router-link to="/login">
            <div class="text-2045 valign-text-middle pretendard-regular-normal-monza-16px">
              로그인
            </div>
          </router-link>
          l
          <router-link to="/phone-certification">
            <div class="text-2046 valign-text-middle pretendard-regular-normal-granite-gray-16px">
              회원가입
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { managerStore } from '@/store/managerStore';  // API 호출

export default {
  name: "Header",
  data() {
    return {
      isLoggedIn: false, // 로그인 상태
      activeSubMenu: "",
      activeMenu: "", // 현재 활성 메뉴 항목
      mainMenuOpen: "", // 현재 활성화된 메인 메뉴
      userName: "",
      menuOpen: false,
      checkLogin : false
    };
  },
  destroyed(){
        console.log("Start destroyed")
        // this.logOut();
    },
  mounted() {
    const currentPath = this.$route.path;
    this.updateActiveMenu(this.$route.path);
    // 기록실 경로 확인
    if (
      currentPath.startsWith("/myscorecard") ||
      currentPath.startsWith("/myswingvideos-list")
    ) {
      this.activeMenu = "record";
      this.mainMenuOpen = "record";
    }

    // 대회 경로 확인
    else if (
      currentPath.startsWith("/game-list") ||
      currentPath.startsWith("/mygame-list") 
    ) {
      this.activeMenu = "game";
      this.mainMenuOpen = "game";
    }

    // 매장 경로 확인
    else if (currentPath.startsWith("/map-list")) {
      this.activeMenu = "shop";
      this.mainMenuOpen = "shop";
    }

    // 코스 경로 확인
    else if (currentPath.startsWith("/course-list")) {
      this.activeMenu = "course";
      this.mainMenuOpen = "course";
    }

    // 가이드 경로 확인
    else if (
      currentPath.startsWith("/system-preparing") ||
      currentPath.startsWith("/gameintro-preparing") ||
      currentPath.startsWith("/gameguide-preparing")
    ) {
      this.activeMenu = "guide";
      this.mainMenuOpen = "guide";
    }

    // 커뮤니티 경로 확인
    else if (
      currentPath.startsWith("/events-list") ||
      currentPath.startsWith("/board-list") ||
      currentPath.startsWith("/swingvideo-list")
    ) {
      this.activeMenu = "community";
      this.mainMenuOpen = "community";
    }

    // 고객센터 경로 확인
    else if (
      currentPath.startsWith("/notice-list") ||
      currentPath.startsWith("/contact-write") ||
      currentPath.startsWith("/faq-list")
    ) {
      this.activeMenu = "customer";
      this.mainMenuOpen = "customer";
    }

    // 로그인 상태를 확인 (예: 로컬 스토리지에서 토큰 확인)
    const refreshToken = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("Token");
    if (token) {
      this.isLoggedIn = true;
      // console.log("localStorage.getItem('loginInfo') : : :" ,localStorage.getItem('loginInfo'))
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      const autoLogin = JSON.parse(localStorage.getItem("autoLogin"));
      
      this.userName = loginInfo.name;
      // this.userName = loginInfo.userName;  // 추후 배포시 이름 바꾸기 12.04일

      console.log("userInfo : : :", JSON.stringify(loginInfo));
      console.log("token : : :", JSON.stringify(token));
      console.log("refreshToken : : :", JSON.stringify(refreshToken));
      
      const isFirstLogin = localStorage.getItem("userLogin");
      console.log("isFirstLogin : : : " , isFirstLogin);
      console.log("autoLogin : : : " , autoLogin);

      this.checkAuth(loginInfo.id,token) // 자동 로그인 일때만 갱신

      // if(autoLogin === true){
        
      //   /// 자동 로그인 경우 --> 토큰 값을 재 갱신 시킨다
      //   console.log("자동 로그인 토큰 재 갱신 1시간 마다");
      //    setTimeout(() => {
      //     this.getRefreshToken(token)
      //     .then((data) => {
      //       console.log("갱신된 데이터:", data);
      //       localStorage.setItem('Token', data.token);
      //       localStorage.setItem('refreshToken', data.refreshToken);
      //       localStorage.setItem("userLogin" ,"true");
      //       // data.token, data.refreshToken, data.tokenExpires 사용 가능
      //     })
      //     .catch((err) => {
      //       console.error("토큰 갱신 실패:", err);
      //     }); // 로그아웃 메서드 호출
      //   }, 60 * 60 * 1000);
       
      //   // console.log("자동 로그인 토큰 재 갱신 1시간 마다" ,JSON.stringify(this.getRefreshToken(token)));

      // }else{
      //   /// 자동 로그인 아닌 경우 --> 로그아웃
      //   console.log("로그아웃" );
      //   setTimeout(() => {
      //     this.logOut(); // 로그아웃 메서드 호출
      //   }, 60 * 60 * 1000); // 1시간 = 60분 * 60초 * 1000밀리초
      // }


      if (isFirstLogin === "true") {
        this.Visitlog(token); /// 방문자 수 체크
        localStorage.setItem("userLogin", "false"); // 새로고침 후 플래그를 false로 변경
         window.location.reload();
      }
      this.checkLogin = true;
    } else {
      this.isLoggedIn = false;
      this.checkLogin = false;
    }
  },

  methods: {
   async checkAuth(idx, tokens){
    const autoLogin = JSON.parse(localStorage.getItem("autoLogin"));

    try {
          const response = await axios.get(`https://13.124.62.68:3000/api/v1/users/${idx}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens}`,
            },
          });
          console.log("response : : : : " , response)
          

        } catch (error) {
          console.error("토큰 갱신 에러:", error);
          // 여기서 리프레시 토큰 및 엑세스 토큰 재 갱신
          if(autoLogin === true){
            this.getRefreshToken(idx,tokens)
                    .then((data) => {
                      console.log("갱신된 데이터:", data);
                      localStorage.setItem('Token', data.token);
                      localStorage.setItem('refreshToken', data.refreshToken);
                      localStorage.setItem("userLogin" ,"true");});
                      window.location.reload();
          }else{
            this.logOut();
          }
          
          throw error; // 에러를 호출한 곳으로 다시 던짐
        }
   },
    // 방문자 수 체크
    async Visitlog(tokens){
      try {
          const response = await axios.get('https://13.124.62.68:3000/api/visitor-statistics/log-visit', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens}`,
            },
          });

          

        } catch (error) {
          console.error("토큰 갱신 에러:", error);
          throw error; // 에러를 호출한 곳으로 다시 던짐
        }
      },
    async getRefreshToken(idx,tokens){
      try {
          const response = await axios.get(`https://13.124.62.68:3000/api/v1/auth/refresh/${idx}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens}`,
            },
          });

          // Response 예제: 
          // {"token":"...", "refreshToken":"...", "tokenExpires":...}

          // 필요한 데이터만 리턴
          const { token, refreshToken, tokenExpires } = response.data;

          console.log("새로운 토큰:", token);
          console.log("새로운 리프레시 토큰:", refreshToken);
          console.log("토큰 만료 시간:", tokenExpires);

          // 객체 형태로 리턴
          return { token, refreshToken, tokenExpires };

        } catch (error) {
          console.error("토큰 갱신 에러:", error);
          throw error; // 에러를 호출한 곳으로 다시 던짐
        }
    },
    setActiveMenu(menu) {
      this.activeMenu = menu; // 클릭한 메뉴 항목을 활성화
      this.activeSubMenu = "";
    },
    setActiveSubMenu(subMenu) {
      this.activeSubMenu = subMenu;
    },
    updateActiveMenu(path) {
       // 기록실 경로 확인
       if (path.startsWith('/myscorecard')) {
        this.activeMenu = 'record';
        this.activeSubMenu = 'scorecard';
      } else if (path.startsWith('/myswingvideos-list')) {
        this.activeMenu = 'record';
        this.activeSubMenu = 'myswingvideos';
      }
      // 대회 경로 확인
      else if (path.startsWith('/game-list') || path.startsWith('/gameinfo-detail')) {
        this.activeMenu = 'game';
        this.activeSubMenu = 'gamelist';
      } else if (path.startsWith('/mygame-list')) {
        this.activeMenu = 'game';
        this.activeSubMenu = 'mygamelist';
      }
      // 매장·예약 경로 확인
      else if (path.startsWith('/map-list') || path.startsWith('/reservation-write')) {
        this.activeMenu = 'shop';
      }
      // 코스 경로 확인
 
      else if (path.startsWith('/course-list') || path.startsWith('/course-detail')) {
    this.activeMenu = 'course';
  } 
      // 가이드 경로 확인
      else if (path.startsWith('/system-preparing')) {
        this.activeMenu = 'guide';
        this.activeSubMenu = 'systempreparing';
      } else if (path.startsWith('/gameintro-preparing')) {
        this.activeMenu = 'guide';
        this.activeSubMenu = 'gameintropreparing';
      } else if (path.startsWith('/gameguide-preparing')) {
        this.activeMenu = 'guide';
        this.activeSubMenu = 'gameguidepreparing';
      }
      // 커뮤니티 경로 확인
      else if (path.startsWith('/events-list') || path.startsWith('/event-detail')) {
        this.activeMenu = 'community';
        this.activeSubMenu = 'eventslist';
      } else if (path.startsWith('/board-list') || path.startsWith('/board-write') || path.startsWith('/board-detail')){
        this.activeMenu = 'community';
        this.activeSubMenu = 'boardlist';
      } else if (path.startsWith('/swingvideo-list') || path.startsWith('/swingvideo-write')) {
        this.activeMenu = 'community';
        this.activeSubMenu = 'swingvideolist';
      }
      // 고객센터 경로 확인
      else if (path.startsWith('/notice-list') || path.startsWith('/notice-detail')) {
        this.activeMenu = 'customer';
        this.activeSubMenu = 'noticelist';
      } else if (path.startsWith('/contact-write')) {
        this.activeMenu = 'customer';
        this.activeSubMenu = 'contactwrite';
      } else if (path.startsWith('/faq-list')) {
        this.activeMenu = 'customer';
        this.activeSubMenu = 'faqlist';
      } else {
        this.activeMenu = '';
        this.activeSubMenu = '';
      }
    },
    toggleMainMenu(menu) {
      if (this.mainMenuOpen === menu) {
        console.log(`메뉴 닫힘: ${menu}`);
        this.mainMenuOpen = ""; // 같은 메뉴 클릭 시 닫기
      } else {
        console.log(`메뉴 열림: ${menu}`);
        this.mainMenuOpen = menu; // 다른 메뉴 클릭 시 열기
      }
      // dropdownmenu 상태 확인
      console.log(`현재 mainMenuOpen: ${this.mainMenuOpen}`);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      console.log(`메뉴 열림 상태: ${this.menuOpen}`);
    },
    logOut() {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("Token");
      localStorage.removeItem("loginInfo");
      this.$router.push("/"); 
      window.location.reload();
    },
    toGoMyprofile() {
      this.$router.push({ path: "/myprofile" })
    }
  },
};
</script>

<style scoped src="../style/common/header.css"></style>
