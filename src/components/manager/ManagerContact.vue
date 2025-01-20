<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">고객센터</h2>
          </div>
            <div class="preparing">
    <div class="frame-7811-2">
      <img
        class="epwarning-3"
        src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/ep-warning-3.svg"
        alt="ep:warning"
      />
      <div class="frame-7810-7">
        <h1 class="text-2719 valign-text-middle pretendard-bold-white-48px">
          <span
            ><span class="pretendard-bold-granite-gray-48px">콘텐츠 </span
            ><span class="pretendard-bold-torea-bay-48px">준비중</span>
          </span>
        </h1>
        <p class="text-2720 valign-text-middle pretendard-regular-normal-mountain-mist-30px">
          현재 페이지는 콘텐츠 준비중입니다.<br />빠른시일내 업데이트 하도록 하겠습니다.
        </p>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";

export default {
  name: "ManagerContact",
  components: {
    ManagerHeader,
    ManagerNavbar,
  },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.reservation-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  flex-direction: row;
}
/* 24.12.23 수정 */
.wrapper {
    width: 100%;
    padding: 30px;
    /* gap: 20px; */
    height: 100vh;
}
/* 타이틀 박스 */
.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}
.preparing{
  align-items: center;
  display: flex;
  background-color:#fff;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
  padding:212px;
}

.frame-7811-2,
.frame-7811-3,
.frame-7811-4 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 100px;
  position: relative;
  width: 100%;
}

.epwarning-3,
.epwarning-4,
.epwarning-5 {
  height: 207px;
  position: relative;
  width: 207px;
}

.frame-7810-7,
.frame-7810-8,
.frame-7810-9 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 40px;
  position: relative;
  width: 100%;
}

.text-2719,
.text-2800,
.text-2814 {
  letter-spacing: 0;
  line-height: 60px;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.text-2720,
.text-2801,
.text-2815 {
  letter-spacing: -0.12px;
  line-height: normal;
  position: relative;
  text-align: center;
  width: fit-content;
}

</style>
