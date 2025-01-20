<template>
  <!-- 24.12.17 수정 - 전체 폰트 변경, click 이벤트 추가  -->
  <div class="modal-overlay" @click="closeModal">
    <div class="popupu47defualt-18 screen">
      <!-- <div class="frame-5-19"> -->
      <div class="frame-4-19">
        <div class="x-61 valign-text-middle pretendard-bold-log-cabin-18px">
          스윙 영상 삭제
        </div>
        <div class="text_label-60 valign-text-middle pretendard-regular-normal-granite-gray-16px">
          현재 영상을 삭제하시겠습니까?
        </div>
        <!-- </div> -->
      </div>
      <div class="btn-group-13">
        <!-- 닫기 버튼 클릭 시 'close' 이벤트 emit -->
        <div class="btnprimary-21 pretendard-semi-bold-white-16px" @click="closeModal">
          취소
        </div>

        <!-- 확인 버튼 클릭 시 'confirm' 이벤트 emit -->
        <div class="btnprimary-22 pretendard-semi-bold-white-16px" @click="confirmClick">
          확인
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SwingVideoDeleteModal",
  // 24.12.17 수정 - 추가 
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmClick() {
      this.$emit("confirm");
    }
  },
};

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 불투명한 검정 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  /* 모달을 다른 콘텐츠 위에 배치 */
}

.popupu47defualt-18 {
  /* align-items: center;
  background-color: var(--blackwhitewhite);
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: relative; */

  /* 24.12.17 수정  */
  background-color: white;
  /* padding-top: 25px; */
  width: 276px;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
}

/* .frame-5-19 {
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
} */

/* 24.12.17 수정 */
.frame-4-19 {
  /* align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative; */
  /* width: 100%; */
  width: 280px;
  height: 97px;
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 24px 25px;
}

/* .x-61 {
  letter-spacing: -0.36px;
  line-height: 27px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.text_label-60 {
  letter-spacing: -0.28px;
  line-height: 18px;
  position: relative;
  text-align: center;
  width: 226px;
} */

.btn-group-13 {
  /* align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  position: relative;
  width: 100%; */

  /* 24.12.17 수정 */
  display: flex;
  justify-content: space-between;
  height: 50px;
  font-weight: 350;
}


.btnprimary-21 {

  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: var(--nobel);
  gap: 10px;
  height: 50px;
  padding: 14px 10px;
  position: relative;
  width: 140px; */
  /* 24.12.17 수정  */
  background-color: #B1B1B1;
  color: white;
  padding: 13px 0px;
  border: none;
  width: 50%;
}

/* .text-37 {
  letter-spacing: -0.32px;
  line-height: 24px;
  margin-top: -2px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
} */

.btnprimary-22 {

  display: flex;
  align-items: center;
  justify-content: center;
  /* gap: 10px;
  padding: 14px 10px;
  position: relative;
  width: 140px;
  height: 50px;
  background-color: var(--monza); */
  background-color: #D30F1A;
  color: white;
  padding: 13px 0px;
  border: none;
  width: 50%;
}

</style>
