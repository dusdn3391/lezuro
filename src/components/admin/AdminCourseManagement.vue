<template>
    <div class="all">
        <AdminHeader />
        <div class="wrap">
            <div class="admin-management-container">
                <AdminNavbar />
                <div class="wrapper">
                    <!-- 타이틀 부분 -->
                    <div class="title-box">
                        <h2 class="pretendard-bold-normal-black-28px">코스 관리</h2>
                    </div>

                    <!-- 검색 및 필터링 박스 -->
                    <div class="search_box">
                        <div class="select_box_1">
                            <!-- 코스 선택 select box -->
                            <select class="text-2536 pretendard-regular-normal-mine-shaft-18px">
                                <option value="courseName" selected>코스 이름</option>
                            </select>
                        </div>
                        <div class="select_box_2">
                            <!-- 검색어 입력 필드 -->
                            <input type="text" class="text-2537 pretendard-regular-normal-mountain-mist-18px"
                                placeholder="코스명을 입력하세요" v-model="searchQuery" />
                            <img class="search-btn-10"
                                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                                alt="searchBtn" />
                        </div>
                    </div>

                    <!-- 코스 리스트 -->
                    <div class="frame-7763">
                        <div class="list-box-btn">
                            <div class="pretendard-bold-log-cabin-24px">코스 리스트</div>
                            <div>
                                <button class="add-btn pretendard-semibold-mountain-mist-16px" @click="addCourse">
                                    코스 추가
                                </button>
                            </div>
                        </div>
                        <div class="courses-grid">
                            <!-- 24.12.13 수정 - 추가 : 마우스오버 추가 -->
                            <!-- <div v-for="(course, index) in paginatedCourses" :key="index" @click="selectCourse(index)" -->
                             <div v-for="(course, index) in paginatedCourses" :key="index" 
                                @mouseover="setHoveredCourse(course.id)" @mouseleave="clearHoveredCourse"
                                :class="['frame-769-2-1', course.className || '', { 'hovered-course': hoveredCourse === course.id }]">
                                <!-- <div class="course_img" :style="{ 'background-image': 'url(' + course.group763 + ')' }"> -->
                                <div class="course_img"
                                    :style="{ 'background-image': 'url(' + course.mainImage + ')' }">
                                </div>
                                <div class="frame-7683-3">
                                    <div class="frame-7759">
                                        <h1 class="text-28-3 valign-text-middle pretendard-bold-log-cabin-24px">
                                            {{ course.courseName }}
                                        </h1>
                                        <div class="group-767-1">
                                            <div class="frame-7757-1 pretendard-regular-normal-granite-gray-16px">
                                                <!-- 24.12.12 수정 -->
                                                <div class="text-28-4">{{ course.holes.length }}홀</div>
                                                <!-- 24.12.12 수정 -->
                                                <span>l</span>
                                                <!-- 24.12.12 수정 -->
                                                <div class="text-28-4">{{ course.rules || "규칙 없음" }}</div>
                                                <!-- 24.12.12 수정 -->
                                                <span>l</span>
                                                <div class="text-28-4">{{ course.region }}</div>
                                            </div>
                                            <div class="frame-7758-2">
                                                <div class="pretendard-regular-normal-granite-gray-16px">코스난이도</div>
                                                <!-- 별점 표시 -->
                                                <div class="rating-stars">
                                                    <span v-for="star in 5" :key="star"
                                                        :class="star <= difficultyLevel(course) ? 'red-star' : 'gray-star'">
                                                        ★
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 수정하기 버튼 -->
                                <div v-if="hoveredCourse === course.id" class="edit-overlay">
                                    <!-- Show the '수정하기' button only when the course is selected  기획서에 수정하기 없어서 보류 -->
                                    <!-- <button v-if="selectedCourse === index" class="edit-course-btn"
                                        @click="editCourse(course.id)">
                                        수정하기
                                    </button> -->
                                    <button class="edit-course-btn pretendard-semi-bold-log-cabin-18px"
                                        @click="editCourse(course.id)">
                                        수정하기
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Pagination Controls -->
                        <div class="pagination-controls">
                            <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                                :class="{ disabled: currentPage === 1 }" />
                            <div class="page-numbers pretendard-medium-log-cabin-16px">
                                <!-- 24.12.12 수정 - totalPages - visiblePages 로 변경 -->
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
    </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import { adminStore } from '@/store/adminStore';  // API 호출

export default {
    name: "AdminEquipmentManagement",
    components: {
        AdminHeader,
        AdminNavbar,
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 6, // Display 6 courses per page
            searchQuery: "",
            selectedCourse: null,
            hoveredCourse: null,  // 24.12.13 수정 - 추가 : 마우스오버 추가 
            arrowLeftImage:
                "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // Left arrow image
            arrowRightImage:
                "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // Right arrow image
            courses: [
                {
                    group763:
                        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/image-1-11@2x.png",
                    courseName: "벨라스톤",
                    holeInfo: "18홀",
                    region: "경상도",
                    rules: "해돋이, 해넘이",
                    difficulty: 'Hard', // 난이도 4점
                },
                {
                    group763:
                        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/image-1-11@2x.png",
                    courseName: "파인힐",
                    holeInfo: "9홀",
                    region: "충청도",
                    rules: "숲속 코스",
                    difficulty: 'Hard', // 난이도 2점
                },
                {
                    group763:
                        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/image-1-11@2x.png",
                    courseName: "솔밭힐즈",
                    holeInfo: "18홀",
                    region: "강원도",
                    rules: "해안 코스",
                    difficulty: 'Hard', // 난이도 5점
                },
                {
                    group763:
                        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/image-1-11@2x.png",
                    courseName: "벨라스톤",
                    holeInfo: "18홀",
                    region: "경상도",
                    rules: "해돋이, 해넘이",
                    difficulty: 'Hard', // 난이도 5점
                },
                {
                    group763:
                        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/image-1-11@2x.png",
                    courseName: "파인힐",
                    holeInfo: "9홀",
                    region: "충청도",
                    rules: "숲속 코스",
                    difficulty: 'Hard', // 난이도 5점
                },
                {
                    group763:
                        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/image-1-11@2x.png",
                    courseName: "솔밭힐즈",
                    holeInfo: "18홀",
                    region: "강원도",
                    rules: "해안 코스",
                    difficulty: 'Hard', // 난이도 5점
                },
            ],
        };
    },
    computed: {

        // 24.12.12 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
        // 검색된 항목 반환
        filteredItems() {
            if (!this.searchQuery.trim()) {
                console.log("검색어 없음, 전체 반환:", this.courses);
                return this.courses; // 검색어가 없으면 전체 코스 반환
            }
            const query = this.searchQuery.toLowerCase();
            const result = this.courses.filter(course =>
                course.courseName.toLowerCase().includes(query)
            );
            console.log("검색 결과:", result);
            return result;
        },
        // 현재 페이지에 보여줄 데이터
        paginatedCourses() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            const paginatedResult = this.filteredItems.slice(start, end);
            console.log("페이징 결과:", paginatedResult);
            return paginatedResult;
        },
        // 총 페이지 수
        totalPages() {
            console.log("총 페이지 수 계산:", Math.ceil(this.filteredItems.length / this.itemsPerPage));
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
    },
    mounted() {
        this.getCourseDt(); // API 호출
    },
    // 24.12.12 수정 - 추가
    watch: {
        filteredItems() {
            this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
        },
    },
    methods: {
        difficultyLevel(course) {
            switch (course.difficulty) {
                case 'Hard': return 5;
                case 'Medium': return 3;
                case 'Easy': return 1;
                default: return 0;
            }
        },
        async getCourseDt() {
            try {
                this.courses = await adminStore.getTask("course-management");
                console.log("Courses loaded:", this.courses);
            } catch (error) {
                console.error("Error loading courses:", error);
            }
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
        addCourse() {
            this.$router.push({ path: "/admincourse-managementwrite" });
        },
        selectCourse(index) {
            this.selectedCourse = index;
        },
        editCourse(courseId) {
            this.$router.push({ path: "/admincourse-managementwrite", query: { id: courseId, isEdit: true } });
        },
        // 24.12.13 수정 - 추가
        selectCourse(index) {
            this.selectedCourse = index; // 코스를 선택
        },
        // 24.12.13 수정 - 추가
        setHoveredCourse(courseId) {
            this.hoveredCourse = courseId;; // 호버된 코스 설정
        },
        // 24.12.13 수정 - 추가
        clearHoveredCourse() {
            this.hoveredCourse = null; // 호버 상태 해제
        },
    },
};
</script>


<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.admin-management-container {
    background: #f5f6f6;
    display: flex;
    height: 100%;
    flex-direction: row;
}

.wrapper {
    flex-grow: 1;
    padding: 30px;
    gap: 20px;
}

/* 타이틀 박스 */
.title-box {
    width: 100%;
    background-color: #fff;
    padding: 24px 30px;
    margin-bottom: 20px;
}

.rating-stars {
    display: flex;
    gap: 3px;
}

.red-star {
    color: #d30f1a;
}

.list-box-btn {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.add-btn {
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    white-space: nowrap;
    width: 150px;
    height: 45px;
    border: none;
    background-color: #184199;
    color: #fff;
}

.delete-btn {
    letter-spacing: 0;
    line-height: normal;
    position: relative;
    white-space: nowrap;
    width: 150px;
    height: 45px;
    border: none;
    background-color: #ccc;
    color: #fff;
    margin-right: 10px;
}

.gray-star {
    color: #ddd;
}

/* 24.12.04 수정 */
.course_img {
    background-position: 50% 50%;
    background-size: cover;
    height: 250px;
    position: relative;
    border-radius: 20px 20px 0 0;
    /* width: 442px; */
}

.frame-7763 {
    align-items: center;
    background-color: var(--blackwhitewhite);
    border: 1px solid;
    border-color: var(--alto);
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 30px;
    padding: 40px;
    position: relative;
    width: 100%;
}

/* 24.12.04 수정 */
.courses-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 3개의 열 */
    grid-template-rows: repeat(2, auto);
    /* 2개의 행 */
    gap: 40px;
    /* 코스 사이의 간격 */
    width: 100%;
}

.frame-7683-3 {
    align-items: flex-start;
    align-self: stretch;
    background-color: var(--blackwhitewhite);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: var(--alto);
    border-left-style: solid;
    border-left-width: 1px;
    border-radius: 0px 0px 20px 20px;
    border-right-style: solid;
    border-right-width: 1px;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 30px;
    padding: 35px 30px;
    position: relative;
    width: 100%;
}

.frame-7759 {
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 30px;
    position: relative;
    width: 207px;
}

.text-28-3 {
    align-self: stretch;
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
}

.group-767-1 {
    height: 41px;
    position: relative;
    width: 207px;
}

.frame-7757-1 {
    align-items: flex-end;
    display: flex;
    gap: 10px;
    left: 0;
    position: absolute;
    top: 0;
    width: 207px;
}

.text-28-4 {
    letter-spacing: 0;
    line-height: normal;
    margin-top: -1px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
}

/* .rectangle-50926-1 {
    background-color: var(--granite-gray);
    height: 10px;
    position: relative;
    top: -5px;
    width: 1px;
} */

.pagination-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

/* 24.12.04 수정 */
.page-numbers {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

/* 24.12.04 수정 */
.page-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin: 0 15px; */
    cursor: pointer;
    background-color: #eeeeee;
}

/* 24.12.04 수정 - 추가 */
.page-number.active {
    background-color: #d30f1a;
    color: white;
}

/* 24.12.04 수정 - 추가 */
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

.frame-7758-2 {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 4px;
    margin-right: -78px;
    position: absolute;
    top: 30px;
}

/* 정액제 사용 정보 */
.search_box {
    width: 100%;
    background-color: #fff;
    padding: 30px;
    margin-bottom: 20px;
    gap: 10px;
    display: flex;
}

.select_box_1 {
    align-items: center;
    background-color: var(--blackwhitewhite);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0px 20px;
    position: relative;
    width: 250px;
    border: 1px solid #ddd;
}

.select_box_1 select {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}

.select_box_2 {
    align-items: center;
    background-color: var(--blackwhitewhite);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0px 20px;
    position: relative;
    /* width: 1170px; */
    /* width: 1170px; */
    /* 24.11.18 수정 */
    width: 100%;
    border: 1px solid #ddd;
}

.select_box_2 input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
}

/* 24.12.13 수정 - 추가 */
.frame-769-2-1.hovered-course {
    background-color: rgba(0, 0, 0, 0.5);
    position: relative; /* 호버된 특정 요소만 스타일 적용 */
}

/* .selected-course {
    opacity: 0.5;
    position: relative;
} */



/* 24.12.13 수정 */
.edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
}


/* 24.12.13 수정 */
.edit-course-btn {
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    color: #333;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    z-index: 10;
    border-radius: 5px; */
    padding: 19px 64px;
    background-color: #fff;
    border: none;
    cursor: pointer;
    width: 200px;
    transition: background-color 0.3s;
    z-index: 9999;
}
</style>
