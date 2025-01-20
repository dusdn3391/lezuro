<template>
  <div class="container-center-horizontal">
    <div class="resetpassword screen">
      <Header />
      <div class="resetpassword-wrap">
        <h1 class="resetpassword-title valign-text-middle pretendard-extra-extra-bold-black-30px">비밀번호 재설정하기
        </h1>
        <div class="resetpassword-content">
          <div class="resetpassword-content-item">
            <div class="resetpassword-content-item-title pretendard-medium-log-cabin-18px">비밀번호</div>
            <input
              type="password"
              v-model="newPassword"
              @input="validatePassword" 
              :maxlength="20"
              placeholder="비밀번호를 입력하세요"
              class="resetpassword-input-box valign-text-middle pretendard-medium-mountain-mist-16px"
            />
          </div>
          <div class="resetpassword-content-item">
            <div class="resetpassword-content-item-title pretendard-medium-log-cabin-18px">비밀번호 확인</div>
            <input
              type="password"
              v-model="confirmNewPassword"
              placeholder="비밀번호를 다시 입력하세요"
              class="resetpassword-input-box valign-text-middle pretendard-medium-mountain-mist-16px"
            />
          </div>
          <p v-if="errorMessage" class="error-message pretendard-regular-normal-white-12px">{{ errorMessage }}</p>
          <button class="change-btn pretendard-semi-bold-white-18px" @click="handlePasswordChange">비밀번호 변경</button>
        </div>
      </div>
      <XFooter />
      <ResetPasswordConfirmModal v-if="isModalVisible" @close="hideModal" />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import XFooter from "./XFooter";
import ResetPasswordConfirmModal from "./ResetPasswordConfirmModal";
import axios from "axios";

export default {
  name: "ResetPassword",
  components: {
    Header,
    XFooter,
    ResetPasswordConfirmModal,
  },
  data() {
    return {
      isModalVisible: false,
      newPassword: "",
      errorMessage: "",
      confirmNewPassword: "",
      phone: this.$route.params.phone || "", 
    };
  },
  methods: {
    validatePassword() {
      // 최소 8~20자, 연속된 문자를 사용할 수 없음
      const regex = /^(?!.*[^a-zA-Z0-9])(?!.*(.)\1{2,}).{8,20}$/;
      this.pwError = !regex.test(this.newPassword)
        ? "비밀번호는 8~20자 이내로 입력해야 하며 연속된 문자와 특수문자를 사용할 수 없습니다."
        : null;
    },
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    async handlePasswordChange() {
      if (this.newPassword !== this.confirmNewPassword) {
        this.errorMessage = "새 비밀번호가 일치하지 않습니다.";
        return;
      }

      try {

        // 서버로 비밀번호 변경 요청
        const response = await axios.post(
          "https://13.124.62.68:3000/api/v1/auth/reset-password",
          {
            phone: this.phone,
            newPassword: this.newPassword,
            confirmNewPassword: this.confirmNewPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // 응답 처리
        if (response.status === 200) {
          console.log("비밀번호 변경 성공:", response.data);
          alert("비밀번호가 성공적으로 변경되었습니다.");
          this.showModal();
        } else {
          alert("비밀번호 변경에 실패했습니다.");
        }
      } catch (error) {
        console.error("비밀번호 변경 중 오류 발생:", error);
        alert("비밀번호 변경 중 문제가 발생했습니다.");
      }
}
  },
};
</script>
<style scoped>
.error-message {
  color: #d30f1a;
  font-size: 12px;
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 155px;
}
</style>
<style scoped src="@/style/signup/resetpassword.css" />
