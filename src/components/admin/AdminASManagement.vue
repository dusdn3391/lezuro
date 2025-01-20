<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">A/S 관리</h2>
          </div>
          <!-- Select box 부분 -->
          <div class="search-box">
            <div class="date-search">
              <span class="date pretendard-regular-normal-mine-shaft-18px">날짜검색</span>
              <!-- 24.12.04 수정 - 추가 -->
              <div v-for="dateTab in dateTabs" :key="dateTab"
                :class="['datetab-btn pretendard-regular-normal-mine-shaft-16px', { active: selectedDateTab === dateTab }]"
                @click="selectDateTab(dateTab)">
                {{ dateTab }}
              </div>
              <!-- 날짜 선택 부분 -->
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="startDate" /> -->
              <!-- 24.12.04 수정 -->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="selectedDate.start"
                @change="validateStartDate" />
              ~
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="endDate" /> -->
              <!-- 24.12.04 수정 -->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="selectedDate.end"
                @change="validateEndDate" />
            </div>
            <div class="store-search">
              <!-- 24.12.11 수정 - 문구 수정 -->
              <span class="date pretendard-regular-normal-mine-shaft-18px">A/S검색</span>
              <!-- select box -->
            <!-- 24.12.11 수정 - 검색 모델 추가, 옵션 value 수정 -->
            <select v-model="searchAs" class="pretendard-regular-normal-mine-shaft-18px">
                <option value="store" selected>매장이름</option>
                <option value="title">제목</option>
              </select>

              <!-- 검색어 입력 input 박스 -->
              <div class="search-container">
                <input type="text" class="search-input pretendard-regular-normal-mountain-mist-18px"
                  v-model="searchQuery" placeholder="검색어를 입력해주세요" />
                <img
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                  alt="searchBtn" />
              </div>
            </div>
          </div>

          <div class="list-box">
            <div class="list-box-btn">
              <div class="pretendard-bold-log-cabin-24px">A/S 리스트</div>
              <div>
                <button class="delete-btn pretendard-semibold-mountain-mist-16px" @click="deleteSelected">
                  선택 삭제
                </button>
                <!-- <button class="add-btn pretendard-semibold-mountain-mist-16px" @click="addStore">
                                    매장 추가
                                </button> -->
              </div>
            </div>
            <!-- 리스트 부분 -->
            <div class="as-list-box">
              <!-- <div class="tabs">
                                <button v-for="tab in tabs" :key="tab"
                                    :class="['tab-btn pretendard-semibold-mountain-mist-16px', { active: selectedTab === tab }]"
                                    @click="selectTab(tab)">
                                    {{ tab }}
                                </button>
                            </div> -->
              <div class="tabs">
                <button v-for="tab in tabs" :key="tab" :class="[
                  'tab-btn pretendard-semibold-mountain-mist-16px',
                  { active: selectedTab === tab },
                ]" @click="selectTab(tab)">
                  {{ tab }}
                    <!-- 24.12.13 수정 - 색상 변경 -->
                    <span :style="{ color: selectedTab === tab ? '#D30F1A' : '#184199' }">
                    {{ statusCounts[tab.replace(" 내역", "")] }}
                  </span>
                </button>
              </div>
              <div class="course-list">
                <div class="table-container">
                  <table>
                    <thead>
                      <tr class="pretendard-bold-mine-shaft-18px">
                        <th>
                          <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" />
                        </th>
                        <th>번호</th>
                        <th>매장</th>
                        <th>AS 신청 내역</th>
                        <th>접수일시</th>
                        <th>진행상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(list, index) in paginatedItems" :key="index"
                        class="pretendard-semibold-mountain-mist-16px">
                        <td class="pretendard-regular-normal-granite-gray-18px">
                          <input type="checkbox" v-model="selectedItems" :value="list.id" />
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px" @click="toGoAsDetail(list)">
                          <!-- {{ lists.length - ((currentPage - 1) * itemsPerPage + index) }} -->
                          <!-- 24.12.03 수정 -->
                          {{ list.id }}
                          <!-- {{ index + 1 }} -->
                          <!-- {{ list.number }} -->
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px" @click="toGoAsDetail(list)">
                          {{ list.branch.name }}
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px" @click="toGoAsDetail(list)">
                          <!-- {{ list.description }} -->
                          <!-- 24.12.03 수정 - descrition을 title로 수정 -->
                          {{ list.title }}
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px" @click="toGoAsDetail(list)">
                          <!-- {{ list.requestedAt.split('T')[0] }} -->
                          {{ list.requestedAt.split("T")[0] }}
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px" @click="toGoAsDetail(list)">
                          <span :class="statusClass(list.status)">
                            {{ list.status }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="pagination-controls">
                    <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                      :class="{ disabled: currentPage === 1 }" />
                    <div class="page-numbers pretendard-medium-log-cabin-16px">
                      <!-- 24.12.04 수정 - 추가 -->
                      <div v-for="page in visiblePages" :key="page" :class="[
                        'page-number',
                        { active: page === currentPage },
                      ]" @click="goToPage(page)">
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
        <!-- <AdminScoreCardModal v-if="isModalVisible" @close="closeModal" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import { adminStore } from "@/store/adminStore"; // API 호출

export default {
  name: "AdminASManagement",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      selectedDate: {
        start: "",
        end: "",
      },
      // 24.12.04 수정 - 추가
      selectedDateTab: "전체",
      // 24.12.04 수정 - 추가
      dateTabs: ["전체"],
      selectedTab: "전체 내역",
      // tabs: ["전체 내역", "처리중", "보류", "접수", "완료"],
      // 24.11.18 수정
      tabs: ["전체 내역", "진행중", "취소", "접수", "완료"],
      selectedStore: "",
      selectedTitle: "", // 24.12.11 수정 - selectedAsDetails - selectedTitle 로 수정
      searchQuery: "",
      selectedItems: [],
      lists: [],
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5, 
      searchAs: 'store', // 24.12.11 수정 - 검색 모델 추가 
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


    isAllSelected() {
      return (
        this.paginatedItems.length > 0 &&
        this.paginatedItems.every((list) => this.selectedItems.includes(list.id))
      );
    },
    totalPages() {
      return Math.ceil(this.filteredLists.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredLists.slice(start, start + this.itemsPerPage);
    },
    filteredLists() {
      let result = this.lists;

      // 24.12.11 수정 - 검색 옵션 필터링
      // 검색어가 있는 경우 필터링을 시작하기 전에 검색 기준에 따라 필터링을 적용
      if (this.searchQuery) {
        if (this.searchAs === 'store') {
          result = result.filter((list) =>
            list.branch.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        } else if (this.searchAs === 'title') {
          result = result.filter((list) =>
            list.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
      }

      // 매장 검색 필터
      // if (this.selectedStore) {
      //   result = result.filter((list) => list.branch.name === this.selectedStore);
      // }

      // 제목 검색 필터
      // if (this.selectedAsDetails) {
      //   result = result.filter(
      //     (list) => list.description === this.selectedAsDetails
      //   );
      // }

      // 검색어 필터
      // if (this.searchQuery) {
      //   const query = this.searchQuery.toLowerCase();
      //   result = result.filter(
      //     (list) =>
      //       list.description.toLowerCase().includes(query) ||
      //       list.branch.name.toLowerCase().includes(query)
      //   );
      // }

      // 날짜 검색 필터
      if (this.selectedDate.start && this.selectedDate.end) {
        const startDate = new Date(this.selectedDate.start);
        let endDate = new Date(this.selectedDate.end);

        // endDate가 선택된 경우, 시간을 23:59:59로 설정
        endDate.setHours(23, 59, 59, 999);

        result = result.filter(
          (list) =>
            new Date(list.requestedAt) >= startDate &&
            new Date(list.requestedAt) <= endDate
        );
      } else if (this.selectedDate.start) {
        // startDate만 있을 경우 필터링
        const startDate = new Date(this.selectedDate.start);
        result = result.filter(
          (list) => new Date(list.requestedAt) >= startDate
        );
      } else if (this.selectedDate.end) {
        // endDate만 있을 경우 필터링, 시간을 23:59:59로 설정
        const endDate = new Date(this.selectedDate.end);
        endDate.setHours(23, 59, 59, 999);
        result = result.filter((list) => new Date(list.requestedAt) <= endDate);
      }

      // 탭 필터
      if (this.selectedTab !== "전체 내역") {
        result = result.filter((list) => list.status === this.selectedTab);
      }

      // 24.12.04 수정 - 추가
      // 전체 탭이 선택되었으면 날짜 필터 적용 안 함
      if (this.selectedDateTab !== "전체") {
        if (this.selectedDate.start && this.selectedDate.end) {
          const startDate = new Date(this.selectedDate.start);
          let endDate = new Date(this.selectedDate.end);
          endDate.setHours(23, 59, 59, 999);

          result = result.filter(
            (list) =>
              new Date(list.requestedAt) >= startDate &&
              new Date(list.requestedAt) <= endDate
          );
        } else if (this.selectedDate.start) {
          const startDate = new Date(this.selectedDate.start);
          result = result.filter(
            (list) => new Date(list.requestedAt) >= startDate
          );
        } else if (this.selectedDate.end) {
          const endDate = new Date(this.selectedDate.end);
          endDate.setHours(23, 59, 59, 999);
          result = result.filter((list) => new Date(list.requestedAt) <= endDate);
        }
      }
      return result;
    },
    // 상태별 항목 수 계산
    statusCounts() {
      return {
        전체: this.lists.length,
        // 처리중: this.lists.filter((list) => list.status === "처리중").length,
        // 보류: this.lists.filter((list) => list.status === "보류").length,
        // 24.11.18 수정
        진행중: this.lists.filter((list) => list.status === "진행중").length,
        취소: this.lists.filter((list) => list.status === "취소").length,
        접수: this.lists.filter((list) => list.status === "접수").length,
        완료: this.lists.filter((list) => list.status === "완료").length,
      };
    },
    llSelected: {
      get() {
        if (this.paginatedItems.length === 0) return false;
        return this.paginatedItems.every((item) =>
          this.selectedItems.includes(item.number)
        );
      },
      set(value) {
        if (value) {
          const newSelections = this.paginatedItems
            .map((item) => item.number)
            .filter((number) => !this.selectedItems.includes(number));
          this.selectedItems = [...this.selectedItems, ...newSelections];
        } else {
          const toRemove = this.paginatedItems.map((item) => item.number);
          this.selectedItems = this.selectedItems.filter(
            (number) => !toRemove.includes(number)
          );
        }
      },
    },
  },
  mounted() {
    this.getAS();
  },
  // 24.12.04 수정 - 추가
  watch: {
    filteredLists() {
      this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  methods: {
    // 24.12.04 수정 - 추가
    selectDateTab(dateTab) {
      this.selectedDateTab = dateTab;
      if (dateTab === "전체") {
        // 전체를 선택하면 날짜 초기화
        this.selectedDate.start = "";
        this.selectedDate.end = "";
      }
    },
    // 24.12.04 수정 - 추가
    validateStartDate() {
      if (this.selectedDate.end && new Date(this.selectedDate.start) > new Date(this.selectedDate.end)) {
        alert("시작 날짜는 종료 날짜보다 늦을 수 없습니다.");
        this.selectedDate.start = ""; // 초기화
      }
      this.selectedDateTab = ""; // 전체 탭 해제
    },
    // 24.12.04 수정 - 추가
    validateEndDate() {
      if (this.selectedDate.start && new Date(this.selectedDate.end) < new Date(this.selectedDate.start)) {
        alert("종료 날짜는 시작 날짜보다 이를 수 없습니다.");
        this.selectedDate.end = ""; // 초기화
      }
      this.selectedDateTab = ""; // 전체 탭 해제
    },
    async getAS() {
      this.lists = await adminStore.getTask(`as-requests`);
      console.log("manager : : : ", this.lists);
    },
    addStore() {
      this.$router.push({ path: "/adminas-managementdetail" });
    },
    selectTab(tab) {
      this.selectedTab = tab;
      this.currentPage = 1; // 탭 선택 시 페이지를 초기화
    },
    statusClass(status) {
      if (status === "접수") return "status-reception";
      if (status === "진행중") return "status-processing";
      if (status === "취소") return "status-hold";
      if (status === "완료") return "status-complete";
      return "";
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
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedItems = this.selectedItems.filter(
          (id) => !this.paginatedItems.some((list) => list.id === id)
        );
      } else {
        const newSelection = this.paginatedItems
          .filter((list) => !this.selectedItems.includes(list.id))
          .map((list) => list.id);
        this.selectedItems = this.selectedItems.concat(newSelection);
      }
    },
    async deleteSelected() {
      if (this.selectedItems.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      if (confirm("선택된 항목을 정말 삭제하시겠습니까?")) {

        for (var i = 0; i < this.selectedItems.length; i++) {
          const deleteDt = await adminStore.deleteTask(`as-requests/${this.selectedItems[i]}`);
        }



        this.lists = this.lists.filter(
          (list) => !this.selectedItems.includes(list.id)
        );
        this.selectedItems = [];

        // 페이지가 삭제 후 총 페이지 수보다 클 경우 현재 페이지를 조정
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }
      }
    },
    search() {
      // 검색 버튼 클릭 시 페이지를 첫 페이지로 이동
      this.currentPage = 1;
    },
    toGoAsDetail(item) {
      // Step 1: 클릭된 항목의 전체 정보와 ID 출력
      console.log("Step 1: 클릭된 A/S 항목", item);
      console.log("Step 1: 선택된 A/S 항목 ID:", item.id);

      if (item.id) {
        // Step 2: 라우터 이동 전 ID 출력
        console.log("Step 2: 라우터 이동 준비, ID:", item.id);

        // 라우터로 페이지 이동
        this.$router.push({
          path: "/adminas-managementdetail",
          query: { id: item.id },
        });

        // Step 3: 라우터 이동 후 출력 (라우터의 beforeEach 훅에서 확인 가능)
        console.log("Step 3: 라우터 이동 완료");
      } else {
        console.error("Step 1: 항목에 ID가 없습니다:", item);
      }
    },
  },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.reservation-container {
  background-color: #f5f6f6;
  display: flex;
  height: 100%;
  width: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  flex-direction: row;
}

.wrapper {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}

/* 타이틀 박스 */
.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}

/* search-box */
.search-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 190px;
  width: 100%;
}

.date-search {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-search input {
  width: 250px;
  height: 60px;
  border: 1px solid #ddd;
  padding: 0 20px;
}

/* 24.12.04 수정 */
.datetab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 16px 30px;
  border: 1px solid #ddd;
  gap: 10px;
  background-color: #fff;
}

.store-search {
  display: flex;
  align-items: center;
}

select {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  width: 250px;
  border: 1px solid #ddd;
  margin: 12px;
}

.search-container {
  /* width: 100%; */
  width: 76%;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 60px;
  justify-content: space-between;
}

.search-container img {
  height: 24px;
  position: relative;
  width: 24px;
  text-align: right;
}

.search-input {
  border: none;
  outline: none;
  padding: 10px;
  width: 300px;
}

/* 리스트 박스 */
.list-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 30px;
}

.list-box-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-btn {
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: 150px;
  height: 45px;
  border: none;
  background-color: #184199;
  color: #fff;
}

.delete-btn {
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: 150px;
  height: 45px;
  border: none;
  background-color: #ccc;
  color: #fff;
  margin-right: 10px;
}

.table-container {
  background-color: #fff;
  width: 100%;
  overflow-x: auto;
}

.course-list {
  width: 100%;
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

/*리스트 박스 */
.as-list-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #fff;
  padding: 30px;
}

.tabs {
  background-color: #fff;
  height: 45px;
}

.tab-btn {
  flex: 1;
  padding: 15px;
  text-align: center;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
  width: 150px;
}

/* 24.12.04 수정 */
.datetab-btn.active,
.tab-btn.active {
  background-color: #003399;
  color: #fff;
}

/* 테이블 스타일 */
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

/* 버튼 - 접수 */
.status-reception {
  color: #14b655;
  border: 1px solid #14b655;
  width: 80px;
  padding: 11px 0px;
  border-radius: 5px;
  display: inline-block;
  /* 셀 안에서 중앙에 위치하도록 변경 */
  text-align: center;
  /* 텍스트도 가운데 정렬 */
}

/* 버튼 - 처리중 */
.status-processing {
  color: #d30f1a;
  border: 1px solid #d30f1a;
  width: 80px;
  padding: 11px 0px;
  border-radius: 5px;
  display: inline-block;
  /* 셀 안에서 중앙에 위치하도록 변경 */
  text-align: center;
  /* 텍스트도 가운데 정렬 */
}

/* 버튼 - 보류 */
.status-hold {
  color: #999999;
  border: 1px solid #999999;
  width: 80px;
  padding: 11px 0px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}

/* 버튼 - 완료 */
.status-complete {
  color: #184199;
  border: 1px solid #184199;
  width: 80px;
  padding: 11px 0px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
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
