<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">이용약관</h2>
          </div>
          <div class="date-picker-box">
            <div class="search_shop">
              <!-- 24.12.10 수정 - 폰트 추가 -->
              <div class="shop_title pretendard-regular-normal-log-cabin-18px">약관 검색</div>
              <div class="select_box_1">
                <select v-model="selectedType" class="text-2536 pretendard-regular-normal-mine-shaft-18px">
                  <!-- 24.12.10 수정 - 폰트 추가 -->
                  <option class="pretendard-regular-normal-mine-shaft-18px" value="all" selected>전체</option>
                  <option class="pretendard-regular-normal-mine-shaft-18px" value="이용약관">이용약관</option>
                  <option class="pretendard-regular-normal-mine-shaft-18px" value="개인정보">개인정보처리방침</option>
                  <option class="pretendard-regular-normal-mine-shaft-18px" value="위치정보">위치정보이용약관</option>
                </select>
              </div>
            </div>
          </div>
          <div class="contact_list">
            <div class="contact_top">
              <div class="contact_title pretendard-bold-24px">
                이용약관 리스트
              </div>
              <div class="buttons">
                <!-- 24.12.10 수정 - 폰트 수정 -->
                <button class="delete-button pretendard-semi-bold-white-16px" @click="deleteSelectedTerms">
                  선택삭제
                </button>
                <!-- 24.12.10 수정 - 폰트 수정 -->
                <button class="submit pretendard-semi-bold-white-16px" @click="addTerms">
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
                    <th>번호</th>
                    <th>제목</th>
                    <th>상태</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contact, index) in paginatedItems" :key="index"
                    class="pretendard-semibold-mountain-mist-16px">
                    <td>
                      <input type="checkbox" v-model="selectedTerms" :value="contact.id" />
                    </td>
                    <td @click="toGoTermsDetail(contact)">
                      {{ contact.number }}
                    </td>
                    <td @click="toGoTermsDetail(contact)">
                      {{ contact.title }}
                    </td>
                    <td @click="toGoTermsDetail(contact)">
                      {{ contact.type }}
                    </td>
                    <td @click="toGoTermsDetail(contact)">
                      {{ contact.created_at.split("T")[0] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                :class="{ disabled: currentPage === 1 }" />
              <!-- 24.12.10 수정 - 폰트 추가 -->
              <div class="page-numbers pretendard-medium-log-cabin-16px">
                <!-- 24.12.10 수정 - totalPages - visiblePages 로 변경 -->
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
  name: "AdminTermsList",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      selectedType: "all", // 선택된 약관 유형 ('all'은 전체 보기)
      searchQuery: "", // 검색어
      terms: [], // 전체 약관 데이터
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      currentPage: 1,
      itemsPerPage: 5,
      selectedTerms: [],
    };
  },
  computed: {
    // 24.12.10 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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

    filteredTerms() {
      // 선택된 type 및 검색어에 따라 필터링
      let filtered = this.terms;

      if (this.selectedType !== "all") {
        filtered = filtered.filter((term) => term.type === this.selectedType);
      }

      if (this.searchQuery) {
        filtered = filtered.filter((term) =>
          term.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    },
    paginatedItems() {
      // 필터링된 데이터에서 현재 페이지에 해당하는 항목만 추출
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTerms.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      // 총 페이지 수 계산
      return Math.ceil(this.filteredTerms.length / this.itemsPerPage);
    },
    isAllSelected() {
      return (
        this.paginatedItems.length > 0 &&
        this.paginatedItems.every((term) =>
          this.selectedTerms.includes(term.id)
        )
      );
    },
  },
  mounted() {
    this.getTerms();
  },
  // 24.12.10 수정 - 추가
  watch: {
    filteredTerms() {
      this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  methods: {
    addTerms() {
      this.$router.push({ path: "/adminterms-write" });
    },
    async getTerms() {
      const termsList = await adminStore.getTask(`terms`);
      console.log("Fetched terms list:", termsList);

      // const totalItems = termsList.length;
      // 24.12.11 수정 - created_at 기준으로 역순 정렬
      const sortedList = termsList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const totalItems = sortedList.length;

      // 번호를 역순으로 매핑
      this.terms = termsList.map((item, index) => ({
        ...item,
        number: totalItems - index, // 번호를 역순으로
      }));
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
    toGoTermsDetail(item) {
      console.log("클릭된 약관 항목", item);
      if (item.id) {
        this.$router.push({
          path: "/adminterms-detail",
          query: { id: item.id, type: item.type },
        });
      } else {
        console.error("항목에 ID가 없습니다:", item);
      }
    },
    toggleAll() {
      if (this.isAllSelected) {
        this.selectedTerms = this.selectedTerms.filter(
          (termId) => !this.paginatedItems.some((term) => term.id === termId)
        );
      } else {
        const newSelection = this.paginatedItems
          .filter((term) => !this.selectedTerms.includes(term.id))
          .map((term) => term.id);
        this.selectedTerms = this.selectedTerms.concat(newSelection);
      }
    },
    async deleteSelectedTerms() {
      if (this.selectedTerms.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      if (confirm("선택된 항목을 삭제하시겠습니까?")) {
        try {
          await Promise.all(
            this.selectedTerms.map((id) =>
              adminStore.deleteTask(`terms/${id}`)
            )
          );
          this.terms = this.terms.filter(
            (term) => !this.selectedTerms.includes(term.id)
          );
          this.selectedTerms = [];
          this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;
          alert("선택된 약관이 삭제되었습니다.");
        } catch (error) {
          console.error("삭제 중 오류 발생:", error);
          alert("삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
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
  width: 250px;
  border: 1px solid #ddd;
}

.select_box_1 select {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.buttons {
  display: flex;
  gap: 10px;
}

.select_box_2 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  width: 1092px;
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

.submit {
  background-color: #184199;
}
</style>
