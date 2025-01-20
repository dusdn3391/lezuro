<template>
  <div class="container-center-horizontal">
    <div class="faq-2-1 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">FAQ</div>
      <div class="frame-7878">
        <div class="select-box">
          <div class="frame-7669-2">
            <!-- 대회이름을 선택할 수 있는 select box -->
            <select class="text-2536 pretendard-regular-normal-mine-shaft-18px">
              <option class="pretendard-regular-normal-mine-shaft-18px" value="title" disabled selected>
                제목
              </option>
            </select>
          </div>
          <div class="frame-7670-2">
            <!-- 검색어 입력 필드 -->
            <!-- 24.11.13 검색 하기 위해  searchQuery 추가-->
            <input type="text" class="text-2537 pretendard-regular-normal-mountain-mist-18px" placeholder="검색어를 입력해주세요"
              v-model="searchQuery" />
            <img class="search-btn-10"
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
              alt="searchBtn" />
          </div>
        </div>
        <div class="category-buttons">
          <div v-for="(category, index) in categories" :key="index"
            :class="['button', { active: selectedCategory === category }]" @click="selectCategory(category)"
            class="pretendard-bold-log-cabin-18px ">
            {{ category }}
          </div>
        </div>
        <!-- 24.11.13 검색 하기 위해  questions을 filteredQuestions 변경-->
        <div v-for="(question, index) in filteredQuestions" :key="index" class="question-wrap">
          <!-- Question Block -->
          <div class="frame-7870-3" @click="toggleAnswer(index)" :class="{ 'active-frame': question.isVisible }">
            <div class="frame-7869-1">
              <div class="price valign-text-middle pretendard-bold-black-24px">Q</div>
              <div class="frame-7868-1">
                <div class="text-2524 valign-text-middle pretendard-bold-black-20px">{{ question.title }}</div>
                <p class="text-2525 valign-text-middle pretendard-regular-normal-log-cabin-18px">{{ question.description
                  }}</p>
              </div>
            </div>
            <!-- 24.12.20 수정 - 화살표 방향 변경  -->
            <img class="vector-3-29" :class="{ 'rotate-180': question.isVisible }"
              src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-3-16.svg"
              alt="Arrow" />
          </div>

          <!-- Conditional Answer Display -->
          <div class="frame-7872-1" v-if="question.isVisible">
            <div class="frame-7869-2">
              <div class="a-11 valign-text-middle pretendard-bold-black-24px">A</div>
              <div class="frame-7868-1">
                <p class="text-2526 valign-text-middle pretendard-regular-normal-granite-gray-16px">{{ question.answer
                  }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 24.12.20 수정 - 추가 -->
      <div class="pagination-controls">
        <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
          :class="{ disabled: currentPage === 1 }" />
        <div class="page-numbers pretendard-medium-log-cabin-16px">
          <div v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
            @click="goToPage(page)">
            {{ page }}
          </div>
        </div>
        <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
          :class="{ disabled: currentPage === totalPages }" />
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
  name: "FaqList",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: [
    "rJZsWIProps",
  ],
  data() {
    return {
      questions: [],
      categories: ["서비스", "예약", "대회", "코스", "매장", "이용요금", "단체이용", "기타"],
      selectedCategory: "서비스",
      searchQuery: "", // 24.11.13 수정 - 검색하기 위해 추가
      currentPage: 1, // 24.12.20 수정 - 추가
      itemsPerPage: 5, // 24.12.20 수정 - 추가
      arrowLeftImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 24.12.20 수정 - 추가
      arrowRightImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 24.12.20 수정 - 추가
    };
  },
  computed: {
    // 24.11.13 수정 - 검색하기 위해 추가
    filteredQuestions() {
      return this.questions.filter((question) => {
        const matchesCategory = question.title === this.selectedCategory;
        const matchesSearch = question.description
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    },
   // 24.12.20 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
    // 24.12.20 수정 - 추가 : 페이징
    totalPages() {
      return Math.ceil(this.filteredQuestions.length / this.itemsPerPage);
    },
    // 24.12.20 수정 - 추가 : 페이징
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredQuestions.slice(start, end);
    },
  },
  // 24.12.20 수정 - 추가
  watch: {
    filteredQuestions() {
      this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  methods: {
    // 24.12.20 수정 - 추가
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // 24.12.20 수정 - 추가
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // 24.12.20 수정 - 추가
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    toggleAnswer(index) {
      const filteredIndex = this.questions.findIndex(
        (question) =>
          question.id === this.filteredQuestions[index].id
      );

      if (filteredIndex !== -1) {
        this.questions[filteredIndex].isVisible =
          !this.questions[filteredIndex].isVisible;
      }
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    async getFaq(){
      try {
        // 서버에서 이벤트 데이터를 가져옵니다.
        const response = await taskStore.getSelectTasks('faqs');
        console.log("Fetched events data:", response);

        // 데이터를 가공하여 courses 배열에 할당
        this.questions = response.map(item => ({
          id: item.id,
          description: item.question, // title을 description으로 사용
          answer: item.answer,
          title: item.group, // imageUrl을 maskGroup에 할당
         // 진행 상태 ('진행중', '종료' 등)
         isVisible:false,
        }));

        console.log("Processed courses:", this.questions);
      } catch (error) {
        console.error("Failed to fetch events data:", error);
      }
    },
  },
  mounted(){
   this.getFaq();
  },
};
</script>

<style scoped src="@/style/cs/faqlist.css"></style>