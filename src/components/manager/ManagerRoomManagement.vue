<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">룸 관리</h2>
          </div>

          <!-- 24.11.11 전반적인 font style 수정 -->
          <!-- 룸 리스트 부분 -->
          <div class="room-list-box">
            <div class="status-indicator">
              <!-- 24.12.26 수정 - 삭제 -->
              <!-- <div class="status">
                <div class="dot blue"></div>
                <span class="pretendard-regular-black-18px">예약</span>
              </div> -->
              <div class="status">
                <div class="dot green"></div>
                <span class="pretendard-regular-black-18px">이용중</span>
              </div>
              <div class="status">
                <div class="dot red"></div>
                <span class="pretendard-regular-black-18px">대기중</span>
              </div>
            </div>
            <div v-for="room in rooms" :key="room.id" class="room-box">
              <div class="room_name">
                <!-- <div :class="['status-dot', room.statusClass]"></div> -->
                <!-- 24.12.26 수정 -->
                <div
                  :class="['status-dot', room.status === 'waiting' ? 'red' : room.status === 'available' ? 'green' : '']">
                </div>
                <div class="pretendard-bold-normal-black-28px">
                  {{ room.name }}
                </div>
              </div>
              <table>
                <tr>
                  <td class="pretendard-regular-normal-granite-gray-14px">
                    게임종류
                  </td>
                  <td class="pretendard-regular-normal-log-cabin-14px">일반모드</td>
                </tr>
                <tr>
                  <td class="pretendard-regular-normal-granite-gray-14px">
                    현재홀
                  </td>
                  <td class="pretendard-regular-normal-log-cabin-14px">
                    {{ room.hole }}
                  </td>
                </tr>
                <tr>
                  <td class="pretendard-regular-normal-granite-gray-14px">
                    인원
                  </td>
                  <td class="pretendard-regular-normal-log-cabin-14px">
                    {{ room.capacity }}
                  </td>
                </tr>
                <tr>
                  <td class="pretendard-regular-normal-granite-gray-14px">
                    코스
                  </td>
                  <td class="pretendard-regular-normal-log-cabin-14px">
                    {{ room.course }}
                  </td>
                </tr>
                <tr>
                  <td class="pretendard-regular-normal-granite-gray-14px">
                    시작시간
                  </td>
                  <td class="pretendard-regular-normal-log-cabin-14px">
                    {{ room.startTime }}
                  </td>
                </tr>
                <tr>
                  <td class="pretendard-regular-normal-granite-gray-14px">
                    진행시간
                  </td>
                  <td class="pretendard-regular-normal-log-cabin-14px">
                    {{ room.duration }}
                  </td>
                </tr>
              </table>
              <div class="equipmentnum pretendard-regular-normal-granite-gray-14px">
                <span> 장비번호</span>
                {{ room.equipment }}
              </div>
              <!-- 24.12.26 수정 - v-for 추가 -->
              <div class="button-group">
                <!-- 24.12.26 수정 - v-if 추가, active, disable 추가 -->
                <button class="pretendard-regular-normal-white-14px"
                  :class="{ 'disabled-button': room.status === 'waiting', 'active-button': room.status === 'available' }"
                  :disabled="room.status === 'waiting'" @click="() => { selectRoom(room); openModal(); }">게임종료</button>
                <!-- 24.12.26 수정 - v-if 추가 -->
                <button class="pretendard-regular-normal-granite-gray-14px"
                  :class="{ 'disabled-button': room.status === 'available', 'active-button': room.status === 'waiting' }"
                  :disabled="room.status === 'available'"
                  @click="() => { selectRoom(room); restartOpenModal(); }">게임시작</button>
                <!-- <button class="pretendard-regular-normal-granite-gray-14px"
                  v-if="room.status === 'available' || room.statusClass === 'upcoming'" @click="moveOpenModal">룸
                  이동</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <ManagerGameEndModal v-if="isModalVisible" @close="closeModal" @confirm="confirm" />
      <ManagerGameRestartModal v-if="isRModalVisible" @Rclose="RcloseModal" @confirmRestart="confirmRestart" />
      <ManagerRoomMoveModal v-if="isMoveModalVisible" @moveClose="closeMoveModal" />
    </div>
  </div>
</template>

<script>
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";
import ManagerGameEndModal from "./ManagerGameEndModal.vue";
import ManagerGameRestartModal from "./ManagerGameRestartModal.vue";
import ManagerRoomMoveModal from "./ManagerRoomMoveModal.vue";
import { managerStore } from '@/store/managerStore';  // API 호출
import axios from 'axios'; // 24.12.26 수정 - 추가 

export default {
  name: "ManagerRoomManagement",
  components: {
    ManagerHeader,
    ManagerNavbar,
    ManagerGameEndModal,
    ManagerGameRestartModal,
    ManagerRoomMoveModal
  },
  data() {
    return {
      roomStatus: null, // 24.12.26 수정 - 추가 : 룸 상태 (대기중, 이용중 등)
      isModalVisible: false, // 모달 상태
      isRModalVisible: false,
      isMoveModalVisible: false,
      rooms: [],
      selectedRoom: null, // 24.12.26 수정 - 추가 : 선택된 룸
    };
  },
  mounted() {
    this.getRoomDt();
    // 24.12.26 수정 - 추가
    const roomId = this.selectedRoom.id; // 룸 ID 가져오기
    this.getRoomStatus(roomId); // 룸 상태 가져오기
  },
  methods: {
    // 24.12.26 수정 - 추가
    selectRoom(room) {
      this.selectedRoom = room; // 선택된 룸 저장
    },
    async openModal() {
      // this.isModalVisible = true;
      // 24.12.26 수정 - 추가
      if (!this.selectedRoom) {
        console.error("선택된 룸이 없습니다.");
        return;
      }

      const roomId = this.selectedRoom.id;// 선택된 룸의 ID 가져오기
      try {
        await this.updateRoomStatus(roomId, "waiting"); // 상태를 업데이트
        this.isModalVisible = true; // 모달 표시
      } catch (error) {
        console.error("룸 상태를 업데이트하는 데 실패했습니다.", error);
      }
    },
    closeModal() {
      this.isModalVisible = false;
    },
    confirm() {
      alert("게임이 종료되었습니다.");
      this.closeModal();
    },
    async restartOpenModal() {
      // this.isRModalVisible = true;

      // 24.12.26 수정 - 추가
      if (!this.selectedRoom) {
        console.error("선택된 룸이 없습니다.");
        return;
      }

      const roomId = this.selectedRoom.id; // 선택된 룸의 ID 가져오기
      try {
        await this.updateRoomStatus(roomId, "available"); // 상태를 업데이트
        this.isRModalVisible = true; // 모달 표시
      } catch (error) {
        console.error("룸 상태를 업데이트하는 데 실패했습니다.", error);
      }
    },
    RcloseModal() {
      this.isRModalVisible = false;
    },
    confirmRestart() {
      alert("재시작되었습니다.");
      this.RcloseModal();
    },
    moveOpenModal() {
      this.isMoveModalVisible = true;
    },
    closeMoveModal() {
      this.isMoveModalVisible = false;
    },
    async getRoomDt() {
      const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
      console.log("managerInfo.id : : ;", managerInfo.id)
      // await taskStore.addTask(task);
      // console.log("API 통신 시작")
      // 룸 정보 가져오는 구문 (GET)
      this.rooms = await managerStore.getTask(`rooms/manager/${managerInfo.id}`);

      // 24.12.26 수정 - 추가 : room_id를 기준으로 오름차순 정렬
      this.rooms.sort((a, b) => a.room_id - b.room_id);
      console.log("this.roomDt : : : : : : ", this.rooms)

      // localStorage.setItem('roomDt', JSON.stringify(this.roomDt));

    },
    // 24.12.26 수정 - 추가
    async updateRoomStatus(roomId, newStatus) {
      console.log('newStatus', newStatus)
      console.log('roomId', roomId)
      try {
        const token = localStorage.getItem("managerToken");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        const roomResponse = await axios.get(`https://13.124.62.68:3000/api/rooms/${roomId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('현재 룸 정보:', roomResponse.data);

        // 2. 필요 시 데이터 확인 또는 검증
        if (!roomResponse.data || roomResponse.data.status === newStatus) {
          console.warn('이미 해당 상태로 설정되어 있습니다.');
          return; // 업데이트 불필요
        }

        // 3. PATCH 요청으로 상태 업데이트
        // PATCH 요청 데이터 구성
        const requestData = {
          status: newStatus,
          capacity: roomResponse.data.capacity,
          course: roomResponse.data.course,
          duration: roomResponse.data.duration,
          equipment: roomResponse.data.equipment,
          gameType: roomResponse.data.gameType,
          hole: roomResponse.data.hole,
          startTime: roomResponse.data.startTime,
        };

        console.log('requestData', requestData)

        // 상태 업데이트 API 호출
        const response = await managerStore.updateTask(
          `rooms/${roomId}/status`,
          requestData,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("룸 상태 업데이트 성공:", response);
        this.getRoomDt();
      } catch (error) {
        console.error("룸 상태를 업데이트하는 데 실패했습니다.", error.response || error.message);
      }
    },
  }
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
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

/* 방 리스트 박스 */
.room-list-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #fff;
  padding: 30px;
}

/* 개별 방 박스 */
.room-box {
  background-color: #fff;
  padding: 20px;
  width: 342px;
  height: 408px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
}

.room_name {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  line-height: 90%;
  margin-bottom: 26px;
}

.status-indicator {
  width: 100%;
  justify-content: flex-end;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.equipmentnum {
  padding: 20px 0px;
  line-height: 80%;
}

.status {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 상태 점 스타일 */
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 4px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.blue {
  background-color: #184199;
}

.green {
  background-color: #14b655;
}

.red {
  background-color: #d30f1a;
}

.status-dot.available {
  background-color: #14b655;
}

.status-dot.waiting {
  background-color: #d30f1a;
}

.status-dot.upcoming {
  background-color: #184199;
}

.room-box table {
  width: 100%;
  border-collapse: collapse;
}

.room-box table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
  line-height: 80%;
}

.room-box table td:first-child {
  background-color: #f5f5f5;
  /* 왼쪽 셀 배경색 */
  width: 40%;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}

/* 24.12.26 수정 */
button {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  /* color: white; */
  /* line-height: 80%; */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 24.12.26 수정 - 추가 */
.disabled-button {
  background-color: #f5f6f6;
  border: 1px solid;
  cursor: not-allowed;
  opacity: 0.5;
  color: #222;
}

/* 24.12.26 수정 - 추가 */
.active-button {
  background-color: #333;
  color: white;
}

/*
button:nth-child(2) {
  background-color: #f5f5f5;
  color: #333;
}

button:nth-child(2):hover {
  background-color: #e0e0e0;
}

/* 마지막 버튼의 색상 변경 */
/* button:last-child {
  background-color: #f5f5f5;
  color: #333;
}

button:last-child:hover {
  background-color: #e0e0e0;
} */
</style>
