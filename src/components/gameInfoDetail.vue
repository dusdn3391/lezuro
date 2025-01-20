<template>
  <div class="container-center-horizontal">
    <div class="tournamentinfo-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="wrap">
        <div class="title pretendard-bold-log-cabin-38px">대회</div>
        <div class="content">
          <div class="game_tab">
            <!-- 24.12.18 수정 - 폰트 변경  -->
            <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
              :class="['tab', { active: selectedTab === tab }]"
              class="text-2341 valign-text-middle pretendard-medium-granite-gray-18px">
              {{ tab }}
            </div>
          </div>
          <div class="card_box" v-if="selectedTab === '대회정보'">
            <div class="table_box">
              <table>
                <tr class="table-row-align">

                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    대회이름
                  </td>
                  <!-- 24.12.18 수정 - flex-start-align 추가 -->
                  <td class="table-row-content flex-start-align pretendard-regular-normal-granite-gray-18px">
                    {{ competition.name }}
                  </td>
                  <td class="table-row-title valign-text-middle pretendard-medium-log-cabin-18px">
                    대회 일정
                  </td>
                  <!-- 24.12.18 수정 - flex-start-align 추가 -->
                  <td class="table-row-content flex-start-align pretendard-regular-normal-granite-gray-18px">
                    {{ competition.schedule }}
                  </td>
                </tr>
                <tr class="table-row-align">
                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    대회상태
                  </td>
                  <td colspan="3" class="status-font pretendard-bold-monza-18px">
                    {{ competition.type }}
                  </td>
                </tr>
                <!-- <tr class="table-row-align">
                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    대회매장
                  </td>
                  <td
                    class="store-font pretendard-bold-log-cabin-18px"
                    colspan="3"
                  >
                    <span class="store-count">{{ competition.store }}</span
                    >개 매장
                    <div
                      class="s_button table-row-content pretendard-regular-normal-white-12px-3"
                      @click="toGoMapList"
                    >
                      전체매장 펼쳐보기
                    </div>
                    <div class="shop_name">
                      <div
                        v-for="(shop, index) in competition.shopname"
                        :key="index"
                      >
                        <span
                          class="shop-location pretendard-medium-log-cabin-18px"
                          >{{ shop.location }}</span
                        >
                        <span
                          class="shop-address pretendard-regular-normal-granite-gray-16px"
                          >{{ shop.address }}</span
                        >
                      </div>
                    </div>
                  </td>
                </tr> -->
                <tr class="table-row-align">
                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    대회매장
                  </td>
                  <td class="store-font pretendard-bold-log-cabin-18px" colspan="3">
                    <div>
                      <span class="store-count">{{
                        competition.branchIds.length
                      }}</span>개 매장
                      <div class="s_button table-row-content pretendard-regular-normal-white-12px-3"
                        @click="toggleShopList">
                        전체매장 펼쳐보기
                      </div>
                    </div>
                    <div v-if="isShopListVisible" class="shop_name">
                      <div v-for="(shop, index) in competition.shopname" :key="index" @click="toGoMapList">
                        <span class="shop-location pretendard-medium-log-cabin-18px">{{ shop.location }}</span>
                        <span class="shop-address pretendard-regular-normal-granite-gray-16px">{{ shop.address }}</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr class="table-row-align course-row">
                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    대회코스
                  </td>
                  <td colspan="3" class="course-col">
                    <div v-for="(course, index) in competition.course" :key="index"
                      class="inline pretendard-medium-log-cabin-16px">
                      {{ course.courseName }}
                      <div @click="toGoCourseDetail(course)" class="c_button">
                        자세히 보기
                      </div>
                      <span class="slash" v-if="index < competition.course.length - 1">
                        /
                      </span>
                    </div>
                  </td>
                </tr>
                <tr class="table-row-align">
                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    대회옵션
                  </td>
                  <td colspan="3">
                    <div v-for="(option, index) in competition.options" :key="index" class="inline">
                      <span class="option-title pretendard-medium-log-cabin-16px">컨시드 거리
                      </span>
                      <span class="option-content pretendard-light-granite-gray-18px">{{ option.concede }}</span>
                      <span class="slash pretendard-regular-normal-log-cabin-18px">
                        /
                      </span>

                      <span class="option-title pretendard-medium-log-cabin-16px">멀리건 횟수
                      </span>
                      <span class="option-content pretendard-light-granite-gray-18px">{{ option.mulligan }}</span>
                    </div>
                  </td>
                </tr>
                <tr class="table-row-align">
                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    참가조건
                  </td>
                  <td colspan="3" class="condition-col">
                    <!-- <div v-for="(condition, index) in competition.conditions" :key="index" class="condition-item">
                      <span class="inline pretendard-medium-black-16px">{{
                        condition
                      }}</span>
                      <span class="inline pretendard-medium-black-16px"
                        v-if="index < competition.conditions.length - 1">
                        /
                      </span>
                    </div> -->
                    <!--  24.11.22 수정 -->
                    <div class="inline pretendard-medium-log-cabin-16px">
                      <!-- <span class="inline pretendard-medium-black-16px">등급</span>
                      <span class="inline pretendard-light-granite-gray-18px">{{ competition.rank }}</span>
                      <span class="slash inline pretendard-medium-black-16px"> / </span>
                      <span class="inline pretendard-medium-black-16px">성별</span>
                      <span class="inline pretendard-light-granite-gray-18px">{{ competition.gender }}</span>
                      <span class="slash inline pretendard-medium-black-16px"> / </span>
                      <span class="inline pretendard-medium-black-16px">매장 이용</span>
                      <span class="inline pretendard-light-granite-gray-18px">{{ competition.branchUsage }}</span>
                      <span class="slash inline pretendard-medium-black-16px"> / </span>
                      <span class="inline pretendard-medium-black-16px">나이</span>
                      <span class="inline pretendard-light-granite-gray-18px">{{ competition.ageRange }}</span> -->
                      <!-- 24.12.06 수정 - 추가:모든 조건이 기본값일 경우 "참가 조건 없음" 출력 -->
                      <span
                        v-if="competition.rank === '등급' && competition.gender === '성별' && competition.branchUsage === '매장이용' && competition.ageRange === '나이범위'"
                        class="inline pretendard-medium-black-16px">
                        참가 조건 없음
                      </span>
                      <template v-else>
                        <!-- 24.12.18 수정 - 조건없음 - '-' 변경 -->
                        <span class="inline pretendard-medium-black-16px">등급</span>
                        <span class="inline pretendard-light-granite-gray-18px">{{ competition.rank !== '등급' ?
                          competition.rank : '-' }}</span>
                        <span class="slash inline pretendard-medium-black-16px"
                          v-if="competition.rank !== '등급' && competition.gender !== '성별'"> / </span>

                        <span class="inline pretendard-medium-black-16px">성별</span>
                        <span class="inline pretendard-light-granite-gray-18px">{{ competition.gender !== '성별' ?
                          competition.gender : '-' }}</span>
                        <span class="slash inline pretendard-medium-black-16px"
                          v-if="(competition.rank !== '등급' && competition.gender !== '성별') || (competition.gender !== '성별' && competition.branchUsage !== '매장이용')">
                          / </span>

                        <span class="inline pretendard-medium-black-16px">매장 이용</span>
                        <span class="inline pretendard-light-granite-gray-18px">{{ competition.branchUsage !== '매장이용' ?
                          competition.branchUsage : '-' }}</span>
                        <span class="slash inline pretendard-medium-black-16px"
                          v-if="(competition.rank !== '등급' && competition.branchUsage !== '매장이용') || (competition.branchUsage !== '매장이용' && competition.ageRange !== '나이범위')">
                          / </span>

                        <span class="inline pretendard-medium-black-16px">나이</span>
                        <span class="inline pretendard-light-granite-gray-18px">{{ competition.ageRange !== '나이범위' ?
                          competition.ageRange : '-' }}</span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr class="table-row-align">
                  <td class="table-row-title pretendard-medium-log-cabin-18px">
                    추가사항
                  </td>
                  <td colspan="3" class="add-text pretendard-regular-normal-granite-gray-18px">
                    {{ competition.rulesAndPrizes }}
                  </td>
                </tr>
              </table>
              <div class="button">
                <!-- <div class="pretendard-medium-white-18px" @click="openNotJoinModalNo2">
                  참가취소
                </div>
                <div class="pretendard-medium-white-18px" @click="openJoinConfirmModal">
                  참가신청
                </div> -->
                <!-- 24.12.10 수정 - 상태에 따른 버튼 색 변경 -->
                <div class="pretendard-medium-white-18px"
                  :style="{ backgroundColor: isParticipated ? '#d30f1a' : '#999' }" @click="handleCancelClick">
                  참가취소
                </div>
                <div class="pretendard-medium-white-18px"
                  :style="{ backgroundColor: isParticipated ? '#999' : '#d30f1a' }" @click="handleJoinClick">
                  참가신청
                </div>
              </div>
            </div>
          </div>
          <!-- 순위표 탭-->
          <div class="card_box" v-if="selectedTab === '순위표'">
            <div v-if="selectedTab === '순위표'" class="ranking_box">
              <!-- 720px 초과 버전 -->
              <table class="ranking-table">
                <thead>
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th v-for="(header, index) in RTableHeaders" :key="index">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <!-- 24.12.24 수정 - v-if 추가 -->
                <tbody v-if="RankingData[0]?.user">
                  <!-- <tr v-for="(user, rowIndex) in RankingData" :key="rowIndex"
                    class="pretendard-regular-normal-granite-gray-18px">
                    <td v-for="(cell, cellIndex) in user" :key="cellIndex">
                      <div v-if="RTableHeaders[cellIndex] === '상세기록'" class="detail-col">
                        <button class="ranking-details pretendard-semi-bold-white-14px" @click="openModal(user)">
                          {{ cell }}
                        </button>
                      </div>
                      <div v-else-if="RTableHeaders[cellIndex] === '닉네임'" class="nickname-col">
                        <img :src="profileImg" class="profile-img" />
                        <span class="pretendard-regular-normal-granite-gray-18px">
                          {{ cell }}
                        </span>
                      </div>
                      <span v-else>{{ cell }}</span>
                    </td>
                  </tr> -->
                  <!-- 24.12.24 수정 - 추가 -->
                  <tr v-for="(data, index) in sortedRankingData" :key="index"
                    class="pretendard-regular-normal-granite-gray-18px">
                    <td class="detail-col">{{ data.rank }}</td>
                    <td class="detail-col">
                      <div class="nickname-col"> <img :src="data.user.profileImage === null ? profileImg : data.user.profileImage" class="profile-img" />
                        {{ data.user.userName }}</div>
                    </td>
                    <td class="detail-col">{{ data.user.grade }}</td>
                    <td class="detail-col">{{ data.round || '-' }}</td>
                    <td class="detail-col">{{ data.shot || '-' }}</td>
                    <td class="detail-col"> <button class="ranking-details pretendard-semi-bold-white-14px"
                        @click="openModal(data.user)"> 상세보기</button></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr class="pretendard-regular-normal-granite-gray-18px">
                    <td colspan="6">데이터가 없습니다</td>
                  </tr>
                </tbody>
              </table>
              <!-- 720px 이하 버전 -->
              <div class="ranking-container">
                <!-- 24.12.27 수정 - div, v-if 추가 -->
                <div v-if="RankingData[0]?.user">
                  <!-- 24.12.26 수정 -->
                  <div v-for="(user, index) in sortedRankingData" :key="index" class="ranking-card">
                    <div class="ranking-card-row-1">
                      <div class="pretendard-semi-bold-log-cabin-16px">
                        <!-- {{ user[0] }} -->
                        <!-- 24.12.26 수정 - 추가 -->
                        {{ user.rank }}
                      </div>
                      <div class="profile-info">
                        <!-- 24.12.26 수정 - 추가 -->
                        <img :src="user.user.profileImage === null ? profileImg : user.user.profileImage" alt="profile" class="profile-img" />
                        <div class="pretendard-regular-normal-granite-gray-16px">
                          <!-- {{ user[1] }} -->
                          <!-- 24.12.26 수정 - 추가 -->
                          {{ user.user.userName }}
                        </div>
                      </div>
                    </div>
                    <div class="ranking-card-row-2">
                      <div class="pretendard-regular-normal-granite-gray-16px">
                        등급 l
                        <span class="pretendard-semi-bold-log-cabin-16px">
                          <!-- {{ user[2] }} -->
                          <!-- 24.12.26 수정 - 추가 -->
                          {{ user.user.grade }}
                        </span>
                      </div>
                      <div class="pretendard-regular-normal-granite-gray-16px">
                        라운드 l
                        <span class="pretendard-semi-bold-log-cabin-16px">
                          <!-- {{ user[3] }} -->
                          <!-- 24.12.26 수정 - 추가 -->
                          {{ user.round || '-' }}
                        </span>
                      </div>
                      <div class="pretendard-regular-normal-granite-gray-16px">
                        최종성적 l
                        <span class="pretendard-semi-bold-log-cabin-16px">
                          <!-- {{ user[4] }} -->
                          <!-- 24.12.26 수정 - 추가 -->
                          {{ user.shot || '-' }}</span>
                      </div>
                    </div>
                    <div class="ranking-card-row-3">
                      <button class="ranking-details pretendard-semi-bold-white-12px" @click="openModal(user.user)">
                        <!-- {{ user[5] }} -->
                        <!-- 24.12.26 수정 - 추가 -->
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
                <!-- 24.12.27 수정 - 추가 -->
                <div v-else class="pretendard-regular-normal-granite-gray-16px" style="text-align: center;">
                  데이터가 없습니다.
                </div>
              </div>
            </div>


            <!-- 페이징처리 -->
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
            <!-- 페이징처리 -->

          </div>
          <!-- 대회 이미지-->
          <div class="img_box" v-if="selectedTab === '대회 이미지'">
            <div v-for="(image, index) in game.images" :key="index" class="image-container">
              <img :src="image" :alt="'대회 이미지 ' + (index + 1)" />
            </div>
          </div>
        </div>
      </div>
      <XFooter />
      <!-- 24.12.24 수정 -->
      <GameInfoDetailModal v-if="isModalVisible" :rankingData="RankingData" :selectedUser="selectedUser"
        :courses="competition.course" @close="closeModal" />

      <JoinConfirmModal v-if="isJoinConfirmModalVisible" @close="closeJoinConfirmModal"
        @submit="handleJoinCompetition" />
      <NotJoinModal v-if="isNotJoinModalVisible" @close="closeNotJoinModal" />
      <NotJoinModalNo2 v-if="isNotJoinModalNo2Visible" @close="closeNotJoinNo2Modal"
        @submit="handleNotJoinCompetition" />
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore"; // API 호출
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import NotJoinModal from "./NotJoinModal.vue";
import NotJoinModalNo2 from "./NotJoinModalNo2";
import GameInfoDetailModal from "./GameInfoDetailModal.vue";
import JoinConfirmModal from "./JoinConfirmModal.vue";
export default {
  name: "gameInfoDetail",
  components: {
    Header,
    RjZsWi,
    XFooter,
    JoinConfirmModal,
    NotJoinModal,
    NotJoinModalNo2,
    GameInfoDetailModal,
  },
  data() {
    return {
      competitionId: null,
      courseOptions: [],
      gameDetailDt: [],
      getData: {},
      isModalVisible: false,
      isJoinConfirmModalVisible: false,
      isNotJoinModalVisible: false,
      isNotJoinModalNo2Visible: false,
      isShopListVisible: false,
      competition: {
        name: "",
        schedule: "",
        courseManagement: [],
        // branchUsage: '',
        mulliganCount: 0,
        // conditions: "",
        ageRange: "", // 24.11.22 추가
        rank: "", // 24.11.22 추가
        gender: "", // 24.11.22 추가
        ageRange: "", // 24.11.22 추가
        branchIds: [], // 매장 ID 목록
        shopname: [], // 매장명과 주소를 담을 배열
        rulesAndPrizes: "",
        concedeDistance: "",
        posterUrl: "",
        status: "",
        course: [],
        photoUrl: "",
        participants: [],
      },
      RTableHeaders: [
        "순위",
        "닉네임",
        "등급",
        "라운드",
        "최종성적",
        "상세기록",
      ],
      // 24.12.24 수정
      RankingData: [],
      profileImg: require("../../img/group-736@2x.png"),
      tabs: ["대회정보", "순위표", "대회 이미지"],
      selectedTab: "대회정보",
      game: {
        images: [require("../../img/rectangle-509271.png")],
      },
      currentPage: 1,
      itemsPerPage: 5, // 페이지당 5개 항목 표시
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      filteredItems : ""
    };
  },
  props: ["materialSymbolsClose", "rJZsWIProps", "id"],
  
  mounted() {
    const data = this.$route.params; // Router에서 전달된 데이터 가져오기
    console.log("data : : : ", data); // 데이터 확인
    this.getData = data; // getData에 데이터 저장

    // // getCompetition 호출에 ID 사용
    // if (data.id) {
    //   this.getCompetition(data.id);
    //   this.competitionId = data.id;
    // } else {
    //   console.error("ID 값이 없습니다.");
    // }

    // // 대회 상태 설정
    // if (data.type) {
    //   this.competition.type =
    //     data.type === "ended"
    //       ? "종료"
    //       : data.type === "competition"
    //         ? "진행중"
    //         : "모집중";
    //   console.log("Competition type:", this.competition.type); // 설정된 대회 상태 확인
    // } else {
    //   console.error("Type 값이 없습니다.");
    // }

    // 24.12.26 수정 - 추가
    // 새로고침 후 데이터 복원
    const savedCard = JSON.parse(localStorage.getItem("selectedCard"));
    if (savedCard) {
      console.log("복원된 데이터:", savedCard);
      this.getData = savedCard;

      // getCompetition 호출
      if (savedCard.id) {
        this.getCompetition(savedCard.id);
        this.competitionId = savedCard.id;
      } else {
        console.error("ID 값이 없습니다.");
      }

      if (savedCard.type) {
        this.competition.type =
          savedCard.type === "ended"
            ? "종료"
            : savedCard.type === "competition"
              ? "진행중"
              : "모집중";
        console.log("Competition type:", this.competition.type);
      } else {
        console.error("Type 값이 없습니다.");
      }
    } else {
      console.error("LocalStorage에서 복원할 데이터가 없습니다.");
    }
  },
  // 24.12.24 수정 - 추가
  computed: {
   
    sortedRankingData() {
  if (!this.RankingData) return [];

  // 전체 데이터를 shot 기준으로 내림차순 정렬
  const sortedData = this.RankingData.slice().sort((a, b) => b.shot - a.shot);

  let currentRank = 1;
  let previousShot = null; // 이전 shot 값을 저장할 변수
  let previousRank = 1; // 같은 shot 값을 가진 항목들의 순위

  // 전체 데이터에 대해 순위를 매김
  sortedData.forEach((item) => {
    if (item.shot === previousShot) {
      // 같은 shot 값일 경우, 이전 순위를 부여
      item.rank = previousRank;
    } else {
      // 새로운 shot 값이 나오면 순위 업데이트
      item.rank = currentRank;
      previousRank = currentRank; // 같은 순위의 항목들을 처리하기 위해 previousRank 업데이트
    }

    previousShot = item.shot; // 현재 shot 값을 이전 shot에 저장
    currentRank++; // 순위 증가
  });

  // 페이징 처리
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  this.filteredItems = sortedData; // 정렬된 전체 데이터를 필터링 항목으로 저장
  return sortedData.slice(start, end); // 현재 페이지에 해당하는 데이터만 반환
},

    // sortedRankingData() {
    //   if (!this.RankingData) return [];

    //   const start = (this.currentPage - 1) * this.itemsPerPage;
    //   const end = start + this.itemsPerPage;
      
    //   // 1. shot 기준 내림차순으로 정렬
    //   const sortedData = this.RankingData.slice().sort((a, b) => b.shot - a.shot);

    //   // 2. 순위를 부여할 변수
    //   let currentRank = 1;
    //   let previousShot = null; // 이전 shot 값을 저장할 변수
    //   let previousRank = 1; // 같은 shot 값을 가진 항목들의 순위

    //   // 3. 순위를 부여하며 순회
    //   return sortedData.map((item, index) => {
    //     if (item.shot === previousShot) {
    //       // 같은 shot 값일 경우, 이전 순위를 부여
    //       item.rank = previousRank;
    //     } else {
    //       // 새로운 shot 값이 나오면 순위 업데이트
    //       item.rank = currentRank;
    //       previousRank = currentRank; // 같은 순위의 항목들을 처리하기 위해 previousRank 업데이트
    //     }

    //     previousShot = item.shot; // 현재 shot 값을 이전 shot에 저장
    //     currentRank++; // 순위 증가
    //     return item;
    //   });
    // },

    
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
    totalPages() {
      console.log("Filtered Items Length:", this.filteredItems.length);
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  methods: {
    // 24.12.10 수정 - 추가
    handleCancelClick() {
      if (!this.isParticipated) {
        alert("참가한 내역이 없습니다.");
        return;
      }
      this.openNotJoinModalNo2(); // 취소 모달 열기
    },
    // 24.12.10 수정 - 추가
    handleJoinClick() {
      if (this.isParticipated) {
        alert("이미 신청한 대회입니다.");
        return;
      }
      this.openJoinConfirmModal(); // 신청 모달 열기
    },
    toggleShopList() {
      this.isShopListVisible = !this.isShopListVisible;
    },
    async getCompetition(id) {
      console.log("Competition ID received in getCompetition:", id);
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      this.loginInfo = loginInfo;

      try {
        const response = await taskStore.getSelectTasks(`competitions/${id}`);
        console.log("Competition response:", response);

        const { branchIds, branches } = response;
        const typeFromParams = this.$route.params.type;

        const competitionType =
          typeFromParams === "ended"
            ? "종료"
            : typeFromParams === "competition"
              ? "진행중"
              : "모집중";

        const currentYear = new Date().getFullYear();
        const birthYear = parseInt(loginInfo.birthDay.split("-")[0], 10);
        const userAge = currentYear - birthYear;

        this.competition = {
          name: response.name,
          schedule: `${response.startDate.substring(0, 10)} ~ ${response.endDate.substring(0, 10)}`,
          branchIds: branchIds,
          shopname: this.populateShopNames(branchIds, branches),
          // courseManagement: response.courseManagement,
          // 24.11.22 수정 - 추가
          courseManagement: response.courseManagement || [],
          courses: response.courses || [], // 24.11.22 수정 - courses 데이터 추가
          branchUsage: response.branchUsage,
          mulliganCount: response.mulliganCount,
          participants: response.participants || [],
          ageRange: response.ageRange,
          rank: response.rank,
          gender: response.gender,
          rulesAndPrizes: response.rulesAndPrizes,
          concedeDistance: `${response.concedeDistance}m`,
          status: response.status,
          type: competitionType,
          options: [
            {
              concede: `${response.concedeDistance}m`,
              mulligan: response.mulliganCount,
            },
          ],
          // conditions: [
          //  `등급 ${response.rank}`,
          //   `성별 ${response.gender}`,
          //   `매장 이용 ${response.branchUsage}`,
          //   `나이 ${response.ageRange}`,
          // ],
        };

        this.isParticipated = this.competition.participants.some(
          (participant) => participant.id === this.loginInfo.id
        );
        console.log("참가 여부:", this.isParticipated);

        // 코스 데이터 매핑
        this.populateCourseNames();

        if (response.posterUrl) {
          this.game.images = [response.posterUrl];
        }

        // 24.12.24 수정 - 추가 : rankingTable 호출
        await this.rankingTable(); // 추가
      } catch (error) {
        console.error("Error fetching competition data:", error);
      }
    },
    // async getMygameDetailDt(tournamentId) {
    //   this.gameDetailDt = await taskStore.getTask(
    //     `/api/tournaments/details/${tournamentId}`
    //   );
    //   console.log("this.gameDetailDt : : : : : : ", this.gameDetailDt);
    // },
    // async getGameCourse() {
    //   try {
    //     const response = await taskStore.getSelectTasks("course-management");
    //     this.courseOptions = response.map((course) => ({
    //       id: course.id,
    //       courseName: course.courseName,
    //     }));
    //     console.log("Course options:", this.courseOptions);

    //   } catch (error) {
    //     console.error("Error fetching course data:", error);
    //   }
    // },
    populateCourseNames() {
      this.competition.course = this.competition.courseManagement.map((courseId) => {
        // const course = this.courseOptions.find((c) => c.id === courseId);
        // 24.11.22 수정
        const course = this.competition.courses.find((c) => c.id === courseId);
        console.log('course 111', course)
        if (course) {
          return {
            id: course.id, // course의 ID
            courseName: course.courseName, // course의 이름
            details: course, // 추가 세부 정보
          };
        }
        return { id: null, courseName: "Unknown Course" };
      });
      console.log("Competition courses with IDs:", this.competition.course);
    },
    populateShopNames(branchIds, branches) {
      // branchIds에 있는 매장 ID와 branches의 ID가 일치하는 정보를 반환하여 shopname에 저장
      return branchIds.map((branchId) => {
        const branch = branches.find((b) => b.id == branchId);
        return branch
          ? { location: branch.name, address: branch.address }
          : { location: "위치 없음", address: "주소 없음" };
      });
    },
    toGoMapList() {
      this.$router.replace({ path: "/map-list" });
    },
    openModal(user) {
      this.selectedUser = user; // 선택된 유저 정보 저장
      this.isModalVisible = true; // 모달 표시
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedUser = null; // 모달을 닫고 선택된 유저 정보 초기화
    },
    openJoinConfirmModal() {
      console.log("Join Confirm Modal Opened");

      // 조건 확인
      const currentYear = new Date().getFullYear();
      const birthYear = parseInt(this.loginInfo.birthDay.split("-")[0], 10);
      const userAge = currentYear - birthYear;

      // const isGenderMatch =
      //   this.competition.gender === (this.loginInfo.gender === "FEMALE" ? "여성" : "남성");
      // const isAgeInRange = this.competition.ageRange
      //   ? userAge >= parseInt(this.competition.ageRange.split("-")[0], 10) &&
      //   userAge <= parseInt(this.competition.ageRange.split("-")[1], 10)
      //   : true;
      // const isRankMatch = this.competition.rank === this.loginInfo.grade.replace("등급", "");

      // console.log("조건 확인: 성별 일치:", isGenderMatch, "나이 범위:", isAgeInRange, "등급 일치:", isRankMatch);


      // 24.12.09 수정
      // 기본값을 기준으로 조건이 없는 경우 모든 사용자에게 신청 가능
      const isGenderMatch =
        this.competition.gender === '성별' || this.competition.gender === (this.loginInfo.gender === "FEMALE" ? "여성" : "남성");
      const isAgeInRange =
        this.competition.ageRange === '나이범위' ||
        (this.competition.ageRange &&
          userAge >= parseInt(this.competition.ageRange.split("-")[0], 10) &&
          userAge <= parseInt(this.competition.ageRange.split("-")[1], 10));
      const isRankMatch =
        this.competition.rank === '등급' || this.competition.rank === this.loginInfo.grade.replace("등급", "");

      console.log("조건 확인: 성별 일치:", isGenderMatch, "나이 범위:", isAgeInRange, "등급 일치:", isRankMatch);

      if (!isGenderMatch || !isAgeInRange || !isRankMatch) {
        this.isNotJoinModalVisible = true; // 조건에 맞지 않으면 모달 표시
        return;
      }

      this.isJoinConfirmModalVisible = true; // 조건에 맞으면 참가 신청 모달 표시
    },
    closeJoinConfirmModal() {
      console.log("Join Confirm Modal Closed");
      this.isJoinConfirmModalVisible = false; // Hide the modal when the close event is emitted
    },
    async handleJoinCompetition() {
      if (this.isParticipated) {
        alert("이미 신청되었습니다.");
        return;
      }
      // 24.12.10 수정
      else {
        console.log("참가 신청 ID:", this.competitionId);
        try {
          const response = await taskStore.postTask(`competitions/${this.competitionId}/participants`);

          this.isParticipated = true;

          this.$router.push({ path: "/mygame-list" });
          alert("참가 신청이 완료되었습니다.");
        } catch (error) {
          console.error("Error joining competition:", error);
          alert("오류가 발생했습니다.");
        }
      }
      this.closeJoinConfirmModal();
    },
    openNotJoinModalNo2() {
      this.isNotJoinModalNo2Visible = true; // Show modal when button is clicked
    },
    closeNotJoinModal() {
      this.isNotJoinModalVisible = false; // Hide modal when 'close' event is emitted
    },
    closeNotJoinNo2Modal() {
      this.isNotJoinModalNo2Visible = false; // Hide modal when 'close' event is emitted
    },
    handleNotJoinCompetition() {
      if (!this.isParticipated) {
        alert("참가 신청을 하지 않았습니다.");
        return;
      }
      try {
        const response = taskStore.deleteTask(`competitions/${this.competitionId}/participants`);
        alert("참가 취소가 완료되었습니다.");
        this.isParticipated = false;
        this.$router.push({ path: "/mygame-list" })
      } catch (error) {
        console.error("Error canceling competition:", error);
        alert("오류가 발생했습니다.");
      }
      this.closeNotJoinNo2Modal();
    },
    toGoCourseDetail(course) {
      console.log("Navigating to course detail with ID:", course.id); // ID 값 콘솔 출력
      this.$router.replace({
        path: "/course-detail",
        query: { id: course.id },
      });
    },


    toGoMapList() {
      this.$router.push({ path: "/map-list" });
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    // 24.12.24 수정 - 추가
    async rankingTable() {
      try {
        if (!this.competitionId) {
          console.error("competitionId가 설정되지 않았습니다.");
          return;
        }

        const response = await taskStore.getSelectTasks(`competitions/competition/${this.competitionId}`);
        console.log("ranking response:", response);
        console.log("this.competitionId:", this.competitionId);

        // shot 값 기준으로 내림차순 정렬
        const sortedData = response.sort((a, b) => b.shot - a.shot);

        // rank 값 할당
        this.RankingData = sortedData.map((item, index) => {
          item.rank = index + 1; // 순위는 1부터 시작
          return item;
        });

      } catch (error) {
        console.error("Error fetching ranking table data:", error);
      }
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
    goToPage(page) {
      console.log("Navigating to page:", page);
      this.currentPage = page;
    },
  },

   
};
</script>

<style scoped src="@/style/game/gameinfodetail.css" />
