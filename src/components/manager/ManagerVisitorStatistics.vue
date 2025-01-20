<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">방문자 통계</h2>
          </div>

          <div class="tabs">

            <div v-for="tab in tabs" :key="tab" :class="[
              'tab-btn pretendard-regular-normal-mine-shaft-16px ',
              { active: selectedTab === tab },
            ]" @click="selectTab(tab)">
              {{ tab }}
            </div>
            <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" />
            ~
            <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" />
          </div>

          <!-- 카드 -->
          <div class="point-cards">
            <div v-for="(point, index) in pointData" :key="index" :class="['point-card', point.borderClass]">
              <span class="point-title pretendard-regular-normal-log-cabin-18px">{{ point.title }}</span>
              <span class="point-value pretendard-bold-normal-black-28px">{{
                point.value
              }}</span>
            </div>
          </div>

          <!-- 차트 -->
          <div class="chart-container">
            <div class="chart_title pretendard-medium-black-18px">시간대별 이용현황</div>
            <!-- <LineChart :chart-data="chartData" :options="chartOptions" :styles="myStyles"  /> -->
            <LineChart :chart-data="chartData" />
          </div>

          <div class="point-box">
            <div class="point-history">
              <div class="table_title pretendard-bold-log-cabin-24px">
                시간대별 방문자 상세정보
              </div>
              <div class="point-list">
                <div class="table-container">
                  <table>
                    <thead>
                      <tr class="pretendard-bold-mine-shaft-18px">
                        <th>시간대</th>
                        <th>방문자 수</th>
                        <th>재방문자 수</th>
                        <th>신규방문자 수</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(visitorData, index) in paginatedItems" :key="index"
                        class="pretendard-light-granite-gray-16px">
                        <td class="pretendard-regular-normal-granite-gray-18px">
                          {{ visitorData.time }}
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px">
                          {{ visitorData.visitor }}
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px">
                          {{ visitorData.revisitor }}
                        </td>
                        <td class="pretendard-regular-normal-granite-gray-18px">
                          {{ visitorData.newvisitor }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="pagination-controls">
                <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                  :class="{ disabled: currentPage === 1 }" />
                <div class="page-numbers">
                  <div v-for="page in totalPages" :key="page" :class="['page-number', { active: page === currentPage }]"
                    @click="goToPage(page)">
                    {{ page }}
                  </div>
                </div>
                <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
                  :class="{ disabled: currentPage === totalPages }" />
              </div>
            </div>
          </div>

          <PointChargeModal v-if="isModalVisible" @close="closeModal" />
          <ManagerUsingCostModal v-if="isModalCVisible" @cClose="closeCModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";
import PointChargeModal from "./PointChargeModal.vue";
import ManagerUsingCostModal from "./ManagerUsingCostModal.vue";
import { taskStore } from '@/store/taskStore';  // API 호출
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "ManagerVisitorStatistics",
  components: {
    ManagerHeader,
    ManagerNavbar,
    PointChargeModal,
    ManagerUsingCostModal,
    LineChart: Line, // Line 차트를 LineChart로 등록
  },
  data() {
    return {
      selectedTab: "전체",
      tabs: ["전체", "주간", "월별", "월간"],
      isModalVisible: false,
      isModalCVisible: false,
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5,
      visitorData: [
        { time: "00:00", visitor: 80, revisitor: 36, newvisitor: 36 },
        { time: "01:00", visitor: 60, revisitor: 60, newvisitor: 60 },
        { time: "02:00", visitor: 45, revisitor: 45, newvisitor: 45 },
        { time: "03:00", visitor: 40, revisitor: 40, newvisitor: 40 },
        { time: "04:00", visitor: 55, revisitor: 55, newvisitor: 55 },
        { time: "05:00", visitor: 10, revisitor: 10, newvisitor: 10 },
      ],
      pointData: [
        { title: "방문자 수", value: "45명", borderClass: "blue-border" },
        { title: "재방문자 수", value: "500명", borderClass: "yellow-border" },
        { title: "신규방문자 수", value: "300명", borderClass: "red-border" },
        { title: "신규방문자 수", value: "300명", borderClass: "green-border" },
        {
          title: "일일 신규방문율",
          value: "28.42%",
          borderClass: "purple-border",
        },
      ],
      chartData: {
        labels: [
          "09시",
          "10시",
          "11시",
          "12시",
          "13시",
          "14시",
          "15시",
          "16시",
          "17시",
          "18시",
        ],
        datasets: [
          {
            backgroundColor: "#184199",
            data: [50, 80, 100, 240, 260, 300, 140],
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 400,
        },
      },
      startDt: '',
      endDt: ''
    };
  },
  mounted() {
    const today = new Date();

    // Get the first day of the current month
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    // Format dates as yyyy-mm-dd
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Set startDt to the first day of the month and endDt to today's date
    this.startDt = formatDate(firstDay);
    this.endDt = formatDate(today);

    // console.log(this.startDt)

    // 현재 날짜 계산 후 데이터 삽입
    this.getTimeDt(this.startDt, this.endDt);
  },
  computed: {
    totalPages() {
      return Math.ceil(this.visitorData.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.visitorData.slice(start, start + this.itemsPerPage);
    },
    //  containerStyle() {
    //   return {
    //     width: this.chartData.labels.length > 2 ? `${this.chartData.labels.length * 70}px` : '100%',
    //     overflowX: this.chartData.labels.length > 2 ? 'auto' : 'hidden',
    //   };
    // },

  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeCModal() {
      this.isModalCVisible = false;
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
      this.currentPage = page;
    },
    async getTimeDt(startDt, endDt) {
      const times = await taskStore.getSelectTasks(`api/statistics/time-usage?startDate=${startDt}&endDate=${endDt}`);
      console.log("manager : : : ", times)
      this.chartData.labels = [];
      this.chartData.datasets.data = [];
      this.chartData.labels = times.map(course => `${course.date} / ${course.hour}`);
      this.chartData.datasets[0].data = times.map(course => course.count);
      console.log("this.chartData : : : :", this.chartData)
    },
  },
};
</script>

<style scoped>
.chart-container {
  max-width: 100%;
  background-color: #fff;
  margin: 0 auto;
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

.chart_title {
  padding: 20px;
  border-bottom: 1px solid #ddd;
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
  margin-top: 20px;
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

.table_title {
  margin-bottom: 20px;
}

.date-info .start-date,
.date-info .end-date {
  color: #d30f1a;
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
  align-items: center;
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.point-title {
  display: block;
  margin-bottom: 10px;
}

.point-value {
  color: #333;
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

/* 24.11.11 수정 - 추가 */
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

/* 24.11.11 수정 - 추가 */
.page-number.active {
  background-color: #d30f1a;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 24.11.11 수정 - 추가 */
.pagination-arrow {
  cursor: pointer;
}

/* 24.11.11 수정 - 추가 */
.pagination-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 24.11.11 수정 - 추가 */
.pagination-arrow.flipped {
  transform: rotate(180deg);
}
</style>
