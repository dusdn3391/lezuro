<template>
  <div class="container-center-horizontal">
    <div class="terms-2 screen">
      <Header />
      <!-- <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" /> -->
      <div class="terms_wrap">
        <div class="terms_title pretendard-bold-log-cabin-38px">
          약관
        </div>
        <div class="terms_view">
          <div class="tab-container">
            <!-- 24.12.20 수정 - 폰트 변경 -->
            <div v-for="tab in tabs" :key="tab" :class="[
              'tab-btn pretendard-medium-granite-gray-18px',
              { active: selectedTab === tab },
            ]" @click="selectTab(tab)">
              {{ tab }}
            </div>
          </div>

          <!-- 약관 데이터 렌더링 -->
          <div v-if="termsContent && termsContent.length > 0" class="terms">
            <div v-for="(term, index) in termsContent" :key="index" class="termsview">
              <div class="pretendard-light-granite-gray-18px">
                <p class="lorem-ipsum-dolor-si-11 valign-text-middle">
                  <!-- 24.12.20 수정 - 폰트 추가 -->
                  <span class="pretendard-bold-black-18px">{{ term.title }}</span><br />
                  {{ term.content }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="no-terms">
            <p class="pretendard-regular-normal-mine-shaft-16px">약관 데이터가 없습니다.</p>
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
  name: "TermsView",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps", "xFooterProps"],
  data() {
    return {
      tabs: ["이용약관", "개인정보처리방침", "위치정보이용약관"],
      selectedTab: "이용약관", // 기본값: 첫 번째 탭
      termsContent: [], // 로드된 약관 데이터 저장
    };
  },
  mounted() {
    const tabFromQuery = this.$route.query.tab;
    if (this.tabs.includes(tabFromQuery)) {
      this.selectedTab = tabFromQuery;
    }
    this.loadTermsData(); // 초기 데이터 로드
    this.updateTitle();
    window.addEventListener("resize", this.updateTitle);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateTitle);
  },
  methods: {
    async loadTermsData() {
      try {
        const response = await taskStore.getSelectTasks("terms");
        console.log("받은 데이터:", response);

        // `selectedTab`에 따른 약관 타입 정의
        const typeMapping = {
          이용약관: "이용약관",
          개인정보처리방침: "개인정보",
          위치정보이용약관: "위치정보",
        };
        const selectedType = typeMapping[this.selectedTab];

        // 24.12.05 수정 - 추가 : `selectedTab`에 해당하는 데이터만 필터링
        const filteredData = response.filter((item) => item.type === selectedType);

        //  24.12.05 수정 - 추가 : `content`의 <br> 태그를 줄바꿈으로 대체
        const processedData = filteredData.map((item) => ({
          ...item,
          content: item.content.replace(/<br\s*\/?>/g, "\n"), // <br> -> \n
        }));

        // 24.12.05 수정 - 추가 : title의 숫자를 기준으로 정렬
        const sortedData = processedData.sort((a, b) => {
          const numA = parseInt(a.title.match(/\d+/)?.[0] || 0, 10);
          const numB = parseInt(b.title.match(/\d+/)?.[0] || 0, 10);
          return numA - numB;
        });

        // `selectedTab`에 해당하는 데이터만 필터링
        // this.termsContent = response.filter((item) => item.type === selectedType);
        // 24.12.05 수정 - 추가 : title asc 정렬
        this.termsContent = sortedData; // 정렬된 데이터 저장
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    },
    selectTab(tabName) {
      this.selectedTab = tabName; // 탭 선택 업데이트
      this.$router.push({ query: { tab: tabName } }); // URL 쿼리 업데이트
      this.loadTermsData(); // 데이터 다시 로드
      this.updateTitle();
    },
    updateTitle() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 720) {
        this.title = this.selectedTab;
      } else {
        this.title = "약관";
      }
    },
  },
};
</script>

<style scoped src="@/style/cs/termsview.css"></style>