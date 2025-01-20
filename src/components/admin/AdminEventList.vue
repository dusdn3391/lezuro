<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">이벤트</h2>
          </div>

          <!-- 날짜 선택 부분 -->
          <!-- <div class="date-picker-box">
            <div class="search_shop">
              <div class="shop_title">매장 검색</div>
              <div class="select_box_1">
                <select
                  class="text-2536 pretendard-regular-normal-mine-shaft-18px"
                >
                  <option value="shop" selected>매장이름</option>
                  <option value="title">제목</option>
                </select>
              </div>
              <div class="select_box_2">
                <input
                  type="text"
                  class="pretendard-regular-normal-mountain-mist-18px"
                  placeholder="검색어를 입력하세요"
                  v-model="searchQuery"
                />
                <img
                  class="search-btn-10"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                  alt="searchBtn"
                />
              </div>
            </div>
          </div> -->
          <div class="contact_list">
            <div class="contact_top">
              <div class="contact_title pretendard-bold-24px">
                이벤트 리스트
              </div>
              <div class="buttons">
                <!-- 24.12.12 수정 - 폰트 수정, 스타일 수정 -->
                <button class="delete-btn pretendard-semi-bold-white-16px" @click="deleteSelected">
                  선택 삭제
                </button>
                <!-- 24.12.12 수정 - 폰트 수정, 스타일 수정 -->
                <button class="add-btn pretendard-semi-bold-white-16px" @click="addEvent">
                  이벤트 추가
                </button>
              </div>

            </div>
            <div class="table-container">
              <table>
                <thead>
                  <!-- 24.12.12 수정 - 폰트 추가-->
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th>
                      <input type="checkbox" @click="toggleAll" v-model="isAllSelected" />
                    </th>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contact, index) in paginatedItems" :key="index"
                    class="pretendard-semibold-mountain-mist-16px">
                    <td>
                      <input type="checkbox" v-model="selectedContact" :value="contact.id" />
                    </td>
                    <td @click="toGoContactDetail(contact)">
                      {{ contact.number }}
                    </td>
                    <td @click="toGoContactDetail(contact)">
                      {{ contact.title }}
                    </td>
                    <td @click="toGoContactDetail(contact)">
                      {{ contact.createdAt.split("T")[0] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                :class="{ disabled: currentPage === 1 }" />
               <!-- 24.12.12 수정 - 폰트 추가 -->
               <div class="page-numbers pretendard-medium-log-cabin-16px">
                <!-- 24.12.12 수정 - 추가 -->
                <div v-for="page in visiblePages"  :key="page" :class="['page-number', { active: page === currentPage }]"
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
  name: "AdminEventList",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      selectedDate: {
        start: "",
        end: "",
      },
      selectedShop: "",
      searchTitle: "",
      contact: [],
      searchQuery: "",
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5, // Display 5 items per page
      selectedContact: [],
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
    filteredItems() {
      let result = this.contact;
      // 매장 검색
      if (this.selectedShop) {
        result = result.filter(
          (contact) => contact.branchName === this.selectedShop
        );
      }

      // 제목 검색
      if (this.searchTitle) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter((contact) =>
          contact.title.toLowerCase().includes(query)
        );
      }

      // 검색어 필터
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (contact) =>
            contact.title.toLowerCase().includes(query) ||
            contact.branchName.toLowerCase().includes(query)
        );
      }
      // 날짜 검색 필터
      if (this.selectedDate.start && this.selectedDate.end) {
        const startDate = new Date(this.selectedDate.start);
        let endDate = new Date(this.selectedDate.end);

        // endDate가 선택된 경우, 시간을 23:59:59로 설정
        endDate.setHours(23, 59, 59, 999);

        result = result.filter(
          (contact) =>
            new Date(contact.createdAt) >= startDate &&
            new Date(contact.createdAt) <= endDate
        );
      } else if (this.selectedDate.start) {
        // startDate만 있을 경우 필터링
        const startDate = new Date(this.selectedDate.start);
        result = result.filter(
          (contact) => new Date(contact.createdAt) >= startDate
        );
      } else if (this.selectedDate.end) {
        // endDate만 있을 경우 필터링, 시간을 23:59:59로 설정
        const endDate = new Date(this.selectedDate.end);
        endDate.setHours(23, 59, 59, 999);
        result = result.filter(
          (contact) => new Date(contact.createdAt) <= endDate
        );
      }

      return result;
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    isAllSelected() {
      return (
        this.paginatedItems.length > 0 &&
        this.paginatedItems.every((contact) =>
          this.selectedContact.includes(contact.id)
        )
      );
    },
  },
  mounted() {
    this.getAsk();
  },
    // 24.12.12 수정 - 추가
    watch: {
    filteredItems() {
      this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  methods: {
    async getAsk() {
      const contactList = await adminStore.getTask(`events`);
      console.log("manager : : : ", contactList);

      const totalItems = contactList.length; // Get the total length of the array

      // Map the contacts with the reverse numbering
      this.contact = contactList.map((item, index) => ({
        ...item,
        number: totalItems - index, // Assign reverse numbers
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
    addEvent() {
      this.$router.push({ path: "/event-write" })
    },
    toGoContactDetail(item) {
      // Step 1: 클릭된 항목의 전체 정보와 ID 출력

      if (item.id) {
        // Step 2: 라우터 이동 전 ID 출력

        // 라우터로 페이지 이동
        this.$router.push({
          path: "/adminevent-detail",
          query: { id: item.id },
        });

        // Step 3: 라우터 이동 후 출력 (라우터의 beforeEach 훅에서 확인 가능)
      } else {
        console.error("Step 1: 항목에 ID가 없습니다:", item);
      }
    },
    toggleAll() {
      if (this.isAllSelected) {
        // Unselect all
        this.selectedContact = this.selectedContact.filter(
          (contactId) =>
            !this.paginatedItems.some((contact) => contact.id === contactId)
        );
      } else {
        // Select all
        const newSelection = this.paginatedItems
          .filter((contact) => !this.selectedContact.includes(contact.id))
          .map((contact) => contact.id);
        this.selectedContact = this.selectedContact.concat(newSelection);
      }
    },
    async deleteSelected() {
      if (this.selectedContact.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      if (confirm("선택된 항목을 정말 삭제하시겠습니까?")) {
        for (var a = 0; a < this.selectedContact.length; a++) {
          const res = await adminStore.deleteTask(
            `events/${this.selectedContact[a]}`
          );
          console.log("manager : : : ", res);
        }
        // console.log("this.selectedContact : : " , this.selectedContact)

        // Delete selected contacts
        this.contact = this.contact.filter(
          (contact) => !this.selectedContact.includes(contact.id)
        );
        this.selectedContact = [];

        // Adjust current page if necessary
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

/* 24.12.12 수정 - 추가 */
.delete-btn,
.add-btn {
  border: none;
  width: 150px;
  height: 45px;
  color: #ffffff;
  background-color: #ccc;
  cursor: pointer;
}

/* 24.12.12 수정 - 추가 */
.add-btn {
  background-color: #184199;
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

.buttons {
  display: flex;
  gap: 20px;
}
</style>
