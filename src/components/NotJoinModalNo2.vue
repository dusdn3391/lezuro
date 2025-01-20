<template>
  <div class="not-join-modal-no2-wrap screen" @click="closeModal">
    <div class="not-join-modal-no2-frame">
      <div class="not-join-modal-no2-content">
        <div class="valign-text-middle notosanskr-medium-log-cabin-16px">정말로 취소하시겠어요?</div>
          <!-- 24.12.10 수정 - not-join-modal-div class 추가 -->
          <div class="not-join-modal-div pretendard-regular-normal-granite-gray-14px">
          <!-- 24.12.10 수정 - 문구 변경 -->
          <div>취소 후 다시 대회에 </div>
          <div>참여하실 수 있습니다.</div>
          <!-- <p> 확인해주세요</p> -->
        </div>
      </div>
      <div class="modal-btn-align">
        <button class="cancel-btn notosanskr-light-white-16px" @click="closeModal">닫기</button>
        <button class="submit-btn notosanskr-light-white-16px" @click="submit">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotJoinModalNo2",
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submit() {
      this.$emit('submit');
    }
  }
};
</script>

<style scoped src="@/style/game/notjoinmodalno2.css" />
