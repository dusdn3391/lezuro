<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">유저 관리</h2>
          </div>
          <!-- Select box 부분 -->
          <div class="search_box">
            <div class="select_box_1">
              <!-- 필터 타입 선택 -->
              <select v-model="selectedFilter" class="text-2536 pretendard-regular-normal-mine-shaft-18px">
                <option value="phone" selected>회원아이디</option>
                <option value="name">이름</option>
              </select>
            </div>
            <div class="select_box_2">
              <!-- 검색어 입력 필드 -->
              <input type="text" v-model="searchQuery" class="text-2537 pretendard-regular-normal-mountain-mist-18px"
                placeholder="검색어를 입력하세요" />
              <img class="search-btn-10"
                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                alt="searchBtn" @click="applySearch" />
            </div>
          </div>

          <div class="list-box">
            <div class="top_title">
              <div class="course_title pretendard-bold-log-cabin-24px">
                전체 회원 <span class="sum">{{ filteredUsers.length }}</span>
              </div>
              <div class="d_button pretendard-semi-bold-white-16px" @click="openDeleteModal">선택 삭제</div>
            </div>
            <div class="course-list">
              <div class="table-container">
                <table>
                  <thead>
                    <tr class="pretendard-bold-mine-shaft-18px">
                      <th><input type="checkbox" @click="toggleAll" v-model="isAllSelected" /></th>
                      <th>번호</th>
                      <th>아이디</th>
                      <th>이름</th>
                      <th>성별</th>
                      <!-- <th>이용매장</th> -->
                      <th>이용 게임 수</th>
                      <th>이용 시간</th>
                      <th>회원정보</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in paginatedItems" :key="user.id"
                      class="pretendard-light-granite-gray-16px">
                      <td><input type="checkbox" v-model="selectedUsers" :value="user" /></td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ user.id }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ user.phone }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ user.name }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ user.gender }}</td>
                      <!-- <td class="pretendard-regular-normal-granite-gray-18px">{{ user.branch }}</td> -->
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ user.gameCount }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ user.usageTime }}</td>
                      <td>
                        <button class="game-list-btn" @click="openModal(user)">상세보기</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="pagination-controls">
                  <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                    :class="{ disabled: currentPage === 1 }" />
                  <div class="page-numbers pretendard-medium-log-cabin-16px">
                    <!-- 24.12.03 수정 - 추가 -->
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
      <AdminUserDeletationModal v-if="isDeleteModalVisible" @confirm="deleteSelectedUsers" @cancel="closeDeleteModal" />
      <AdminUserInfoModal v-if="isModalVisible" :user="selectedUser" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import AdminUserInfoModal from "./AdminUserInfoModal.vue";
import AdminUserDeletationModal from "./AdminUserDeletationModal.vue";
import { adminStore } from '@/store/adminStore';  // API 호출

export default {
  name: "AdminUserManagement",
  components: {
    AdminHeader,
    AdminNavbar,
    AdminUserInfoModal,
    AdminUserDeletationModal
  },
  data() {
    return {
      isModalVisible: false,
      isDeleteModalVisible: false,
      selectedUser: null,
      selectedUsers: [],
      searchQuery: "", // 검색어
      selectedFilter: "phone", // 필터 타입 (회원아이디 or 이름)
      users: [], // 유저 데이터
      arrowLeftImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      arrowRightImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    // 24.12.03 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredUsers.slice(start, start + this.itemsPerPage);
    },
    usersum() {
      return this.filteredUsers.length; // 총 회원 수 계산
    },
    isAllSelected() {
      return this.paginatedItems.length > 0 && this.paginatedItems.every(user => this.selectedUsers.includes(user));
    },
    filteredUsers() {
      if (this.selectedFilter === "name" && this.searchQuery) {
        return this.users.filter(user => user.name.includes(this.searchQuery));
      } else if (this.selectedFilter === "phone" && this.searchQuery) {
        return this.users.filter(user => user.phone.includes(this.searchQuery));
      }
      return this.users; // 회원아이디 선택 시 전체 데이터 반환
    }
  },
  mounted() {
    this.getUserDt();
  },
  methods: {
    async getUserDt() {
      // this.users = await taskStore.getSelectTasks(`v1/auth/list`);
      this.users = await adminStore.getTask(`v1/auth/list`);
      console.log("User data: ", this.users);
    },
    applySearch() {
      this.currentPage = 1; // 검색 시 페이지를 첫 페이지로 설정
    },
    openModal(user) {
      this.selectedUser = user;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedUser = null;
    },
    openDeleteModal() {
      if (this.selectedUsers.length === 0) {
        alert("삭제할 사용자를 선택하세요.");
        return;
      }
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },
    // deleteSelectedUsers() {
    //   this.users = this.users.filter(user => !this.selectedUsers.includes(user));
    //   this.selectedUsers = [];
    //   this.closeDeleteModal();
    // },
    // 24.11.18 수정 - 삭제기능
    async deleteSelectedUsers() {
      if (this.selectedUsers.length === 0) {
        return;
      }

      try {
        for (var a = 0; a < this.selectedUsers.length; a++) {
          console.log('this.selectedUsers.length :::', this.selectedUsers.length)
          const res = await adminStore.deleteTask(`v1/users/${parseInt(this.selectedUsers[a].id)}`);
          console.log('this.selectedUsers[0].id :::', this.selectedUsers[0].id)
          console.log("RESPONSE:", res);
        }

        // 선택된 사용자 삭제
        this.users = this.users.filter(user => !this.selectedUsers.includes(user));
        this.selectedUsers = [];
        this.closeDeleteModal();

        // 페이지 조정
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }

      } catch (error) {
        console.error("삭제 중 오류:", error);
        alert("삭제 중 문제가 발생했습니다.");
      }
    },
    toggleAll() {
      if (this.isAllSelected) {
        this.selectedUsers = this.selectedUsers.filter(user => !this.paginatedItems.includes(user));
      } else {
        const newSelection = this.paginatedItems.filter(user => !this.selectedUsers.includes(user));
        this.selectedUsers = this.selectedUsers.concat(newSelection);
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
      // 24.12.03 수정 - 추가
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
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

.list-box {
  background-color: #fff;
  padding: 30px;
}

.top_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}

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

.select_box_1 select,
.select_box_2 input {
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
  /* width: 1170px; */
  /* 24.11.18 수정 */
  width: 100%;
  border: 1px solid #ddd;
}

.sum {
  color: #D30F1A;
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

.game-list-btn {
  background-color: #fff;
  color: #184199;
  padding: 4px 12px;
  border: 1px solid #184199;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  height: 32px;
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

.d_button {
  background-color: #ccc;
  padding: 17px;
  width: 150px;
  text-align: center;
  /* 24.11.18 수정 - 추가 */
  cursor: pointer;
}
</style>
