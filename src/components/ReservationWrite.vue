<template>
  <div class="container-center-horizontal">
    <div class="reservation1-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" />
      <div class="reservation1-wrap">
        <div class="title pretendard-bold-log-cabin-38px">예약하기</div>
        <div class="reservation1-content">
          <div class="reservation1-shop-info-box">
            <div class="reservation1-shop-info-head">
              <div class="reservation1-shop-name valign-text-middle pretendard-bold-mine-shaft-38px">
                {{ getData.name }}
              </div>
              <div class="reservation1-shop-address valign-text-middle pretendard-regular-mine-shaft-20px">
                {{ getData.address }}
              </div>
            </div>
            <div class="reservation-shop-map-box" :style="{ 'background-image': 'url(' + getData.mapImage + ')' }">
              <div class="reservation-shop-map-name-box">
                <img class="reservation-shop-map-point"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/mdi-location-1.svg"
                  alt="mdi:location" />
                <div class="reservation-shop-name pretendard-bold-mine-shaft-14px">
                  {{ getData.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="reservation-info">
            <div class="reservation-info-align">
              <div class="reservation-info-input">
                <div class="reservation-info-input-title valign-text-middle pretendard-bold-mine-shaft-24px">
                  예약자 정보
                </div>
                <div class="reservation-info-input-content">
                  <div class="reservation-info-input-row">
                    <div class="reservation-info-input-row-title">
                      <div class="reservation-input-title valign-text-middle pretendard-medium-black-18px">
                        이름
                      </div>
                    </div>
                    <input v-model="name" class="resevationi-info-select pretendard-regular-normal-mountain-mist-16px"
                      placeholder="예약자명을 입력해주세요" type="text" />
                  </div>
                  <div class="reservation-info-input-row">
                    <div class="reservation-info-input-row-title">
                      <div class="reservation-input-title valign-text-middle pretendard-medium-black-18px">
                        연락처
                      </div>
                    </div>
                    <input v-model="phone" class="resevationi-info-select pretendard-regular-normal-mountain-mist-16px"
                      placeholder="연락처를 입력해주세요" type="text" maxlength="11" />
                  </div>
                </div>
              </div>
              <div class="reservation-info-input">
                <div class="reservation-info-input-title valign-text-middle pretendard-bold-mine-shaft-24px">
                  예약 일시
                </div>
                <div class="reservation-info-input-content">
                  <div class="reservation-info-input-row">
                    <div class="reservation-info-input-row-title">
                      <div class="reservation-input-title valign-text-middle pretendard-medium-black-18px">
                        날짜
                      </div>
                    </div>
                    <input type="date" v-model="date" class="date pretendard-regular-normal-mountain-mist-16px"
                      :min="today" />
                  </div>
                  <div class="reservation-info-input-row">
                    <div class="reservation-info-input-row-title">
                      <div class="reservation-input-title valign-text-middle pretendard-medium-black-18px">
                        룸
                      </div>
                    </div>
                    <!-- {{ getData.storeScale }}
                    <select v-model="roomId" class="resevationi-info-select pretendard-regular-normal-mountain-mist-16px">
                      <option value="" disabled>룸을 선택해주세요</option>
                      <option value="1">룸 1</option>
                      <option value="2">룸 2</option>
                      <option value="3">룸 3</option>
                    </select> -->
                    <select v-model="roomId"
                      class="resevationi-info-select pretendard-regular-normal-mountain-mist-16px">
                      <option value="" disabled>룸을 선택해주세요</option>
                      <option v-for="n in parseInt(getData.storeScale)" :key="n" :value="n">
                        룸 {{ n }}
                      </option>
                    </select>
                  </div>
                  <div class="reservation-info-start-time">
                    <div class="reservation-info-start-time-title">
                      <div class="reservation-input-title valign-text-middle pretendard-medium-black-18px">
                        시작시간
                      </div>
                    </div>
                    <div class="reservation-info-start-time-list">
                      <button v-for="time in times" :key="time" :class="[
                        'non-select-time',
                        selectedTime === time ? 'selected-time' : '',
                        reservedTimes.includes(time) || !isFutureTime(time)
                          ? 'reserved-time'
                          : '',
                      ]" :disabled="reservedTimes.includes(time) || !isFutureTime(time)
                        " @click="selectTime(time)">
                        <div :class="[
                          'non-select-time-font',
                          selectedTime === time
                            ? 'pretendard-medium-monza-16px'
                            : '',
                          reservedTimes.includes(time) || !isFutureTime(time)
                            ? 'pretendard-regular-normal-celeste-16px'
                            : 'pretendard-regular-normal-mine-shaft-16px',
                        ]">
                          {{ time }}
                        </div>
                      </button>
                    </div>
                  </div>
                  <div class="reservation-info-start-time">
                    <div class="reservation-info-start-time-title">
                      <div class="reservation-input-title valign-text-middle pretendard-medium-black-18px">
                        종료시간
                      </div>
                    </div>
                    <div class="reservation-info-start-time-list">
                      <button v-for="time in times" :key="time" :class="[
                        'non-select-time',
                        selectedEndTime === time ? 'selected-time' : '',
                        reservedTimes.includes(time) ||
                          !isValidEndTime(time) ||
                          !isFutureTime(time)
                          ? 'reserved-time'
                          : '',
                      ]" :disabled="reservedTimes.includes(time) ||
                        !isValidEndTime(time) ||
                        !isFutureTime(time)
                        " @click="selectEndTime(time)">
                        <div :class="[
                          'non-select-time-font',
                          selectedEndTime === time
                            ? 'pretendard-medium-monza-16px'
                            : '',
                          reservedTimes.includes(time) ||
                            !isValidEndTime(time) ||
                            !isFutureTime(time)
                            ? 'pretendard-regular-normal-celeste-16px'
                            : 'pretendard-regular-normal-mine-shaft-16px',
                        ]">
                          {{ time }}
                        </div>
                      </button>
                    </div>
                  </div>
                  <div class="reservation-info-consent">
                    <div class="reservation-people-number">
                      <div class="reservation-people-number-title valign-text-middle pretendard-bold-mine-shaft-24px">
                        인원수
                        <!-- {{branchId}} -->
                      </div>
                      <div class="reservation-people-number-count">
                        <div class="reservation-people-number-count-btn" @click="decreaseCount">
                          <span class="reservation-people-number-count-btn-font pretendard-bold-log-cabin-24px">-</span>
                        </div>
                        <div class="valign-text-middle pretendard-regular-normal-mine-shaft-16px">
                          {{ count }}명
                        </div>
                        <div class="reservation-people-number-count-btn" @click="increaseCount">
                          <span class="reservation-people-number-count-btn-font pretendard-bold-log-cabin-24px">+</span>
                        </div>
                      </div>
                    </div>
                    <div class="reservation-info-guide">
                      <div class="reservation-input-title valign-text-middle pretendard-bold-mine-shaft-24px">
                        안내
                      </div>
                      <div class="reservation-info-guide-content">
                        <div class="reservation-info-guide-content-font pretendard-regular-normal-mine-shaft-16px">
                          <div>- 예약 취소는 예약 내역에서 신청해주시기</div>
                          <div class="reservation-info-guide-content-font-align">
                            바랍니다.
                          </div>
                        </div>
                        <div class="reservation-info-guide-content-font pretendard-regular-normal-mine-shaft-16px">
                          <div>- 예약신청 후 매장의 승인을 거쳐야만</div>
                          <div class="reservation-info-guide-content-font-align">
                            정상적으로 예약이 진행됩니다.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="reservation-info-consent-title valign-text-middle pretendard-bold-mine-shaft-24px">
                      개인정보 제3자 제공 동의(필수)
                    </div>
                    <div class="check-text">
                      <div class="checkbox-container">
                        <label class="custom-checkbox">
                          <input type="checkbox" v-model="isChecked" />
                          <span class="checkmark"></span>
                          <span class="valign-text-middle pretendard-medium-black-16px">동의합니다</span>
                        </label>
                      </div>
                      <!-- 24.12.18 수정 - check-text-detail 추가 -->
                      <div class="check-text-detail valign-text-middle pretendard-medium-mountain-mist-16px"
                        @click="goToPage('/termsview?tab=개인정보처리방침')">
                        자세히보기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Additional sections like 인원수, 안내, 개인정보 동의 -->
              <button class="reservation-write-btn pretendard-medium-white-18px" @click="completeReservation">
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore"; // API 호출
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
export default {
  name: "ReservationWrite",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },

  props: ["rJZsWIProps"],
  data() {
    return {
      today: new Date().toISOString().split("T")[0], // Today's date for minimum date on calendar
      date: new Date().toISOString().split("T")[0],
      map: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/frame-7330-1.png",
      shop: {
        name: "레저로 스크린파크골프 계양점",
        address: "계양구 아나지로 524-1",
      },
      roomId: "",
      name: "",
      phone: "",
      times: [
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
      ],
      selectedTime: null,
      selectedEndTime: null,
      reservedTimes: [],
      isChecked: false,
      count: 1,
      currentHour: new Date().getHours(),
      getData: {},
      userInfo: {},
      branchList: [],
    };
  },
  mounted() {
    const data = this.$route.params;
    console.log("data : : : ", data); // 데이터 확인
    this.getData = data;

    // 24.12.27 수정 - 추가
    // 새로고침 후 데이터 복원
    const savedShop = JSON.parse(localStorage.getItem("selectedShop"));
    if (savedShop) {
      console.log("복원된 데이터:", savedShop);
      this.getData = savedShop;

      // getCompetition 호출
      if (savedShop.id) {
        this.getReservationDt(savedShop.id);
        this.resevatinId = savedShop.id;
      } else {
        console.error("ID 값이 없습니다.");
      }
    }

    this.userInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.name = this.userInfo.name;
    this.phone = this.userInfo.phone;
    this.times = this.generateTimes(
      this.getData.weekdayHours,
      this.getData.weekendHours
    );
    console.log(
      "console.log(times); : : : " +
      this.generateTimes(this.getData.weekdayHours, this.getData.weekendHours)
    );
    // this.postReservationData();
    this.getReservationDt(this.date);
  },
  created() {
    const {
      name,
      branchId,
      address,
      weekdayHours,
      weekendHours,
      mapImage,
      location,
      storeScale,
      managerid,
    } = this.$route.params;
    console.log(
      name,
      branchId,
      address,
      weekdayHours,
      weekendHours,
      mapImage,
      location,
      storeScale,
      managerid
    );
  },
  watch: {
    // date가 변경될 때마다 generateTimes 호출
    date(newDate) {
      console.log("[Watch] 날짜 변경됨:", newDate);
      if (this.roomId) {
        this.getReservationDt(newDate);
      }
    },
    roomId(newRoomId) {
      console.log("[Watch] 선택된 roomId:", newRoomId);
      if (newRoomId) {
        this.getReservationDt(this.date);
      }
    },
  },
  methods: {
    async getReservationDt(date) {
      try {
        // managerId 가져오기
        const managerId = this.getData.managerid;
        console.log("[Step 1] managerId 가져오기:", managerId);

        if (!managerId) {
          console.error("[Error] managerId가 없습니다.");
          return;
        }

        console.log(
          `[Step 2] API 요청 URL: reservations/date/${date}/manager?managerId=${managerId}`
        );
        const response = await taskStore.getSelectTasks(
          `reservations/date/${date}/manager?managerId=${managerId}`
        );

        console.log("[Step 3] API 응답 데이터:", response);

        if (Array.isArray(response) && response.length > 0) {
          this.reservedTimes = [];
          console.log("[Step 4] 예약된 시간 목록 초기화:", this.reservedTimes);

          response.forEach((room, roomIndex) => {
            console.log(
              `[Step 5] Room ${roomIndex + 1} - room_id: ${room.room_id
              }, 선택된 roomId: ${this.roomId}`
            );

            // 선택된 roomId와 room.room_id가 일치하는 경우만 처리
            if (room.room_id === parseInt(this.roomId)) {
              console.log(
                `[Step 6] 선택된 roomId와 일치하는 Room 찾음: room_id ${room.room_id}`
              );

              room.reservations.forEach((reservation, reservationIndex) => {
                console.log(
                  `[Step 7] Reservation ${reservationIndex + 1} - ID: ${reservation.id
                  }, Start: ${reservation.startTime}, End: ${reservation.endTime
                  }`
                );

                if (reservation.status === "cancel") {
                  console.log("[Step 8] Reservation이 취소됨, 건너뜀");
                  return;
                }
                const startTime = new Date(reservation.startTime);
                const endTime = new Date(reservation.endTime);

                console.log("[Step 8] 변환된 시작 시간:", startTime);
                console.log("[Step 9] 변환된 종료 시간:", endTime);

                let currentTime = new Date(startTime);
                while (currentTime < endTime) {
                  const timeString = currentTime.toISOString().slice(11, 16);
                  console.log(`[Step 10] 생성된 예약 시간: ${timeString}`);

                  if (!this.reservedTimes.includes(timeString)) {
                    this.reservedTimes.push(timeString);
                    console.log("[Step 11] 예약된 시간 추가:", timeString);
                  }

                  currentTime.setMinutes(currentTime.getMinutes() + 30);
                  console.log("[Step 12] 30분 추가된 현재 시간:", currentTime);
                }
              });
            }
          });

          console.log("[Step 13] 최종 예약된 시간 목록:", this.reservedTimes);
        } else {
          console.warn("[Warning] 예약된 시간이 없습니다.");
          this.reservedTimes = [];
        }
      } catch (error) {
        console.error("[Error] 예약 시간 가져오기 오류:", error);
        alert("예약된 시간을 가져오는 중 오류가 발생했습니다.");
      }
    },

    generateTimes(weekdayHours, weekendHours) {
      console.log("this.date : : : ", this.date);
      const times = [];

      // 현재 날짜가 평일인지 주말인지 확인
      const today = new Date(this.date);
      // const today = this.date;
      console.log("this.today : : : ", today);

      const isWeekend = today.getDay() === 0 || today.getDay() === 6;

      // 사용 시간 설정 (평일 또는 주말)
      const hoursRange = isWeekend ? weekendHours : weekdayHours;
      const [start, end] = hoursRange.split(" ~ ");

      // 시작 시간과 종료 시간 설정
      let [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);

      // 30분 단위로 시간 추가
      while (
        startHour < endHour ||
        (startHour === endHour && startMinute <= endMinute)
      ) {
        const hourStr = String(startHour).padStart(2, "0");
        const minuteStr = String(startMinute).padStart(2, "0");
        times.push(`${hourStr}:${minuteStr}`);

        // 30분 더하기
        startMinute += 30;
        if (startMinute === 60) {
          startMinute = 0;
          startHour += 1;
        }
      }

      return times;
    },

    async postReservationData() {
      // 24.11.21 수정 - 추가
      if (!this.isChecked) {
        alert("예약을 진행하시려면 약관에 동의하셔야 합니다.");
        return; // 함수 실행을 중지시킴
      }
      const startTime = `${this.date}T${this.selectedTime}:00.000Z`;
      const endTime = `${this.date}T${this.selectedEndTime}:00.000Z`;
      const params = {
        roomId: parseInt(this.roomId),
        managerid: this.getData.managerid,
        startTime,
        endTime,
        member: this.count,
        reser_user: this.name,
        reser_phone: this.phone,
        agree: this.isChecked,
        // "roomId": 3,
        // "managerid" : 87,
        // "startTime": "2024-12-28T00:00:00.000Z",
        // "endTime": "2024-12-28T23:59:59.999Z",
        // "roomtype": "string",
        // "reser_user": "strin",
        // "reser_phone": "string",
        // "member": "string",
        // "agree": true,
        // "userId" :14
      };
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      const userId = loginInfo?.id ?? 1;
      console.log("룸 파라미터" + JSON.stringify(params));
      try {
        const response = await taskStore.postTask(
          `reservations/${userId}`,
          params
        );
        if (!response || response === undefined) {
          // 24.11.21 수정
          alert("모든 값을 입력하셔야 예약이 가능합니다.");
        } else {
          this.sendMsg();
          // console.log(this.sendMsg())
          // if(this.sendMsg() === true){
          //   alert("예약이 되었습니다.");
          //   this.$router.push({ path: "/reservation-progress" });
          // }else{
          //     alert("예약에 실패했습니다.");
          // }

        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        alert("예약에 실패했습니다. 서버 오류를 확인하세요.");
      }
    },
    // 비즈뿌리오 예약 완료 전송
    async sendMsg() {
      const params =
      {
        "phoneNumber": this.phone,
        "userName": this.name,
        "availableTime": this.selectedTime + " ~ " + this.selectedEndTime,
        "storeName": this.getData.name
      };
      try {
        const response = await taskStore.postTask(
          `v1/sms/sendReservation`, params
        );
        if (!response.data || response.data === undefined) {
          alert("예약이 되었습니다.");
          console.log("API Response:", response.data);
          this.$router.push({ path: "/reservation-progress" });
        } else {
          alert("예약에 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        // alert("예약에 실패했습니다. 서버 오류를 확인하세요.");
      }
    },
    completeReservation() {
      this.postReservationData();
    },
    goToPage(route) {
      this.$router.push(route);
    },
    increaseCount() {
      this.count++;
    },
    decreaseCount() {
      if (this.count > 1) {
        this.count--;
      }
    },
    selectTime(time) {
      // Room이 선택되지 않았을 경우 경고 메시지 표시
      if (!this.roomId) {
        alert("먼저 룸을 선택해주세요.");
        return;
      }

      // 예약된 시간에 포함되지 않고, 룸이 선택된 경우에만 시간 선택 가능
      if (!this.reservedTimes.includes(time)) {
        this.selectedTime = time;
        this.selectedEndTime = null; // 시작 시간을 변경하면 종료 시간 초기화
      }
    },
    selectEndTime(time) {
      // Room이 선택되지 않았을 경우 경고 메시지 표시
      if (!this.roomId) {
        alert("먼저 룸을 선택해주세요.");
        return;
      }

      // 종료시간 조건을 만족하면 선택
      if (this.isValidEndTime(time)) {
        this.selectedEndTime = time;
      }
    },
    isValidEndTime(time) {
      // 시작시간이 선택되지 않았으면 모든 종료시간 활성화
      if (!this.selectedTime) {
        return true;
      }

      const startIndex = this.times.indexOf(this.selectedTime);
      const endIndex = this.times.indexOf(time);

      // 종료 시간이 시작 시간 이후여야 함
      if (endIndex <= startIndex) {
        return false;
      }

      // 예약된 시간 중 마지막 시간 이후부터 종료시간 활성화
      const lastReservedIndex = this.reservedTimes
        .map((reserved) => this.times.indexOf(reserved))
        .reduce((max, index) => Math.max(max, index), -1);

      // 시작시간 이전의 예약된 시간 확인
      const firstReservedIndex = this.reservedTimes
        .map((reserved) => this.times.indexOf(reserved))
        .reduce((min, index) => Math.min(min, index), Infinity);

      // 시작시간이 예약된 시간 이전인 경우: 예약된 첫 번째 시간까지만 종료시간 활성화
      if (startIndex < firstReservedIndex && endIndex >= firstReservedIndex) {
        return false;
      }

      // 시작시간이 예약된 시간 이후인 경우: 예약된 마지막 시간 이후부터 활성화
      if (startIndex >= lastReservedIndex && endIndex <= lastReservedIndex) {
        return false;
      }

      return true;
    },
    isRestrictedStartTime() {
      const restrictedTimes = this.reservedTimes.map((time) => {
        const index = this.times.indexOf(time);
        return this.times[index - 1]; // -30분 이전 시간
      });

      return restrictedTimes.includes(this.selectedTime);
    },

    isFutureTime(time) {
      // 오늘 날짜인 경우 현재 시간 이전의 시간은 비활성화
      if (this.date === this.today) {
        const [hour, minute] = time.split(":").map(Number);
        const currentMinute = new Date().getMinutes();

        if (
          hour < this.currentHour ||
          (hour === this.currentHour && minute < currentMinute)
        ) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped src="@/style/shop/reservationwrite.css" />
