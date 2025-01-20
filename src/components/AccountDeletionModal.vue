<template>
<div class="modal-overlay" @click="closeModal">
  <div class="popupu47defualt-4 screen">
    <div class="frame-5-5">
      <div class="frame-4-5">
        <div class="x-47 valign-text-middle notosanskr-medium-log-cabin-16px">정말로 탈퇴하시겟어요?</div>
        <div class="flex-container-628687 notosanskr-normal-tuatara-14px">
          <div class="text-18 valign-text-middle">
            <span
              ><span class="span-44 notosanskr-normal-tuatara-14px">탈퇴 버튼 선택 시, 계정은</span>
            </span>
          </div>
          <div class="text-18 valign-text-middle">
            <span
              ><span class="span-44 notosanskr-normal-tuatara-14px">삭제되며 복구되지 않습니다.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group-3 ">
    <div class="btnsecondary"  @click="closeModal">
      <div class="text_label-35 valign-text-middle notosanskr-light-white-16px"  @click="closeModal">닫기</div>
    </div>
    <div class="btnprimary-3"  @click="deleteAccount">
      <div class="text-83 valign-text-middle notosanskr-light-white-16px" @click="deleteAccount">삭제</div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import { taskStore } from "@/store/taskStore"; // API 호출

export default {
  name: "AccountDeletionModal",
  components: {
  },
  props: {
    idx: String, // phone을 props로 받음
  },
  methods: {
  closeModal() {
      this.$emit("close"); 
    },
  //  async 
   deleteAccount(){
    
      // const res = await taskStore.deleteTask(`v1/users/${parseInt(this.idx)}`);
      // console.log("res" , res)
      // console.log("res" , this.idx)
      
      this.$router.push({path:"/account-deletion"})
    }
   }
};
</script>

<style>
.btn-group-3 {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
}
.btnprimary-3 {
  align-items: center;
  background-color: var(--monza);
  display: flex;
  gap: 10px;
  height: 50px;
  justify-content: center;
  padding: 14px 10px;
  position: relative;
  width: 138px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* 불투명한 블랙 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 다른 요소 위에 표시 */
}
.popupu47defualt-4,
.popupu47defualt-10,
.popupu47defualt-12 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  border: 1px solid;
  border-radius:8px;
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.frame-5-5,
.frame-5-6,
.frame-5-7 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 24px 10px;
  position: relative;
}

.frame-4-5,
.frame-4-6,
.frame-4-7 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.x-47,
.x-48,
.x-49 {
  letter-spacing: -0.32px;
  line-height: 24px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.flex-container-628687,
.flex-container-619920,
.flex-container-615984 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 226px;
}

.text-18,
.text-24,
.text-25 {
  align-self: stretch;
  letter-spacing: -0.28px;
  line-height: 21px;
  position: relative;
  text-align: center;
}

.span-44,
.span-45,
.span-46 {
  letter-spacing: -0.04px;
}
</style>
