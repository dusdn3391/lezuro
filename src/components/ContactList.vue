<template>
  <div class="container-center-horizontal">
    <div class="courses-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" />
      <div class="title pretendard-bold-log-cabin-38px">코스</div>
      <div class="select-box">
        <div class="select-align">
          <div class="select-style">
            <!-- 지역을 선택할 수 있는 select box -->
            <select class="select-text pretendard-regular-normal-mine-shaft-18px">
              <option class="pretendard-regular-normal-mine-shaft-18px" value="" disabled selected>최신 순</option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="">난이도 순</option>
              <!-- <option class="pretendard-regular-normal-mine-shaft-18px" value="">옵션 2</option> -->
              <!-- <option class="pretendard-regular-normal-mine-shaft-18px" value="">옵션 3</option> -->
            </select>
          </div>
          <div class="select-style">
            <!-- 세부지역을 선택할 수 있는 select box -->
            <select class="select-text pretendard-regular-normal-mine-shaft-18px">
              <option class="pretendard-regular-normal-mine-shaft-18px" value="" disabled selected>전체 지역</option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="">서울</option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="">대구</option>
              <option class="pretendard-regular-normal-mine-shaft-18px" value="">부산</option>
            </select>
          </div>
        </div>
        <div class="input-style">
          <!-- 검색어 입력 필드 -->
          <input type="text" class="input-text pretendard-regular-normal-mountain-mist-18px"
            placeholder="코스명을 입력해주세요" />
          <img class="search-btn-10"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
            alt="searchBtn" />
        </div>
      </div>
      <div class="course-content">
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
                      <div class="course-info-detail-font">{{ course.holeNumber }}홀</div>
                      <span>l</span>
                      <div class="course-info-detail-font">{{ course.rules }}</div>
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
            <div v-for="page in totalPages" :key="page" :class="['page-number', { active: page === currentPage }]"
              @click="goToPage(page)">
              {{ page }}
            </div>
          </div>
          <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
            :class="{ disabled: currentPage === totalPages }" />
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
      selectedOption1: "", // 첫 번째 select 박스의 기본값
      selectedOption2: "", // 두 번째 select 박스의 기본값
      currentPage: 1,
      itemsPerPage: 6, // 페이지당 6개의 코스
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      courses: [],
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.courses.length / this.itemsPerPage);
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.courses.slice(start, start + this.itemsPerPage);
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
          holeNumber: course.averageScores.length,
        }));
        // console.log("전체 코스 데이터:", JSON.stringify(this.courses));
      } catch (error) {
        console.error("코스 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    openCourseDetail(courseId) {
      console.log("넘어온 courseId:", courseId);
      this.$router.push({
        path: "/course-detail",
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
      const starRatings = { Hard: 5, Medium: 3, Easy: 1 };
      return star <= starRatings[difficulty] ? "course-red-star" : "course-gray-star";
    },
  },
};
</script>

<style scoped src="@/style/course/courselist.css" />
