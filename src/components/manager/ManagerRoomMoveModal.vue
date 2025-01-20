<template>
  <div class="modal-overlay" @click="closeMoveModal">
    <div class="modal" @click.stop>
      <!-- 타이틀 -->
      <div class="modal-header">
        <h2 class="pretendard-bold-mine-shaft-18px">룸 이동</h2>
      </div>
      <!-- 방 선택 부분 -->
      <div class="modal-body">
        <div class="room-selection pretendard-regular-normal-log-cabin-18px">
          <span>1번방</span>
          <span class="arrow">→</span>
          <!-- 24.11.11 font style 수정 -->
          <select class="pretendard-regular-normal-mine-shaft-14px" v-model="selectedRoom">
            <option disabled class="pretendard-regular-normal-mine-shaft-14px" value="">방을 선택해 주세요</option>
            <option class="pretendard-regular-normal-mine-shaft-14px" v-for="room in rooms" :key="room" :value="room">
              {{ room }}
            </option>
          </select>
        </div>
      </div>
      <!-- 버튼 -->
      <div class="modal-footer">
        <button class="move-button" @click="moveRoom">이동하기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManagerRoomMoveModal",
  data() {
    return {
      selectedRoom: "",
      rooms: ["1번방", "2번방", "3번방", "4번방", "5번방", "6번방"], // 선택 가능한 방 리스트
    };
  },
  methods: {
    closeMoveModal() {
      // 모달 닫기
      this.$emit("moveClose");
    },
    moveRoom() {
      // 방 이동 로직 처리
      if (this.selectedRoom) {
        alert(`${this.selectedRoom}으로 이동합니다.`);
        this.closeMoveModal();
      } else {
        alert("이동할 방을 선택해 주세요.");
      }
    },
  },
};
</script>

<style scoped>
/* 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  /* 불투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 창 */
/* 24.11.11 수정 - bodeer-radius 삭제 */
.modal {
  width: 471px;
  background-color: white;
  /* border-radius: 10px; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* 모달 헤더 */
.modal-header h2 {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

/* 모달 본문 */
.modal-body {
  margin: 20px 0;
}

.room-selection {
  display: flex;
  align-items: center;
  gap: 10px;
}

.room-selection span {
  display: inline-block;
  width: 60px;
}

.room-selection select {
  width: 100%;
  padding: 22px 15px;
  border: 1px solid #ccc;
}

/* 모달 푸터 */
.modal-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 24.11.11 수정 - border-radius 삭제 */
.move-button {
  width: 100%;
  padding: 12px;
  background-color: #003399;
  /* color: white; */
  border: none;
  /* border-radius: 5px; */
  cursor: pointer;
}

.move-button:hover {
  background-color: #002080;
}
</style>
