<template>
  <div class="container-center-horizontal">
    <div class="courses-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" />
      <div class="title pretendard-bold-log-cabin-38px">코스</div>

      <div class="course-content">
        <!-- 24.11.22 수정 - 추가 -->
        <div class="game_tab">
          <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
            :class="['tab', { active: selectedTab === tab }]" class="pretendard-medium-granite-gray-18px">
            {{ tab }}
          </div>
        </div>
        <!-- 24.11.22 수정 - 추가 -->
        <div class="courses-list-paging-align">
          <div class="courses-list">
            <div v-for="course in paginatedCourses" :key="course.id" class="course-card"
              @click="openCourseDetail(course.id)">
              <div class="course-img" :style="{ 'background-image': 'url(' + course.image + ')' }"></div>
              <div class="course-card-foot">
                <div class="course-info">
                  <div class="course-name valign-text-middle pretendard-bold-log-cabin-24px">
                    {{ course.courseName }}
                  </div>
                  <div class="course-info-detail">
                    <div class="course-info-first pretendard-regular-normal-granite-gray-16px">
                      <div class="course-info-detail-align">
                        <div class="course-info-detail-font">{{ course.holes.length }}홀</div>
                        <span>l</span>
                        <!-- 24.11.14 수정 - course-info-detail-font-align 추가 -->
                        <div class="course-info-detail-font course-info-detail-font-align">{{ course.rules }}</div>
                        <span class="course-info-detail-slash">l</span>
                      </div>
                      <div class="course-info-detail-font">{{ course.region }}</div>
                    </div>
                    <div class="course-info-end pretendard-regular-normal-granite-gray-16px">
                      <div class="course-info-font">코스난이도</div>
                      <div class="course-rating-stars">
                        <span v-for="star in 5" :key="star" :class="getStarClass(course.difficulty, star)">★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="pagination-controls">
            <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
              :class="{ disabled: currentPage === 1 }" />
            <div class="page-numbers pretendard-medium-log-cabin-16px">
              <!-- 24.12.18 수정 - totalPages - visiblePages 변경 -->
              <div v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
                @click="goToPage(page)">
                {{ page }}
              </div>
            </div>
            <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
              :class="{ disabled: currentPage === totalPages }" />
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
import { taskStore } from "@/store/taskStore";

export default {
  name: "CourseList",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      tabs: ["최신 순", "난이도 순"], // 24.11.22 수정 - 추가 : 탭 이름 정의
      selectedTab: "최신 순", // 24.11.22 수정 - 추가 : 기본 선택된 탭
      currentPage: 1,
      itemsPerPage: 6, // 페이지당 6개의 코스
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      courses: [],
      filteredCourses: [], // 24.11.20 수정 - 추가:필터링된 코스를 저장하는 배열
    }
  },
  computed: {
    // 24.12.18 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
    // 24.11.20 수정
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    },
    // 24.11.20 수정
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredCourses.slice(start, start + this.itemsPerPage);
    },
  },
  mounted() {
    this.getCourseDt();
  },
  methods: {
    async getCourseDt() {
      try {
        const response = await taskStore.getSelectTasks("course-management");
        this.courses = response.map(course => ({
          ...course,
          id: course.id,
          image: course.mainImage || null, // 이미지가 없을 경우 null 처리
          // holeNumber: course.averageScores.length,
        }));
        // 24.11.22  수정
        this.sortCourses(); // 초기 정렬

      } catch (error) {
        console.error("코스 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    // 24.11.22 수정 - 추가
    // 탭 선택 시 호출
    selectTab(tab) {
      this.selectedTab = tab;
      this.sortCourses(); // 선택된 탭에 따라 정렬
    },

    // 24.11.20 수정 - 추가
    // 정렬 함수
    sortCourses() {
      let filteredCourses = [...this.courses]; // 원본 배열 복사
      // 24.11.22 수정 - 탭으로 변경
      if (this.selectedTab === "최신 순") {
        // 최신순 정렬 (가장 최근에 등록된 코스부터)
        filteredCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // createdAt이 있다면, 날짜로 정렬
        // 24.11.22 수정 - 탭으로 변경 
      } else if (this.selectedTab === "난이도 순") {
        // 난이도순 정렬 (Hard, Medium, Easy) - 24.12.04 수정 : 난이도 5단계로 증가
        const difficultyOrder = { "Very_Hard": 5, "Hard": 4, "Medium": 3, "Easy": 2, "Very_Easy": 1 };
        filteredCourses.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
      }

      this.filteredCourses = filteredCourses; // 필터링 결과를 별도 데이터로 저장
    },

    // 24.11.15 수정 - 상세페이지로 이동
    openCourseDetail(courseId) {
      console.log("넘어온 courseId:", courseId);

      this.$router.push({

        path: '/course-detail',
        query: { id: courseId }
      });
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
    getStarClass(difficulty, star) {
      const starRatings = { Very_Hard: 5, Hard: 4, Medium: 3, Easy: 2, Very_Easy: 1 };
      return star <= starRatings[difficulty] ? "course-red-star" : "course-gray-star";
    },
  },
};
</script>

<style scoped src="@/style/course/courselist.css" />
