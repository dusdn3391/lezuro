<template>
  <div class="phone-confirm-modal screen">
    <div class="phone-confirm-modal-head ">
      <div class="x-43 valign-text-middle pretendard-bold-log-cabin-18px">
        휴대폰 인증
      </div>

      <div v-if="isRegistered">
        <div class="phone-confirm-modal-content pretendard-regular-normal-granite-gray-14px">
          <div class=" valign-text-middle">
            휴대폰 인증이 완료되었습니다.
          </div>
          <div class=" valign-text-middle">
            확인 후 회원가입 절차를 진행 해주세요.
          </div>
        </div>
      </div>
      <div v-else>
        <div class="phone-confirm-modal-conten">
          <div class="valign-text-middle">
            이미 가입된 정보가 있습니다.
          </div>
          <div class=" valign-text-middle">
            다시 확인 후 인증해주세요.
          </div>
        </div>
      </div>
    </div>
    <button class="btnprimary pretendard-semi-bold-white-16px" @click="confirm">확인</button>
  </div>
</template>

<script>
export default {
  name: "PhoneCertificationConfirmModal",
  props: {
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped src="@/style/signup/phonecertificationconfirmmodal.css" />