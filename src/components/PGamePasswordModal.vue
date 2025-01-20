<template>
  <div class="modal-background" @click.self="closeModal">
    <div class="popupu47defualt-16 screen">
      <div class="frame-5-16">
        <div class="frame-4-16">
          <div class="x-58 valign-text-middle pretendard-bold-log-cabin-18px">비공개 대회</div>
          <div class="frame-7949">
            <input type="password" class="frame-7949 valign-text-middle pretendard-regular-normal-mountain-mist-14px"
              placeholder="비밀번호를 입력해주세요">
            <!-- <img
              class="search-btn"
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn.svg"
              alt="searchBtn"
            /> -->
          </div>
        </div>
      </div>
      <div class="modal-btn-align">
        <button class="cancel-btn notosanskr-light-white-16px" @click="closeModal">취소</button>
        <button class="submit-btn notosanskr-light-white-16px" @click="submitPassword">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import BtnGroup3 from "./BtnGroup3";
export default {
  name: "PGamePasswordModal",
  components: {
    BtnGroup3,
  },
  data() {
    return {
      password: "", // 비밀번호 입력값 관리
    };
  },
  methods: {
    closeModal() {
      this.$emit("close"); // 부모 컴포넌트로 close 이벤트를 전송
    },
    submitPassword() {
      const correctPassword = "1234"; // 올바른 비밀번호
      if (this.password === correctPassword) {
        this.$emit("submit-password", this.password); // 비밀번호가 맞으면 상위로 전달
      } else {
        alert("비밀번호가 일치하지 않습니다."); // 틀리면 경고 메시지
      }
    }
  },
};
</script>

<style>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  /* 배경을 불투명한 검정색으로 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popupu47defualt-16,
.popupu47defualt-19 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  border: 1px solid;
  border-color: var(--alto-2);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.frame-5-16,
.frame-5-17 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 20px 0px;
  position: relative;
  width: 280px;
}

.frame-4-16,
.frame-4-17 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.x-58,
.x-59 {
  letter-spacing: -0.36px;
  line-height: 27px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.frame-7949,
.frame-7949-1 {
  height: 40px;
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  position: relative;
  width: 230px;
}

.frame-7672,
.frame-7672-1 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  border: 1px solid;
  border-color: var(--alto);
  display: flex;
  flex: 1;
  flex-grow: 1;
  height: 54px;
  justify-content: space-between;
  padding: 0px 15px;
  position: relative;
}

.text-132,
.text-136 {
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  width: 173px;
}

.search-btn,
.search-btn-1 {
  height: 18px;
  position: relative;
  width: 18px;
}
</style>
