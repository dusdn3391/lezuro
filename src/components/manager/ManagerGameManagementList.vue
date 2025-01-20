<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">대회 관리</h2>
          </div>
          <div class="search_box">
            <div class="select_box_1">
              <!-- 대회이름을 선택할 수 있는 select box -->
              <!-- 24.12.04 수정 - 옵션 검색 추가 -->
              <select class="text-2536 pretendard-regular-normal-mine-shaft-18px" v-model="selectedOption">>
                <!-- 24.12.04 수정 - 옵션 추가 -->
                <option class="pretendard-regular-normal-mine-shaft-18px" value="name" selected>대회이름</option>
                <option class="pretendard-regular-normal-mine-shaft-18px" value="id">대회고유번호</option>
              </select>
            </div>
            <div class="select_box_2">
              <!-- 검색어 입력 필드 -->
              <input type="text" class="text-2537 pretendard-regular-normal-mountain-mist-18px" placeholder="검색어를 입력하세요"
                v-model="searchQuery" />
              <img class="search-btn-10"
                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                alt="searchBtn" />
            </div>
          </div>
          <!-- 카드 리스트 부분 -->
          <div class="card_box">
            <div class="delete-container">
              <!-- 24.12.12 수정 - 폰트, 문구 변경경 -->
              <button class="delete-button pretendard-semibold-mountain-mist-16px" @click="deleteSelectedCards">
                선택 삭제
              </button>
            </div>
            <div class="table_box">
              <div v-for="card in paginatedCards" :key="card.id" class="card" :class="{ selected: card.isSelected }"
                @mouseover="setHoveredCard(card.id)" @mouseleave="clearHoveredCard">
                <!-- 24.12.12 수정 - photo-header 추가가 -->
                <div class="photo-header">
                    <!-- 24.12.12 수정 - 폰트 추가 -->
                    <div :class="['status-box', card.type]" class="pretendard-semi-bold-white-12px">
                  {{
                    card.type === "game"
                      ? "모집중"
                      : card.type === "competition"
                        ? "진행중"
                        : "종료"
                  }}
                </div>
              
                <input type="checkbox" class="card-checkbox" :value="card.id" v-model="selectedCardIds" />
              </div>
                <!-- <img :src="card.image" alt="대회 이미지" class="card-image" /> -->
                <!-- 24.12.04 수정 - 추가 -->
                <img :src="card.image && card.image.trim() ? card.image : basicCardImage" alt="대회 이미지"
                  class="card-image" />
                  <!-- 24.12.12 수정 - card-info 내 폰트 추가 -->
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
                      <p v-for="(info, index) in getShopInfo(card.branchNames)" :key="index" class="pretendard-regular-normal-log-cabin-16px">
                        {{ info }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- 수정하기 버튼 -->
                <div v-if="hoveredCardId === card.id" class="edit-overlay">
                    <!-- 24.12.12 수정 - 폰트 추가 -->
                  <button class="edit-button pretendard-semi-bold-log-cabin-18px" @click.stop="editCard(card.id)">
                    수정하기
                  </button>
                </div>
              </div>
            </div>
            <!-- 페이징 컨트롤 -->
            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                :class="{ disabled: currentPage === 1 }" />
              <div class="page-numbers pretendard-medium-log-cabin-16px">
                <!-- 24.12.04 수정 - 추가 -->
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
      </div>
    </div>
  </div>
</template>
<script>
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";
import { managerStore } from "@/store/managerStore";
export default {
  name: "ManagerGameManagementList",
  components: {
    ManagerHeader,
    ManagerNavbar,
  },
  data() {
    return {
      cards: [],
      searchQuery: "",
      selectedCardIds: [],
      selectedCardId: null,
      hoveredCardId: null,
      selectedOption: "name", // 24.12.04 수정 - 선택한 검색 기준 (기본값: "name")
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 6,
      // 24.12.04 수정 - 추가
      basicCardImage: require('../../../img/CK_ti436a27207 1.png')
    };
  },
  mounted() {
    this.getMGame();
  },
  computed: {
    filteredCards() {
      if (!this.searchQuery) {
        return this.cards; // 검색어가 없을 경우 전체 카드 반환
      }
      return this.cards.filter((card) =>
        card.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    // 24.12.04 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
    filteredCards() {
      if (!this.searchQuery.trim()) {
        console.log("검색어 없음, 전체 반환:", this.cards);
        return this.cards; // 검색어가 없으면 전체 코스 반환
      }
      const query = this.searchQuery.toLowerCase();
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
    totalPages() {
      return Math.ceil(this.filteredCards.length / this.itemsPerPage);
    },
    paginatedCards() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredCards.slice(start, start + this.itemsPerPage).map((card) => ({
        ...card,
        isSelected: card.id === this.selectedCardId,
      }));
    },
  },
  // 24.12.04 수정 - 추가
  watch: {
    filteredCards() {
      this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  methods: {
    async getMGame() {
      try {
        const response = await managerStore.getTask("competitions");
        console.log("전체 응답 구조:", response); // 전체 응답 구조 확인

        // response와 response.data가 모두 존재하는지 확인하고 competitions 배열을 일반 객체로 변환
        // const competitionsData = JSON.parse(JSON.stringify(response?.data?.competitions || []));
        // array.forEach(element => {
        const today = new Date();
        console.log("today 123", today);
        today.setHours(0, 0, 0, 0); // 시간 부분을 00:00:00으로 설정하여 날짜만 비교

        this.cards = response.map((card) => {
          // 날짜 포맷팅: "YYYY-MM-DD" 형식으로 변환
          const formattedStartDate = card.startDate
            ? card.startDate.split("T")[0]
            : "";
          const formattedEndDate = card.endDate
            ? card.endDate.split("T")[0]
            : "";

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
            type,
            image: card.posterUrl || null,
            period: `${formattedStartDate} ~ ${formattedEndDate}`, // 포맷된 날짜 사용
            // type: card.status === "ONGOING" ? "game" : card.status === "COMPETITION" ? "competition" : "ended",
            branchIds: card.branchIds,
            branchNames: card.branchNames || [],
          };
        });

        console.log("cards : : : ", this.cards); // 변환된 cards 데이터 확인
      } catch (error) {
        console.error("대회 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.selectedCardId = null; // 페이지 전환 시 선택 해제
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.selectedCardId = null; // 페이지 전환 시 선택 해제
      }
    },
    goToPage(page) {
      // 24.12.04 수정 - 추가
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
      this.selectedCardId = null; // 페이지 전환 시 선택 해제
    },
    setHoveredCard(cardId) {
      this.hoveredCardId = cardId;
    },
    clearHoveredCard() {
      this.hoveredCardId = null;
    },
    editCard(cardId) {
      this.$router.push({
        name: "ManagerGameManagement",
        params: { id: cardId },
      });
    },
    async deleteSelectedCards() {
      if (this.selectedCardIds.length === 0) {
        alert("삭제할 대회를 선택해주세요.");
        return;
      }

      try {
        // 선택된 각 대회 ID에 대해 삭제 요청
        for (const id of this.selectedCardIds) {
          await managerStore.deleteTask(`competitions/${id}`);
          console.log(`대회 ID ${id} 삭제 완료`);
        }

        // cards 배열에서 삭제된 대회 제거
        this.cards = this.cards.filter(
          (card) => !this.selectedCardIds.includes(card.id)
        );

        // 선택된 ID 배열 초기화
        this.selectedCardIds = [];
        alert("선택된 대회가 삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("대회 삭제 중 오류 발생:", error);
        alert("대회를 삭제하는 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    getShopInfo(branchNames) {
      if (!branchNames || !Array.isArray(branchNames)) {
        return [];
      }
      // branchNames 배열에서 최대 3개의 매장 이름만 표시, 그 외에는 '외 X개' 형식으로 출력
      if (branchNames.length <= 3) {
        return branchNames;
      } else {
        return [...branchNames.slice(0, 3), `외 ${branchNames.length - 3}개`];
      }
    },
  },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.reservation-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  flex-direction: row;
}

/* 24.12.23 수정 */
.wrapper {
    width: 100%;
    padding: 30px;
    /* gap: 20px; */
    height: 100vh;
}

/* 타이틀 박스 */
.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}


.search_box {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  gap: 10px;
  display: flex;
}

.select_box_1 {
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  /* width: 250px; */
  /* 24.12.10 수정 */
  width: 20%;
  border: 1px solid #ddd;
}

.select_box_1 select,
.select_box_2 input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.select_box_2 {
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  /* width: 1170px; */
  /* 24.12.10 수정 */
  width: 80%;
  border: 1px solid #ddd;
}


.card_box {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;

  padding: 30px;
  background-color: #fff;
  /* max-width: calc(450px * 3 + 45px * 3); */
  /* 부모 요소의 최대 너비 */
    /* 24.12.23 수정 - 추가 */
    width: 100%;
  margin: 0 auto;
  /* 가운데 정렬 */
}

.delete-container {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.delete-button {
  border: none;
  width: 150px;
  height: 45px;
  line-height: 21.48px;
  color: #ffffff;
  background-color: #ccc;
}

.table_box {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
}

.card {
  flex: 1 0 calc((100% - 80px) / 3);
  /* 3열로 균등 배치 */
  max-width: calc((100% - 80px) / 3);
  overflow: hidden;
  border: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
  /* 24.12.04 수정 - 추가 */
  border-radius: 20px;
}

/* 24.12.12 수정 - 추가 */
.photo-header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  top: 28px;
  position: absolute;
  padding: 0 19px;
}


.status-box {
  /* position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 15px 40px; */
  width: 65px;
  height: 30px;
  display: flex;
  /* Flexbox 컨테이너로 설정 */
  justify-content: center;
  /* 가로 중앙 정렬 */
  align-items: center;
  /* 세로 중앙 정렬 */
  text-align: center;
  border-radius: 18.5px;
}

.status-box.game {
  background-color: #d30f1a;
  /* Red for game (모집중) */
}

.status-box.competition {
  background-color: #184199;
  /* Blue for competition (진행중) */
}

.status-box.ended {
  background-color: #666666;
  /* Black for ended (종료) */
}

/* 24.12.12 수정 */
.card-checkbox {
  /* position: absolute;
  top: 10px;
  right: 10px; */
  width: 20px;
  z-index: 999;
  height: 20px;
}

.card-image {
  width: 100%;
  height: 250px;
}

.card-info {
  padding: 33px 30px;
}

/* 24.12.12 수정 - line-height 삭제 */
.card-info h2 {
  margin-bottom: 30px;
  /* line-height: 80%; */
}

/* 24.12.12 수정 - line-height 삭제 */
.card-info div {
  display: flex;
  /* line-height: 70%; */
  margin-bottom: 15px;
  color: #666;
}

/* 24.12.12 수정 - 삭제 */
/* .card-info div span {
  width: 48px;
  line-height: 80%;
} */

.card-info div p {
  color: #222;
  margin-left: 10px;
  padding: 0;
}

/* 24.12.12 수정 - 추가 */
.card-info div:nth-child(4) div {
  display: flex;
  gap: 5px;
  flex-direction: column;
  /* 세로로 정렬 */
  align-items: flex-start;
  /* 왼쪽 정렬, 필요에 따라 조정 */
}

.card.selected {
  background-color: rgba(0, 0, 0, 0.5);
  /* 반투명 배경 */
}

/* 수정하기 버튼 */
.edit-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.edit-button {
  padding: 19px 64px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  width: 200px;
  transition: background-color 0.3s;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  margin-bottom: 200px;
}

/* 24.12.04 수정 - 추가 */
.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* 24.12.04 수정 - 추가 */
.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #eeeeee;
  cursor: pointer;
}

/* 24.12.04 수정 - 추가 */
.page-number.active {
  background-color: #d30f1a;
  color: white;
}

/* 24.12.04 수정 - 추가 */
.page-number:hover {
  background-color: #eeeeee;
}

.pagination-arrow {
  cursor: pointer;
}

.pagination-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-arrow.flipped {
  transform: rotate(180deg);
}

</style>
