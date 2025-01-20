<template>
  <div class="pgamepasswordmodalno2-view screen" >
    <div class="game-list-modal">
      <div class="game-list-modal-content">
        <div class="modal-title valign-text-middle notosanskr-medium-log-cabin-16px">비공개 대회</div>
        <!-- 24.11.22 수정 - 추가 : 비밀번호 자릿수 설정 -->
        <input type="password" v-model="password"
          class="password-input valign-text-middle pretendard-regular-normal-mountain-mist-14px" placeholder="비밀번호"
          :maxlength="6">
        <div class="password-align">
          <!-- 24.11.22 수정 - 추가 : 비밀번호 자릿수 설정 -->
          <input type="password" v-model="password"
            class="password-input-1 valign-text-middle pretendard-regular-normal-mountain-mist-14px"
            placeholder="비밀번호 입력해주세요" :maxlength="6">
          <img class="search-btn-10"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
            alt="searchBtn" />
        </div>
        <div class="password-Instructions valign-text-middle notosanskr-normal-tuatara-14px">비밀번호를 입력해주세요.</div>
      </div>
      <div class="modal-btn-align">
        <button class="cancel-btn notosanskr-light-white-16px" @click="closeModal">취소</button>
        <button class="submit-btn notosanskr-light-white-16px" @click="submitPassword">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PGamePasswordModalno2",
  data() {
    return {
      password: "", // 비밀번호 입력값 관리
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submitPassword() {
      if (this.password.trim() === "") {
        alert("비밀번호를 입력해주세요.");
        return;
      }

      this.$emit("submit-password", this.password); // 입력된 비밀번호를 상위로 전달
    }
  }
};
</script>

<style scoped src="@/style/game/pgamepasswordmodalno2.css" />
