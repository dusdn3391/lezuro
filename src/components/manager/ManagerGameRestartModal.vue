<template>
  <div class="modal-overlay" @click="RcloseModal">
    <div class="modal" @click.stop>
      <!-- 24.11.11 font style 변경 -->
      <h2 class="pretendard-medium-log-cabin-16px">시작 하기</h2>
      <p class="pretendard-regular-normal-tuatara-14px">이용 중인 게임을 <span class="danger">시작</span> 하시겠습니까?</p>
      <div class="button-group">
        <button @click="RcloseModal" class="cancel-button notosanskr-light-white-16px">취소</button>
        <button @click="confirmRestart" class="confirm-button notosanskr-light-white-16px">확인</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ManagerGameRestartModal",
  methods: {
    RcloseModal() {
      this.$emit("Rclose"); // 부모 컴포넌트로 close 이벤트를 전송
    },
    confirmRestart() {
      this.$emit("confirmRestart");
    },
  },
};
</script>
<style scoped>
/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  /* 불투명한 검은 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 창 */
.modal {
  background-color: white;
  width: 276px;
  overflow: hidden;
  padding-top: 24px;
  height: 153px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal h2 {
  margin: 0;
}

.modal p {
  margin: 10px 0;
}

.danger {
  color: red;
  font-weight: bold;
}

/* 버튼 스타일 */
/* 24.11.11 height, width 추가 */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  height: 50px;
  width: 100%;
}

button {
  /* flex-grow: 1; */
  padding: 13px;
  border: none;
  cursor: pointer;
}

/* 24.11.11 width 추가 */
.cancel-button {
  width: 50%;
  background-color: #B1B1B1;
}

/* 24.11.11 width 추가 */
.confirm-button {
  width: 50%;
  background-color: #003399;
}

button:hover {
  opacity: 0.9;
}
</style>