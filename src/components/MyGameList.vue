<template>
  <div class="container-center-horizontal">
    <div class="mytournament-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">나의 대회</div>
      <!-- 24.11.22 수정 - 코드 간결하게 페이징 되도록 수정 -->
      <!-- 720px 초과 버전 -->
      <div class="content">
        <div class="game_tab">
          <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
            :class="['tab', { active: selectedTab === tab }]" class="pretendard-medium-granite-gray-18px">
            {{ tab }}
          </div>
        </div>

        <div class="card_box">
          <table>
            <thead class="content-head pretendard-bold-mine-shaft-18px">
              <th class="content-head-item pretendard-bold-mine-shaft-18px">진행</th>
              <th class="content-head-item pretendard-bold-mine-shaft-18px">일정</th>
              <th class="content-head-item pretendard-bold-mine-shaft-18px">종류</th>
              <th class="content-head-item pretendard-bold-mine-shaft-18px">대회</th>
              <th class="content-head-item pretendard-bold-mine-shaft-18px">라운드 수</th>
              <th class="content-head-item pretendard-bold-mine-shaft-18px">순위</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedItems" :key="index" class="content-list" @click="goDetailgame(item)">
                <td class="pretendard-semi-bold-monza-14px" :class="[
                  'status-box',
                  {
                    'ended-text': item.type === 'ended',
                    'competition-text': item.type === 'competition',
                    'game-text': item.type === 'game',
                  },
                ]">
                  {{
                    item.type === "game"
                      ? "모집중"
                      : item.type === "competition"
                        ? "진행중"
                        : "종료"
                  }}
                </td>
                <td class="pretendard-regular-normal-granite-gray-16px">
                  {{ item.period }}
                </td>
                <td class="content-list-private">
                  <img class="material-symbolslock-1"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-lock-2.svg"
                    alt="material-symbols:lock" v-if="item.status === 'PRIVATE'" />
                  <div class="pretendard-regular-normal-granite-gray-18px">
                    {{ item.status === "PRIVATE" ? "비공개" : "전체공개" }}
                  </div>
                </td>
                <td class="pretendard-regular-normal-granite-gray-18px">
                  {{ item.name }}
                </td>
                <td class="pretendard-regular-normal-granite-gray-18px">
                  {{ item.round }}
                </td>
                <td class="pretendard-regular-normal-granite-gray-18px">
                  {{ item.ranking }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-controls">
            <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
              :class="{ disabled: currentPage === 1 }" />
            <!-- 24.12.18 수정 - 폰트 추가  -->
            <div class="page-numbers pretendard-medium-log-cabin-16px">
              <!-- 24.12.18 수정 - totalPages - visiblePages 변경 -->
              <div v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
                @click="goToPage(page)">
                {{ page }}
              </div>
            </div>
            <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
              :class="{ disabled: currentPage === totalPages }" />
          </div>
        </div>
      </div>

      <!-- 720px 이하 버전 -->
      <div class="content-1">
        <div class="game_tab">
          <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
            :class="['tab', { active: selectedTab === tab }]"
            class="text-2341 valign-text-middle pretendard-regular-normal-granite-gray-18px">
            {{ tab }}
          </div>
        </div>
        <div class="card_box" v-if="selectedTab === '전체'">
          <div class="mygame-list" v-for="item in paginatedItems" :key="item.id" @click="goDetailgame(item)">
            <div class="list-top">
              <div class="content-list-1 pretendard-medium-monza-16px" :class="[
                'status-box',
                {
                  'ended-text': item.type === 'ended',
                  'competition-text': item.type === 'competition',
                  'game-text': item.type === 'game',
                },
              ]">
                {{
                  item.type === "game"
                    ? "모집중"
                    : item.type === "competition"
                      ? "진행중"
                      : "종료"
                }}
              </div>
              <div class="content-list-1 pretendard-medium-log-cabin-16px">
                {{ item.name }}
              </div>
            </div>
            <div class="content-list-1 pretendard-light-granite-gray-14px">
              일정 ㅣ {{ item.period }}
            </div>
            <div class="list-bottom">
              <div class="list-bottom-left">
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  라운드 수 ㅣ {{ item.round }}
                </span>
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  순위 ㅣ {{ item.ranking }}
                </span>
              </div>
              <div class="content-list-1">
                <img class="material-symbolslock-1"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-lock-2.svg"
                  alt="material-symbols:lock" v-if="item.status === 'PRIVATE'" />
                <div class="pretendard-light-granite-gray-14px">
                  {{ item.status === "PRIVATE" ? "비공개" : "전체공개" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card_box" v-if="selectedTab === '모집중'">
          <div class="mygame-list" v-for="item in paginatedItems" :key="item.id" @click="goDetailgame(item)">
            <div class="list-top">
              <div class="content-list-1 pretendard-medium-monza-16px" :class="[
                'status-box',
                {
                  'ended-text': item.type === 'ended',
                  'competition-text': item.type === 'competition',
                  'game-text': item.type === 'game',
                },
              ]">
                {{
                  item.type === "game"
                    ? "모집중"
                    : item.type === "competition"
                      ? "진행중"
                      : "종료"
                }}
              </div>
              <div class="content-list-1 pretendard-medium-log-cabin-16px">
                {{ item.name }}
              </div>
            </div>
            <div class="content-list-1 pretendard-light-granite-gray-14px">
              일정 ㅣ {{ item.period }}
            </div>
            <div class="list-bottom">
              <div class="list-bottom-left">
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  라운드 수 ㅣ {{ item.round }}
                </span>
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  순위 ㅣ {{ item.ranking }}
                </span>
              </div>
              <div class="content-list-1">
                <img class="material-symbolslock-1"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-lock-2.svg"
                  alt="material-symbols:lock" v-if="item.status === 'PRIVATE'" />
                <div class="pretendard-light-granite-gray-14px">
                  {{ item.status === "PRIVATE" ? "비공개" : "전체공개" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card_box" v-if="selectedTab === '진행중'">
          <div class="mygame-list" v-for="item in paginatedItems" :key="item.id" @click="goDetailgame(item)">
            <div class="list-top">
              <div class="content-list-1 pretendard-medium-monza-16px" :class="[
                'status-box',
                {
                  'ended-text': item.type === 'ended',
                  'competition-text': item.type === 'competition',
                  'game-text': item.type === 'game',
                },
              ]">
                {{
                  item.type === "game"
                    ? "모집중"
                    : item.type === "competition"
                      ? "진행중"
                      : "종료"
                }}
              </div>
              <div class="content-list-1 pretendard-medium-log-cabin-16px">
                {{ item.name }}
              </div>
            </div>
            <div class="content-list-1 pretendard-light-granite-gray-14px">
              일정 ㅣ {{ item.period }}
            </div>
            <div class="list-bottom">
              <div class="list-bottom-left">
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  라운드 수 ㅣ {{ item.round }}
                </span>
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  순위 ㅣ {{ item.ranking }}
                </span>
              </div>
              <div class="content-list-1">
                <img class="material-symbolslock-1"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-lock-2.svg"
                  alt="material-symbols:lock" v-if="item.status === 'PRIVATE'" />
                <div class="pretendard-light-granite-gray-14px">
                  {{ item.status === "PRIVATE" ? "비공개" : "전체공개" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card_box" v-if="selectedTab === '종료'">
          <div class="mygame-list" v-for="item in paginatedItems" :key="item.id" @click="goDetailgame(item)">
            <div class="list-top">
              <div class="content-list-1 pretendard-medium-monza-16px" :class="[
                'status-box',
                {
                  'ended-text': item.type === 'ended',
                  'competition-text': item.type === 'competition',
                  'game-text': item.type === 'game',
                },
              ]">
                {{
                  item.type === "game"
                    ? "모집중"
                    : item.type === "competition"
                      ? "진행중"
                      : "종료"
                }}
              </div>
              <div class="content-list-1 pretendard-medium-log-cabin-16px">
                {{ item.name }}
              </div>
            </div>
            <div class="content-list-1 pretendard-light-granite-gray-14px">
              일정 ㅣ {{ item.period }}
            </div>
            <div class="list-bottom">
              <div class="list-bottom-left">
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  라운드 수 ㅣ {{ item.round }}
                </span>
                <span class="content-list-1 pretendard-light-granite-gray-14px">
                  순위 ㅣ {{ item.ranking }}
                </span>
              </div>
              <div class="content-list-1">
                <img class="material-symbolslock-1"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-lock-2.svg"
                  alt="material-symbols:lock" v-if="item.status === 'PRIVATE'" />
                <div class="pretendard-light-granite-gray-14px">
                  {{ item.status === "PRIVATE" ? "비공개" : "전체공개" }}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="pagination-controls">
          <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
            :class="{ disabled: currentPage === 1 }" />
          <!-- 24.12.18 수정 - 폰트 추가  -->
          <div class="page-numbers pretendard-medium-log-cabin-16px">
            <!-- 24.12.18 수정 - totalPages - visiblePages 변경 -->
            <div v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
              @click="goToPage(page)">
              {{ page }}
            </div>
          </div>
          <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
            :class="{ disabled: currentPage === totalPages }" />
        </div>

      </div>
      <PGamePasswordModalno2 v-if="isModalVisible" @close="closeModal" @submit-password="handlePasswordSubmit" />
      <XFooter />
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore"; // API 호출

import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import PGamePasswordModalno2 from "./PGamePasswordModalno2";

export default {
  name: "MyGameList",
  components: {
    Header,
    RjZsWi,
    XFooter,
    PGamePasswordModalno2,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      myGameDt: [],
      tabs: ["전체", "모집중", "진행중", "종료"],
      isModalVisible: false,
      selectedTab: "전체",
      selectedItemId: null,
      currentPage: 1,
      itemsPerPage: 5, // 페이지당 5개 항목 표시
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      items: [],
    };
  },
  computed: {
         // 24.12.18 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
    visiblePages() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      const maxVisiblePages = 5;

      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    filteredItems() {
      // 탭 전환 시 필터링 데이터 확인
      console.log("Selected Tab:", this.selectedTab);
      console.log("Filtered Items:", this.items);
      // 탭에 따라 데이터 필터링
      if (this.selectedTab === "전체") {
        return this.items;
      } else if (this.selectedTab === "모집중") {
        return this.items.filter(item => item.type === "game");
      } else if (this.selectedTab === "진행중") {
        return this.items.filter(item => item.type === "competition");
      } else if (this.selectedTab === "종료") {
        return this.items.filter(item => item.type === "ended");
      }
    },
    paginatedItems() {
      console.log("Paginated Items:", this.filteredItems.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage));
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    totalPages() {
      console.log("Filtered Items Length:", this.filteredItems.length);
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.getMyGameUserDt();
  },
  methods: {
    async getMyGameUserDt() {
      try {
        const response = await taskStore.getSelectTasks(
          "competitions/users/me/competitions"
        );
        //if (!response || response.length === 0) {
        //  alert("로그인해주세요.");
        //  this.$router.push("/login"); // 로그인 페이지로 리다이렉트
        //   return;
        // }
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 시간 부분을 00:00:00으로 설정하여 날짜만 비교

        this.items = response.map((card) => {
          // 날짜 포맷팅: "YYYY-MM-DD" 형식으로 변환
          const formattedStartDate = card.startDate
            ? card.startDate.split("T")[0]
            : "";
          const formattedEndDate = card.endDate
            ? card.endDate.split("T")[0]
            : "";

          const startDate = new Date(formattedStartDate);
          const endDate = new Date(formattedEndDate);

          // 타입 계산
          let type = "game"; // 기본값
          if (startDate && endDate) {
            if (endDate < today) {
              type = "ended";
            } else if (startDate <= today && today <= endDate) {
              type = "competition";
            }
          }

          return {
            ...card,
            type, // "종료", "진행중", "모집중" 값을 저장

            period: `${formattedStartDate} ~ ${formattedEndDate}`, // 기간 설정
          };
        });

        console.log("Fetched Competitions:", this.items);
      } catch (error) {
        console.error("Failed to fetch competition data:", error);
      }
    },

    openPGameModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goDetailgame(item) {
      if (item.type === "ended") {
        alert("종료된 대회는 입장할 수 없습니다.");
        return;
      }
      if (item.status === "PRIVATE") {
        // PRIVATE 상태인 경우 비밀번호 입력 모달 표시
        this.selectedItemId = item.id;
        this.openPGameModal();
      } else {
        // PRIVATE 상태가 아닌 경우 바로 상세 페이지로 이동
        this.$router.push({
          name: "gameInfoDetail",
          params: { id: item.id, type: item.type }, // type 값을 그대로 전달
        });
      }
    },
    selectTab(tab) {
      console.log("Selected Tab:", tab);
      this.selectedTab = tab;
      this.currentPage = 1; // 탭 변경 시 페이지 초기화
    },
    goToPage(page) {
      console.log("Navigating to page:", page);
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        console.log("Going to previous page:", this.currentPage - 1);
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        console.log("Going to next page:", this.currentPage + 1);
        this.currentPage++;
      }
    },
    goDetailgame(item) {
      if (item.type === "ended") {
        alert("종료된 대회는 입장할 수 없습니다.");
        return;
      }
      if (item.status === "PRIVATE") {
        // PRIVATE 상태인 경우 비밀번호 입력 모달 표시
        this.selectedItemId = item.id;
        this.openPGameModal();
      } else {
        // PRIVATE 상태가 아닌 경우 바로 상세 페이지로 이동
        this.$router.push({
          name: "gameInfoDetail",
          params: { id: item.id, type: item.type }, // type 값을 그대로 전달
        });
      }
    },
    handlePasswordSubmit(password) {
      // 선택된 대회를 가져옵니다.
      const selectedCard = this.items.find(
        (item) => item.id === this.selectedItemId
      );

      if (!selectedCard) {
        console.error("선택된 대회를 찾을 수 없습니다.");
        alert("선택된 대회가 없습니다.");
        return;
      }

      // 종료된 대회 확인
      if (selectedCard.type === "ended") {
        alert("종료된 대회는 입장할 수 없습니다.");
        return;
      }

      // 비밀번호 일치 여부 확인
      if (String(password) === String(selectedCard.passWord)) {
        // alert("비밀번호가 일치합니다.");
        this.closeModal();
        this.$router.push({
          name: "gameInfoDetail",
          params: { id: selectedCard.id, type: selectedCard.type },
        });
      } else {
        console.error("비밀번호가 일치하지 않습니다.");
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
    ,
    // prevPage() {
    //   if (this.selectedTab === "전체" && this.currentPageEntire > 1) {
    //     this.currentPageEntire--;
    //   } else if (this.selectedTab === "모집중" && this.currentPageGame > 1) {
    //     this.currentPageGame--;
    //   } else if (this.selectedTab === "진행중" && this.currentPageCompetition > 1) {
    //     this.currentPageCompetition--;
    //   } else if (this.selectedTab === "종료" && this.currentPageEnded > 1) {
    //     this.currentPageEnded--;
    //   }
    // },
    // nextPage() {
    //   if (
    //     this.selectedTab === "전체" &&
    //     this.currentPageEntire < this.totalPages
    //   ) {
    //     this.currentPageEntire++;
    //   } else if (
    //     this.selectedTab === "모집중" &&
    //     this.currentPageGame < this.totalPages
    //   ) {
    //     this.currentPageGame++;
    //   } else if (
    //     this.selectedTab === "진행중" &&
    //     this.currentPageCompetition < this.totalPages
    //   ) {
    //     this.currentPageCompetition++;
    //   } else if (
    //     this.selectedTab === "종료" &&
    //     this.currentPageEnded < this.totalPages
    //   ) {
    //     this.currentPageEnded++;
    //   }
    // },
    // goToPage(page, type) {
    //   if (type === "entire") {
    //     this.currentPageEntire = page;
    //   } else if (type === "game") {
    //     this.currentPageGame = page;
    //   } else if (type === "competition") {
    //     this.currentPageCompetition = page;
    //   } else if (type === "ended") {
    //     this.currentPageEnded = page;
    //   }
    // },
  },
};
</script>

<style scoped src="@/style/game/mygamelist.css" />
