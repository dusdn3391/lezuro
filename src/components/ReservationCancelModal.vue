<template>
  <div class="popupu47defualt-3 screen">
    <div class="frame-5-3">
      <div class="frame-4-3">
        <div class="x-45 valign-text-middle notosanskr-medium-log-cabin-16px">
          예약 취소
        </div>
        <!-- 24.12.12 수정 - 폰트 수정, 문구 수정 -->
        <p class="text_label-33 valign-text-middle pretendard-regular-normal-granite-gray-14px">
          예약을 취소하시겠습니까?
        </p>
      </div>
      <div class="btn-group-3">
        <!-- 24.12.12 수정 - div - button 변경 -->
        <button class="btnsecondary notosanskr-light-white-16px" @click="closeRModal">
            닫기
        </button>
        <button class="btnprimary-3 notosanskr-light-white-16px" @click="cancelReservation">
            취소
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore"; 

export default {
  name: "ReservationCancelModal",
  props: {
    reservationId: {
      type: Number,
      required: true,
    },
    store: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  loginInfo: {
    type: Object,
    required: true,
  },
  },
  // mounted() {
  //   console.log("받은 reservationId (mounted):", this.reservationId);
  // },
  methods: {
    closeRModal() {
      // 모달을 닫기 위한 이벤트 전송
      this.$emit("closeRModal");
    },
    async cancelReservation() {
      try {
        const params = {
          status: "cancel", // 서버에 저장할 필드명 'profileImage'로 전송
        };
        // 서버에 프로필 이미지 업데이트 요청
        const response = taskStore.updateTask(
          `reservations/${this.reservationId}/status`,
          params
        );
        console.log("dsfhdfsjkl;dsf",params)
        console.log("예약 취소 응답:", response);
        alert("예약이 취소되었습니다.");
        this.cancelMsg() // 예약 취소 메세지 전송

        // 성공적으로 취소 후 모달 닫기
        this.$emit("closeRModal");
        this.$emit("reservationCanceled"); // 상위 컴포넌트에 이벤트 전달
      } catch (error) {
        console.error("예약 취소 실패:", error);
        alert("예약 취소에 실패했습니다. 다시 시도해주세요.");
      }
    },

    // 예약 취소 메세지 전송
    async cancelMsg(){
      const availableTime = this.time.split("[")[0].trim();
      const params =
      {
        // 해당 파라미터 값 채워 넣기!
        phoneNumber: this.loginInfo.phoneNm, // loginInfo에서 phoneNm 사용
        userName: this.loginInfo.name,   
        availableTime, // 예약 시작 시간과 종료 시간
    storeName: this.store,   
      };
      console.log("dklj",params)
      try {
        const response = await taskStore.postTask(
          `v1/sms/cancelReservation`,params
        );
        console.log("response",response)
        
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
      
    }
  },
};
</script>
<style>
/* 24.12.12 수정 */
.popupu47defualt-3 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  border: 1px solid #dadada;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
}

/* 24.12.12 수정 */
.frame-5-3 {
  width: 14.9%;
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  position: relative;
}

/* 24.12.12 수정 */
.frame-4-3 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  padding: 24px 25px;
}

/* .x-45{
  letter-spacing: -0.32px;
  line-height: 24px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.text_label-33,
.text_label-34 {
  letter-spacing: -0.28px;
  line-height: 21px;
  position: relative;
  text-align: center;
  width: 226px;
} */

/* 24.12.12 수정 */
.btn-group-3 {
  /* align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative; */
  width: 100%;
}

/* 24.12.12 수정 - 추가 */
.btnsecondary, .btnprimary-3 {
  width: 50%;
  height: 50px;
  border: none;
}

/* 24.12.12 수정 */
.btnsecondary {
  background-color: var(--nobel);
  border-bottom-left-radius: 8px;
}

/* 24.12.12 수정 */
.btnprimary-3 {
  
  background-color: var(--monza);
  border-bottom-right-radius: 8px;
}

</style>