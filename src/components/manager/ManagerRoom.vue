<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box ">
            <h2 class="pretendard-bold-normal-black-28px">예약관리</h2>
          </div>

          <!-- 날짜 선택 부분 -->
          <div class="date-picker-box">
            <input type="date" class="date pretendard-regular-normal-mine-shaft-18px " v-model="selectedDate" />
          </div>


          <!-- 룸 리스트 부분 -->
          <div class="room-list-box" v-if="availableRoom.length > 0">
            <div v-for="room in availableRoom" :key="room.id" :class="['room-box', room.status]">
              <div class="room-header">
                <span class="pretendard-bold-normal-black-28px">{{ room.room_id }} 번방</span>
                <button class="reserve-btn pretendard-medium-white-14px" @click="openModal(room)">예약하기</button>
              </div>

              <div class="room-status">
                <span class="status-label pretendard-medium-white-12px" :class="room.status">{{ room.status ===
                  "available" ? "이용중" : room.status === "waiting" ? "대기중" : "예약" }}</span>
                <div v-if="room.reservations && room.reservations.length">
                  <span v-if="room.status !== 'waiting' && room.reservations[0].check === '사이값'"
                    class="reservation-time pretendard-bold-24px">{{ room.reservations[0].startTime.slice(11, 16) }} ~
                    {{ room.reservations[0].endTime.slice(11, 16) }}</span>
                </div>
              </div>

            

              <!-- 예약 목록 -->
              <!--   <div v-if="room.reservations && room.reservations.length">aaabbbccc</div> -->
              <div :class="['scroll-container', { 'scrollable': shouldScrollBeVisible(room) }]"
                v-if="room.status !== 'waiting'">
                <div v-if="room.reservations && room.reservations.length">
                  <!-- 처음 2개의 예약을 항상 표시 -->
                  <div v-for="(reservation) in visibleReservations(room)" :key="reservation.id"
                    class="reservation-details" v-if="reservation.check === '초과값' || reservation.check === '사이값'">
                    <div class="reservation-time-block pretendard-regular-normal-black-14px">

                      예약 {{ reservation.startTime.slice(11, 16) }} ~ {{ reservation.endTime.slice(11, 16) }}
                    </div>
                    
                    <div class="reservation-actions">
                      <button class="delete-btn pretendard-medium-normal-granite-gray-12px" @click="delReservation(reservation.id)">삭제</button>
                      <span>|</span>
                      <button class="edit-btn pretendard-medium-normal-granite-gray-12px" @click="editReservation(reservation, room)">수정</button>
                    </div>
                  </div>

                  <!-- +MORE 버튼 -->

                  <div v-show="shouldShowMoreButton(room)" class="more-btn" @click="showMoreReservations(room)">
                    + MORE
                  </div>

                </div>

              </div>

            </div>
           
            <ManagerReservationModal v-if="isModalVisible" @close="closeModal" :selectedRoom = selectedRoom :selectedReservation= selectedReservation    :isEditMode="isEditMode"    :selectedDate="selectedDate" />
          </div>
          <div v-else>홈페이지 관리에서 룸을 등록해주세요.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import ManagerReservationModal from "./ManagerReservationModal.vue";
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";
import { managerStore } from '@/store/managerStore';  // API 호출
import { ref } from 'vue';


export default {
  name: "ManagerRoom",
  components: {
    ManagerReservationModal,
    ManagerHeader,
    ManagerNavbar,
  },
  data() {
    return {
      selectedReservation: null,
      isModalVisible: false,
      selectedDate: "2024-12-15",
      currentDate: "",
      currentTime: "",
      currentDateTime: "",
      availableRoom: [],
      deletedReservation: null,
      selectedRoom : null, 
      roomDt: [],
      rooms: [
        {
          id: 1,
          name: "1번방",
          statusText: "이용중",
          statusClass: "available",
          currentReservation: "12:00 ~ 14:00",
          reservations: [
            { id: 1, time: "08:00 ~ 10:00" },
            { id: 2, time: "12:00 ~ 14:00" },
            { id: 3, time: "12:00 ~ 14:00" },

            { id: 4, time: "12:00 ~ 14:00" },
          ],
          showMore: false,
        }
       
      ],
    };
  },
  mounted() { // 실제로 화면에 내용이 그려진 직후에 확인.
    // this.getRoomDt()
    this.updateCurrentDateTime();
    // setInterval(this.updateCurrentDateTime, 1000); // 1초마다 업데이트
    console.log("모달로 전달된 선택된 날짜:", this.selectedDate);

  },
  watch: { // 데이터 변경시 호출
    selectedDate(newDate, oldDate) {
      console.log(`selectedDate changed from ${oldDate} to ${newDate}`);

      // 선택한 날짜에 따라 새로운 데이터를 가져오거나, 다른 작업을 수행

      this.getReservationDt(newDate);
    },
    date(newDate) {
    this.getReservationDt(newDate);
  },
  },
  methods: {
    // 룸 예약 정보 삭제
    async delReservation(reservationId) {
  try {
    // 삭제하려는 예약 정보를 찾기
    let reservationToDelete = null;
    let roomToDelete = null;

    for (const room of this.availableRoom) {
      reservationToDelete = room.reservations.find(
        (res) => res.id === reservationId
      );
      if (reservationToDelete) {
        roomToDelete = room; // 해당 방 정보도 함께 저장
        break;
      }
    }

    if (!reservationToDelete || !roomToDelete) {
      alert("삭제할 예약 정보를 찾을 수 없습니다.");
      return;
    }
    const formatTime = (time) => time.slice(11, 16); 
    // 예약 정보 저장
    this.deletedReservation = {
      phoneNumber: reservationToDelete.reser_phone || "",
      userName: reservationToDelete.reser_user || "",
      availableTime: `${formatTime(reservationToDelete.startTime)} ~ ${formatTime(
        reservationToDelete.endTime
      )}`, 
      roomName: roomToDelete.room_id, // 방 이름 또는 ID 저장
    };

    console.log("삭제할 예약 정보:", this.deletedReservation);

    // 예약 삭제 API 호출
    const response = await managerStore.deleteTask(
      `reservations/${reservationId}`
    );
    console.log("삭제 API 응답:", JSON.stringify(response));
    alert("해당 예약이 정상적으로 삭제되었습니다.");

    // cancelMsg 호출
    this.cancelMsg(this.deletedReservation);

    // 예약 데이터 갱신
    this.getReservationDt(this.selectedDate);
  } catch (error) {
    console.error("[delReservation] 예약 삭제 오류:", error);
    alert("예약 삭제 중 오류가 발생했습니다.");
  }
},
    async cancelMsg(deletedReservation) {
      const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
      console.log("[cancelMsg] Manager Info:", managerInfo);

      const params = {
        phoneNumber: deletedReservation.phoneNumber,
    userName: deletedReservation.userName,
    availableTime:deletedReservation.availableTime,
      storeName: managerInfo.identifier,
      };

      console.log("[cancelMsg] Sending params:", params);

      try {
        const response = await managerStore.postTask(
          `v1/sms/cancelReservation`,
          params
        );
        console.log("[cancelMsg] Response received:", response);
      } catch (error) {
        console.error("[cancelMsg] API call failed:", error);
      }
    },
    // 처음 2개의 예약을 표시하거나, showMore가 true일 때는 모든 예약을 표시
    visibleReservations(room) {
      console.log('filteredReservations : : ', JSON.stringify(room))

      const filteredReservations = room.reservations.filter(reservation => {
        return (
          ( reservation.check === '사이값' || reservation.check === '초과값') &&
        reservation.status === 'confirm' 
      );
      });

      // showMore 상태에 따라 결과 반환
      if (room.showMore) {
        return filteredReservations; // 모든 필터된 예약을 표시
      }


      return filteredReservations.slice(0, 2); // 처음 2개의 필터된 예약만 표시
    },

    // +MORE 버튼을 표시할지 여부
    shouldShowMoreButton(room) {
  const filteredReservations = room.reservations.filter(
    reservation => reservation.status === 'confirm' // status가 confirm인 예약만 포함
  );
  return filteredReservations.length > 2 && !room.showMore;
}
,

    // +MORE 버튼을 클릭했을 때 나머지 예약을 표시
    showMoreReservations(room) {
  const filteredReservations = room.reservations.filter(
    reservation => reservation.status === 'confirm' // status가 confirm인 예약만 포함
  );
  if (filteredReservations.length > 2) {
    room.showMore = true;
  }
},

    // 예약이 4개 이상일 때만 스크롤바를 보이게 하는 조건
    shouldScrollBeVisible(room) {
      // console.log("Rooooom : : : " , room)
      return room.showMore && room.reservations.length > 3; // +MORE 클릭 후 4개 이상일 때 스크롤 표시
    },
    openModal(room) {
    this.selectedRoom = room;
    this.isEditMode = false; 
    this.selectedReservation = null;
    console.log("openModal selectedDate:", this.selectedDate);
    this.isModalVisible = true;
  },
  editReservation(reservation, room) {
  this.selectedReservation = reservation;
  this.selectedRoom = room; // 방 정보도 함께 설정
  this.isEditMode = true;
  this.isModalVisible = true;
},
  closeModal() {
    this.isModalVisible = false;
    this.isEditMode = false; 
    this.selectedRoom = null;
    this.selectedReservation = null;

    this.getReservationDt(this.selectedDate);
  },
    async getRoomDt() {
      const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
      const response = await managerStore.getTask(`rooms`);
      this.availableRoom = [];
      console.log("roomNumbering : : : : : : ", JSON.stringify(response))
      this.availableRoom = this.filterByManagerId(response, parseInt(managerInfo.id));

      console.log("roomNumbering : : : : : : 필터링 후 ", JSON.stringify(this.availableRoom))

    },
    filterByManagerId(data, managerId) {
      return data.filter(item => item.managerid === managerId);
    },
    async getReservationDt(date) {
        const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
        console.log("managerInfomanagerInfomanagerInfo : ::: " , managerInfo.id)
      // await taskStore.addTask(task);
      // console.log("API 통신 시작")
      // 룸 정보 가져오는 구문 (GET)
      await this.getRoomDt();
      this.roomDt = []; // 초기화
      this.roomDt = await managerStore.getTask(`reservations/date/${date}/manager?managerId=${managerInfo.id}`);
      
      console.log("룸데이터 가져오기 : : : : : : ", JSON.stringify(this.roomDt))
      this.updateRoomStatus()
      // console.log("roomDt[0].reser_user : : : "  , this.roomDt[0].reser_user)
      // localStorage.setItem('roomDt', JSON.stringify(this.roomDt));
      // this.isAdding = false;
      // this.isEditMode = false;
      // this.currentTask = null;
    },
    // 현재 시간 구하기
    updateCurrentDateTime() {
      const now = new Date();

      // UTC+9로 변환
      const offset = 9 * 60; // 9시간 * 60분
      const kstDate = new Date(now.getTime() + offset * 60 * 1000);

      // 날짜와 시간 형식 지정
      const formattedDate = `${kstDate.getUTCFullYear()}-${String(kstDate.getUTCMonth() + 1).padStart(2, '0')}-${String(kstDate.getUTCDate()).padStart(2, '0')}`;
      const formattedTime = `${String(kstDate.getUTCHours()).padStart(2, '0')}:${String(kstDate.getUTCMinutes()).padStart(2, '0')}:${String(kstDate.getUTCSeconds()).padStart(2, '0')}`;

      // UTC+9에 맞춘 ISO 8601 형식으로 출력
      this.currentDateTime = `${formattedDate}T${formattedTime}.000Z`;
      this.currentDate = formattedDate;
      this.currentTime = formattedTime;
      this.selectedDate = this.currentDate
      console.log(this.currentDateTime); // 예: 2024-11-06T04:49:05+09:00

      console.log("현재 날짜 시간" + this.currentDateTime)
      this.getReservationDt(this.currentDate);
    },

    getFormattedTime() {
      const now = new Date();
      return new Date(this.currentDateTime).getTime(); // ISO 형식으로 변환
    },
    updateRoomStatus() {
  console.log("this.roomDt : :: ", this.roomDt);

  const formattedTime = this.getFormattedTime(); // 현재 시간 가져오기

  this.roomDt.forEach((room, roomIndex) => {
    this.roomDt[roomIndex].reservations = room.reservations.filter(reservation => {
      const start = new Date(reservation.startTime).getTime();
      const end = new Date(reservation.endTime).getTime();

      if (reservation.status === "confirm") {
        console.log("Reservation passed status check: ", reservation);
        if (formattedTime >= start && formattedTime <= end) {
          reservation.check = "사이값";
          return true;
        } else if (formattedTime < start) {
          reservation.check = "초과값";
          return true;
        }
      } else {
        console.log("Reservation did not pass status check: ", reservation);
      }
      return false;
    });
  });

  if (this.roomDt.length > 0) {
    console.log("Filtered roomDt: ", JSON.stringify(this.roomDt));
    for (let i = 0; i < this.availableRoom.length; i++) {
      for (let a = 0; a < this.roomDt.length; a++) {
        if (this.roomDt[a].room_id === this.availableRoom[i].room_id) {
          this.availableRoom[i].reservations = this.roomDt[a].reservations;
        }
      }
    }

    this.availableRoom.forEach(room => {
      if (room.reservations && room.reservations.length > 0) {
        const checkValue = room.reservations[0].check;
        if (checkValue === "초과값") {
          room.status = "upcoming";
        } else if (checkValue === "사이값") {
          room.status = "available";
        } else {
          room.status = "waiting";
        }
      } else {
        room.status = "waiting";
      }
    });

    this.availableRoom = [...this.availableRoom];
    console.log("Updated availableRoom: ", JSON.stringify(this.availableRoom));
  } else {
    this.availableRoom = [...this.availableRoom];
    console.log("No room data found: ", JSON.stringify(this.availableRoom));
  }
}

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
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 130px;
}

/* 개별 방 박스 */
.room-box {
  background-color: #fff;
  padding: 40px 30px;
  width: 270px;
  height: 270px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

/* 방 제목과 예약 버튼 */
.room-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.reserve-btn {
  background-color: #E34D55;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 4px;
}

/* 상태 표시 */
.room-status {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 10px;
}

.status-label {
  padding: 7.5px 6.5px;
  border-radius: 4px;
  color: #fff;
}

.room-box.available {
  border-color: #14B655;
}

.room-box.waiting {
  border-color: #D30F1A;
}

.room-box.upcoming {
  border-color: #184199;

}

.available .status-label {
  background-color: #14B655;
}

.available .reservation-time {
  color: #14B655;
}

.waiting .status-label {
  background-color: #D30F1A;

}

.waiting .reservation-time {
  color: #D30F1A
}

.upcoming .status-label {
  background-color: #184199;
}

.upcoming .reservation-time {
  color: #184199;
}

.reservation-time {
  color: #333;
}

/* 예약 상세 */
.reservation-details {
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}

.reservation-time {

  letter-spacing: -1px;
}

.reservation-actions {
  display: flex;
}

.reservation-time-block {
  letter-spacing: -1px;
}

.delete-btn,
.edit-btn {
  letter-spacing: -2px;
  background: none;
  border: none;
  color: #D30F1A;
  gap: 6px;
  cursor: pointer;
}

.edit-btn {
  color: #184199;
}

/* +More 버튼 */
.more-btn {
  text-align: center;
  color: #bbb;
  cursor: pointer;
}

.scroll-container {
  max-height: none;
  overflow-y: hidden;
}

/* 스크롤 가능한 상태일 때 스크롤바 적용 */
.scroll-container.scrollable {
  max-height: 150px;
  /* 4개 이상의 예약이 있을 때 스크롤바가 생김 */
  overflow-y: auto;
}
</style>
