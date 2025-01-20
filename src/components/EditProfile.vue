<template>
  <!-- 24.11.15 수정 - 모달로 변경 -->
  <div class="modal-overlay">
    <div class="editprofile2-1 screen">
      <div class="frame-7634-1">
        <div class="edit-title">
          <span class="title-text pretendard-extra-extra-bold-black-30px">회원정보 변경</span>
          <!-- 24.11.15 수정 - 추가 -->
          <img class="material-symbolsclose-2"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-close.svg"
            alt="material-symbols:close" @click="closeEditModal" />
        </div>
        <div class="frame-7697-1">
          <div class="frame-7696-1">
            <div class="frame-7625-1">
              <div class="frame-763-5">
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <label class="pretendard-medium-log-cabin-18px">닉네임</label>
                <!-- 24.12.05 수정 - input-align 추가 -->
                <div class="input-align">
                  <!-- 24.11.15 수정 - font style 수정 -->
                  <!-- 24.12.05 수정 - 유효성 검사, 길이제한, 에러문구 추가 -->
                  <input type="text" class="frame-7614-1 pretendard-medium-log-cabin-16px" :maxlength="8"
                    @input="validateNickname" v-model="nickname" @blur="nickBlur" placeholder="닉네임을 입력하세요" />
                  <!-- 24.12.05 수정 - 에러메세지추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="nickError">{{ nickError }}</div>
                  <div class="error-message pretendard-regular-normal-white-12px" v-else-if="checkNick">중복된 닉네임입니다. 다시
                    입력해주세요.</div>
                  <div class="error-message pretendard-regular-normal-white-12px" style="color: #184199"
                    v-else-if="nickname.length > 1 && !checkNick">사용가능한 닉네임입니다.</div>
                </div>
              </div>
              <div class="frame-763-5">
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <label class="pretendard-medium-log-cabin-18px">매장 로그인 비밀번호</label>
                <!-- 24.12.05 수정 - input-align 추가 -->
                <div class="input-align">
                  <!-- 24.11.15 수정 - font style 수정 -->
                  <!-- 24.12.05 수정 - 유효성 검사, 길이제한, 에러문구 추가 -->
                  <!-- 24.12.11 수정 - placeholder 문구 변경 -->
                  <input type="text" class="frame-7614-1 pretendard-medium-log-cabin-16px" v-model="password"
                    @input="validatePassword" placeholder="초기 비밀번호는 휴대폰 번호 뒷자리입니다" :maxlength="4" />
                  <!-- 24.12.05 수정 - 에러메세지추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="pwError">{{ pwError }}</div>
                </div>
              </div>
              <div class="frame-763-5">
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <label class="pretendard-medium-log-cabin-18px">휴대폰 번호</label>
                <!-- 24.12.05 수정 - input-align 추가 -->
                <div class="input-align">
                  <!-- 24.11.15 수정 - font style 수정 -->
                  <!-- 24.12.05 수정 - 유효성 검사, 길이제한, 에러문구 추가 -->
                  <input type="text" class="frame-7614-1 pretendard-medium-log-cabin-16px" :maxlength="11"
                    v-model="phoneNumber" @input="validatePhoneNm" placeholder="-제외하고 숫자로 11자리 입력해주세요." />
                  <!-- 24.12.05 수정 - 에러메세지추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="phoneNmError">{{ phoneNmError }}
                  </div>
                  <div class="error-message pretendard-regular-normal-white-12px" v-else-if="checkPhoneNm">중복된 번호입니다. 다시
                    입력해주세요</div>
                  <div class="error-message pretendard-regular-normal-white-12px" style="color: #184199"
                    v-else-if="checkPhoneNm">사용가능한 번호입니다.</div>
                </div>
              </div>
              <div class="frame-763-5">
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <label class="pretendard-medium-log-cabin-18px">이메일</label>
                <!-- 24.12.05 수정 - input-align 추가 -->
                <div class="input-align">
                  <!-- 24.11.15 수정 - font style 수정 -->
                  <!-- 24.12.05 수정 - 유효성 검사, 길이제한, 에러문구 추가 -->
                  <input type="text" class="frame-7614-1 pretendard-medium-log-cabin-16px" v-model="email"
                    @input="validateEmail" placeholder="abcd@gmail.com" />
                  <!-- 24.12.05 수정 - 에러메세지추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="emailError">{{ emailError }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="edit-button">
            <!-- 24.11.15 수정 - font style 수정 -->
            <!-- 24.12.05 수정 - disabled 추가 -->
            <button class="pretendard-semi-bold-white-18px" @click="editprofile" :disabled="!isFormValid">변경하기</button>
          </div>
        </div>
      </div>
      <EditProfileModal v-if="isModalVisible" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore"; // API 호출
import EditProfileModal from './EditProfileModal.vue';
export default {
  name: "EditProfile",
  components: {
    EditProfileModal
  },
  data() {
    return {
      isModalVisible: false,
      password: '',
      nickname: '',
      phoneNumber: '',
      email: '',
      nickError: null, // 24.12.05 수정 - 추가
      pwError: null, // 24.12.05 수정 - 추가
      phoneNmError: null, // 24.12.05 수정 - 추가
      emailError: null, // 24.12.05 수정 - 추가
      checkNick: false, // 24.12.05 수정 - 추가
      checkPhoneNm: false, // 24.12.05 수정 - 추가
    }
  },
  props: {
    loginInfo: {
      type: Object, // 전달받는 데이터의 타입을 정의
      required: true, // 필수 prop으로 설정
    },
  },
  mounted() {
    this.nickname = this.loginInfo.userName
    this.password = this.loginInfo.storeId
    this.email = this.loginInfo.email
    this.phoneNumber = this.loginInfo.phoneNm
  },
  computed: {
    // 24.12.50 수정 - 추가
    // 전체 폼 유효성 검사
    isFormValid() {
      return !this.nickError && !this.pwError && !this.phoneNmError && !this.emailError;
    },
  },
  methods: {
    editprofile() {
      try {
         // 24.12.05 수정 - 추가
        if (!this.isFormValid) {
        alert("모든 입력값을 올바르게 입력해주세요.");
        return; // 유효성 검사 실패 시 함수 종료
      }
      // 24.12.05 수정 - 추가
        if (this.checkNick) {
        alert("중복된 닉네임입니다.");
        return; // 유효성 검사 실패 시 함수 종료
      }
      // 24.12.05 수정 - 추가
      if (this.checkPhoneNm) {
        alert("중복된 번호입니다.");
        return; // 유효성 검사 실패 시 함수 종료
      }

        const params = {
          // 이메일 변경됨 
          userName: this.nickname,
          storeId: this.password,
          phoneNumber: this.phoneNumber, // 선택된 성별이 'Male' 또는 'Female'로 저장됨
          email: this.email
        };
        console.log("보내는 데이터:", params); // 여기서 확인 가능

        const response = taskStore.updateTask("v1/auth/me/update", params);
        alert("변경되었습니다!");
      } catch (error) {
        console.error("개인정보 업데이트 실패:", error);
        alert("개인정보 업데이트에 실패했습니다.");
      }
      // this.$router.replace({ path: "/myprofile" });
      this.$emit("confirm");
      // this.$router.push({ path: "/myprofile" });
    },
    closeModal() {
      this.isModalVisible = false;
    },
    // 24.11.15 수정 - 추가
    closeEditModal() {
      // this.$router.replace({ path: "/myprofile" });
      this.$emit("close"); // 부모 컴포넌트로 close 이벤트를 전송
    },
      // 24.12.05 수정 - 추가
        validateNickname() {
      // 2~6자, 한글, 영문, 숫자만 허용
      const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
      this.nickError = !regex.test(this.nickname)
        ? "닉네임은 한글, 영문, 숫자만 사용하며 2~8자로 입력해야 합니다."
        : null;
      },
          // 24.12.05 수정 - 추가
          validatePassword() {
            const regex = /^\d{4}$/;
            this.pwError = !regex.test(this.password)
        ? "비밀번호는 숫자 4자리여야 합니다."
        : null;
      },
          // 24.12.05 수정 - 추가
          validatePhoneNm() {
            const regex = /^\d{11}$/;
            this.phoneNmError = !regex.test(this.phoneNumber)
        ? "전화번호는 숫자 11자리여야 합니다."
        : null;
      },
          // 24.12.05 수정 - 추가
          validateEmail() {
            const regex = /^[^\u3131-\uD79D]+$/; // 한글이 포함되지 않은 문자열 검사
            this.emailError = !regex.test(this.email)
        ? "이메일에 한글은 포함될 수 없습니다."
        : null;
      },

    // 24.12.05 수정 - 추가
    nickBlur() {
      // 입력 필드 포커스를 벗어났을 때 실행되는 로직
      console.log('Blur 이벤트 발생, nick:', this.nickname);
      this.checkingNick();
    },
            // 24.12.05 수정 - 추가
    nickEnter() {
      // Enter 키를 눌렀을 때 실행되는 로직
      console.log('Enter 키 입력, nick:', this.nickname);
      this.checkingNick();
    },
      // 24.12.05 수정 - 추가
    async checkingNick() {

    const nickDt = await taskStore.getSelectTasks(`v1/users/nick/${this.nickname}`);
    console.log("Nick정보 확인  : : : ", nickDt)
    if (nickDt) {
      this.checkNick = true
    } else {
      this.checkNick = false
    }
    },
     // 24.12.05 수정 - 추가
    handleBlur() {
      // 입력 필드 포커스를 벗어났을 때 실행되는 로직
      console.log('Blur 이벤트 발생, 휴대폰번호:', this.phoneNumber);
      this.checkingPhoneNm();

    },
     // 24.12.05 수정 - 추가
    handleEnter() {
      // Enter 키를 눌렀을 때 실행되는 로직
      console.log('Enter 키 입력, 휴대폰번호:', this.phoneNumber);
      this.checkingPhoneNm();

    },
       // 24.12.05 수정 - 추가
    async checkingPhoneNm() {
      // users/phone/1
      const signDt = await taskStore.getSelectTasks(`v1/users/phone/${this.phoneNumber}`);
      console.log("회원정보 확인  : : : ", signDt)
      if (signDt) {
        this.checkPhoneNm = true
      } else {
        this.checkPhoneNm = false
      }
    },
  }
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
.editprofile2-1 {
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.frame-7634-1 {
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


.frame-7697-1 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.frame-7696-1 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative;
  width: 100%;
}

.frame-7625-1 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative;
  width: 100%;
}

.frame-763-5 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  position: relative;
  width: 100%;
}

/* 24.12.20 수정 */
.frame-763-5 label {
  width: 35%;
}

/* 24.12.05 수정 - 추가 */
.input-align {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

/* 24.12.05 수정 - 추가 */
.frame-763-5 input {
  width: 100%;
}

/* 24.12.05 수정 - 추가 */
.error-message {
  display: flex;
  align-items: center;
  color: var(--monza);
  font-size: 12px;
  margin-top: 4px;
}

.frame-7614-1 {
  align-items: center;
  border: none;
  background-color: var(--cultured-pearl);
  display: flex;
  gap: 30px;
  height: 55px;
  margin-right: -20px;
  padding: 0px 20px;
  position: relative;
  width: 530px;
}

/* 24.12.23 수정 - 추가  */
.edit-button {
  width: 100%;
}

.edit-button button {
  width: 100%;
  border: none;
  color: #ffffff;
  background-color: #d30f1a;
  text-align: center;
  padding: 16px 0px;
}

@media (max-width:720px) {

  .editprofile2-1 {
    background-color: #ffffff;
    align-items: normal;
    /* 24.12.23 수정 - 추가 */
    width: 100%;
    max-width: 720px;
    min-width: 360px;
    height: 100%;
  }

  .frame-7634-1 {
    padding: 17px 20px;
    justify-content: normal;
    /* 24.12.23 수정 - 추가 */
    gap: 60px;
    overflow-y: auto;
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

  .frame-763-5 {
    display: block;
  }

  .frame-763-5 label {
    margin-bottom: 17px;
    margin-top: 25px;
    display: block;
    /* 24.12.23 수정 - 추가 */
    width: 100%;
  }

  /* 24.12.23 수정 - 추가 */
  .frame-763-5 input {
    font-size: 14px;
  }

  .frame-7614-1 {
    width: 100%;
  }

  /* 24.12.23 수정 - 추가 */
  .edit-button button {
    height: 40px;
    padding: 0;
    border-radius: 4px;
    font-size: 14px;
  }

}
</style>