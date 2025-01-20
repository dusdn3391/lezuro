<template>
  <div class="join-confirm-modal-wrap screen" @click="closeModal">
    <div class="join-confirm-modal-frame">
      <div class="join-confirm-modal-content">
        <div class="valign-text-middle pretendard-bold-log-cabin-18px">정말로 참가하시겠어요?</div>
          <!-- 24.12.10 수정 - join-confirm-modal-div class 추가 -->
          <div class="join-confirm-modal-div pretendard-regular-normal-granite-gray-14px">
          <!-- <p>참가 내역은 나의 대회에서 확인해주세요</p> -->
                     <!-- 24.12.10 수정 - 문구 변경 -->
          <div>참가 내역은 나의 대회에서</div>
          <div>확인해주세요.</div>
        </div>
      </div>
      <div class="modal-btn-align">
        <button class="cancel-btn notosanskr-light-white-16px" @click="closeModal">닫기</button>
        <button class="submit-btn notosanskr-light-white-16px" @click="submit">신청</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinConfirmModal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submit() {
      // 신청 버튼 클릭 시 처리 로직 추가
      // alert('신청 버튼이 클릭되었습니다.');
      this.$emit('submit');
      // this.$router.push({ path: "/mygame-list"});
    }
  }
};
</script>

<style scoped src="@/style/game/joinconfirmmodal.css" />
