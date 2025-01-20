<template>
  <div class="container-center-horizontal">
    <div class="eventdetails-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="frame-7837-2">
        <div class="frame-7784-12">
          <div class="title pretendard-bold-log-cabin-38px">이벤트</div>
          <div class="frame-7834">
            <div class="frame-7754-4">
              <p class="text-2786 valign-text-middle pretendard-bold-log-cabin-30px">
                {{ title }}
              </p>
              <div class="text-2787 valign-text-middle pretendard-regular-normal-mountain-mist-20px">
                {{ date }}
              </div>
            </div>
            <div class="frame-7783-12">
              <!-- 24.12.12 수정 - 추가 : 이벤트 내용 추가 -->
              <div class="frame-7755-1 pretendard-light-granite-gray-18px">
                <div> {{ content }}</div>
                <img class="rectangle-509275-1" :src="image" alt="Event Image" />
              </div>
            </div>
          </div>
        </div>
        <div class="event-button">
               <!-- 24.12.19 수정 - 폰트 수정  -->
               <button class="back-button pretendard-medium-white-18px" @click="toGoEventsList">
            목록으로
          </button>
        </div>
      </div>
      <x-footer />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import { taskStore } from "@/store/taskStore"; // API 호출

export default {
  name: "EventDetail",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps", "frame7712Props",],
  data() {
    return {
      title: "", // 이벤트 제목 더미 데이터
      eventId: null,
      date: "", // 이벤트 날짜 더미 데이터
      content: "", // 24.12.12 수정 - 추가
      image: "",
      // "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/rectangle-509275-1.svg", // 이미지 더미 데이터
    };
  },
  created() {
    this.eventId = this.$route.query.id;
    console.log("Received event ID:", this.eventId);
    this.fetchEventDetail();
  },
  methods: {
    toGoEventsList() {
      this.$router.push({ path: "/events-list" });
    },
    async fetchEventDetail() {
      if (this.eventId) {
        try {
          // eventId를 사용하여 서버에서 이벤트 상세 정보를 가져옵니다.
          const response = await taskStore.getSelectTasks(`events/${this.eventId}`);
          console.log("Event detail data:", response);

          // 서버에서 가져온 데이터를 컴포넌트에 반영합니다.
          this.title = response.title;
          this.date = `${response.startTime?.split('T')[0]} ~ ${response.endTime?.split('T')[0]}`;
          this.image = response.imageUrl;
          this.content = response.content; // 24.12.12 수정 - 추가
        } catch (error) {
          console.error("Failed to fetch event detail:", error);
        }
      }
    }
  },
};
</script>

<style scoped src="@/style/community/eventdetail.css"></style>