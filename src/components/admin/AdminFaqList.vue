<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">FAQ</h2>
          </div>

          <!-- 날짜 선택 부분 -->
          <div class="date-picker-box">
            <div class="search_shop">
              <!-- 24.12.10 수정 - 폰트 수정 -->
              <div class="shop_title pretendard-regular-normal-log-cabin-18px">매장 검색</div>
              <div class="select_box_1">
                <select class="text-2536 pretendard-regular-normal-mine-shaft-18px">
                  <!-- 24.12.10 수정 - 폰트 수정 -->
                  <option value="title" class="pretendard-regular-normal-mine-shaft-18px" selected>제목</option>
                </select>
              </div>
              <div class="select_box_2">
                <!-- 검색어 입력 필드 -->
                <input type="text" class="pretendard-regular-normal-mountain-mist-18px" placeholder="검색어를 입력하세요"
                  v-model="searchQuery" />
                <img class="search-btn-10"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                  alt="searchBtn" />
              </div>
            </div>
          </div>
          <div class="contact_list">
            <div class="contact_top">
              <div class="contact_title pretendard-bold-24px">FAQ 리스트</div>
              <div class="buttons">
                <!-- 24.12.10 수정 - 폰트 수정 -->
                <button class="pretendard-semi-bold-white-16px" @click="deleteSelected">
                  선택 삭제
                </button>
                <!-- 24.12.10 수정 - 폰트 수정 -->
                <button class="pretendard-semi-bold-white-16px" @click="addFaq" style="background-color: #184199">
                  등록하기
                </button>
              </div>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <!-- 24.12.10 수정 - 폰트 추가 -->
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th>
                      <input type="checkbox" @click="toggleAll" v-model="isAllSelected" />
                    </th>
                    <th>그룹</th>
                    <th>질문</th>
                    <th>답변</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="faq in filteredItems" :key="faq.id" class="pretendard-semibold-mountain-mist-16px">
                    <td>
                      <input type="checkbox" v-model="selectedFaq" :value="faq.id" />
                    </td>
                    <td @click="toGoFaqDetail(faq)">{{ faq.group }}</td>
                    <td @click="toGoFaqDetail(faq)">{{ faq.question }}</td>
                    <td @click="toGoFaqDetail(faq)">{{ faq.answer }}</td>
                    <td @click="toGoFaqDetail(faq)">{{ faq.createdAt.split("T")[0] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                :class="{ disabled: currentPage === 1 }" />
              <!-- 24.12.10 수정 - 폰트 수정 -->
              <div class="page-numbers pretendard-medium-log-cabin-16px">
                <!-- 24.12.11 수정 - 추가 -->
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
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import { adminStore } from "@/store/adminStore"; // API 호출

export default {
  name: "AdminFaqList",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      faqlist: [],
      searchQuery: "",
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5, // Display 5 items per page
      selectedFaq: [],
    };
  },
  computed: {
  // 24.12.11 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
    filteredItems() {
      // 검색어를 기준으로 필터링
      const filtered = this.faqlist.filter((faq) =>
        faq.question.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      // 페이지네이션 적용
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      // 필터링된 데이터 기준으로 총 페이지 수 계산
      const filtered = this.faqlist.filter((faq) =>
        faq.question.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      return Math.ceil(filtered.length / this.itemsPerPage);
    },
    isAllSelected() {
      // 필터링된 데이터 기준으로 전체 선택 여부 확인
      return (
        this.filteredItems.length > 0 &&
        this.filteredItems.every((faq) =>
          this.selectedFaq.includes(faq.id)
        )
      );
    },
  },
  mounted() {
    this.getFaq();
  },
    // 24.12.11 수정 - 추가
    watch: {
    searchQuery(newQuery) {
      if (newQuery !== "") {
        this.currentPage = 1;
      }
    }
  },
  methods: {
    async getFaq() {
      try {
        const response = await adminStore.getTask("faqs");
        console.log("FAQ 데이터:", response);

        this.faqlist = response.map((faq) => ({
          id: faq.id,
          group: faq.group,
          question: faq.question,
          answer: faq.answer,
          createdAt: faq.createdAt,
        }));

        // 데이터 정렬 (작성일 기준 내림차순)
        this.faqlist.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } catch (error) {
        console.error("FAQ 데이터를 가져오는 중 오류 발생:", error);
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
      // this.currentPage = page;
      // 24.12.11 수정 - 추가
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    addFaq() {
      this.$router.push({ path: "/adminfaq-management" })
    },
    toGoFaqDetail(faq) {
      if (faq.id) {
        console.log("선택된 FAQ ID:", faq.id);

        // FAQ ID를 쿼리로 전달
        this.$router.push({
          path: "/adminfaq-detail",
          query: { id: faq.id }, // 쿼리 파라미터로 전달
        });

        console.log("FAQ 상세 페이지로 이동 완료");
      } else {
        console.error("FAQ 항목에 ID가 없습니다:", faq);
      }
    },
    toggleAll() {
      if (this.isAllSelected) {
        // Unselect all
        this.selectedFaq = this.selectedFaq.filter(
          (faqId) =>
            !this.paginatedItems.some((faq) => faq.id === faqId)
        );
      } else {
        // Select all
        const newSelection = this.paginatedItems
          .filter((faq) => !this.selectedFaq.includes(faq.id))
          .map((faq) => faq.id);
        this.selectedFaq = this.selectedFaq.concat(newSelection);
      }
    },
    async deleteSelected() {
      if (this.selectedFaq.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      if (confirm("선택된 항목을 정말 삭제하시겠습니까?")) {
        for (var a = 0; a < this.selectedFaq.length; a++) {
          const res = await adminStore.deleteTask(
            `faqs/${this.selectedFaq[a]}`
          );
          console.log("삭제 응답:", res);
        }

        // 삭제된 항목 제외
        this.faqlist = this.faqlist.filter(
          (faq) => !this.selectedFaq.includes(faq.id)
        );
        this.selectedFaq = [];

        // 현재 페이지 조정
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }
      }
    },
  },
};
</script>
<style scoped>
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

.date-picker-box {
  background-color: #fff;
  padding: 30px;
}

.date_wrap {
  display: flex;
  align-items: center;
}

.date input {
  width: 250px;
  height: 60px;
  border: 1px solid #ddd;
  margin: 16px;
  padding: 0 20px;
}

.shop_title,
.date-pickder-title {
  margin-right: 23.5px;
  white-space: nowrap;
}

.contact_top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.buttons {
  display: flex;
  gap: 20px;
}

.contact_list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  background-color: #fff;
  padding: 30px;
  margin-top: 20px;
}

.search_shop {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.search_box {
  width: 100%;
  background-color: #fff;
  gap: 10px;
  align-items: center;
}

.select_box_1 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  /* width: 250px; */
  /* 24.12.10 수정 */
  width: 20%;
  border: 1px solid #ddd;
}

.select_box_1 select {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.select_box_2 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  /* width: 1092px; */
  /* 24.12.10 수정 */
  width: 80%;
  border: 1px solid #ddd;
}

.select_box_2 input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
}

button {
  border: none;
  width: 150px;
  height: 45px;
  line-height: 21.48px;
  color: #ffffff;
  background-color: #ccc;
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

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
}

/* 24.11.11 수정 - 추가 */
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
