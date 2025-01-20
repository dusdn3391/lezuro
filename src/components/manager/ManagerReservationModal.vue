<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- 24.12.09 전체 폰트 수정 -->
      <h2 class="pretendard-extra-extra-bold-log-cabin-24px">
        {{ isEditMode && selectedReservation ? "예약 수정" : "예약 등록" }}
      </h2>

      <div class="form-group">
        <!-- 24.12.13 수정 - 과거는 예약 불가하도록 날짜 설정 -->
        <input type="date" v-model="selectedDate" :min="today"
          class="date-picker pretendard-regular-normal-mine-shaft-18px" />
      </div>

      <div class="form-group time-selectors">
        <select v-model="startTime" class="time-picker pretendard-regular-normal-mine-shaft-18px">
          <option disabled value="" class="pretendard-regular-normal-mine-shaft-18px">예약 시작 시간</option>
          <option v-for="time in availableTimes" :key="time" :value="time"
            class="pretendard-regular-normal-mine-shaft-18px">
            {{ time }}
          </option>
        </select>

        <select v-model="endTime" class="time-picker pretendard-regular-normal-mine-shaft-18px">
          <option disabled value="" class="pretendard-regular-normal-mine-shaft-18px">예약 종료 시간</option>
          <option v-for="time in availableEndTimes" :key="time" :value="time"
            class="pretendard-regular-normal-mine-shaft-18px">
            {{ time }}
          </option>
        </select>
      </div>

      <div>
        <input type="text" v-model="memberCount" placeholder="인원수를 적어주세요"
          class="memo-input pretendard-regular-normal-mine-shaft-18px" @input="validateCount" />
        <!-- 24.12.11 수정 - 에러 문구 추가 -->
        <div class="error-message pretendard-regular-normal-white-12px" v-if="memberCountError">{{ memberCountError }}</div>
      </div>
      <div>
        <input type="text" v-model="memberName" placeholder="예약자명을 적어주세요"
          class="memo-input pretendard-regular-normal-mine-shaft-18px" @input="validateName" />
        <!-- 24.12.11 수정 - 에러 문구 추가 -->
        <div class="error-message pretendard-regular-normal-white-12px" v-if="memberNameError">{{ memberNameError }}</div>
      </div>
      <div>
        <input type="text" v-model="memberPhone" placeholder="휴대번호를 적어주세요"
          class="memo-input pretendard-regular-normal-mine-shaft-18px" maxlength="11" @input="validatePhoneNm" />
        <!-- 24.12.11 수정 - 에러 문구 추가 -->
        <div class="error-message pretendard-regular-normal-white-12px" v-if="memberPhoneError">{{ memberPhoneError }}</div>
      </div>

      <!-- <div class="form-group">
        <textarea v-model="memo" placeholder="예약자명 메모를 남겨주세요" class="memo-input"></textarea>
      </div> -->

      <div class="form-group buttons">
        <button class="cancel-btn pretendard-bold-white-18px" @click="closeModal">취소하기</button>
        <button class="confirm-btn pretendard-bold-white-18px" @click="confirmReservation">
          {{ isEditMode ? "수정하기" : "확인하기" }}
        </button>
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
      memberPhoneError: "", /* 24.12.09 수정*/
      memberPhone: "",
      memberCountError: "", /* 24.12.09 수정*/
      memberCount: "",
      memberNameError: "", /* 24.12.11 수정*/
      memberName: "",
      startTime: "",
      initialStartTime: "", // 처음 열렸을 때의 startTime
      initialEndTime: "",
      errorMessage: "",
      endTime: "",
      today: new Date().toISOString().split('T')[0],  // 24.12.13 수정 - 추가 : 현재 날짜를 'YYYY-MM-DD' 형식으로 변환
      reservedTimes: [],
      memo: "",
      availableEndTimes: [],
      availableTimes: [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
      ],
    };
  },
  props: {
    selectedRoom: {
      type: Object, // 전달받는 데이터 타입 설정 (예시: String 또는 Number)
      required: true, // 필수 prop 여부
    },
    selectedReservation: {
      type: Object,
      required: false,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    selectedDate: {
      type: String,
      required: true, // selectedDate가 필수임을 명시
    },
  },
  watch: {
    selectedDate(newDate) {
      this.getReservationDt();
    },
    startTime(newStartTime) {
      if (newStartTime) {
        console.log("[startTime] New startTime:", newStartTime);

        // 예약된 시간에 따라 동적으로 종료 시간 필터링
        const reservationEnd = this.reservedTimes.reduce((latest, time) => {
          return time > latest ? time : latest;
        }, "");

        if (newStartTime < reservationEnd) {
          // 예약된 이전 시간을 선택하면 예약된 이후의 시간을 제외
          this.availableEndTimes = this.availableTimes.filter(
            (time) => time > newStartTime && time <= reservationEnd
          );
        } else {
          // 예약된 이후 시간을 선택하면 시작 시간 이후로 종료 가능
          this.availableEndTimes = this.availableTimes.filter(
            (time) => time > newStartTime
          );
        }

        // 추가: 종료 시간 필터링 업데이트 호출
        this.updateAvailableEndTimes();
        console.log("[startTime] Updated availableEndTimes:", this.availableEndTimes);
      }
    },

    endTime(newEndTime) {
      if (newEndTime && this.startTime) {
        // 종료 시간이 시작 시간 이전이면 경고 메시지 표시
        if (newEndTime <= this.startTime) {
          this.errorMessage = "종료 시간은 시작 시간 이후여야 합니다.";
          this.endTime = ""; // 종료 시간 초기화
        } else {
          this.errorMessage = ""; // 오류 메시지 초기화
        }
      }
    },
  },
  mounted() {
    this.getReservationDt();
    // 수정 모드일 때 기존 예약 데이터를 입력 필드에 채움
    if (this.isEditMode && this.selectedReservation) {
      const reservation = this.selectedReservation;
      this.selectedDate = reservation.startTime.slice(0, 10);
      this.startTime = reservation.startTime.slice(11, 16);
      this.endTime = reservation.endTime.slice(11, 16);
      this.memberName = reservation.reser_user || "";
      this.memberPhone = reservation.reser_phone || "";
      this.memberCount = reservation.member || "";
      this.status = reservation.status || "";
      this.initialStartTime = this.startTime; // 초기값 저장
      this.initialEndTime = this.endTime; // 초기값 저장
    } else if (this.selectedRoom) {
      // 신규 예약 등록 시
      this.startTime = "";
      this.endTime = "";
      this.memberName = "";
      this.memberPhone = "";
      this.memberCount = "";
    }
  },
  computed: {
    //     availableEndTimes() {
    //   if (!Array.isArray(this.reservedTimes) || this.reservedTimes.length === 0) {
    //     // reservedTimes가 비어있다면 전체 availableTimes 반환
    //     return this.availableTimes.filter((time) => time > this.startTime);
    //   }
    //   const reservationEnd = this.reservedTimes.reduce((latest, time) => {
    //     return time > latest ? time : latest;
    //   }, "");
    //   if (this.startTime < reservationEnd) {
    //     return this.availableTimes.filter(
    //       (time) => time > this.startTime && time <= reservationEnd
    //     );
    //   }
    //   return this.availableTimes.filter((time) => time > this.startTime);
    // },

    // 24.12.11 수정 - 추가
    // 전체 폼 유효성 검사
    isFormValid() {
      return !this.memberPhoneError && !this.memberCountError && !this.memberNameError;
    },
  },
  methods: {
    // 24.12.11 수정 - 추가
    validateName() {
      const regex = /^[가-힣]*$/; // 한글만 허용
      this.memberNameError = !regex.test(this.memberName)
        ? "예약자명은 한글로 입력해주세요."
        : null;
    },
    // 24.12.09 수정 - 추가
    validateCount() {
      const regex = /^[0-9]*$/; // 숫자만 허용
      this.memberCountError = !regex.test(this.memberCount)
        ? "인원수는 숫자로 입력해주세요."
        : null;
    },
    // 24.12.09 수정 - 추가
    validatePhoneNm() {
      const regex = /^[0-9]{11}$/; // 숫자만 허용
      this.memberPhoneError = !regex.test(this.memberPhone)
        ? "전화번호는 숫자 11자리로 입력해주세요."
        : null;
    },
    updateAvailableEndTimes() {
      if (!this.startTime) {
        this.availableEndTimes = this.availableTimes;
        return;
      }

      const reservationEnd = this.reservedTimes.reduce((latest, time) => {
        return time > latest ? time : latest;
      }, "");

      if (this.startTime < reservationEnd) {
        this.availableEndTimes = this.availableTimes.filter(
          (time) => time > this.startTime && time <= reservationEnd
        );
      } else {
        this.availableEndTimes = this.availableTimes.filter(
          (time) => time > this.startTime
        );
      }
      console.log("[Available End Times Updated]", this.availableEndTimes);
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    filterAvailableTimes() {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, "0");
      const currentMinutes = String(now.getMinutes()).padStart(2, "0");
      const currentTimeString = `${currentHours}:${currentMinutes}`;

      console.log("[Filter Logic] 현재 시간:", currentTimeString);

      if (this.selectedDate === this.formatDate(now)) {
        // 현재 날짜일 경우 현재 시간 이후의 시간만 남기기
        return this.availableTimes.filter((time) => time >= currentTimeString);
      }
      // 미래 날짜는 모든 시간을 표시
      return this.availableTimes;
    },
    async getReservationDt() {
      try {
        // 선택된 날짜와 방 매니저 ID 가져오기
        const date = this.selectedDate;
        const managerId = this.selectedRoom?.managerid;

        console.log("[Step 1] managerId 가져오기:", managerId);
        console.log("[Step 2] 선택된 날짜:", date);

        if (!managerId) {
          console.error("[Error] managerId가 없습니다.");
          return;
        }

        console.log(
          `[Step 3] API 요청 URL: reservations/date/${date}/manager?managerId=${managerId}`
        );
        const response = await managerStore.getTask(
          `reservations/date/${date}/manager?managerId=${managerId}`
        );

        console.log("[Step 4] API 응답 데이터:", response);

        // 예약된 시간 저장
        this.reservedTimes = [];
        response.forEach((room) => {
          if (room.room_id === this.selectedRoom.room_id) {
            room.reservations.forEach((reservation) => {
              if (reservation.status === "cancel") return;
              const startTime = new Date(reservation.startTime)
                .toISOString()
                .slice(11, 16);
              const endTime = new Date(reservation.endTime)
                .toISOString()
                .slice(11, 16);

              console.log("[Step 5] 예약된 시간:", startTime, "-", endTime);

              let currentTime = new Date(`1970-01-01T${startTime}:00Z`);
              const endTimeObj = new Date(`1970-01-01T${endTime}:00Z`);

              while (currentTime < endTimeObj) {
                const timeString = currentTime.toISOString().slice(11, 16);

                // 예약된 시간을 reservedTimes에 추가
                if (!this.reservedTimes.includes(timeString)) {
                  this.reservedTimes.push(timeString);
                }

                currentTime.setMinutes(currentTime.getMinutes() + 30); // 30분 단위로 증가
              }
            });
          }
        });

        console.log("[Step 6] 최종 예약된 시간 목록:", this.reservedTimes);

        // 현재 시간 이후의 시간만 필터링
        const filteredTimes = this.filterAvailableTimes();

        // isEditMode가 true이면 수정 중인 예약 시간을 포함
        if (this.isEditMode && this.selectedReservation) {
          const editingStartTime = this.selectedReservation.startTime.slice(
            11,
            16
          );
          const editingEndTime = this.selectedReservation.endTime.slice(11, 16);

          console.log(
            "[Step 7] 현재 수정 중인 예약 시간:",
            editingStartTime,
            "-",
            editingEndTime
          );

          let currentTime = new Date(`1970-01-01T${editingStartTime}:00Z`);
          const endTimeObj = new Date(`1970-01-01T${editingEndTime}:00Z`);

          while (currentTime < endTimeObj) {
            const timeString = currentTime.toISOString().slice(11, 16);
            // 수정 중인 예약 시간은 무조건 포함
            if (!filteredTimes.includes(timeString)) {
              filteredTimes.push(timeString);
            }
            currentTime.setMinutes(currentTime.getMinutes() + 30);
          }
        }

        // reservedTimes를 제외한 availableTimes 설정
        this.availableTimes = filteredTimes.filter(
          (time) =>
            !this.reservedTimes.includes(time) ||
            this.isEditingTimeIncluded(time)
        );

        console.log(
          "[Step 8] 최종 사용 가능한 시간 목록:",
          this.availableTimes
        );
      } catch (error) {
        console.error("[Error] 예약 시간 가져오기 오류:", error);
        alert("예약된 시간을 가져오는 중 오류가 발생했습니다.");
      }
    },
    isEditingTimeIncluded(time) {
      if (this.isEditMode && this.selectedReservation) {
        const editingStartTime = this.selectedReservation.startTime.slice(
          11,
          16
        );
        const editingEndTime = this.selectedReservation.endTime.slice(11, 16);

        const currentTime = new Date(`1970-01-01T${time}:00Z`);
        const startTimeObj = new Date(`1970-01-01T${editingStartTime}:00Z`);
        const endTimeObj = new Date(`1970-01-01T${editingEndTime}:00Z`);

        return currentTime >= startTimeObj && currentTime < endTimeObj;
      }
      return false;
    },

    closeModal() {
      this.$emit("close");
    },
    async confirmReservation() {
      console.log("selectedDate:", this.selectedDate);
      console.log("startTime:", this.startTime, "endTime:", this.endTime);

      const startTime = `${this.selectedDate}T${this.startTime}:00.000Z`;
      const endTime = `${this.selectedDate}T${this.endTime}:00.000Z`;

      // 24.12.11 수정 - 추가
      if (!this.isFormValid) {
        alert("형식에 맞게 입력해주세요.");
        return;
      }

      if (this.memberPhone.length !== 11) {
        this.errorMessage = "휴대번호 11자리를 입력해주세요";
        return; // 요청 차단
      }
      this.errorMessage = "";

      if (!this.selectedRoom) {
        alert("방 정보가 누락되었습니다.");
        return;
      }
      // let userId = null;
      //   if (this.isEditMode && this.selectedReservation) {
      //     userId = this.selectedReservation.userId; // 기존 예약의 userId 저장
      //   }
      const params = {
        roomId: this.selectedRoom.room_id,
        managerid: this.selectedRoom.managerid,
        startTime,
        endTime,
        roomtype: "Golf",
        reser_user: this.memberName,
        reser_phone: this.memberPhone,
        member: this.memberCount,
        agree: true,
        status: this.isEditMode ? this.status : "confirm",
      };
      console.log("전송할 params 값:", JSON.stringify(params, null, 2));
      try {
        if (this.isEditMode && this.selectedReservation) {
          console.log("수정 모드: 예약 삭제 후 재등록");
          const userId = this.selectedReservation.userId;
          await this.deleteReservation(this.selectedReservation.id);
          const response = await managerStore.postTask(
            `reservations/${userId}`,
            params
          );
          if (response) {
            alert("예약이 수정되었습니다.");
            this.confirmMsg();
          }
        } else {
          const response = await managerStore.postTask(
            "reservations/1",
            params
          );
          if (response) {
            console.log("[confirmReservation] Triggering confirmMsg...");
            this.confirmMsg();
            // 파라미터 값 처리 후 주석 풀기
            alert("예약이 등록되었습니다.");

          }
        }
        this.$emit("close");
      } catch (error) {
        console.error("API 호출 오류:", error);
        alert("예약에 실패했습니다. 서버 오류를 확인하세요.");
      }
    },

    // 예약 삭제 메서드
    async deleteReservation(reservationId) {
      try {
        const response = await managerStore.deleteTask(
          `reservations/${reservationId}`
        );
        console.log("예약 삭제 완료:", response);
        this.cancelMsg();
      } catch (error) {
        console.error("예약 삭제 오류:", error);
        alert("예약 삭제에 실패했습니다.");
        throw error; // 삭제 실패 시 등록을 진행하지 않도록 예외를 던집니다.
      }
    },

    async confirmMsg() {
      try {
        const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
        if (!managerInfo || !managerInfo.identifier) {
          console.error("[confirmMsg] Manager info or identifier is missing.");
          return;
        }

        const params = {
          phoneNumber: this.memberPhone, // 예약자 전화번호
          userName: this.memberName, // 예약자 이름
          availableTime: `${this.startTime} ~ ${this.endTime}`, // 시작 및 종료 시간
          storeName: managerInfo.identifier, // 매장 이름
        };

        console.log("[confirmMsg] Manager Info:", JSON.stringify(managerInfo, null, 2));
        console.log("[confirmMsg] Sending params:", JSON.stringify(params, null, 2));

        const response = await managerStore.postTask(
          `v1/sms/confirmReservation`,
          params
        );
        console.log("[confirmMsg] Response received:", JSON.stringify(response, null, 2));
      } catch (error) {
        console.error("[confirmMsg] API call failed:", error.response || error.message);
        console.log("[confirmMsg] Error Details:", JSON.stringify(error.config, null, 2));
      }
    },
    async cancelMsg() {
      const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
      console.log("[cancelMsg] Manager Info:", managerInfo);

      const params = {
        phoneNumber: this.memberPhone, // 예약자 전화번호
        userName: this.memberName, // 예약자 이름
        availableTime: `${this.initialStartTime} ~ ${this.initialEndTime}`, // 시작 및 종료 시간
        storeName: managerInfo.identifier,
      };

      console.log("[cancelMsg] Sending params:", params);

      try {
        const response = await managerStore.postTask(
          `v1/sms/cancelReservation`,
          params
        );
        console.log("[cancelMsg] Response received:", response);
      } catch (error) {
        console.error("[cancelMsg] API call failed:", error);
      }
    },
    // async sendMsg(){
    //   const params =
    //   {
    //     phoneNumber: this.memberPhone, // 예약자 전화번호
    //   userName: this.memberName, // 예약자 이름
    //   availableTime: `${this.startTime} ~ ${this.endTime}`, // 시작 및 종료 시간
    //   storeName: managerInfo.identifier,
    //   };
    //   try {
    //     const response = await taskStore.postTask(
    //       `v1/sms/sendReservation`,params
    //     );
    //     if (!response.data || response.data === undefined) {
    //       alert("예약이 되었습니다.");
    //       console.log("API Response:", response.data);
    //       this.$router.push({ path: "/reservation-progress" });
    //     } else {
    //       alert("예약에 실패했습니다.");
    //     }
    //   } catch (error) {
    //     console.error("API 호출 오류:", error);
    //     // alert("예약에 실패했습니다. 서버 오류를 확인하세요.");
    //   }
    // },
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

.modal-content {
  background: #fff;
  width: 880px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  /* 24.12.09 수정 - 추가 */
  display: grid;
  gap: 10px;
}

h2 {
  margin-bottom: 20px;
}

/* .form-group {
  margin-bottom: 20px;
} */

.date-picker {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


.time-selectors {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  /* 24.12.09 수정*/
}

.time-picker {
  width: 50%;
  /* 24.12.09 수정*/
  height: 60px;
  /* 24.12.09 수정 - 추가 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 24.12.09 수정 */
.memo-input {
  width: 100%;
  /* height:230px; */
  height: 60px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.cancel-btn,
.confirm-btn {
  width: 48%;
  padding: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  /* 24.12.09 수정- 배경색 변경 */
  background-color: #999999;
  color: #fff;
}

/* 24.12.09 수정- 배경색 변경 */
.confirm-btn {
  background-color: #184199;
  color: #fff;
}

/* 24.12.09 수정 */
.error-message {
  display: flex;
  align-items: center;
  color: var(--monza);
  font-size: 12px;
  margin-top: 4px;
}
</style>
