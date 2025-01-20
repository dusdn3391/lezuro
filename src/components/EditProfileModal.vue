<template>
  <div class="popupu47defualt-13 screen">
    <div class="frame-5-13">
      <div class="frame-4-13">
        <div class="x-55 valign-text-middle notosanskr-medium-log-cabin-16px">
          내 정보 변경하기
        </div>
        <div
          class="text_label-56 valign-text-middle notosanskr-normal-tuatara-14px"
        >
          내 정보를 변경하시겠습니까?
        </div>
      </div>
      <div class="btn-group-3">
        <div class="btnsecondary" @click="closeModal">
          <div
            class="text_label-35 valign-text-middle notosanskr-light-white-16px"
            @click="closeModal"
          >
            취소
          </div>
        </div>
        <div class="btnprimary-3" @click="editProfile">
          <div
            class="text-83 valign-text-middle notosanskr-light-white-16px"
            @click="editProfile"
          >
            확인
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProfileModal",
  methods: {
    closeModal() {
      this.$emit("close"); // 부모 컴포넌트로 close 이벤트를 전송
    },
    editProfile() {
      this.$router.push({ path: "/myprofile" });
    },
  },
};
</script>

<style>
.popupu47defualt-13 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.frame-5-13 {
  background-color: white;
  width: 270px;
  border-radius: 10px;
  text-align: center;
  overflow: hidden;
}

.frame-4-13{
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  padding:25px;
  position: relative;
}

.x-55 {
  letter-spacing: -0.32px;
  line-height: 24px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.text_label-56,
.text_label-57 {
  letter-spacing: -0.28px;
  line-height: 21px;
  position: relative;
  text-align: center;
  width: 226px;
}
</style>
