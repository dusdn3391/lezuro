<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="contact-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box pretendard-bold-normal-black-28px">1:1 문의</div>

          <!-- 날짜 선택 부분 -->
          <div class="date-picker-box">
            <div class="date_wrap">
              <span class="date-pickder-title">날짜검색</span>
              <!-- 24.12.09 수정 - 추가 -->
              <div v-for="dateTab in dateTabs" :key="dateTab"
                :class="['datetab-btn pretendard-regular-normal-mine-shaft-16px', { active: selectedDateTab === dateTab }]"
                @click="selectDateTab(dateTab)">
                {{ dateTab }}
              </div>
              <!-- 날짜 선택 부분 -->
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="startDate" /> -->
              <!-- 24.12.09 수정 - 추가 : max, change-->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="selectedDate.start"
                @change="validateStartDate" :max="today" />
              ~
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="endDate" /> -->
              <!-- 24.12.09 수정 - 추가 : max, change-->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="selectedDate.end"
                @change="validateEndDate" :max="today" />
            </div>
            <div class="search_shop">
              <span class="shop_title">문의검색</span>
              <div class="select_box_1">
                <!-- 대회이름을 선택할 수 있는 select box -->
                <select class="text-2536 pretendard-regular-normal-mine-shaft-18px">
                  <option value="title">제목</option>
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
              <div class="contact_title pretendard-bold-24px">문의 리스트</div>
              <button class="pretendard-regular-normal-mine-shaft-16px" @click="deleteSelected">
                선택 삭제
              </button>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <!-- 24.12.10 수정 - 폰트 추가 -->
                  <tr class="pretendard-bold-mine-shaft-18px">
                    <th><input type="checkbox" @click="toggleAll" v-model="isAllSelected"></th>
                    <th>번호</th>
                    <th>고객명</th>
                    <th>1:1문의내역</th>
                    <th>접수일시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contact, index) in paginatedItems" :key="index"
                    class="pretendard-semibold-mountain-mist-16px ">
                    <td><input type="checkbox" v-model="selectedContact" :value="contact.id"></td>
                    <!-- 24.12.04 수정 - 추가 -->
                    <td @click="toGoContactDetail(contact)"> {{ contact.id }}</td>
                    <td @click="toGoContactDetail(contact)">
                      {{ contact.user_name }}
                    </td>
                    <td @click="toGoContactDetail(contact)">{{ contact.title }}</td>
                    <td @click="toGoContactDetail(contact)">{{ contact.createdAt.split('T')[0] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                :class="{ disabled: currentPage === 1 }" />
              <!-- 24.12.10 수정 - 폰트 추가 -->
              <div class="page-numbers pretendard-medium-log-cabin-16px">
                <!-- 24.12.09 수정 - 추가 -->
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
import { managerStore } from '../../store/managerStore';  // API 호출
import ManagerHeader from './ManagerHeader.vue';
import ManagerNavbar from "./ManagerNavbar.vue";

export default {
  name: "AdminContactList",
  components: {
    ManagerHeader,
    ManagerNavbar,
  },
  data() {
    return {
      selectedDate: {
        start: '',
        end: '',
      },
      // 24.12.09 수정 - 추가
      selectedDateTab: "전체",
      // 24.12.09 수정 - 추가
      dateTabs: ["전체"],
      selectedShop: "",
      searchTitle: "",
      contact: [
      ],
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
    // 24.12.09 수정 - 추가 : 오늘날짜 계산
    today() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    // 24.12.09 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
    filteredContacts() {
      let result = this.contact;

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
            new Date(contact.createdAt) >= startDate && new Date(contact.createdAt) <= endDate
        );
      } else if (this.selectedDate.start) {
        // startDate만 있을 경우 필터링
        const startDate = new Date(this.selectedDate.start);
        result = result.filter((contact) => new Date(contact.createdAt) >= startDate);
      } else if (this.selectedDate.end) {
        // endDate만 있을 경우 필터링, 시간을 23:59:59로 설정
        const endDate = new Date(this.selectedDate.end);
        endDate.setHours(23, 59, 59, 999);
        result = result.filter((contact) => new Date(contact.createdAt) <= endDate);
      }

      // 24.12.09 수정 - 추가
      // 전체 탭이 선택되었으면 모든 데이터를 반환
      if (this.selectedDateTab === "전체") {
        return result;
      }

      // 24.12.09 수정 - 추가
      // 날짜 검색 필터
      if (this.selectedDate.start || this.selectedDate.end) {
        const startDate = this.selectedDate.start ? new Date(this.selectedDate.start) : null;
        const endDate = this.selectedDate.end ? new Date(this.selectedDate.end) : null;

        result = result.filter((list) => {
          const createdAt = new Date(list.createdAt);
          if (startDate && createdAt < startDate) return false; // 시작 날짜 이전 데이터 제외
          if (endDate && createdAt > endDate) return false; // 종료 날짜 이후 데이터 제외
          return true;
        });
      }

      return result;
    },
    totalPages() {
      return Math.ceil(this.filteredContacts.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredContacts.slice(start, start + this.itemsPerPage);
    },
    isAllSelected() {
      return (
        this.paginatedItems.length > 0 &&
        this.paginatedItems.every(contact => this.selectedContact.includes(contact.id))
      );
    },
  },
  mounted() {
    this.getAsk()
  },
  // 24.12.09 수정 - 추가
  watch: {
    filteredContacts() {
      this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  methods: {
    // 24.12.09 수정 - 추가
    selectDateTab(dateTab) {
      this.selectedDateTab = dateTab;
      if (dateTab === "전체") {
        // 전체를 선택하면 날짜 초기화
        this.selectedDate.start = "";
        this.selectedDate.end = "";
      }
    },
    // 24.12.09 수정 - 추가
    validateStartDate() {
      const today = new Date();
      if (new Date(this.selectedDate.start) > today) {
        alert("오늘 이후의 날짜는 선택할 수 없습니다.");
        this.selectedDate.start = ""; // 초기화
      } else if (this.selectedDate.end && new Date(this.selectedDate.start) > new Date(this.selectedDate.end)) {
        alert("시작 날짜는 종료 날짜보다 늦을 수 없습니다.");
        this.selectedDate.start = ""; // 초기화
      }
      this.selectedDateTab = ""; // 전체 탭 해제
    },
    // 24.12.09 수정 - 추가
    validateEndDate() {
      const today = new Date();
      if (new Date(this.selectedDate.end) > today) {
        alert("오늘 이후의 날짜는 선택할 수 없습니다.");
        this.selectedDate.end = ""; // 초기화
      } else if (this.selectedDate.start && new Date(this.selectedDate.end) < new Date(this.selectedDate.start)) {
        alert("종료 날짜는 시작 날짜보다 이를 수 없습니다.");
        this.selectedDate.end = ""; // 초기화
      }
      this.selectedDateTab = ""; // 전체 탭 해제
    },
    async getAsk() {
      try {
        const response = await managerStore.getTask(`inquiries`);
        console.log("response ask", response);

        // 로컬 스토리지에서 managerInfo 가져오기
        const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));

        // managerInfo가 없는 경우 에러 처리
        if (!managerInfo) {
          console.error("managerInfo 없음");
          return;
        }

        // managerTokenId 추출
        const managerTokenName = managerInfo.identifier;
        console.log('managerTokenName', managerTokenName);


        // managerTokenId와 branchId가 같은 데이터만 필터링
        const filteredBranches = response.filter(item => item.branchName === managerTokenName);

        console.log('Filtered Branches:', filteredBranches);

        // 필터링된 데이터 저장
        this.contact = filteredBranches;


      } catch (error) {
        console.error("Error fetching contactList data:", error);
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
      // 24.12.09 수정 - 추가
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    toGoContactDetail(item) {
      // Step 1: 클릭된 항목의 전체 정보와 ID 출력
      console.log("Step 1: 클릭된 A/S 항목", item);
      console.log("Step 1: 선택된 A/S 항목 ID:", item.id);

      if (item.id) {
        // Step 2: 라우터 이동 전 ID 출력
        console.log("Step 2: 라우터 이동 준비, ID:", item.id);

        // 라우터로 페이지 이동
        this.$router.push({
          path: "/managercontact-detail",
          query: { id: item.id }
        });

        // Step 3: 라우터 이동 후 출력 (라우터의 beforeEach 훅에서 확인 가능)
        console.log("Step 3: 라우터 이동 완료");
      } else {
        console.error("Step 1: 항목에 ID가 없습니다:", item);
      }
    },
    toggleAll() {
      if (this.isAllSelected) {
        // Unselect all
        this.selectedContact = this.selectedContact.filter(
          contactId => !this.paginatedItems.some(contact => contact.id === contactId)
        );
      } else {
        // Select all
        const newSelection = this.paginatedItems
          .filter(contact => !this.selectedContact.includes(contact.id))
          .map(contact => contact.id);
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
          const res = await managerStore.deleteTask(`inquiries/${this.selectedContact[a]}`);
          console.log("manager : : : ", res)
        }
        // console.log("this.selectedContact : : " , this.selectedContact)

        // Delete selected contacts
        this.contact = this.contact.filter(
          contact => !this.selectedContact.includes(contact.id)
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
.contact-container {
  width: 100%;
  background: #f5f6f6;
  display: flex;
}

/* 24.12.23 수정 */
.wrapper {
    width: 100%;
    padding: 30px;
    /* gap: 20px; */
    height: 100vh;
}

/* 타이틀 박스 */
.title-box {
  width: 100%;
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

.date_wrap input {
  width: 17%;
  height: 60px;
  border: 1px solid #ddd;
  margin: 11px;
  padding: 0 20px;
}


/* 24.12.09 수정 - 추가*/
.datetab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 16px 30px;
  border: 1px solid #ddd;
  gap: 10px;
  background-color: #fff;
}

/* 24.12.09 수정 */
.datetab-btn.active,
.tab-btn.active {
  background-color: #184199;
  color: #fff;
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
  width: 17%;
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
  width: 82%;
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

.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

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

.page-number.active {
  background-color: #d30f1a;
  color: white;
}

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
