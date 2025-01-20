<template>
  <div class="view-176">
    <div class="frame-7636-9" ref="dropdownArea">
      <!-- 홈으로 이동하는 링크 -->
      <router-link :to="{ path: '/' }">
        <img class="frame-7635"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/frame-7635.svg"
          alt="Frame 7635" />
      </router-link>

      <!-- 첫 번째 Frame7291, 클릭 시 드롭다운 열림 -->
      <div @click="toggleDropdown" class="first-nav">
        <frame7291 :text_Label="frame72911Props.text_Label" :className="frame72911Props.className" />
      </div>

      <!-- 두 번째 네비게이션 -->
      <div @click="toggleSecondDropdown" class="second-navbar pretendard-medium-white-18px">
        <div class="second-title">{{ pageTitle }}</div>
        <img class="vector-8-24"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-8.svg"
          alt="Vector 8" />
      </div>

      <!-- 첫 번째 드롭다운 메뉴 -->
       <!-- 24.12.17 수정 - 폰트 추가 -->
      <div v-if="isFirstDropdownOpen" class="dropdown-container pretendard-medium-mine-shaft-18px" @mouseleave="closeDropdown">
        <div class="dropdown-menu">
          <ul>
            <li v-for="(item, index) in dropdownItems" :key="index" class="dropdown-item"
              @click="navigateTo(item.link)">
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 24.12.17 수정 - 폰트 추가 -->
      <div v-if="isSecondDropdownOpen" class="second-dropdown-container pretendard-medium-mine-shaft-18px" @mouseleave="closeSecondDropdown">
        <div class="second-dropdown-menu">
          <ul>
            <li v-for="(item, index) in secondDropdownItems" :key="index" class="second-dropdown-item"
              @click="navigateTo(item.link)">
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Frame7291 from "./Frame7291";

export default {
  name: "RjZsWi",
  components: {
    Frame7291,
  },
  props: ["frame72911Props", "frame72912Props"],
  data() {
    return {
      isFirstDropdownOpen: false,
      isSecondDropdownOpen: false,
      dropdownItems: [
        { label: "기록실", value: "record", link: "/myscorecard" },
        { label: "대회", value: "game", link: "/game-list" },
        { label: "매장·예약", link: "/map-list" },
        { label: "코스", link: "/course-list" },
        { label: "가이드", value: "guide", link: "/system-preparing" },
        { label: "커뮤니티", value: "community", link: "/events-list" },
        { label: "고객센터", value: "support", link: "/notice-list" },
      ],
      secondDropdownItems: [],
      pageTitles: {
        "/game-list": "대회",
        "/mygame-list": "나의 대회",
        "/myscorecard": "스코어 카드",
        "/events-list": "이벤트",
        "/course-list": "코스",
        "/myswingvideos-list": "나의 스윙영상",
        "/map-list": "매장찾기",
        "/system-preparing": "시스템소개",
        "/gameintro-preparing": "게임소개",
        "/gameguide-preparing": "게임가이드",
        "/board-list": "자유게시판",
        "/notice-list": "공지사항",
        "/swingvideo-list": "스윙영상",
        "/contact-write": "1:1 문의",
        "/faq-list": "FAQ",
        "/notice-write": "공지사항",
        "/notice-detail": "공지사항",
        "/board-write": "자유게시판",
        "/board-detail": "자유게시판",
        "/termsview": "약관", // 24.12.20 수정 
        // "/terms-write": "1:1문의",
        "/myprofile": "내정보",
        "/event-detail": "이벤트",
        "/swingvideo-write": "스윙영상",
        "/swingvideo-edit": "스윙영상",
        "/gameinfo-detail": "대회",
        "/course-detail": "코스",
        "/reservation-write": "매장·예약",
        "/reservation-progress": "매장·예약",
        "/event-write":"이벤트"
      },
    };
  },
  computed: {
    // 현재 페이지 경로에 맞는 제목 반환
    pageTitle() {
      return this.pageTitles[this.$route.path] || "";
    },
    // 첫 번째 드롭다운 필터링
    filteredDropdownItems() {
      if (this.$route.path.includes("myscorecard")) {
        return this.dropdownItems.filter((item) => item.value === "record");
      }
      if (
        this.$route.path.includes("game-list") ||
        this.$route.path.includes("mygame-list")
      ) {
        return this.dropdownItems.filter((item) => item.value === "game");
      }
      return this.dropdownItems;
    },
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation();
      this.isFirstDropdownOpen = !this.isFirstDropdownOpen;
    },
    toggleSecondDropdown(event) {
      event.stopPropagation();
      this.isSecondDropdownOpen = !this.isSecondDropdownOpen;

      // 페이지에 따라 두 번째 드롭다운 항목 설정
      if (
        this.$route.path.includes("myscorecard") ||
        this.$route.path.includes("myswingvideos-list")
      ) {
        this.secondDropdownItems = [
          { label: "스코어 카드", link: "/myscorecard" },
          { label: "나의 스윙영상", link: "/myswingvideos-list" },
        ];
      } else if (
        this.$route.path.includes("game-list") ||
        this.$route.path.includes("mygame-list") ||
        this.$route.path.includes("gameinfo-detail")
      ) {
        this.secondDropdownItems = [
          { label: "대회", link: "/game-list" },
          { label: "나의 대회", link: "/mygame-list" },
        ];
      } else if (
        this.$route.path.includes("reservation-write") ||
        this.$route.path.includes("map-list")
      ) {
        this.secondDropdownItems = [
          { label: "매장·예약", link: "/map-list" },
        ];
      } else if (
        this.$route.path.includes("gameintro-preparing") ||
        this.$route.path.includes("gameguide-preparing") ||
        this.$route.path.includes("system-preparing")
      ) {
        this.secondDropdownItems = [
          { label: "시스템소개", link: "/system-preparing" },
          { label: "게임소개", link: "/gameintro-preparing" },
          { label: "게임가이드", link: "/gameguide-preparing" },
        ];
      } else if (
        this.$route.path.includes("events-list") ||
        this.$route.path.includes("board-list") ||
        this.$route.path.includes("swingvideo-list") ||
        this.$route.path.includes("event-detail") ||
        this.$route.path.includes("board-detail") ||
        this.$route.path.includes("board-write") ||
        this.$route.path.includes("swingvideo-edit") ||
        this.$route.path.includes("swingvideo-write")
      ) {
        this.secondDropdownItems = [
          { label: "이벤트", link: "/events-list" },
          { label: "자유게시판", link: "/board-list" },
          { label: "스윙영상", link: "/swingvideo-list" },
        ];
      } else if (
        this.$route.path.includes("notice-list") ||
        this.$route.path.includes("contact-write") ||
        this.$route.path.includes("faq-list") ||
        this.$route.path.includes("notice-write") ||
        this.$route.path.includes("notice-detail") 
        // this.$route.path.includes("termsview") ||
        // this.$route.path.includes("terms-write")
      ) {
        this.secondDropdownItems = [
          { label: "공지사항", link: "/notice-list" },
          { label: "1:1 문의", link: "/contact-write" },
          { label: "FAQ", link: "/faq-list" },
        ];
      } else {
        this.secondDropdownItems = []; // 다른 페이지에서는 두 번째 드롭다운 비활성화
      }
    },
    closeDropdown() {
      this.isFirstDropdownOpen = false;
    },
    closeSecondDropdown() {
      this.isSecondDropdownOpen = false;
    },
    navigateTo(link) {
      this.$router.push(link);
      this.closeDropdown();
      this.closeSecondDropdown();
    },
  },
};
</script>

<style src="@/style/common/navbar.css"></style>
