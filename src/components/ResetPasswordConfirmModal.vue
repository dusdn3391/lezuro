<template>
  <div class="reset-password-modal screen">
    <div class="reset-password-modal-head ">
      <div class="valign-text-middle pretendard-medium-log-cabin-16px">비밀번호 재설정</div>
      <div class="reset-password-modal-content">
        <div class="valign-text-middle pretendard-regular-normal-tuatara-14px">비밀번호 변경이 완료되었습니다.</div>
      </div>
    </div>
    <button class="btnprimary pretendard-semi-bold-white-16px" @click="successeditpassword">확인</button>
  </div>
</template>

<script>
export default {
  name: "ResetPasswordConfirmModal",
  methods: {
    successeditpassword() {
      this.$router.push({ path: "/login" })
    }
  }
};
</script>

<style scoped src="@/style/signup/resetpasswordconfirmmodal.css" />