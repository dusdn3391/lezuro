<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="admin-management-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">점장 관리</h2>
          </div>

          <div class="search_box">
            <div class="select_box_1">
              <!-- 대회이름을 선택할 수 있는 select box -->
              <!-- 24.12.11 수정 - 검색 모델 추가 -->
              <select v-model="searchManager" class="pretendard-regular-normal-mine-shaft-18px">
                <option value="phone" selected>점장아이디</option>
                <option value="name">매장</option>
              </select>
            </div>
            <div class="select_box_2">
              <!-- 검색어 입력 필드 -->
              <input type="text" class="pretendard-regular-normal-mountain-mist-18px" placeholder="검색어를 입력하세요"
                v-model="searchQuery" />
              <img class="search-btn-10"
                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                alt="searchBtn" />
            </div>
          </div>

          <!-- 점장 리스트 -->
          <div class="admin-management-box">
            <!-- 점장 리스트 내역 -->
            <div class="admin-management-history">
              <div class="manager_title">
                <div class="list_title pretendard-bold-log-cabin-24px">점장 리스트</div>
                <div class="list_button">
                  <button class="pretendard-regular-normal-mine-shaft-16px" @click="deleteSelected">
                    선택 삭제
                  </button>
                  <button class="pretendard-regular-normal-mine-shaft-16px" @click="toGoAddManager">
                    점장 추가
                  </button>
                </div>
              </div>

              <div class="point-list">
                <div class="table-container">
                  <table>
                    <thead>
                      <tr class="pretendard-bold-mine-shaft-18px">
                        <th><input type="checkbox" @click="toggleAll" v-model="isAllSelected" /></th>
                        <th>매장</th>
                        <th>아이디</th>
                        <th>등급</th>
                        <th>요금제</th>
                        <th>잔여 포인트</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="manager in paginatedItems" :key="manager.id"
                        class="pretendard-light-granite-gray-16px">
                        <td><input type="checkbox" v-model="selectedManager" :value="manager" /></td>
                        <td class="pretendard-regular-normal-granite-gray-18px">{{ manager.name }}</td>
                        <td class="pretendard-regular-normal-granite-gray-18px">{{ manager.phone }}</td>
                        <td class="pretendard-regular-normal-granite-gray-18px">{{ manager.grade }}</td>
                        <td class="pretendard-regular-normal-granite-gray-18px">{{ manager.pricingPlan }}</td>
                        <td class="pretendard-regular-normal-granite-gray-18px">{{ manager.point === null ? 0 : manager.point }} P</td>
                        <td>
                          <button class="game-list-btn pretendard-semi-bold-log-cabin-14px "
                            @click="openModal(manager)">수정</button>
                        </td>
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
</template>
<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
// import taskApi from "../../api/taskApi";
import { taskStore } from '@/store/taskStore';  // API 호출
import { adminStore } from '@/store/adminStore';  // API 호출

export default {
  name: "AdminUserManagement",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5, // Display 5 users per page
      selectedManager: [], // 선택된 사용자들
      searchQuery: "", // 검색어
      manager: [],
      searchManager:"phone",// 24.12.11 수정 - 검색 모델 추가 
    };
  },
  computed: {
    // 24.12.04 수정
    filteredManagers() {
      // 검색어가 없는 경우 모든 매니저 반환
      if (!this.searchQuery) {
        return this.manager;
      }

      // 24.12.11 수정 - 검색 옵션 필터링
      // 검색어가 있는 경우 필터링을 시작하기 전에 검색 기준에 따라 필터링을 적용
      let result = this.manager; // 초기값으로 전체 매니저 목록을 설정

      if (this.searchQuery) {
        if (this.searchManager === 'phone') {
          result = result.filter((manager) =>
          manager.phone.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        } else if (this.searchManager === 'name') {
          result = result.filter((manager) =>
          manager.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
      }

      console.log('result', result)

      // const query = this.searchQuery.toLowerCase();
      // const filtered = this.manager.filter(manager =>
      //   manager.phone.toLowerCase().includes(query) ||
      //   manager.name.toLowerCase().includes(query)
      // );

      // 24.12.11 수정
      // 검색 후 결과가 현재 페이지 범위에 포함되지 않는 경우 currentPage를 1로 설정
      if (Math.ceil(result.length / this.itemsPerPage) < this.currentPage) {
        this.currentPage = 1;
      }

      // 24.12.11 수정
      return result;
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
    totalPages() {
      return Math.ceil(this.filteredManagers.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredManagers.slice(start, start + this.itemsPerPage);
    },
    isAllSelected() {
      return this.paginatedItems.length > 0 && this.paginatedItems.every(manager => this.selectedManager.includes(manager));
    }
  },
  mounted() {
    this.getManager()
  },
  // // 24.12.04 수정 - 추가
  // watch: {
  //   filteredManagers() {
  //     this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
  //   },
  // },

    // 24.12.11 수정 - 추가
    watch: {
    searchQuery(newQuery) {
      if (newQuery !== "") {
        this.currentPage = 1;
      }
    }
  },
  methods: {
    openModal(manager) {
      console.log("manager : : : : : ", JSON.stringify(manager))
      // this.$router.push('/adminmanager-managementwrite')
      this.$router.push({
        path: '/adminmanager-managementwrite',
        query: { params: manager }
      });
    },
    async getManager() {
      // this.manager = await taskStore.getSelectTasks(`administrators`);
      this.manager = await adminStore.getTask(`administrators`);
      console.log("manager : : : ", this.manager)
    },
    toggleAll() {
      if (this.isAllSelected) {
        // 모든 항목을 선택 해제
        this.selectedManager = this.selectedManager.filter(manager => !this.paginatedItems.includes(manager));
      } else {
        // 모든 항목을 선택
        const newSelection = this.paginatedItems.filter(manager => !this.selectedManager.includes(manager));
        this.selectedManager = this.selectedManager.concat(newSelection);
      }
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
    toGoAddManager() {
      this.$router.push({ path: "/adminmanager-managementwrite" })
    },
    async deleteSelected() {
      if (this.selectedManager.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }



      // deleteTask
      console.log("this.selectedManager : : : ", this.selectedManager)
      if (confirm("선택된 항목을 정말 삭제하시겠습니까?")) {

        for (var a = 0; a < this.selectedManager.length; a++) {
          // const res = await taskStore.deleteTask(`administrators/${parseInt(this.selectedManager[a].id)}`);
          const res = await adminStore.deleteTask(`administrators/${parseInt(this.selectedManager[a].id)}`);
          console.log("RESPONSE:", JSON.stringify(res));
        }


        // 선택된 점장 리스트에서 삭제
        this.manager = this.manager.filter(
          (manager) => !this.selectedManager.includes(manager)
        );
        this.selectedManager = [];


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
  },
};
</script>
<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.admin-management-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  flex-direction: row;
}

.wrapper {
  flex-grow: 1;
  padding: 30px;
  gap: 20px;
}

/* 타이틀 박스 */
.title-box {
  width: 100%;
  background-color: #fff;
  padding: 24px 30px;
  margin-bottom: 20px;
}

.manager_title {
  display: flex;
  justify-content: space-between;
}

/* 포인트 날짜 */
.admin-management {
  background-color: #fff;
  width: 100%;
  gap: 10px;
  display: flex;
  padding: 30px;
  margin-bottom: 20px;
}

.pretendard-regular-normal-mine-shaft-16px {
  border: none;
  background-color: #184199;
  width: 150px;
  height: 45px;
  font-weight: 600;
  line-height: 21.48px;
  color: #ffffff;
  /* gap: 10px;
  opacity: 0px; */
}

.admin-date1 {
  width: 250px;
  height: 60px;
  padding: 0px 20px 0px 20px;
  gap: 0px;
  border: 1px 0px 0px 0px;
  justify-content: space-between;
  opacity: 0px;
  border: 1px solid #dddddd;
}

.admin-date2 {
  width: 250px;
  height: 60px;
  padding: 0px 20px 0px 20px;
  gap: 0px;
  border: 1px 0px 0px 0px;
  justify-content: space-between;
  opacity: 0px;
  border: 1px solid #dddddd;
}

.admin-management1 {
  width: 250px;
  height: 60px;
  padding: 0px 20px 0px 20px;
  gap: 0px;
  justify-content: space-between;
  opacity: 0px;
  border: 1px solid #dddddd;
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
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  width: 250px;
  border: 1px solid #ddd;
}

.select_box_1 select {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
}

.select_box_2 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  /* width: 1170px; */
  /* 24.11.18 수정 */
  width: 100%;
  border: 1px solid #ddd;
}

.select_box_2 input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.admin-management2 {
  width: 1092px;
  height: 60px;
  padding: 0 0 0 20px;
  opacity: 0px;
  justify-content: space-between;
  opacity: 0px;
  border: 1px solid #dddddd;
}

/* 포인트 박스 */
.admin-management-box {
  width: 100%;
  background-color: #fff;
  padding: 30px;
}

/* 탭 버튼 */
.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-buttons div {
  padding: 10px 20px;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

/* 포인트 내역 */
.tabs {
  background-color: #f5f5f5;
  margin-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding: 30px;
}

.tab-btn {
  padding: 23.5px 30px;

  gap: 10px;
  background-color: #fff;
}

.tab-btn:active {
  background-color: #184199;
  color: #fff;
}

.table-container {
  margin-top: 20px;
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

td button {
  border: 1px solid #d30f1a;
  background-color: #fff;
  color: #d30f1a;
  padding: 11px 27.5px;
  border-radius: 5px;
}

th {
  background-color: #f5f5f5;
}

.list_button {
  display: flex;
  gap: 10px;
}

.list_button button:nth-child(1) {
  background-color: #ccc;
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

.pagination-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-arrow.flipped {
  transform: rotate(180deg);
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
