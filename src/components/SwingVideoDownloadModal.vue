<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal">
      <!-- 24.12.17 수정 - 전체 폰트 변경, 크기 변경 -->
      <div class="modal-align">
        <div class="modal-title notosanskr-medium-log-cabin-16px ">스윙 영상 다운로드</div>
        <div class="modal-message notosanskr-normal-tuatara-14px">현재 영상을 저장하시겠습니까?</div>
      </div>
      <div class="modal-actions">
        <!-- 24.11.21 수정 -->
        <button class="btn-cancel notosanskr-light-white-16px" @click="closeModal">취소</button>
        <button class="btn-confirm notosanskr-light-white-16px" @click="confirmClick">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwingVideoDownloadModal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmClick() {
      this.$emit("confirm");
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  /* 24.12.17 수정 - 추가 */
  width: 100%;
  height: 100%;
  z-index: 999;
}

.modal {
  background-color: white;
  /* padding-top: 25px; */
  width: 276px;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
}

/* 24.12.17 수정 - 추가 */
.modal-align {
  width: 100%;
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 24px 25px;
}

/* .modal-title {
  font-weight: bold;
  margin-bottom: 10px;
} */

/* .modal-message {
  margin-bottom: 20px;
  color: #363636;
} */

.modal-actions {
  display: flex;
  justify-content: space-between;
  /* 24.12.17 수정 - 추가 */
  height: 50px;
  font-weight: 350;
}

/* 24.12.17 수정 - 배경색, padding 변경, 정렬 수정  */
.btn-cancel {
  background-color: #B1B1B1;
  color: white;
  padding: 13px 0px;
  border: none;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 24.12.17 수정 - 배경색, padding 변경, 정렬 수정  */
.btn-confirm {
  background-color: #D30F1A;
  color: white;
  padding: 13px 0px;
  border: none;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width:720px) {
  .btn-cancel {
    display: none;
  }

  .btn-confirm {
    width: 100%;
  }
}
</style>
