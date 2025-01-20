<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- 24.12.11 수정 - 폰트 수정 -->
      <div class="title valign-text-middle notosanskr-medium-log-cabin-16px">예약 상태</div>
      <div>
        <!-- 24.12.11 수정 - 폰트 추가 -->
        <button
          class="blue-button pretendard-semi-bold-black-14px"
          :class="{ active: selected === '예약완료' }"
          @click="selectedStatus('예약완료')"
        >
          예약완료
        </button>
        <!-- 24.12.11 수정 - 폰트 추가 -->
        <button
          class="confirm-button pretendard-semi-bold-black-14px"
          :class="{ active: selected === '접수중' }"
          @click="selectedStatus('접수중')"
        >
          접수중
        </button>
        <!-- 24.12.11 수정 - 폰트 추가 -->
        <button
          class="grey-button pretendard-semi-bold-black-14px"
          :class="{ active: selected === '예약취소' }"
          @click="selectedStatus('예약취소')"
        >
          예약취소
        </button>
      </div>

      <!-- <h2 class="pretendard-bold-mine-shaft-18px">
        선택한 상태: {{ selected }}
      </h2> -->
      <div class="form-group buttons">
        <!-- 24.12.11 수정 - 폰트 추가 -->
        <button class="cancel-btn notosanskr-light-white-16px" @click="closeModal">취소하기</button>
        <button class="confirm-btn notosanskr-light-white-16px" @click="confirmModal">확인하기</button>
      </div>
    </div>
  </div>
</template>
<script>
import { managerStore } from "@/store/managerStore"; // API 호출

export default {
  name: "ManagerReservationModal",
  data() {
    return {
      selected: "", // 선택된 상태
      values: "", // API로 전송할 값
    };
  },
  props: {
    reserId: {
      type: Number,
      required: true, // 예약 ID는 필수
    },
    reserStatus: {
      type: String,
      required: true, // 초기 예약 상태는 필수
    },
  },
  mounted() {
    // 초기 선택 상태 설정
    this.selected = this.reserStatus;
    if (this.selected === "confirm") {
      this.selected = "예약완료";
    } else if (this.selected === "cancel") {
      this.selected = "예약취소";
    } else {
      this.selected = "접수중";
    }
  },
  methods: {
    selectedStatus(status) {
      this.selected = status;
    },
    closeModal() {
      this.$emit("close");
    },
    async confirmModal() {
      try {
        // API 전송용 데이터 준비
        this.values = this.selected === "예약완료" ? "confirm" : "cancel";
        const params = { status: this.values };

        console.log("전송할 데이터:", params);

        // API 호출
        await managerStore.updateTask(`reservations/${this.reserId}/status`, params);

        console.log("API 호출 성공, 예약 상태가 변경되었습니다.");
        this.$emit("confirm",{status:this.selected});
        alert(`${this.selected} 상태로 변경되었습니다.`);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        alert("예약 상태 변경 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 24.12.11 수정 */
.modal-content {
  background: #fff;
    width: 350px;
    padding-top: 25px;
    gap: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: grid;
    text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.cancel-btn,
.confirm-btn {
  width: 100%;
  padding: 15px;
  border: none;
  cursor: pointer;
}

/* 24.12.11 수정 - 추가 */
.cancel-btn {
  border-bottom-left-radius: 8px;
}

/* 24.12.11 수정 - 추가 */
.confirm-btn {
  border-bottom-right-radius: 8px;
}


/* 24.12.11 수정 - 배경색 변경 */
.cancel-btn {
  background-color: #999;
  color: #fff;
}

/* 24.12.11 수정 - 배경색 변경 */
.confirm-btn {
  background-color: #184199;
  color: #fff;
}

.blue-button,
.confirm-button,
.grey-button {
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid;
}

/* 24.12.11 수정 - 색상 변경 */
.blue-button {
  border-color: #184199;
  color: #184199;
}

.confirm-button {
  border-color: #14b655;
  color: #14b655;
}

/* 24.12.11 수정 - 색상 변경 */
.grey-button {
  border-color: #00000080;
  color: #00000080;
}

/* 24.12.11 수정 - 색상 변경 */
/* 선택된 버튼 스타일 */
.blue-button.active {
  background-color: #184199;
  color: #fff;
}

.confirm-button.active {
  background-color: #14b655;
  color: #fff;
}

/* 24.12.11 수정 - 색상 변경 */
.grey-button.active {
  background-color: #00000080;
  color: #fff;
}
</style>
