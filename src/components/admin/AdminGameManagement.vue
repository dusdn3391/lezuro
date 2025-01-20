<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">게임 관리</h2>
          </div>

          <!-- Select box 부분 -->
          <!-- <div class="select-box">
            <div class="select-box-align">
              <select class="pretendard-regular-normal-mine-shaft-18px">
                <option value="" disabled selected>전체등급</option>
                <option value="tournament1">등급 1</option>
                <option value="tournament2">등급 2</option>
                <option value="tournament3">등급 3</option>
              </select>
            </div>
            <div class="select-box-align">
              <select class="pretendard-regular-normal-mine-shaft-18px">
                <option value="" disabled selected>전체성별</option>
                <option value="tournament1">남자</option>
                <option value="tournament2">여자</option>
              </select>
            </div>
            <div class="select-box-align">
              <select class="pretendard-regular-normal-mine-shaft-18px">
                <option value="" disabled selected>전체나이</option>
                <option value="tournament1">나이1</option>
                <option value="tournament2">나이2</option>
              </select>
            </div>
          </div> -->

          <div class="list-box">
            <div class="course_title pretendard-bold-log-cabin-24px">코스별 기록</div>
            <div class="course-list">
              <div class="table-container">
                <table>
                  <thead>
                    <tr class="pretendard-bold-mine-shaft-18px ">
                      <th>번호</th>
                      <th>코스명</th>
                      <th>난이도</th>
                      <th>최고</th>
                      <th>평균</th>
                      <th>스코어카드</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(game, index) in paginatedItems" :key="index" class="pretendard-light-granite-gray-16px">
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ index + 1 }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ game.courseName }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">
                        <div class="game-difficulty">
                          <div class="text-1609">코스난이도</div>
                          <!-- 별점 표시 -->
                          <div class="rating-stars">
                            <span v-for="star in 5" :key="star"
                              :class="star <= parseInt(game.difficulty, 10) ? 'red-star' : 'gray-star'">★</span>
                          </div>
                        </div>
                      </td>
                      <td>{{ game.bestScore }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ game.averageScore }}</td>
                      <td><button class="game-list-btn" @click="AdminScoreCardModal(game.id)">상세보기</button></td>
                    </tr>
                  </tbody>
                </table>
                <div class="pagination-controls">
                  <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                    :class="{ disabled: currentPage === 1 }" />
                  <div class="page-numbers pretendard-medium-log-cabin-16px">
                    <!-- 24.12.04 수정 - 추가 -->
                    <div v-for="page in visiblePages" :key="page"
                      :class="['page-number', { active: page === currentPage }]" @click="goToPage(page)">
                      {{ page }}
                    </div>
                  </div>
                  <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
                    :class="{ disabled: currentPage === totalPages }" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminScorecardModal v-if="isModalVisible" @close="closeModal" :course_detail="course_detail" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import AdminScorecardModal from "./AdminScorecardModal.vue";
import { adminStore } from '@/store/adminStore';  // API 호출


export default {
  name: "AdminGameManagement",
  components: {
    AdminHeader,
    AdminNavbar,
    AdminScorecardModal
  },
  data() {
    return {
      isModalVisible: false,
      courses: [],
      course_re: [],
      course_detail: [],
      selectedDifficulty: "", // Stores selected difficulty value
      arrowLeftImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      arrowRightImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    // 24.12.04 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
    totalPages() {
      return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredCourses.slice(start, start + this.itemsPerPage);
    },
    filteredCourses() {
      if (this.selectedDifficulty) {
        return this.course_re.filter(course => course.difficulty === parseInt(this.selectedDifficulty, 10));
      }
      return this.course_re;
    }
  },
  mounted() {
    this.getScore();
  },
  methods: {
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
    async AdminScoreCardModal(idx) {
      // this.course_detail = await taskStore.getSelectTasks(`course/${idx}/score`);
      this.course_detail = await adminStore.getTask(`course/${idx}/score`);
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async getScore() {
      // this.courses = await taskStore.getSelectTasks(`course`);
      this.courses = await adminStore.getTask(`course`);
      this.course_re = this.sortedCourses();
    },
    sortedCourses() {
      return this.courses
        .map(course => ({
          ...course,
          difficulty: course.difficulty === "Hard" ? 5 : course.difficulty === "Medium" ? 3 : 1,
          bestScore: Number(course.bestScore)
        }))
        .sort((a, b) => b.bestScore - a.bestScore);
    },
    filterByDifficulty() {
      this.currentPage = 1; // Reset to the first page when the filter changes
    }
  }
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

.wrapper {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}

/* 타이틀 박스 */
.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}



.select-box {
  align-items: center;
  display: flex;
  gap: 10px;
  padding: 30px;
  position: relative;
  width: 100%;
  height: 120px;
  background-color: #fff;
  margin-bottom: 20px;
}

.select-box-align {
  border: 1px solid #ddd;
  width: 250px;
  padding: 0px 20px;

}

select {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  outline: none;
  position: relative;
  width: 100%;
  border: none;

}

.course_title {
  margin-bottom: 20px;
}

.list-box {
  background-color: #fff;
  padding: 30px;
}

.list-box h4 {
  margin-bottom: 10px;
}

.table-container {
  background-color: #fff;
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 26px 0px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f5f5f5;
}

.rating-stars {
  display: flex;
  gap: 3px;
}

.red-star {
  color: #d30f1a;
}

.gray-star {
  color: #ddd;
}

.game-difficulty {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.game-list-btn {
  background-color: #fff;
  color: #184199;
  padding: 4px 12px;
  border: 1px solid #184199;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  height: 32px
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* 24.11.11 수정 - 추가 */
.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}


/* 24.11.18 수정 - 추가 */
.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #eeeeee;
  cursor: pointer;
}

/* 24.11.18 수정 - 추가 */
.page-number.active {
  background-color: #d30f1a;
  color: white;
}

/* 24.11.18 수정 - 추가 */
.page-number:hover {
  background-color: #eeeeee;
}

.pagination-arrow {
  cursor: pointer;
}

.pagination-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-arrow.flipped {
  transform: rotate(180deg);
}
</style>
