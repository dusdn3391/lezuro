<template>
  <div class="container-center-horizontal">
    <div class="systemoverview-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">시스템소개</div>
      <div class="systemoverview-wrap">
        <div class="systemoverview-content">
          <img class="systemoverview-warning-image"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/ep-warning-3.svg"
            alt="ep:warning" />
          <div class="content-preparing-info">
            <div class="content-preparing-info-first">
              <div class="pretendard-bold-granite-gray-48px">콘텐츠 </div>
              <div class="pretendard-bold-torea-bay-48px">준비중</div>
            </div>
            <div class="content-preparing-info-end pretendard-regular-normal-mountain-mist-30px">
              <div>현재 페이지는 콘텐츠 준비중입니다.</div>
              <div>빠른 시일 내 업데이트 하도록 하겠습니다.</div>
            </div>
          </div>
        </div>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import XFooter from "./XFooter";
import RjZsWi from "./RjZsWi";

export default {
  name: "SystemPreparing",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
};
</script>

<style scoped src="@/style/guide/systempreparing.css" />