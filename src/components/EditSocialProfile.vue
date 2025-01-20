<template>
  <!-- 24.11.15 수정 - 모달로 변경 -->
  <div class="modal-overlay">
    <div class="editprofile1-1 screen">
      <div class="frame-7634">
        <div class="edit-title">
          <span class="title-text pretendard-extra-extra-bold-black-30px">개인정보변경</span>
          <!-- 24.11.15 수정 - 추가 -->
          <img class="material-symbolsclose-2"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-close.svg"
            alt="material-symbols:close" @click="closeEditSocialModal" />
        </div>
        <div class="frame-7697">
          <div class="frame-7696">
            <div class="frame-7625">
              <div class="frame-7-24">
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <label class="pretendard-medium-log-cabin-18px">이름</label>
                <!-- 24.11.15 수정 - font style 수정 -->
                <!-- 24.12.11 수정 - 추가 : input-align -->
                <div class="input-align">
                  <input type="text" class="frame-761 pretendard-medium-log-cabin-16px" placeholder="레저로 이름"
                    v-model="name" @input="validateName" />
                  <!-- 24.12.11 수정 - 에러 문구 추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="nameError">{{ nameError }}</div>
                </div>
              </div>
              <div class="frame-7-24">
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <label class="pretendard-medium-log-cabin-18px">생년월일</label>
                <!-- 24.11.15 수정 - font style 수정 -->
                <!-- 24.12.05 수정 - text-date 로 수정 -->
                <input type="date" class="frame-761 pretendard-medium-log-cabin-16px" placeholder="2002년 7월 2일"
                  v-model="birthDate" />
              </div>
              <div class="frame-7-24">
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <label class="pretendard-medium-log-cabin-18px">성별</label>
                <!-- 24.12.20 수정 - 폰트 변경 -->
                <div class="radio pretendard-medium-log-cabin-16px">
                  <input type="radio" name="gender" value="MALE" v-model="gender" />남자
                  <input type="radio" name="gender" value="FEMALE" v-model="gender" style="margin-left: 20px" />여자
                </div>
              </div>
            </div>
          </div>
          <div class="edit-button">
            <!-- 24.11.15 수정 - font style 수정 -->
            <button class="pretendard-semi-bold-white-18px" @click="confirmEditInfo">변경하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore"; // API 호출

export default {
  name: "EditSocialProfile",
  data() {
    return {
      name: "", // 이름
      birthDate: "", // 생년월일
      gender: "", // 성별
      email: "",
      nameError: "", // 24.12.11 수정 - 추가
    }
  },
  props: {
    loginInfo: {
      type: Object, // 전달받는 데이터의 타입을 정의
      required: true, // 필수 prop으로 설정
    },
  },
  mounted() {
    // const userId = this.$route.query.id;
    // console.log("받은 userId:", userId);
    console.log("받은 userId:", JSON.stringify(this.loginInfo));
    this.name = this.loginInfo.name
    this.birthDate = this.loginInfo.birthDay
    this.gender = this.loginInfo.gender


    // 필요한 로직 추가 (예: API 호출 등)
  },
  computed: {
    // 24.12.11 수정 - 추가
    // 전체 폼 유효성 검사
    isFormValid() {
      return !this.nameError;
    },
  },
  methods: {
       // 24.12.11 수정 - 추가
       validateName() {
      const regex = /^[가-힣]*$/; // 한글만 허용
      this.nameError = !regex.test(this.name)
        ? "이름은은 한글로 입력해주세요."
        : null;
    },
    confirmEditInfo() {
      // 24.12.11 수정 - 추가
      if (!this.isFormValid) {
      alert("형식에 맞게 입력해주세요.");
      return;
    }
      try {
        const params = {
          name: this.name,
          birthDay: this.birthDate,
          gender: this.gender, // 선택된 성별이 'Male' 또는 'Female'로 저장됨
        };
        console.log("보내는 데이터:", params); // 여기서 확인 가능
        // 이름만 변경됨
        const response = taskStore.updateTask("v1/auth/me/update", params);
        alert("개인정보가 변경되었습니다!");
      } catch (error) {
        console.error("개인정보 업데이트 실패:", error);
        alert("개인정보 업데이트에 실패했습니다.");
      }

      // this.$router.replace({ path: "/myprofile" });
      this.$emit("confirm"); // 부모 컴포넌트로 close 이벤트를 전송

    },
    closeModal() {
      // this.$router.replace({ path: "/myprofile" });
      this.$emit("close"); // 부모 컴포넌트로 close 이벤트를 전송

    },
    // 24.11.15 수정 - 추가
    closeEditSocialModal() {
      // this.$router.replace({ path: "/myprofile" });
      this.$emit("close"); // 부모 컴포넌트로 close 이벤트를 전송
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
.editprofile1-1 {
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.frame-7634 {
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
  right: 20px;
  /* 오른쪽 끝에 배치 */
  top: 50%;
  /* 세로 중앙 */
  transform: translateY(-50%);
  /* 세로 중앙 맞추기 */
  cursor: pointer;
}

.frame-7697 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: 100%;
}

.frame-7696 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative;
  width: 100%;
}

.frame-7625 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative;
  width: 100%;
}

.frame-7-24 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  position: relative;
  height: 55px;
  width: 100%;
}

.frame-7-24 label {
  width: 140px;
}

.frame-761 {
  align-items: center;
  background-color: var(--cultured-pearl);
  display: flex;
  gap: 30px;
  height: 55px;
  border: none;
  padding: 0px 20px;
  position: relative;
  width: 100%;
}

/* 24.12.11 수정 - 추가 */
.input-align {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

/* 24.12.11 수정 - 추가 */
.error-message {
  display: flex;
  align-items: center;
  color: var(--monza);
  font-size: 12px;
  margin-top: 4px;
}

/* 24.11.15 수정 - 정렬 수정 */
.radio {
  display: flex;
  width: 100%;
  align-items: center;
}

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


@media (max-width: 720px) {
  .editprofile1-1 {
    background-color: #ffffff;
    align-items: normal;
    /* 24.12.23 수정 - 추가 */
    width: 100%;
    max-width: 720px;
    min-width: 360px;
    height: 100%;
  }

  .frame-7634 {
    justify-content: normal;
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

  .frame-7-24 {
    display: block;
    height: 110px;
  }

  .frame-7-24 label {
    display: block;
    margin-bottom: 17px;
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
