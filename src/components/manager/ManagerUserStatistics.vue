<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">회원 통계</h2>
          </div>

          <!-- 탭과 날짜 선택 -->
          <div class="tabs">
            <div v-for="tab in tabs" :key="tab" :class="[
              'tab-btn pretendard-regular-normal-mine-shaft-16px ',
              { active: selectedTab === tab },
            ]" @click="selectTab(tab)">
              {{ tab }}
            </div>
            <!-- 24.11.11 수정 - date-box 추가 -->
            <div class="date-box">
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" />
              ~
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" />
            </div>
          </div>

          <!-- 차트 영역 -->
          <div class="chart-container">
            <div class="chart_title">
              <div class="chart_title_1 pretendard-bold-log-cabin-24px">회원 통계</div>
              <div class="chart_title_2 pretendard-light-granite-gray-18px">
                전체 플레이어 수 <span class="pretendard-bold-black-18px">100</span>명
              </div>
            </div>
            <Bar :chart-data="chartData" :options="chartOptions" />
          </div>

          <!-- 플레이 분포 목록 -->
          <div class="point-box">
            <div class="point-history">
              <div class="table_title pretendard-bold-log-cabin-24px">
                플레이 분포 목록
              </div>
              <div class="point-list">
                <div class="table-container">
                  <table>
                    <thead>
                      <tr class="pretendard-bold-mine-shaft-18px">
                        <th>등급</th>
                        <th>코스1</th>
                        <th>코스2</th>
                        <th>코스3</th>
                        <th>코스4</th>
                        <th>코스5</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(level, index) in levels" :key="index" class="pretendard-light-granite-gray-16px">
                        <td class="pretendard-regular-normal-granite-gray-18px">
                          {{ level.name }}
                        </td>
                        <td>{{ level.courses[0] }}</td>
                        <td>{{ level.courses[1] }}</td>
                        <td>{{ level.courses[2] }}</td>
                        <td>{{ level.courses[3] }}</td>
                        <td>{{ level.courses[4] }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 페이지네이션 -->
              <!-- <div class="pagination-controls">
                <img
                  class="pagination-arrow"
                  @click="prevPage"
                  :src="arrowLeftImage"
                  :alt="'Previous'"
                  :class="{ disabled: currentPage === 1 }"
                />
                <div class="page-numbers">
                  <div
                    v-for="page in totalPages"
                    :key="page"
                    :class="['page-number', { active: page === currentPage }]"
                    @click="goToPage(page)"
                  >
                    {{ page }}
                  </div>
                </div>
                <img
                  class="pagination-arrow flipped"
                  @click="nextPage"
                  :src="arrowRightImage"
                  :alt="'Next'"
                  :class="{ disabled: currentPage === totalPages }"
                />
              </div> -->
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
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);


export default {
  name: "ManagerUserStatistics",
  components: {
    ManagerHeader,
    ManagerNavbar,
    Bar // Line 차트 컴포넌트를 등록
  },
  data() {
    return {
      selectedTab: "전체",
      tabs: ["전체", "주간", "월별", "월간"],
      // currentPage: 1,
      // itemsPerPage: 5,
      levels: [
        { name: "등급1", courses: [10, 20, 30, 40, 50] },
        { name: "등급2", courses: [5, 15, 25, 35, 45] },
        { name: "등급3", courses: [12, 22, 32, 42, 52] },
        { name: "등급4", courses: [6, 16, 26, 36, 46] },
        { name: "등급5", courses: [8, 18, 28, 38, 48] },
        { name: "등급6", courses: [4, 14, 24, 34, 44] },
      ],
      // arrowLeftImage:
      //   "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      // arrowRightImage:
      //   "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      chartData: {
        labels: [
          "등급1",
          "등급2",
          "등급3",
          "등급4",
          "등급5",
          "등급6",
        ],
        datasets: [
          {
            backgroundColor: "#8BA0CC",
            data: [180, 200, 300, 260, 330, 50],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  computed: {
    // totalPages() {
    //   return Math.ceil(this.levels.length / this.itemsPerPage);
    // },
    // paginatedItems() {
    //   const start = (this.currentPage - 1) * this.itemsPerPage;
    //   return this.levels.slice(start, start + this.itemsPerPage);
    // },
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    // nextPage() {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //   }
    // },
    // prevPage() {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //   }
    // },
    // goToPage(page) {
    //   this.currentPage = page;
    // },
  },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.chart_title {
  display: flex;
  justify-content: space-between;
}

/* 전체 컨테이너의 배경색 설정 */
.chart-container {
  max-width: 100%;
  height: auto;
  padding: 30px;
  background-color: #fff;
  margin-bottom: 20px;
}

.reservation-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
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

/* 포인트 박스 */
.point-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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

.blue {
  background-color: #184199;
}

.yellow {
  background-color: #f4bc1c;
}

.red {
  background-color: #d30f1a;
}

/* 정액제 사용 정보 */
.plan-info {
  margin-bottom: 20px;
}

.plan-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16.5px 30px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  margin: 0;
}

.register-btn {
  background-color: #184199;
  color: white;
  padding: 12px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dates-cost {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 27px 30px;
  gap: 20px;
  align-items: center;
}

.dates-cost_3 {
  display: flex;
  justify-content: space-between;
  width: 60%;
  gap: 20px;
  align-items: center;
}

.date-info .start-date,
.date-info .end-date {
  color: #d30f1a;
}

.table_title {
  margin-bottom: 20px;
}

.cost-info {
  display: flex;
  gap: 50px;
}

.cost-info_2 {
  display: flex;
  width: 60%;
  justify-content: space-between;
}

.cost-info_2 .cost-item_2 {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cost-change-btn {
  background-color: #333;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
}

/* 포인트 요금제 안내 */
.point-info {
  padding: 20px;
}

.point-info h4 {
  font-weight: bold;
  margin-bottom: 10px;
}

.point-info ul {
  padding: 0;
}

.point-info li {
  margin-bottom: 10px;
}

/* 포인트 내역 */
.tabs {
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding: 30px;
}

/* 24.11.11 수정 - height, padding, 정렬 수정 */
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

.tab-btn:active {
  background-color: #184199;
  color: #fff;
}

/* 24.11.11 수정 - 추가 */
.date-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* 24.11.11 수정 - 추가 */
.date {
  width: 250px;
  height: 60px;
  padding: 0 20px;
  border: 1px solid #ddd
}

.point-history {
  margin-top: 30px;
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

.point-cards {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.point-card {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.point-title {
  display: block;
  margin-bottom: 10px;
}

/* 개별 카드 테두리 색상 */
.blue-border {
  border-bottom: 4px solid #184199;
}

.yellow-border {
  border-bottom: 4px solid #f4bc1c;
}

.red-border {
  border-bottom: 4px solid #d30f1a;
}

.green-border {
  border-bottom: 4px solid #4caf50;
}

.purple-border {
  border-bottom: 4px solid #9c27b0;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.page-number.active {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
