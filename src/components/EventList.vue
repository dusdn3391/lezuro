<template>
  <div class="container-center-horizontal">
    <div class="events-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title_center">
        <div class="title pretendard-bold-log-cabin-38px">이벤트</div>
      </div>
      <div class="events_wrap">
        <!-- Tabs section -->
        <div class="events_tab">
          <!-- 24.12.19 수정 - 폰트 변경  -->
          <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
            class="pretendard-medium-granite-gray-18px" :class="['tab', { active: selectedTab === tab }]">
            {{ tab }}
          </div>
        </div>
        <!-- 전체 이벤트 탭 -->
        <!-- <div class="frame-7820" v-if="selectedTab === '전체 이벤트'">
          <div class="frame-7825">
            <div class="frame-7824 grid-container">
              <div v-for="(event, index) in paginatedEvents" :key="index" class="frame-782"
                @click="toGoEventDetail(event.id)">
                <div class="label-box pretendard-medium-white-14px" :style="getLabelStyle(event.type)">
                  {{ event.type === '진행중' ? '진행중' : '종료' }}
                </div>
                <img class="mask-group-2" :src="event.maskGroup" alt="Mask group" />
                <div class="frame-7813-2">
                  <p class="text-283 valign-text-middle pretendard-bold-log-cabin-24px">
                    {{ event.description }}
                  </p>
                  <div class="text-28-2 valign-text-middle pretendard-light-granite-gray-16px">
                    {{ event.period }}
                  </div>
                </div>
              </div>
            </div> -->

        <!-- Pagination controls -->
        <!-- <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" alt="Previous"
                :class="{ disabled: currentPage === 1 }" />
              <div class="page-numbers">
                <div v-for="page in totalPages" :key="page" :class="['page-number', { active: page === currentPage }]"
                  @click="goToPage(page)">
                  {{ page }}
                </div>
              </div>
              <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" alt="Next"
                :class="{ disabled: currentPage === totalPages }" />
            </div>
          </div>
        </div> -->

        <!-- 진행중 이벤트 탭 -->
        <!-- <div class="frame-7820" v-if="selectedTab === '진행중 이벤트'">
          <div class="frame-7825">
            <div class="frame-7824 grid-container">
              <div v-for="(event, index) in paginatedEvents" :key="index" class="frame-782"
                @click="toGoEventDetail(event.id)">
                <div class="label-box pretendard-medium-white-14px" :style="getLabelStyle(event.type)">
                  {{ event.type === '진행중' ? '진행중' : '종료' }}
                </div>
                <img class="mask-group-2" :src="event.maskGroup" alt="Mask group" />
                <div class="frame-7813-2">
                  <p class="text-283 valign-text-middle pretendard-bold-log-cabin-24px">
                    {{ event.description }}
                  </p>
                  <div class="text-28-2 valign-text-middle pretendard-light-granite-gray-16px">
                    {{ event.period }}
                  </div>
                </div>
              </div>
            </div> -->

        <!-- Pagination controls -->
        <!-- <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" alt="Previous"
                :class="{ disabled: currentPage === 1 }" />
              <div class="page-numbers">
                <div v-for="page in totalPages" :key="page" :class="['page-number', { active: page === currentPage }]"
                  @click="goToPage(page)">
                  {{ page }}
                </div>
              </div>
              <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" alt="Next"
                :class="{ disabled: currentPage === totalPages }" />
            </div>
          </div>
        </div> -->

        <!-- 종료 이벤트 탭 -->
        <!-- <div class="frame-7820" v-if="selectedTab === '종료 이벤트'">
          <div class="frame-7825">
            <div class="frame-7824 grid-container">
              <div v-for="(event, index) in paginatedEvents" :key="index" class="frame-782"
                @click="toGoEventDetail(event.id)">
                <div class="label-box  pretendard-medium-white-14px" :style="getLabelStyle(event.type)">
                  {{ event.type === '진행중' ? '진행중' : '종료' }}
                </div>
                <img class="mask-group-2" :src="event.maskGroup" alt="Mask group" />
                <div class="frame-7813-2">
                  <p class="text-283 valign-text-middle pretendard-bold-log-cabin-24px">
                    {{ event.description }}
                  </p>
                  <div class="text-28-2 valign-text-middle pretendard-light-granite-gray-16px">
                    {{ event.period }}
                  </div>
                </div>
              </div>
            </div> -->

        <!-- Pagination controls -->
        <!-- <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" alt="Previous"
                :class="{ disabled: currentPage === 1 }" />
              <div class="page-numbers">
                <div v-for="page in totalPages" :key="page" :class="['page-number', { active: page === currentPage }]"
                  @click="goToPage(page)">
                  {{ page }}
                </div>
              </div>
              <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" alt="Next"
                :class="{ disabled: currentPage === totalPages }" />
            </div>
          </div> -->

        <!-- 24.11.22 수정 - 코드 간결하게 수정 및 type 나오도록 수정 -->
        <div class="frame-7820" v-for="tab in tabs" :key="tab" v-if="selectedTab === tab">
          <div class="frame-7825">
            <div class="frame-7824 grid-container">
              <!--  24.11.22 수정 - 추가  -->
              <div v-for="(event, index) in paginatedEvents" :key="index" class="frame-782"
                @click="toGoEventDetail(event)" :class="{ 'disabled-card': event.type === '종료' }">
                <!-- 24.11.22 수정 -->
                <!-- 24.12.19 수정 - 폰트 수정 -->
                <div class="label-box pretendard-semi-bold-white-14px" :class="{
                  'label-progress': event.type === '진행중',
                  'label-completed': event.type === '종료'
                }">
                  {{ event.type }}
                </div>
                <img class="mask-group-2" :src="event.maskGroup" alt="Mask group" />
                <div class="frame-7813-2">
                  <p class="text-283 valign-text-middle pretendard-bold-log-cabin-24px">
                    {{ event.description }}
                  </p>
                  <div class="text-28-2 valign-text-middle pretendard-light-granite-gray-16px">
                    {{ event.period }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination controls -->
            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" alt="Previous"
                :class="{ disabled: currentPage === 1 }" />
              <div class="page-numbers pretendard-medium-log-cabin-16px">
                <!-- 24.12.19 수정 - totalPages - visiblePages 변경 -->
                <div v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
                  @click="goToPage(page)">
                  {{ page }}
                </div>
              </div>
              <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" alt="Next"
                :class="{ disabled: currentPage === totalPages }" />
            </div>
          </div>
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
import { taskStore } from "@/store/taskStore";

export default {
  name: "EventList",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      tabs: ["전체 이벤트", "진행중 이벤트", "종료 이벤트"],
      selectedTab: "전체 이벤트",
      currentPage: 1,
      itemsPerPage: 6,
      events: [],
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
    };
  },
  created() {
    this.getEvents();
  },
  computed: {
    // filteredEvents() {
    //   if (this.selectedTab === "전체 이벤트") {
    //     return this.events;
    //   } else if (this.selectedTab === "진행중 이벤트") {
    //     return this.events.filter((event) => event.type === "진행중");
    //   } else if (this.selectedTab === "종료 이벤트") {
    //     return this.events.filter((event) => event.type === "종료");
    //   }
    // },
    // totalPages() {
    //   return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    // },
    // paginatedEvents() {
    //   const start = (this.currentPage - 1) * this.itemsPerPage;
    //   return this.filteredEvents.slice(start, start + this.itemsPerPage);
    // },

    // 24.12.19 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
    visiblePages() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      const maxVisiblePages = 5;

      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    // 24.11.22 수정 - 탭 적용
    totalPages() {
      return Math.ceil(this.filteredEvents(this.selectedTab).length / this.itemsPerPage);
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredEvents(this.selectedTab).slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async getEvents() {
      try {
        // 서버에서 이벤트 데이터를 가져옵니다.
        const response = await taskStore.getSelectTasks('events');
        console.log("Fetched events data:", response);

        // 데이터를 가공하여 events 배열에 할당
        this.events = response.map(item => ({
          id: item.id,
          description: item.title, // title을 description으로 사용
          period: `${item.startTime?.split('T')[0]} ~ ${item.endTime?.split('T')[0]}`, // startTime과 endTime에서 날짜만 추출
          maskGroup: item.imageUrl, // imageUrl을 maskGroup에 할당
          // type: item.status, // 진행 상태 ('진행중', '종료' 등)
          // 24.11.22 수정 - 추가
          startDate: new Date(item.startTime),
          endDate: new Date(item.endTime),
        }));

        // 24.11.22 수정 - 추가
        // startDate 역순으로 정렬
        this.events.sort((a, b) => b.startDate - a.startDate);

        console.log("Processed events:", this.events);
      } catch (error) {
        console.error("Failed to fetch events data:", error);
      }
    },
    // 24.11.22 수정 - 추가
    filteredEvents(tab) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간 00:00:00 설정

      return this.events.filter(event => {
        const startDate = new Date(event.startDate).setHours(0, 0, 0, 0);
        const endDate = new Date(event.endDate).setHours(0, 0, 0, 0);
        let type = "game";

        if (startDate <= today && today <= endDate) {
          type = "진행중";
        } else if (endDate < today) {
          type = "종료";
        }

        event.type = type; // 타입 설정

        // 24.11.26 수정 - 추가
        // 오늘 이후의 startDate는 필터링
        if (startDate > today) return false;

        // 필터링
        if (tab === "전체 이벤트") return true;
        if (tab === "진행중 이벤트" && event.type === "진행중") return true;
        if (tab === "종료 이벤트" && event.type === "종료") return true;

        return false;
      });
    },
    selectTab(tab) {
      this.selectedTab = tab;
      this.currentPage = 1; // Reset to the first page when tab is changed
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },

    toGoEventDetail(event) {
      console.log("Navigating to event detail with ID:", event); // 콘솔에 id 출력

      // 24.11.22 추가
      // 종료된 이벤트일 경우 클릭 방지
      if (event.type === "종료") {
        alert("종료된 이벤트입니다.");
        return;
      }

      this.$router.push({
        path: "/event-detail",
        query: { id: event.id, type: event.type }
      });
    }
  },
};
</script>

<style scoped src="@/style/community/eventlist.css"></style>