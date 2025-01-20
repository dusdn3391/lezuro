<template>
  <div class="container-center-horizontal">
    <div class="reservation2-2 screen">
      <Header />
      <RjZsWi :frame72911Props="rJZsWIProps.frame72911Props" />
      <div class="title pretendard-bold-log-cabin-38px">예약하기</div>
      <div class="reservation-content">
        <div class="reservation-content-wrap">
          <img class="reservation-check-image"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/objects-3.svg"
            alt="Objects" />
          <div class="resevation-progress-info">
            <div class="resevation-progress-info-first pretendard-bold-mine-shaft-48px">
              <div class="first-head ">예약 접수중!</div>
              <div class="first-foot">잠시만 기다려주세요.</div>
            </div>
            <div class="resevation-progress-info-end pretendard-regular-normal-log-cabin-28px">
              <div class="end-head">매장 확인까지 다소 시간이 소요되며</div>
              <div class="end-middle">예약 결과는 예약 내역에서 확인하시기 바랍니다.</div>
              <div class="end-foot">즐거운 라운딩 되세요!</div>
            </div>
          </div>
        </div>
        <button class="check-reservation-btn pretendard-medium-white-18px" @click="checkReservation">예약내역 확인하기</button>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
export default {
  name: "ReservationProgress",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  methods: {
    checkReservation() {
      this.$router.push({ path: "/myprofile", query: { tab: "예약내역" } });
    }
  }
};
</script>

<style scoped src="@/style/shop/reservationprogress.css" />