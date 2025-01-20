<template>
  <div class="container-center-horizontal">
    <div class="tournaments-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">대회</div>
      <div class="select-box">
        <div class="select-style">
          <!-- 대회이름을 선택할 수 있는 select box -->
          <!-- 24.11.21 수정 - v-model 추가 -->
          <select class="select-text pretendard-regular-normal-mine-shaft-18px" v-model="selectedOption">
            <!-- 24.11.20 수정 - option 수정  -->
            <option class="pretendard-regular-normal-mine-shaft-18px" value="name" selected>대회이름</option>
            <!-- 24.11.21 수정 - 고유번호 추가 -->
            <option class="pretendard-regular-normal-mine-shaft-18px" value="id">대회고유번호</option>
          </select>
        </div>
        <div class="input-style">
          <!-- 검색어 입력 필드 -->
          <input type="text" class="input-text pretendard-regular-normal-mountain-mist-18px" placeholder="검색어를 입력해주세요"
            v-model="searchQuery" />
          <img class="search-btn-10"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
            alt="searchBtn" />
        </div>
      </div>
      <div class="content">
        <!-- 게임 탭 -->
        <div class="game_tab">
          <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
            :class="['tab', { active: selectedTab === tab }]" class="pretendard-medium-granite-gray-18px">
            {{ tab }}
          </div>
        </div>

        <!-- 전체 탭 -->
        <div class="card_box" v-if="selectedTab === '전체'">
          <div class="table_box">
            <!-- 24.11.21 수정 - class 추가 -->
            <div v-for="card in paginatedCardsEntire" :key="card.id" class="card" @click="goDetailgame(card)"
              :class="{ 'disabled-card': card.type === 'ended' }">
              <div class="photo-card">
                <div class="photo-header">
                  <div :class="['status-box', card.type]" class="pretendard-semi-bold-white-12px">
                    {{ card.type === "game" ? "모집중" : card.type === "competition" ? "진행중" : "종료" }}
                  </div>
                  <!-- 자물쇠 이미지: disable이 0일 때만 보이게 설정 -->
                  <img class="white-lock" src="../../img/white-lock.png" v-if="card.status === 'PRIVATE'" />
                </div>
                <!-- <img :src="card.image" alt="대회 이미지" class="card-image" /> -->
                <!-- 24.12.04 수정 - 추가 -->
                <img :src="card.image && card.image.trim() ? card.image : basicCardImage" alt="대회 이미지"
                  class="card-image" />
              </div>
              <div class="card-info">
                <h2 class="pretendard-bold-log-cabin-24px">{{ card.name }}</h2>
                <div>
                  <span class="pretendard-light-granite-gray-16px">번호</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.id }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">기간</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.period }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">진행</span>
                  <div>
                    <p v-for="(info, index) in getShopInfo(card.shop)" :key="index"
                      class="pretendard-regular-normal-log-cabin-16px">
                      {{ info }}
                    </p>
                  </div>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">조건</span>
                  <!-- <div class="condition">
                    <p class="pretendard-regular-normal-log-cabin-16px">
                      {{ card.rank }}등급 /
                    </p>
                    <p class="pretendard-regular-normal-log-cabin-16px">
                      {{ card.gender }} /
                    </p>
                    <p class="pretendard-regular-normal-log-cabin-16px">
                      {{ card.ageRange }}
                    </p>
                  </div> -->
                  <!-- 24.12.06 수정 - 조건 입력하지 않았을 경우 참가조건없음으로 출력 -->
                  <div class="condition pretendard-regular-normal-log-cabin-16px">
                    <!-- 모든 조건이 기본값일 경우 "참가 조건 없음" 출력 -->
                    <!-- <p class="pretendard-regular-normal-log-cabin-16px">
                      {{ (card.rank === "등급" && card.gender === "성별" && card.ageRange === "나이범위")
                        ? "참가 조건 없음"
                        : (card.rank !== "등급" ? card.rank + "등급" : "") +
                        (card.rank !== "등급" && card.gender !== "성별" ? " " : "") +
                        (card.rank !== "등급" && card.ageRange !== "나이범위" ? " / " : "") +
                        (card.gender !== "성별" ? card.gender : "") +
                        ((card.gender !== "성별" && card.ageRange !== "나이범위") ? " / " : "") +
                        (card.ageRange !== "나이범위" ? card.ageRange : "") }}
                    </p> -->
                    <!-- 24.12.18 수정 - 추가 -->
                    <p v-html="formatCondition(card, isMobile)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 모집중 탭 -->
        <div class="card_box" v-else-if="selectedTab === '모집중'">
          <div class="table_box">
            <div v-for="card in paginatedCardsGame" :key="card.id" class="card" @click="goDetailgame(card)">
              <div class="photo-card">
                <div class="photo-header">
                  <div class="status-box game pretendard-semi-bold-white-12px">모집중</div>
                  <!-- 자물쇠 이미지: disable이 0일 때만 보이게 설정 -->
                  <img class="white-lock" src="../../img/white-lock.png" v-if="card.status === 'PRIVATE'" />
                </div>
                <!-- <img :src="card.image" alt="대회 이미지" class="card-image" /> -->
                <!-- 24.12.04 수정 - 추가 -->
                <img :src="card.image && card.image.trim() ? card.image : basicCardImage" alt="대회 이미지"
                  class="card-image" />
              </div>
              <div class="card-info">
                <h2 class="pretendard-bold-log-cabin-24px">{{ card.name }}</h2>
                <div>
                  <span class="pretendard-light-granite-gray-16px">번호</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.id }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">기간</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.period }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">진행</span>
                  <div>
                    <p v-for="(info, index) in getShopInfo(card.shop)" :key="index"
                      class="pretendard-regular-normal-log-cabin-16px">
                      {{ info }}
                    </p>
                  </div>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">조건</span>
                  <!-- 24.12.06 수정 - 조건 입력하지 않았을 경우 참가조건없음으로 출력 -->
                  <div class="condition pretendard-regular-normal-log-cabin-16px">
                    <!-- 모든 조건이 기본값일 경우 "참가 조건 없음" 출력 -->
                    <!-- <p class="pretendard-regular-normal-log-cabin-16px">
                      {{ (card.rank === "등급" && card.gender === "성별" && card.ageRange === "나이범위")
                        ? "참가 조건 없음"
                        : (card.rank !== "등급" ? card.rank + "등급" : "") +
                        (card.rank !== "등급" && card.gender !== "성별" ? " " : "") +
                        (card.rank !== "등급" && card.ageRange !== "나이범위" ? " / " : "") +
                        (card.gender !== "성별" ? card.gender : "") +
                        ((card.gender !== "성별" && card.ageRange !== "나이범위") ? " / " : "") +
                        (card.ageRange !== "나이범위" ? card.ageRange : "") }}
                    </p> -->
                    <!-- 24.12.18 수정 - 추가 -->
                    <p v-html="formatCondition(card, isMobile)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 진행중 탭 -->
        <div class="card_box" v-else-if="selectedTab === '진행중'">
          <div class="table_box">
            <div v-for="card in paginatedCardsCompetition" :key="card.id" class="card" @click="goDetailgame(card)">
              <div class="photo-card">
                <div class="photo-header">
                  <div class="status-box competition pretendard-semi-bold-white-12px">진행중</div>
                  <!-- 자물쇠 이미지: disable이 0일 때만 보이게 설정 -->
                  <img class="white-lock" src="../../img/white-lock.png" v-if="card.status === 'PRIVATE'" />
                </div>
                <!-- <img :src="card.image" alt="대회 이미지" class="card-image" /> -->
                <!-- 24.12.04 수정 - 추가 -->
                <img :src="card.image && card.image.trim() ? card.image : basicCardImage" alt="대회 이미지"
                  class="card-image" />
              </div>
              <div class="card-info">
                <h2 class="pretendard-bold-log-cabin-24px">{{ card.name }}</h2>
                <div>
                  <span class="pretendard-light-granite-gray-16px">번호</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.id }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">기간</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.period }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">진행</span>
                  <div>
                    <p v-for="(info, index) in getShopInfo(card.shop)" :key="index"
                      class="pretendard-regular-normal-log-cabin-16px">
                      {{ info }}
                    </p>
                  </div>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">조건</span>
                  <!-- 24.12.06 수정 - 조건 입력하지 않았을 경우 참가조건없음으로 출력 -->
                  <div class="condition pretendard-regular-normal-log-cabin-16px">
                    <!-- 모든 조건이 기본값일 경우 "참가 조건 없음" 출력 -->
                    <!-- <p class="pretendard-regular-normal-log-cabin-16px">
                      {{ (card.rank === "등급" && card.gender === "성별" && card.ageRange === "나이범위")
                        ? "참가 조건 없음"
                        : (card.rank !== "등급" ? card.rank + "등급" : "") +
                        (card.rank !== "등급" && card.gender !== "성별" ? " " : "") +
                        (card.rank !== "등급" && card.ageRange !== "나이범위" ? " / " : "") +
                        (card.gender !== "성별" ? card.gender : "") +
                        ((card.gender !== "성별" && card.ageRange !== "나이범위") ? " / " : "") +
                        (card.ageRange !== "나이범위" ? card.ageRange : "") }}
                    </p> -->
                    <!-- 24.12.18 수정 - 추가 -->
                    <p v-html="formatCondition(card, isMobile)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 종료 탭 -->
        <div class="card_box" v-else-if="selectedTab === '종료'">
          <div class="table_box">
            <div v-for="card in paginatedCardsEnded" :key="card.id" class="card" @click="goDetailgame(card)"
              :class="{ 'disabled-card': card.type === 'ended' }">
              <div class="photo-card">
                <div class="photo-header">
                  <div class="status-box ended pretendard-semi-bold-white-12px">종료</div>
                  <!-- 자물쇠 이미지: disable이 0일 때만 보이게 설정 -->
                  <img class="white-lock" src="../../img/white-lock.png" v-if="card.status === 'PRIVATE'" />
                </div>
                <!-- <img :src="card.image" alt="대회 이미지" class="card-image" /> -->
                <!-- 24.12.04 수정 - 추가 -->
                <img :src="card.image && card.image.trim() ? card.image : basicCardImage" alt="대회 이미지"
                  class="card-image" />
              </div>
              <div class="card-info">
                <h2 class="pretendard-bold-log-cabin-24px">{{ card.name }}</h2>
                <div>
                  <span class="pretendard-light-granite-gray-16px">번호</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.id }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">기간</span>
                  <p class="pretendard-regular-normal-log-cabin-16px">{{ card.period }}</p>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">진행</span>
                  <div>
                    <p v-for="(info, index) in getShopInfo(card.shop)" :key="index"
                      class="pretendard-regular-normal-log-cabin-16px">
                      {{ info }}
                    </p>
                  </div>
                </div>
                <div>
                  <span class="pretendard-light-granite-gray-16px">조건</span>
                  <!-- 24.12.06 수정 - 조건 입력하지 않았을 경우 참가조건없음으로 출력 -->
                  <div class="condition pretendard-regular-normal-log-cabin-16px">
                    <!-- 모든 조건이 기본값일 경우 "참가 조건 없음" 출력 -->
                    <!-- <p class="pretendard-regular-normal-log-cabin-16px">
                      {{ (card.rank === "등급" && card.gender === "성별" && card.ageRange === "나이범위")
                        ? "참가 조건 없음"
                        : (card.rank !== "등급" ? card.rank + "등급" : "") +
                        (card.rank !== "등급" && card.gender !== "성별" ? " " : "") +
                        (card.rank !== "등급" && card.ageRange !== "나이범위" ? " / " : "") +
                        (card.gender !== "성별" ? card.gender : "") +
                        ((card.gender !== "성별" && card.ageRange !== "나이범위") ? " / " : "") +
                        (card.ageRange !== "나이범위" ? card.ageRange : "") }}
                    </p> -->
                    <!-- 24.12.18 수정 - 추가 -->
                    <p v-html="formatCondition(card, isMobile)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 페이징 버튼 탭 -->
        <!-- 전체 페이징 버튼 탭 -->
        <div class="paging" v-if="totalPagesEntire > 0" v-show="selectedTab === '전체'">
          <button @click="prevPage('entire')" :disabled="currentPageEntire === 1" class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="이전 페이지" />
          </button>
          <div class="paging-numbers pretendard-medium-log-cabin-16px">
            <!-- <div v-for="page in totalPagesEntire"-->
            <!-- 24.12.10 수정 - 5페이지 까지만 보이도록 수정 -->
            <div v-for="page in displayPages(totalPagesEntire, currentPageEntire)" :key="page"
              @click="goToPage(page, 'entire')" :class="['paging-number', { active: currentPageEntire === page }]"
              class="pretendard-medium-log-cabin-16px">
              {{ page }}
            </div>
          </div>
          <button @click="nextPage('entire')" :disabled="currentPageEntire === totalPagesEntire" class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="다음 페이지" class="flipped" />
          </button>
        </div>
        <!-- 모집중 페이징 버튼 탭 -->
        <div class="paging" v-if="totalPagesGame > 0" v-show="selectedTab === '모집중'">
          <button @click="prevPage('game')" :disabled="currentPageGame === 1" class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="이전 페이지" />
          </button>
          <div class="paging-numbers pretendard-medium-log-cabin-16px">
            <!-- <div v-for="page in totalPagesGame"  -->
            <!-- 24.12.10 수정 - 5페이지 까지만 보이도록 수정 -->
            <div v-for="page in displayPages(totalPagesGame, currentPageGame)" :key="page"
              @click="goToPage(page, 'game')" :class="['paging-number', { active: currentPageGame === page }]"
              class="pretendard-medium-log-cabin-16px">
              {{ page }}
            </div>
          </div>
          <button @click=" nextPage('game')" :disabled="currentPageGame === totalPagesGame" class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="다음 페이지" class="flipped" />
          </button>
        </div>
        <!-- 진행중 페이징 버튼 탭 -->
        <div class="paging" v-if="totalPagesCompetition > 0" v-show="selectedTab === '진행중'">
          <button @click="prevPage('competition')" :disabled="currentPageCompetition === 1" class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="이전 페이지" />
          </button>
          <div class="paging-numbers pretendard-medium-log-cabin-16px">
            <!-- <div v-for="page in totalPagesCompetition"  -->
            <!-- 24.12.10 수정 - 5페이지 까지만 보이도록 수정 -->
            <div v-for="page in displayPages(totalPagesCompetition, currentPageCompetition)" :key="page"
              @click="goToPage(page, 'competition')" :class="['paging-number',
                { active: currentPageCompetition === page },
              ]" class="pretendard-medium-log-cabin-16px">
              {{ page }}
            </div>
          </div>
          <button @click=" nextPage('competition')" :disabled="currentPageCompetition === totalPagesCompetition"
            class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="다음 페이지" class="flipped" />
          </button>
        </div>
        <!-- 종료 페이징 버튼 탭 -->
        <div class="paging" v-if="totalPagesEnded > 0" v-show="selectedTab === '종료'">
          <button @click="prevPage('ended')" :disabled="currentPageEnded === 1" class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="이전 페이지" />
          </button>
          <div class="paging-numbers pretendard-medium-log-cabin-16px">
            <!-- <div v-for="page in totalPagesEnded"  -->
            <!-- 24.12.10 수정 - 5페이지 까지만 보이도록 수정 -->
            <div v-for="page in displayPages(totalPagesEnded, currentPageEnded)" :key="page"
              @click="goToPage(page, 'ended')" :class="['paging-number', { active: currentPageEnded === page }]"
              class="pretendard-medium-log-cabin-16px">
              {{ page }}
            </div>
          </div>
          <button @click=" nextPage('ended')" :disabled="currentPageEnded === totalPagesEnded" class="paging-button">
            <img
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg"
              alt="다음 페이지" class="flipped" />
          </button>
        </div>
      </div>
      <XFooter />
      <PGamePasswordModalno2 v-if="isModalVisible" @close="closeModal" @submit-password="handlePasswordSubmit" />
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore";
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import PGamePasswordModalno2 from './PGamePasswordModalno2.vue';
export default {
  name: "GameList",

  components: {
    Header,
    RjZsWi,
    XFooter,
    PGamePasswordModalno2
  },
  data() {
    return {
      selectedCardId: null,
      searchQuery: "",
      selectedOption: "name", // 24.11.21 수정 - 선택한 검색 기준 (기본값: "name")
      isModalVisible: false,
      // gameGoingDt: [],
      // gameAvailDt: [],
      // gameListlDt: [],
      tabs: ["전체", "모집중", "진행중", "종료"],
      selectedTab: "전체",
      currentPageEntire: 1,
      cardsPerPage: 6, // Number of cards per page
      currentPageGame: 1,
      currentPageCompetition: 1,
      currentPageEnded: 1,
      // isModalVisible: false,
      cards: [],
      // 24.12.04 수정 - 추가
      basicCardImage: require('../../img/CK_ti436a27207 1.png'),
      isMobile: window.innerWidth <= 720 // 24.12.18 수정 - 추가 : 모바일 화면 너비 감지 (720px 이하)
    };
  },
  props: [
    "materialSymbolsClose",
    "rJZsWIProps",
  ],

  computed: {
    filteredItems() {
      if (!this.searchQuery.trim()) {
        console.log("검색어 없음, 전체 반환:", this.cards);
        return this.cards; // 검색어가 없으면 전체 코스 반환
      }
      const query = this.searchQuery.toLowerCase();
      // const result = this.cards.filter(card =>
      //   card.name.toLowerCase().includes(query)
      // );
      // 24.11.21 수정 - 필터링 추가 수정
      // 선택한 옵션(selectedOption)에 따라 필터링
      const result = this.cards.filter((card) =>
        card[this.selectedOption]?.toString().toLowerCase().includes(query)
      );
      console.log("검색 결과:", result);
      return result;
    },

    filteredCardsEntire() {
      return this.cards.filter(
        (card) =>
          card.type === "game" ||
          card.type === "competition" ||
          card.type === "ended"
      );
    },
    filteredCardsGame() {
      return this.cards.filter((card) => card.type === "game");
    },
    filteredCardsCompetition() {
      return this.cards.filter((card) => card.type === "competition");
    },
    filteredCardsEnded() {
      return this.cards.filter((card) => card.type === "ended");
    },
    totalPagesEntire() {
      return Math.ceil(this.filteredItems.length / this.cardsPerPage);
    },
    totalPagesGame() {
      return Math.ceil(this.filteredCardsGame.length / this.cardsPerPage);
    },
    totalPagesCompetition() {
      return Math.ceil(
        this.filteredCardsCompetition.length / this.cardsPerPage
      );
    },
    totalPagesEnded() {
      return Math.ceil(this.filteredCardsEnded.length / this.cardsPerPage);
    },
    paginatedCardsEntire() {
      const start = (this.currentPageEntire - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      const paginatedResult = this.filteredItems.slice(start, end);
      console.log("페이징 결과:", paginatedResult);
      return paginatedResult;
    },
    paginatedCardsGame() {
      const start = (this.currentPageGame - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return this.filteredCardsGame.slice(start, end);
    },
    paginatedCardsCompetition() {
      const start = (this.currentPageCompetition - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return this.filteredCardsCompetition.slice(start, end);
    },
    paginatedCardsEnded() {
      const start = (this.currentPageEnded - 1) * this.cardsPerPage;
      const end = start + this.cardsPerPage;
      return this.filteredCardsEnded.slice(start, end);
    },
  },
  mounted() {
    this.getMGame();
    // 24.12.18 수정 - 추가
    window.addEventListener('resize', this.checkIsMobile);
  },
  // 24.12.10 수정 - 추가
  watch: {
    // 24.12.10 수정 - 추가
    filteredItems() {
      this.currentPageEntire = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
    // 24.12.10 수정 - 추가
    filteredCardsGame() {
      this.currentPageGame = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
    // 24.12.10 수정 - 추가
    filteredCardsCompetition() {
      this.currentPageCompetition = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
    // 24.12.10 수정 - 추가
    filteredCardsEnded() {
      this.currentPageEnded = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  // 24.12.18 수정 - 추가
  beforeDestroy() {
    window.removeEventListener('resize', this.checkIsMobile);
  },
  methods: {
    // 24.12.18 수정 - 추가
    formatCondition(card, isMobile) {
      // 조건이 모두 기본값이면 '참가 조건 없음' 반환
      if (card.rank === "등급" && card.gender === "성별" && card.ageRange === "나이범위") {
        return "참가 조건 없음";
      }

      const condition = [
        card.rank !== "등급" ? `${card.rank}등급` : "",
        card.gender !== "성별" ? card.gender : "",
        card.ageRange !== "나이범위" ? card.ageRange : ""
      ].filter(Boolean).join(" / "); // 빈값 제거 후 " / "로 결합

      // 모바일에서만 줄바꿈 적용
      return isMobile ? condition.replace(/\s\/\s/g, "<br><br>") : condition;
    },
    // 24.12.18 수정 - 추가
    checkIsMobile() {
      this.isMobile = window.innerWidth <= 720;
    },
    // 24.12.10 수정 - 추가
    displayPages(totalPages, currentPage) {
      const maxVisible = 5; // 최대 표시할 페이지 버튼 수
      const half = Math.floor(maxVisible / 2);

      let start = currentPage - half > 1 ? currentPage - half : 1;
      let end = start + maxVisible - 1 > totalPages ? totalPages : start + maxVisible - 1;

      // 시작이 1보다 작아지지 않도록 보정
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    async getMGame() {
      try {
        const response = await taskStore.getSelectTasks("competitions");
        console.log("전체 응답 구조 123:", response); // 전체 응답 구조 확인

        // response와 response.data가 모두 존재하는지 확인하고 competitions 배열을 일반 객체로 변환
        // const competitionsData = JSON.parse(JSON.stringify(response?.data?.competitions || []));
        // array.forEach(element => {

        // 24.11.20 - 추가
        // 오늘 날짜를 Date 객체로 생성
        const today = new Date();
        console.log('today 123', today)
        today.setHours(0, 0, 0, 0); // 시간 부분을 00:00:00으로 설정하여 날짜만 비교

        this.cards = response.map(card => {
          // 날짜 포맷팅: "YYYY-MM-DD" 형식으로 변환
          const formattedStartDate = card.startDate ? card.startDate.split('T')[0] : '';
          const formattedEndDate = card.endDate ? card.endDate.split('T')[0] : '';

          // 24.11.20 수정 - 추가
          const startDate = new Date(formattedStartDate);
          const endDate = new Date(formattedEndDate);

          // Date 객체로 변환되었는지 확인
          if (startDate instanceof Date && !isNaN(startDate.getTime())) {
            startDate.setHours(0, 0, 0, 0); // 시간 부분을 00:00:00으로 설정하여 날짜만 비교
          } else {
            console.error("startDate가 잘못된 형식입니다: ", card.startDate);
          }

          if (endDate instanceof Date && !isNaN(endDate.getTime())) {
            endDate.setHours(0, 0, 0, 0); // 시간 부분을 00:00:00으로 설정하여 날짜만 비교
          } else {
            console.error("endDate가 잘못된 형식입니다: ", card.endDate);
          }

          // period와 today를 비교하여 type 계산
          let type = "game"; // 기본값
          if (startDate && endDate) {
            if (endDate < today) {
              type = "ended";
            } else if (startDate <= today && today <= endDate) {
              type = "competition";
            }
          }

          return {
            id: card.id,
            name: card.name,
            image: card.posterUrl || null,
            period: `${formattedStartDate} ~ ${formattedEndDate}`, // 포맷된 날짜 사용
            // type: card.status === "ONGOING" ? "game" : card.status === "COMPETITION" ? "competition" : "ended",
            // 24.11.20 수정 - 추가
            status: card.status,
            // 24.11.20 수정 - 추가
            passWord: card.passWord,
            type,
            shop: card.branchNames || [], // shop이 undefined일 경우 빈 배열로 설정
            rank: card.rank || "-", // 추가
            gender: card.gender || "-", // 추가
            ageRange: card.ageRange || "-", // 추가
            isSelected: false
          };
        });

        // 24.11.21 수정 - 추가
        // type에 따라 정렬: "ended"는 맨 뒤로
        this.cards.sort((a, b) => {
          if (a.type === "ended" && b.type !== "ended") return 1; // a가 "ended"이고 b가 "ended"가 아닌 경우
          if (a.type !== "ended" && b.type === "ended") return -1; // b가 "ended"이고 a가 "ended"가 아닌 경우
          return 0; // 나머지는 그대로 유지
        });

        console.log("cards : : : ", this.cards); // 변환된 cards 데이터 확인

      } catch (error) {
        console.error("대회 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    // async getGameGoingDt() {
    //   this.gameGoingDt = await taskStore.getTask(`/api/tournaments/ongoing`);
    //   console.log("this.gameGoingDt : : : : : : ", this.gameGoingDt)
    // },
    // async getGameAvailDt() {
    //   this.gameAvailDt = await taskStore.getTask(`/api/tournaments/available`);
    //   console.log("this.gameAvailDt : : : : : : ", this.gameAvailDt)
    // },
    // async getGameListlDt(tournamentId) {
    //   this.gameListlDt = await taskStore.getTask(`/api/tournaments/info/${tournamentId}`);
    //   console.log("this.gameListlDt : : : : : : ", this.gameListlDt)
    // },
    prevPage(type) {
      if (type === "entire" && this.currentPageEntire > 1) {
        this.currentPageEntire--;
      } else if (type === "game" && this.currentPageGame > 1) {
        this.currentPageGame--;
      } else if (type === "competition" && this.currentPageCompetition > 1) {
        this.currentPageCompetition--;
      } else if (type === "ended" && this.currentPageEnded > 1) {
        this.currentPageEnded--;
      }
    },
    nextPage(type) {
      if (type === "entire" && this.currentPageEntire < this.totalPagesEntire) {
        this.currentPageEntire++;
      } else if (
        type === "game" &&
        this.currentPageGame < this.totalPagesGame
      ) {
        this.currentPageGame++;
      } else if (
        type === "competition" &&
        this.currentPageCompetition < this.totalPagesCompetition
      ) {
        this.currentPageCompetition++;
      } else if (
        type === "ended" &&
        this.currentPageEnded < this.totalPagesEnded
      ) {
        this.currentPageEnded++;
      }
    },
    goToPage(page, type) {
      if (type === "entire") {
        this.currentPageEntire = page;
      } else if (type === "game") {
        this.currentPageGame = page;
      } else if (type === "competition") {
        this.currentPageCompetition = page;
      } else if (type === "ended") {
        this.currentPageEnded = page;
      }
    },
    selectTab(tab) {
      this.selectedTab = tab;
      this.currentPageEntire = 1;
      this.currentPageGame = 1;
      this.currentPageCompetition = 1;
      this.currentPageEnded = 1;
    },
    getShopInfo(shop) {
      if (!shop || !Array.isArray(shop)) {
        // shop이 undefined이거나 배열이 아닌 경우 빈 배열을 반환합니다.
        return [];
      }
      if (shop.length <= 3) {
        return shop;
      } else {
        return [...shop.slice(0, 3), `외 ${shop.length - 3}개`];
      }
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    goDetailgame(card) {
      console.log("Selected card:", card);
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      if (!loginInfo) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        this.$router.push({ path: "/login" });
        return;
      }
      // 24.11.21 추가
      // 종료된 대회일 경우 클릭 방지
      if (card.type === "ended") {
        alert("종료된 대회는 입장할 수 없습니다.");
        return;
      }

      if (card.status === "PRIVATE") {
        this.selectedCardId = card.id; // 선택된 카드의 ID 저장
        this.openModal();
      } else {

        // 24.12.26 수정 - 추가
        // localStorage에 데이터 저장
        localStorage.setItem("selectedCard", JSON.stringify(card));

        this.$router.push({
          name: "gameInfoDetail",
          params: { id: card.id, type: card.type },
        });
      }
    },
    handlePasswordSubmit(password) {
      const selectedCard = this.cards.find(card => card.id === this.selectedCardId);

      if (!selectedCard) {
        console.error("선택된 대회를 찾을 수 없습니다.");
        alert("선택된 대회가 없습니다.");
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
  },
};
</script>

<style scoped src="@/style/game/gamelist.css" />
