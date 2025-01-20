<template>
  <div class="modal-overlay" @click="cancel">
    <div class="modal" @click.stop>
      <div class="modal-screen">
        <h2 class="modal-title pretendard-bold-mine-shaft-24px">회원 삭제</h2>
        <p class="modal-body pretendard-regular-normal-mine-shaft-18px">
          정말로 삭제 하시겠습니까?
        </p>
        <div class="modal-footer">
          <button class="cancel-button pretendard-regular-normal-white-16px" @click="cancel">취소</button>
          <button class="confirm-button pretendard-regular-normal-white-16px" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminUserDeletionModal",
  methods: {
    cancel() {
      this.$emit("cancel"); // 취소 버튼 클릭 시 부모 컴포넌트로 이벤트 전달
    },
    confirm() {
      this.$emit("confirm"); // 확인 버튼 클릭 시 부모 컴포넌트로 이벤트 전달
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  width: 400px;
  overflow:hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-screen {
    width:276px;
padding-top:25px;
  text-align: center;
  width:100%;
}

.modal-title {
  margin-bottom: 20px;
}

.modal-body {
  margin-bottom: 24px;
}

.cancel-button {
  background-color: #999;
  color: white;
  padding: 13px 20px;
  width:50%;
  border: none;
  cursor: pointer;
}

.confirm-button {
  background-color: #184199;
  color: white;
  padding: 13px 20px;  
    width:50%;
  border: none;
  cursor: pointer;
}
</style>
