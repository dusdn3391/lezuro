<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">포인트 관리</h2>
          </div>

          <div class="date_picker_wrap">
            <div class="tabs">
              <div class="date-pickder-title">날짜검색</div>
              <div v-for="tab in tabs" :key="tab"
                :class="['tab-btn pretendard-regular-normal-mine-shaft-16px', { active: selectedTab === tab }]"
                @click="selectTab(tab)">
                {{ tab }}
              </div>
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="startDate" /> -->
              <!-- 24.12.04 수정 -->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="startDate"
                @change="validateStartDate" />
              ~
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="endDate" /> -->
              <!-- 24.12.04 수정 -->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="endDate"
                @change="validateEndDate" />
            </div>
            <div class="search_box">
              <div class="date-pickder-title">매장검색</div>
              <div class="select_box_1">
                <select v-model="selectedStore" class="text-2536 pretendard-regular-normal-mine-shaft-18px">
                  <option value="">전체매장</option>
                  <option v-for="store in uniqueStores" :key="store" :value="store">{{ store }}</option>
                </select>
              </div>
              <div class="select_box_2">
                <input type="text" class="text-2537 pretendard-regular-normal-mountain-mist-18px" v-model="searchQuery"
                  placeholder="검색어를 입력하세요" />
                <img class="search-btn-10"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                  alt="searchBtn" />
              </div>
            </div>
          </div>
          <!-- 포인트 관리 내용 -->
          <div class="point-box">
            <div class="point-history">
              <div class="pretendard-bold-log-cabin-24px">포인트 내역</div>
              <div class="point-list">
                <div class="table-container">
                  <div class="tabs tab-align">
                    <button v-for="tabP in tabsP" :key="tabP"
                      :class="['tab-btn pretendard-semibold-mountain-mist-16px', { activeP: selectedTabP === tabP }]"
                      @click="selectTabP(tabP)">
                      {{ tabP }}
                    </button>
                  </div>

                  <div class="point-list">
                    <div class="table-container">
                      <table>
                        <thead>
                          <tr class="pretendard-bold-mine-shaft-18px ">
                            <th>번호</th>
                            <th>매장</th>
                            <th>내역</th>
                            <th>금액</th>
                            <th>잔여 포인트</th>
                            <th>날짜</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(point, index) in paginatedItems" :key="index"
                            class="pretendard-light-granite-gray-16px">
                            <td class="pretendard-regular-normal-granite-gray-18px">
                              <!-- {{ index + 1 }} -->
                              <!-- 24.12.03 수정 -->
                              {{ point.pointTransaction_transactionId }}
                            </td>
                            <td>{{ point.branch_name }}</td>
                            <td class="pretendard-regular-normal-granite-gray-18px">{{
                              point.pointTransaction_description }}</td>
                            <td :class="{
                              // 'positive-money': !isPositiveMoney(point.pointTransaction_amount),
                              // 'negative-money': isPositiveMoney(point.pointTransaction_amount),
                              // 24.12.03 수정 - 천단위 쉼표 추가
                              'positive-money': parseFloat(point.pointTransaction_amount) > 0,
                              'negative-money': parseFloat(point.pointTransaction_amount) < 0,
                            }">
                              <!-- {{ parseInt(point.pointTransaction_amount) > 0 ?
                                "+" + point.pointTransaction_amount.split(".")[0] :
                                point.pointTransaction_amount.split(".")[0] }} -->
                              <!--  24.12.03 수정 - 천단위 쉼표 추가 -->
                              {{ parseFloat(point.pointTransaction_amount) > 0
                                ? "+" + formatAmount(point.pointTransaction_amount.split(".")[0])
                                : formatAmount(point.pointTransaction_amount.split(".")[0])
                              }}
                            </td>
                            <td class="pretendard-regular-normal-granite-gray-18px ">
                              <!--  24.12.03 수정 - 천단위 쉼표 추가 -->
                              <!-- {{ point.pointTransaction_balance.split(".")[0] }} -->
                              {{ formatAmount(point.pointTransaction_balance.split(".")[0]) }}
                            </td>
                            <td>{{ point.pointTransaction_timestamp.split("T")[0] }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="pagination-controls">
                        <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                          :class="{ disabled: currentPage === 1 }" />
                        <div class="page-numbers pretendard-medium-log-cabin-16px">
                          <!-- 24.12.04 수정 - 추가 -->
                          <div v-for="page in visiblePages" :key="page"
                            :class="['page-number', { active: page === currentPage }]" @click="goToPage(page)">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import { adminStore } from '@/store/adminStore';  // API 호출

export default {
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      selectedTab: "전체",
      // tabs: ["전체", "주간", "월별", "월간"],
      // 24.12.04 수정
      tabs: ["전체"],
      selectedTabP: "포인트 전체 내역",
      tabsP: ["포인트 전체 내역", "포인트 충전 내역", "포인트 사용 내역"],
      searchQuery: "",
      selectedStore: "",
      startDate: "", // Start date for filtering
      endDate: "", // End date for filtering
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      points: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
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
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      const filteredPoints = this.points.filter(point => {

        const matchesSearchQuery = point.branch_name.toLowerCase().includes(query);
        const matchesStore = !this.selectedStore || point.branch_name === this.selectedStore;
        const matchesDateRange = this.isWithinDateRange(point.pointTransaction_timestamp);
        const matchesTabP = this.isTabPMatch(point.pointTransaction_amount);

        return matchesSearchQuery && matchesStore && matchesDateRange && matchesTabP;
      });

      return filteredPoints;
    },
    uniqueStores() {
      const storeNames = this.points.map(point => point.branch_name);
      return [...new Set(storeNames)];
    }
  },
  mounted() {
    this.getPoints();
  },
  methods: {
    // 24.12.04 수정 - 추가
    validateStartDate() {
      // 시작 날짜가 변경되었을 때 종료 날짜와 비교
      if (this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
        alert("시작 날짜는 종료 날짜보다 늦을 수 없습니다.");
        this.startDate = ""; // 초기화
      }
      this.selectedTab = ""; // 전체 탭 해제
    },
    // 24.12.04 수정 - 추가
    validateEndDate() {
      // 종료 날짜가 변경되었을 때 시작 날짜와 비교
      if (this.startDate && new Date(this.endDate) < new Date(this.startDate)) {
        alert("종료 날짜는 시작 날짜보다 이를 수 없습니다.");
        this.endDate = ""; // 초기화
      }
      this.selectedTab = ""; // 전체 탭 해제
    },
    selectTab(tab) {
      this.selectedTab = tab;
      // 24.12.04 수정 - 추가
      if (tab === "전체") {
        // 전체를 선택하면 날짜 초기화
        this.startDate = "";
        this.endDate = "";
      }
    },
    selectTabP(tabP) {
      this.selectedTabP = tabP;
      // 24.12.04 수정 - 추가
      this.currentPage = 1; // 탭 변경 시 페이지를 1로 초기화
    },
    isPositiveMoney(amount) {
      return amount.startsWith("-");
    },
    isWithinDateRange(createdAt) {
      if (!this.startDate && !this.endDate) return true;

      const createdDate = new Date(createdAt.split("T")[0]);
      console.log("createdDate : : :", createdDate)
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;

      return (!start || createdDate >= start) && (!end || createdDate <= end);
    },
    // 24.12.03 수정 - 추가 : 천 단위 쉼표 함수
    formatAmount(amount) {
      return Number(amount).toLocaleString(); // 쉼표 추가
    },
    isTabPMatch(amount) {
      if (this.selectedTabP === "포인트 전체 내역") return true;
      // if (this.selectedTabP === "포인트 충전 안내") return !amount.startsWith("-");
      // if (this.selectedTabP === "포인트 충전 안내") return amount.startsWith("+");
      // if (this.selectedTabP === "포인트 사용 내역") return amount.startsWith("-");
      // 24.12.03 수정 - 천단위 쉼표 추가
      if (this.selectedTabP === "포인트 충전 내역") return parseFloat(amount) > 0; // 양수 확인
      if (this.selectedTabP === "포인트 사용 내역") return parseFloat(amount) < 0; // 음수 확인
      return true;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      // this.currentPage = page;
      // 24.12.04 수정 - 추가
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async getPoints() {
      this.points = await adminStore.getTask(`points`);
      console.log("포인트 확인 : : : ", this.points)
      this.points = this.points.map(point => ({
        ...point,
        amount: parseFloat(point.pointTransaction_amount) > 0
          ? `+${Number(point.pointTransaction_amount).toString()}`
          : `${Number(point.pointTransaction_amount).toString()}`
      }));
      console.log("변경 후 포인트 확인 : : : ", this.points)
    },
  },
};
</script>


<style scoped>
.reservation-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  flex-direction: row;
}

.title-box {
  width: 100%;
  background-color: #fff;
  padding: 24px 30px;
  margin-bottom: 20px;
}

.wrapper {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}

.date_picker_wrap {
  padding: 30px;
  background-color: #fff;
}

.tabs {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 24.11.11 수정 - 정렬, height 추가, padding 수정 */
.tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 16px 30px;
  border: 1px solid #ddd;
  gap: 10px;
  background-color: #fff;
}

.tab-btn.active {
  background-color: #184199;
  color: #fff;
}

.tab-align {
  margin-bottom: 20px;
}

.shop_title,
.date-pickder-title {
  margin-right: 23.5px;
  white-space: nowrap;
}

/* 포인트 날짜 */
.date {
  width: 250px;
  height: 60px;
  padding: 23.5px 20px;
  border: 1px solid #ddd;
}

.search_box {
  width: 100%;
  background-color: #fff;
  gap: 10px;
  align-items: center;
  display: flex;
  margin-top: 20px;
}

.select_box_1 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  width: 250px;
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
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  /* width: 1092px; */
  /* 24.11.18 수정 */
  width: 100%;
  border: 1px solid #ddd;
}

.point-box {
  background-color: #fff;
  padding: 30px;
  margin-top: 20px;
}

.table-container {
  background-color: #fff;
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 26px 0px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f5f5f5;
}

.positive-money {
  color: #184199;
}

/* 네거티브 금액: 빨간색 */
.negative-money {
  color: #d30f1a;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* 24.11.11 수정 - 추가 */
.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* 24.11.18 수정 - 추가 */
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

/* 24.11.18 수정 - 추가 */
.page-number.active {
  background-color: #d30f1a;
  color: white;
}

/* 24.11.18 수정 - 추가 */
.page-number:hover {
  background-color: #eeeeee;
}

.pagination-arrow {
  cursor: pointer;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pagination-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-arrow.flipped {
  transform: rotate(180deg);
}

.tab-btn.activeP {
  background-color: #184199 !important;
  color: #fff;
}
</style>
