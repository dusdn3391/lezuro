<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">통계</h2>
          </div>
          <!-- Select box 부분 -->
          <div class="search-box">
            <div class="date-search">
              <span class="date pretendard-regular-normal-mine-shaft-18px"
                >날짜검색</span
              >
              <!-- 날짜 선택 부분 -->
              <div class="tabs">
                <div
                  v-for="tab in tabs"
                  :key="tab"
                  :class="[
                    'tab-btn pretendard-regular-normal-mine-shaft-18px ',
                    { active: selectedTab === tab },
                  ]"
                  @click="selectTab(tab)"
                >
                  {{ tab }}
                </div>
              </div>
              <input
                type="date"
                class="date pretendard-regular-normal-mine-shaft-18px"
                v-model="startDt"
                @change="fetchDateRangeData"
              />
              ~
              <input
                type="date"
                class="date pretendard-regular-normal-mine-shaft-18px"
                v-model="endDt"
                @change="fetchDateRangeData"
              />
            </div>
            <div class="user-search">
              <span class="date pretendard-regular-normal-mine-shaft-18px"
                >회원별 검색</span
              >
              <!-- select box -->

              <select
                class="text-2536 pretendard-regular-normal-mine-shaft-18px"
              >
                <option value="" disabled selected>전체등급</option>
                <option value="tournament1">등급 1</option>
                <option value="tournament2">등급 2</option>
                <option value="tournament3">등급 3</option>
              </select>

              <select
                class="text-2536 pretendard-regular-normal-mine-shaft-18px"
              >
                <option value="" disabled selected>전체성별</option>
                <option value="tournament1">남자</option>
                <option value="tournament2">여자</option>
              </select>
              <select
                class="text-2536 pretendard-regular-normal-mine-shaft-18px"
              >
                <option value="" disabled selected>전체나이</option>
                <option value="tournament1">나이1</option>
                <option value="tournament2">나이2</option>
              </select>
            </div>
          </div>
          <!-- 카드 -->
          <div class="data-box">
            <div class="pretendard-bold-24px">
              전체회원 <span> {{ statistics[0].totalMembers }} </span>
            </div>
            <div class="point-cards">
              <div
                v-for="(point, index) in pointData"
                :key="index"
                :class="['point-card', point.borderClass]"
              >
                <span
                  class="point-title pretendard-regular-normal-log-cabin-18px"
                  >{{ point.title }}</span
                >
                <span class="point-value pretendard-bold-normal-black-28px"
                  >{{ point.value }} {{ index < 3 ? "명" : "%" }}</span
                >
              </div>
            </div>
          </div>

          <!-- 차트 -->
          <div class="chart-title pretendard-medium-black-18px">
            시간대별 이용현황
          </div>
          <div
            class="chart-container"
           
          >
            <LineChart
           :style="chartStyle"
              :chart-data="{
                labels: chartData.labels,
                datasets: chartData.datasets,
              }"
              :chartOptions="chartOptions"
            />
          </div>

          <!-- 차트 -->
          <div class="chart-title pretendard-medium-black-18px">
            코스 이용 통계
          </div>
          <div class="graph-container">
            <Bar :chart-data="graphData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import { Line, Bar } from "vue-chartjs";
import { adminStore } from "@/store/adminStore"; // API 호출

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  BarElement,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  BarElement,
  CategoryScale,
  PointElement
);

export default {
  name: "AdminStatistics",
  components: {
    AdminHeader,
    AdminNavbar,
    LineChart: Line, // Line 차트를 LineChart로 등록
    Bar, // Line 차트 컴포넌트를 등록
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      startDt: "",
      endDt: "",
      selectedTab: "일간",
      tabs: ["일간", "주간", "월간", "연간"],
      statistics: [
        {
          id: 1,
          date: "2024-10-31",
          totalMembers: 111,
          visitors: 11,
          returningMembers: 22,
          newMembers: 33,
          returnRate: 200,
          newVisitRate: 300,
        },
      ],
      pointData: [
        { title: "방문자 수", value: 45, borderClass: "blue-border" },
        { title: "재방문자 수", value: 555, borderClass: "yellow-border" },
        { title: "신규방문자 수", value: 300, borderClass: "red-border" },
        { title: "신규 방문자율", value: 30.33, borderClass: "green-border" },
        {
          title: "일일 신규방문율",
          value: "28.42%",
          borderClass: "purple-border",
        },
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            min: 0, // 최소값 설정
            max: 80, // 최대값 설정
            ticks: {
              stepSize: 1, // 눈금 간격 설정
            },
          },
        },
      },

      chartData: {
        labels: [
          "2024-10-01 /09시",
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
            label: "시간대별 시간",
            backgroundColor: "#184199",
            data: [0, 25, 100, 100, 110, 200, 225, 100, 50, 0],
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

      graphData: {
        labels: [
          "코스A",
          "코스B",
          "코스C",
          "코스D",
          "코스E",
          "코스F",
          "코스G",
          "코스H",
          "코스I",
        ],
        datasets: [
          {
            label: "코스 이용 시간",
            backgroundColor: "#8BA0CC",
            data: [160, 270, 180, 130, 210, 190, 135, 70, 140],
          },
        ],
      },
      graphOptions: {
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
  chartStyle() {
    return {
      width: this.chartData.labels.length >= 8 ? `${200 * this.chartData.labels.length}px` : '100%',
      height: '800px',
    };
  },
},
  mounted() {

    const today = new Date();

    // 오늘 날짜를 yyyy-mm-dd 형식으로 포맷하는 함수
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // 오늘 날짜로 startDt와 endDt 초기화
    this.startDt = formatDate(today);
    this.endDt = formatDate(today);

    console.log("일간 데이터 시작일:", this.startDt, "종료일:", this.endDt);

    // 통계 및 일간 데이터 불러오기
    this.getStatistics();
    this.getTimeDt(this.startDt, this.endDt);

    // 코스 데이터는 고정된 기간으로 불러오기
    this.getCourseDt("2024-01-01", "2024-12-31");
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;

      if (tab === "일간") {
        this.initializeDates();
        this.getTimeDt(this.startDt, this.endDt);
      } else if (tab === "주간") {
        this.initializeWeekDates();
        this.getTimeDt(this.startDt, this.endDt);
      } else if (tab === "월간") {
        this.initializeMonthDates();
        this.getTimeDt(this.startDt, this.endDt);
      } else if (tab === "연간") {
        this.initializeYearDates();
        this.getTimeDt(this.startDt, this.endDt);
      }
    },
    initializeDates() {
      const today = new Date();
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      this.startDt = formatDate(today);
      this.endDt = formatDate(today);
    },
    initializeWeekDates() {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

      const monday = new Date(today);
      monday.setDate(today.getDate() + diffToMonday);

      const sunday = new Date(today);
      sunday.setDate(today.getDate() + diffToSunday);

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      this.startDt = formatDate(monday);
      this.endDt = formatDate(sunday);
    },
    initializeMonthDates() {
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      this.startDt = formatDate(firstDayOfMonth);
      this.endDt = formatDate(lastDayOfMonth);
    },
    initializeYearDates() {
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      this.startDt = formatDate(firstDayOfYear);
      this.endDt = formatDate(lastDayOfYear);
    },
    fetchDateRangeData() {
      // 입력된 날짜가 유효한지 확인
      if (this.startDt && this.endDt && this.startDt <= this.endDt) {
        console.log("Fetching data for range:", this.startDt, this.endDt);

        // 선택된 날짜 범위로 데이터를 가져옴
        this.getTimeDt(this.startDt, this.endDt);
      } else {
        console.warn(
          "Invalid date range. Ensure start date is before end date."
        );
      }
    },
    async getStatistics() {
      this.statistics = await adminStore.getTask(`statistics/member`);
      console.log("statistics : : : ", JSON.stringify(this.statistics));
      this.pointData[0].value = this.statistics[0].visitors;
      this.pointData[1].value = this.statistics[0].returningMembers;
      this.pointData[2].value = this.statistics[0].newMembers;
      this.pointData[3].value = this.statistics[0].returnRate;
      this.pointData[4].value = this.statistics[0].newVisitRate;

      // console.log("this.pointData.value : : : " ,  this.pointData.value)
      console.log("this.pointData.value : : : ", this.pointData);
    },
    async getTimeDt(startDt, endDt) {
  try {
    const times = await adminStore.getTask(
      `statistics/time-usage?startDate=${startDt}&endDate=${endDt}`
    );

    const start = new Date(startDt);
    const end = new Date(endDt);

    const combinedLabels = [];
    const combinedData = [];

    const weeklyData = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split("T")[0];
      weeklyData[dateKey] = [];
    }

    times.usage.forEach((yearData) => {
      yearData.months.forEach((monthData) => {
        monthData.days.forEach((dayData) => {
          const dateKey = `${yearData.year}-${monthData.month.padStart(
            2,
            "0"
          )}-${dayData.day.padStart(2, "0")}`;
          if (weeklyData[dateKey]) {
            weeklyData[dateKey] = dayData.times;
          }
        });
      });
    });

    Object.keys(weeklyData).forEach((dateKey) => {
      const dayData = weeklyData[dateKey];
      dayData.forEach((time) => {
        const label = `${dateKey} ${time.time}`;
        combinedLabels.push(label);
        combinedData.push(time.count);
      });
    });

    // 데이터의 최대값 계산
    const maxCount = Math.max(...combinedData, 0);

    // 차트 데이터 및 옵션 업데이트
    this.chartData = {
      labels: combinedLabels,
      datasets: [
        {
          label: "시간대별 이용현황",
          backgroundColor: "#184199",
          borderColor: "#184199",
          data: combinedData,
          fill: false,
        },
      ],
    };

    // Y축 최대값 동적으로 설정
    this.chartOptions.scales.y.max = maxCount + 10; // 최대값보다 10 더 크게 설정
    console.log("Updated chart options:", this.chartOptions);

  } catch (error) {
    console.error("Error fetching time data:", error);
    this.chartData = { labels: [], datasets: [] };
  }
},
    async getCourseDt(startDt, endDt) {
      const courses = await adminStore.getTask(
        `statistics/course-usage?startDate=${startDt}&endDate=${endDt}`
      );
      console.log("manager : : : ", courses);
      this.graphData.labels = [];
      this.graphData.datasets.data = [];
      this.graphData.labels = courses.map((course) => course.courseName);
      this.graphData.datasets[0].data = courses.map((course) => course.count);

      console.log("this.graphData : : : :", this.graphData);
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
  width: 80%;
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

.tabs {
  background-color: #fff;
  display: flex;
  gap: 10px;
  height: 60px;
}

.tab-btn {
  padding: 16px 30px;
  border: 1px solid #ddd;
  gap: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.tab-btn.active {
  background-color: #184199;
  color: #fff;
  display: flex;
  align-items: center;
}

.date-search {
  display: flex;
  align-items: center;
  height: 60px;
  gap: 10px;
}

.date-search input {
  width: 250px;
  height: 60px;
  border: 1px solid #ddd;
  margin: 12px;
  padding: 0 20px;
}

.user-search {
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

.data-box {
  background-color: #fff;
  padding: 30px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 187px;
  width: 100%;
}

.pretendard-bold-24px span {
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

.chart-container {
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  overflow-x: auto; /* X축 스크롤 활성화 */
  white-space: nowrap; /* 캔버스가 줄바꿈되지 않도록 설정 */
}

.chart-container canvas {
  max-height: 800px;
  display: inline-block; /* 캔버스를 가로 정렬 */
}

.chart-title {
  background-color: #fff;
  padding: 20px;
  height: 63px;
  width: 100%;
  border-bottom: 0.5px solid #ccc;
}

.graph-container {
  max-width: 100%;
  height: auto;
  padding: 30px;
  background-color: #fff;
  margin-bottom: 20px;
}
</style>
