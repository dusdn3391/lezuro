<template>
  <div class="modal-overlay">
    <div class="editprofile3-2 screen">
      <div class="frame-7634-2">
        <!-- 상단 타이틀 및 닫기 버튼 -->
        <!-- 24.12.05 수정 - 버튼 위치 수정 -->
        <div class="edit-title">
          <span class="title-text pretendard-extra-extra-bold-black-30px">
            비밀번호 변경
          </span>
          <!-- <button class="close-button" @click="closeModal">
            <img src="../../img/x.png" alt="Close" />
          </button> -->
          <!-- 24.12.05 수정 - 닫기 버튼 변경 -->
          <img class="material-symbolsclose-2"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-close.svg"
            alt="material-symbols:close" @click="closeModal">
        </div>

        <!-- 비밀번호 변경 입력 폼 -->
        <div class="frame-7697-5">
          <div class="frame-7966-1">
            <div class="frame-7627-1-1">
              <div class="frame-7613 pretendard-medium-log-cabin-18px">
                현재 비밀번호
              </div>
              <!-- 24.12.05 수정 - 길이제한, 에러메시지 스타일 수정 -->
              <input type="password" v-model="currentPassword" :maxlength="20" @blur="passwdBlur"
                @keyup.enter="passwdenter" placeholder="현재 비밀번호를 입력하세요"
                class="frame-7611-1 valign-text-middle pretendard-medium-mountain-mist-16px" />
            </div>
            <div v-if="pwCheckMsg" class="error-message pretendard-regular-normal-white-12px" :style="{ color: chechkingPw ? '#184199' : '#D30F1A' }">{{
              pwCheckMsg }}</div>
            <div class="frame-7627-1-1">
              <div class="frame-7613 pretendard-medium-log-cabin-18px">
                새 비밀번호
              </div>
              <!-- 24.12.05 수정 - 길이제한, 에러메시지 추가 -->
              <input type="password" v-model="newPassword" @input="validatePassword" :maxlength="20"
                placeholder="새로운 비밀번호를 입력하세요"
                class="frame-7611-1 valign-text-middle pretendard-medium-mountain-mist-16px" />
            </div>
            <div class="error-message pretendard-regular-normal-white-12px" v-if="pwError">{{ pwError }}</div>
            <div class="frame-7627-1-1">
              <div class="frame-7613 pretendard-medium-log-cabin-18px">
                새 비밀번호 확인
              </div>
              <!-- 24.12.05 수정 - 길이제한, 에러메시지 추가 -->
              <input type="password" v-model="confirmNewPassword" :maxlength="20" placeholder="새 비밀번호를 재입력하세요"
                class="frame-7611-1 valign-text-middle pretendard-medium-mountain-mist-16px" />
            </div>
            <div class="error-message pretendard-regular-normal-white-12px" v-if="confirmPwError">{{ confirmPwError }}</div>
            <p v-if="errorMessage" class="error-message pretendard-regular-normal-white-12px">{{ errorMessage }}</p>
          </div>

          <!-- 비밀번호 변경 버튼 -->
          <button class="edit-button pretendard-semi-bold-white-18px" @click="changePassword">
            변경하기
          </button>

          <!-- 비밀번호 변경 확인 모달 -->
          <ResetPasswordConfirmModal v-if="isModalVisible" @close-all="closeAllModals" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResetPasswordConfirmModal from "./ResetPasswordConfirmModal";
import axios from "axios";
import { taskStore } from "@/store/taskStore"; // API 호출

export default {
  name: "EditPassword",
  components: {
    ResetPasswordConfirmModal,
  },
  props: {
    phone: String, // phone을 props로 받음
  },
  data() {
    return {
      isModalVisible: false,
      currentPassword: "", // 현재 비밀번호
      newPassword: "", // 새로운 비밀번호
      confirmNewPassword: "", // 새로운 비밀번호 확인
      errorMessage: "",
      pwCheckMsg: "",
      chechkingPw: false,
      pwError: null, // 24.12.05 수정
      confirmPwError: null, // 24.12.05 수정
    };
  },
  mounted() {
    // 폰 번호가 제대로 넘어왔는지 확인
    console.log("넘어온 phone 값:", this.phone);
  },
  watch: {
    // 24.12.04 수정 - 추가
    confirmNewPassword(value) {
      if (value !== this.newPassword) {
        this.confirmPwError = "비밀번호가 일치하지 않습니다.";
      } else {
        this.confirmPwError = null;
      }
    },
  },
  methods: {
    // 24.12.04 수정 - 추가
    validatePassword() {
      // 최소 8~20자, 연속된 문자를 사용할 수 없음
      const regex = /^(?!.*[^a-zA-Z0-9])(?!.*(.)\1{2,}).{8,20}$/;
      this.pwError = !regex.test(this.newPassword)
        ? "비밀번호는 8~20자 이내로 입력해야 하며 연속된 문자와 특수문자를 사용할 수 없습니다."
        : null;
    },
    passwdBlur() {
      // 입력 필드 포커스를 벗어났을 때 실행되는 로직
      console.log('Blur 이벤트 발생, nick:', this.currentPassword);
      this.chekPw(this.currentPassword);
    },
    passwdEnter() {
      // Enter 키를 눌렀을 때 실행되는 로직
      console.log('Enter 키 입력, nick:', this.currentPassword);
      this.chekPw(this.currentPassword);
    },
    async chekPw(password) {

      // v1/auth/me/password/gooara123
      const response = await taskStore.getSelectTasks(
        `v1/auth/me/password/${password}`
      );
      console.log("가져온 문의 상세 정보:", response.success);
      if (response.success === true) {
        this.pwCheckMsg = '비밀번호가 일치합니다.'
        this.chechkingPw = true
      } else {
        this.pwCheckMsg = '비밀번호가 일치하지 않습니다.'
        this.chechkingPw = false
      }
    },
    // 비밀번호 변경 요청 메서드
    async changePassword() {
      // 비밀번호 확인
      if (this.newPassword !== this.confirmNewPassword) {
        this.errorMessage = "새 비밀번호가 일치하지 않습니다.";
        return;
      }
      if (this.chechkingPw === false) {
        alert("현재 비밀번호를 다시 확인해주세요.")
        return;
      }

      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

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
              Authorization: `Bearer ${token}`,
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
    },
    closeModal() {
      this.$emit("close");
    },
    clearError() {
      this.errorMessage = "";
    },
    // 모달 열기/닫기 메서드
    showModal() {
      this.isModalVisible = true;
    },
    closeAllModals() {
      this.isModalVisible = false;
      this.closeModal();
    },

  },
};
</script>

<style scoped>
/* 24.11.15 수정 - 추가 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* 불투명한 검정색 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* 다른 요소 위에 표시 */
  height: 100% !important;
  width: 100%;
}

/* 24.11.15 수정 - 배경색 제거 */
.editprofile3-2 {
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.frame-7634-2 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  margin-top: 1px;
  overflow: hidden;
  padding: 50px;
  position: relative;
  width: 800px;
}

/* 24.11.15 수정 - 추가 */
.edit-title {
  position: relative;
  /* 자식 요소의 위치를 기준으로 정렬 가능 */
  display: flex;
  align-items: center;
  /* 세로 중앙 정렬 */
  justify-content: center;
  /* 기본적으로 제목 중앙 정렬 */
  width: 100%;
  background-color: #fff;
}

/* 24.11.15 수정 - 추가 */
.material-symbolsclose-2 {
  position: absolute;
  /* 부모 요소를 기준으로 위치 고정 */
  right: 0;
  /* 오른쪽 끝에 배치 */
  top: 50%;
  /* 세로 중앙 */
  transform: translateY(-50%);
  /* 세로 중앙 맞추기 */
  cursor: pointer;
}

.frame-7697-5 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.frame-7966-1 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative;
  width: 100%;
}

.frame-7613 {
  width: 200px;
}

/* 24.11.13 수정 - input style 수정 */
.frame-7611-1 {
  background-color: #f5f6f6;
  width: 100%;
  height: 55px;
  padding: 0 20px;
  border: none;
}

/* 24.12.05 수정 */
.error-message {
  color: #d30f1a;
  font-size: 12px;
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 155px;
}

/* 24.11.13 수정 - 정렬 수정 */
.frame-7627-1-1 {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
}

/* 24.11.13 수정 - placeholder 색상 변경 */
input::placeholder {
  color: #999;
}

/* 24.11.13 수정 -  button style 수정 */
.edit-button {
  width: 100%;
  height: 55px;
  background-color: #D30F1A;
  border: none;
}

@media (max-width: 720px) {
  .editprofile3-2 {
    background-color: #ffffff;
    justify-content: normal;
    /* 24.12.23 수정 - 추가 */
    /* height: auto; */
    align-items: flex-start;
  }

  .frame-7634-2 {
    padding: 17px 20px;
    /* 24.12.23 수정 - 추가 */
    gap: 60px;
  }

  .edit-title {
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 100%;
  }

  .title-text {
    text-align: center;
    width: 100%;
    font-size: 18px;
  }

  /* 24.12.23 수정 - 추가 */
  .material-symbolsclose-2 {
    left: 0px;
  }

  /* 24.12.23 수정 - 추가 */
  .frame-7966-1 {
    gap: 30px;
  }

  .frame-7627-1-1 {
    /* display: block; */
    /* 24.12.23 수정 - 추가 */
    justify-content: flex-start;
    flex-direction: column;

    align-items: flex-start;
    gap: 20px;
  }

  .frame-7611-1 {
    width: 100%;
  }

  /* 24.12.23 수정 - 추가 */
  .edit-button {
    height: 40px;
    padding: 0;
    border-radius: 4px;
    font-size: 14px;
  }
}
</style>

