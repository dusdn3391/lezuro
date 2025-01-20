<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">예약 접수 관리</h2>
          </div>

          <!-- 날짜 선택 부분 -->
          <div class="date-picker-box">
            <input
              type="date"
              class="date pretendard-regular-normal-mine-shaft-18px"
              v-model="selectedDate"
            />
          </div>

          <!-- 룸 리스트 부분 -->
          <div class="room-list-box">
            <div class="tabs">
              <button
                v-for="tab in tabs"
                :key="tab"
                :class="[
                  'tab-btn pretendard-semibold-mountain-mist-16px',
                  { active: selectedTab === tab },
                ]"
                @click="selectTab(tab)"
              >
                {{ tab }}
              </button>
            </div>

            <!-- 테이블 리스트 -->
            <div class="table-container">
              <table>
                <thead>
                  <!-- 24.12.11 수정 - 폰트 추가 -->
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th><input type="checkbox" /></th>
                    <th>번호</th>
                    <th>예약자</th>
                    <th>연락처</th>
                    <th>인원</th>
                    <!-- 24.12.11 수정 -->
                    <th>예약일시</th>
                    <th>상태</th>
                    <!-- <th>접수 시간</th> -->
                  </tr>
                </thead>
                <tbody>
                  <!-- 24.11.11 font style 수정 -->
                  <tr
                    v-for="(reservation, index) in paginatedReservations"
                    :key="index"
                    class="pretendard-regular-normal-granite-gray-18px"
                  >
                    <td><input type="checkbox" /></td>
                    <td>{{ reservation.id }}</td>
                    <td>{{ reservation.reser_user }}</td>
                    <td>{{ reservation.reser_phone }}</td>
                    <td>{{ reservation.member }}</td>
                    <td>
                      <!-- 24.12.11 수정 -->
                      {{ reservation.startTime.split("T")[0] }} 
                      ({{ reservation.startTime.split("T")[1].slice(0, 5) }} -
                      {{ reservation.endTime.split("T")[1].slice(0, 5) }})
                    </td>
                    <!-- 24.11.11 수정 -->
                     <!-- 24.12.11 수정 - :class 추가  -->
                    <td class="reserve-status" @click="showModal(reservation.id, reservation.status)" 
                     :class="{'disabled': isPastReservation(reservation.startTime)}">
                      <span :class="statusClass(reservation.status)">
                        {{
                          reservation.status === "confirm"
                            ? "예약완료"
                            : reservation.status === "cancel"
                              ? "예약취소"
                              : "접수중"
                        }}</span>
                    </td>

                    <!-- <td>{{ reservation.startTime.split("T")[0] }}</td> -->
                  </tr>
                </tbody>
              </table>
              <ManagerReservationConformModal
                v-if="isModalVisible"
                :reserId="reserId"
                :reserStatus="reserStatus"
                @close="closeModal"
                @confirm="confirmModal"
              />
            </div>

            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                :class="{ disabled: currentPage === 1 }" />
              <!-- 24.12.11 수정 - 폰트 수정 -->
              <div class="page-numbers pretendard-medium-log-cabin-16px">
                <!-- 24.12.11 수정 - totalPages - visiblePages 변경 -->
                <div v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
                  @click="goToPage(page)">
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
import { managerStore } from "@/store/managerStore"; // API 호출
import ManagerReservationConformModal from "./ManagerReservationConformModal.vue";

export default {
  name: "ManagerReservation",
  components: {
    ManagerReservationConformModal,
    ManagerHeader,
    ManagerNavbar,
  },
  data() {
    return {
      reserId: 0,
      reserStatus: "",
      selectedDate: "",
      selectedTab: "전체",
      tabs: ["전체", "접수중", "예약완료", "예약취소"],
      isModalVisible: false,
      reservations: [ ],
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5, // Display 6 courses per page
      currentPage: 1, // 현재 페이지
    };
  },
  watch: {
    // selectedDate 변경 시 호출
    selectedDate(newDate) {
      if (newDate) {
        console.log("날짜 선택됨:", newDate);
        this.getReservationsDt(newDate); // 날짜에 따라 API 호출
      } else {
        console.log("날짜 선택 안됨, 전체 데이터 호출");
        this.getReservationDt(); // 전체 데이터 호출
      }
    },
  },
  computed: {
    filteredReservations() {
      if (this.selectedTab === "전체") {
        return this.reservations; // 모든 예약 표시
      }
      return this.reservations.filter((reservation) => {
        // 상태에 따라 필터링
        if (this.selectedTab === "접수중")
          return reservation.status === "waiting";
        if (this.selectedTab === "예약완료")
          return reservation.status === "confirm";
        if (this.selectedTab === "예약취소")
          return reservation.status === "cancel";
      });
    },
    // 24.12.11 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
    paginatedReservations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredReservations.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredReservations.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.getReservationDt();
  },
  methods: {
     // 24.12.11 수정 - 추가 : 현재시간 이전 예약 수정 불가
     isPastReservation(startTime) {
      // 현재 시간 구하기
      const now = new Date();
      // 예약 시작 시간 변환
      const reservationStartTime = new Date(startTime);
      // 예약이 현재 시간 이후인지 확인
      return now > reservationStartTime;
    },
// 예약 취소 알림 
async confirmMsg() {
  const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
  console.log("[confirmMsg] Manager Info:", managerInfo);

  const params = {
    phoneNumber: this.reservations.find((res) => res.id === this.reserId).reser_phone,
    userName: this.reservations.find((res) => res.id === this.reserId).reser_user,
    availableTime: `${this.reservations.find((res) => res.id === this.reserId).startTime.split("T")[1].slice(0, 5)} ~ ${this.reservations.find((res) => res.id === this.reserId).endTime.split("T")[1].slice(0, 5)}`,
    storeName: managerInfo.identifier,
  };

  console.log("[confirmMsg] Sending params:", params);

  try {
    const response = await managerStore.postTask(`v1/sms/confirmReservation`, params);
    console.log("[confirmMsg] Response received:", response);
  } catch (error) {
    console.error("[confirmMsg] API call failed:", error);
  }
},

async cancelMsg() {
  const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
  console.log("[cancelMsg] Manager Info:", managerInfo);

  const params = {
    phoneNumber: this.reservations.find((res) => res.id === this.reserId).reser_phone,
    userName: this.reservations.find((res) => res.id === this.reserId).reser_user,
    availableTime: `${this.reservations.find((res) => res.id === this.reserId).startTime.split("T")[1].slice(0, 5)} ~ ${this.reservations.find((res) => res.id === this.reserId).endTime.split("T")[1].slice(0, 5)}`,
    storeName: managerInfo.identifier,
  };

  console.log("[cancelMsg] Sending params:", params);

  try {
    const response = await managerStore.postTask(`v1/sms/cancelReservation`, params);
    console.log("[cancelMsg] Response received:", response);
  } catch (error) {
    console.error("[cancelMsg] API call failed:", error);
  }
},

confirmModal(status) {
    // 상태 로그 출력
    console.log("[confirmModal] Received reserStatus:", status);
    const resolvedStatus = typeof status === 'object' && status.status ? status.status : status;
    // 상태에 따라 로직 분기
    if (resolvedStatus === "예약완료") {
      console.log("[confirmModal] Executing confirmMsg...");
      this.confirmMsg(); // 예약 확정 메시지 전송
    } else if (resolvedStatus === "예약취소") {
      console.log("[confirmModal] Executing cancelMsg...");
      this.cancelMsg(); // 예약 취소 메시지 전송
    } else {
      console.log("[confirmModal] No matching status found. Skipping...");
    }

    // 모달 닫기 및 데이터 갱신
    console.log("[confirmModal] Closing modal and refreshing data...");
    this.isModalVisible = false;
    this.getReservationDt();
  },
    closeModal() {
      this.isModalVisible = false;
      // alert("Close")
    },
    showModal(reserId, reserStatus) {
      this.reserId = reserId;
      this.reserStatus = reserStatus;
      this.isModalVisible = true;
    },
    async getReservationDt() {
      try {
        // Step 1: Retrieve managerInfo from localStorage
        const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));

        // Validate managerInfo
        if (!managerInfo || !managerInfo.id) {
          return;
        }
        console.log("Manager ID:", managerInfo.id);

        // Step 2: Fetch reservations data
        // const roomDt = await managerStore.getTask(`reservations/${managerInfo.id}`);
        const roomDt = await managerStore.getTask(
          `reservations/managerId/${managerInfo.id}`
        );
        console.log("Manager ID:", JSON.stringify(roomDt));

        // Step 3: Log each reservation and its managerid
        // roomDt.forEach((reservation, index) => {
        //   console.log(`Reservation ${index}:`, reservation);
        //   console.log(`Reservation ${index} managerid:`, reservation.managerid);
        // });

        // Step 4: Filter reservations by managerid
        const filteredReservations = roomDt.filter(
          (reservation) =>
            Number(reservation.managerid) === Number(managerInfo.id) &&
            reservation.managerid !== null
        );

        // Step 5: Update reservations data
        console.log("Step 5: Updating reservations data...");
        this.reservations = filteredReservations;
        console.log("Updated reservations data:", this.reservations);
      } catch (error) {
        // Log errors
        console.error("Error in getReservationDt:", error);
      }
    },
    async getReservationsDt(date) {
      try {
        const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
        if (!managerInfo || !managerInfo.id) {
          console.error("Manager info is missing or invalid.");
          return;
        }

        const roomDt = await managerStore.getTask(
          `reservations/date/${date}/manager?managerId=${managerInfo.id}`
        );

        console.log("Raw roomDt data:", JSON.stringify(roomDt, null, 2));

        const selectedReservations = roomDt
          .map((room) => {
            return room.reservations.map((reservation) => ({
              ...reservation, // 예약 데이터
              room_id: room.room_id, // room 정보 추가
              roomtype: room.roomtype, // room 정보 추가
            }));
          })
          .flat(); // 2차원 배열을 1차원 배열로 변환

        console.log(
          "Transformed Reservations:",
          JSON.stringify(selectedReservations, null, 2)
        );

        this.reservations = selectedReservations;
      } catch (error) {
        console.error("Error in getReservationsDt:", error);
      }
    },
    selectTab(tab) {
    this.selectedTab = tab;
    this.currentPage = 1; // 탭 변경 시 페이지를 1번으로 초기화
  },
    statusClass(status) {
      if (status === "waiting") return "status-pending";
      if (status === "confirm") return "status-complete";
      if (status === "cancel") return "status-cancel";
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
      this.currentPage = page;
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

/* 날짜 선택 박스 */
.date-picker-box {
  background-color: #fff;
  padding: 30px;
  /* 24.12.11 수정 - 추가 */
  margin-bottom: 20px;
}

/* 24.11.11 수정 */
.date {
  width: 250px;
  height: 60px;
  border: 1px solid #ddd;
  padding: 0 20px;
}

/* 방 리스트 박스 */
.room-list-box {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  background-color: #fff;
  padding: 30px;
}

/* 24.12.11 수정 - width 삭제 */
.tabs {
  background-color: #fff;
  /* width: 40%; */
  display: flex;
  gap: 10px;
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

.status-pending {
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

.status-complete {
  color: #184199;
  border: 1px solid #184199;
  width: 80px;
  padding: 11px 0px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}

/* 24.12.11 수정 - 색상 변경 */
.status-cancel {
  color: #00000080;
  border: 1px solid #00000080;
  width: 80px;
  padding: 11px 0px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
}

/* 24.11.11 수정 */
.reserve-status {
  font-size: 14px;
  font-family: var(--font-family-pretendard-semibold);
  font-weight: 600;
}

/* 24.12.11 수정 - 추가 */
.disabled {
  pointer-events: none; /* 클릭 이벤트 비활성화 */
  opacity: 0.5; /* 시각적으로 비활성화된 상태 표현 */
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
}

/* 24.11.11 수정 */
.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* 24.12.11 수정 - 추가 */
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

/* 24.12.11 수정 */
.page-number.active {
  background-color: #d30f1a;
  color: white;
}

/* 24.12.11 수정 - 추가 */
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