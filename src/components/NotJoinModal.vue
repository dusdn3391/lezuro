<template>
  <div class="not-join-modal-wrap screen" @click="closeModal">
    <div class="not-join-modal-frame">
      <div class="not-join-modal-content">
        <div class="valign-text-middle pretendard-bold-log-cabin-18px">참가 하실 수 없습니다</div>
        <!-- 24.12.10 수정 - not-join-modal-div class 추가 -->
        <div class="not-join-modal-div pretendard-regular-normal-granite-gray-14px">
          <!-- <p>참가 내역은 나의 대회에서</p>
          <p> 확인해주세요</p> -->
          <!-- 24.12.10 수정 - 문구 변경 -->
          <div>참가 조건을</div>
          <div> 다시 확인해 주세요.</div>
        </div>
      </div>
      <div class="modal-btn-align">
        <button class="cancel-btn notosanskr-light-white-16px" @click="closeModal">닫기</button>
        <button class="submit-btn notosanskr-light-white-16px">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotJoinModal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
  }
};
</script>

<style scoped src="@/style/game/notjoinmodal.css" />