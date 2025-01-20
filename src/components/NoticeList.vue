<template>
  <div class="container-center-horizontal">
    <div class="announcements-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">공지사항</div>
      <div class="register_contact">
        <!-- <button class="pretendard-medium-white-18px" @click="registerNotice">등록하기</button> -->
      </div>
      <div class="select-box">
        <div class="select-style">
          <!-- 대회이름을 선택할 수 있는 select box -->
          <select class="select-text pretendard-regular-normal-mine-shaft-18px">
            <!-- 24.11.22 수정 -->
            <option class="pretendard-regular-normal-mine-shaft-18px" value="title" selected>제목</option>
            <!-- <option class="pretendard-regular-normal-mine-shaft-18px" value="tournament1">내용</option> -->
          </select>
        </div>
        <div class="input-style">
          <!-- 검색어 입력 필드 -->
          <input type="text" class="input-text pretendard-regular-normal-mountain-mist-18px" placeholder="검색어를 입력해주세요"
            v-model="searchQuery" />
          <img class="search-btn-10"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
            alt="searchBtn" />
        </div>
      </div>
      <div class="container">
        <table>
          <thead>
            <tr class="pretendard-bold-mine-shaft-18px">
              <!-- 24.12.19 수정 - 셀 간격을 위한 th 클래스명 변경 -->
              <th class="col-number">번호</th>
              <th class="col-title">제목</th>
              <th class="col-date">작성일</th>
              <th class="col-views">조회</th>
            </tr>
          </thead>
          <tbody>
            <!-- 24.12.19 수정 - data-label 추가  -->
            <tr v-for=" (item, index) in paginatedItems" :key="index" @click="openNoticeDetail(item)" :data-id="item.id"
              class="table-tr pretendard-light-granite-gray-18px">
              <!-- <td>{{ item.number }}</td> -->
              <!-- 24.11.22 수정 -->
              <td data-label="번호">{{ items.length - ((currentPage - 1) * itemsPerPage + index) }}</td>
              <td data-label="제목">{{ item.title }}</td>
              <td data-label="작성일">{{ item.date }}</td>
              <td data-label="조회"><img src="../../img/Vector(2).png">{{ item.views }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-controls">
        <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
          :class="{ disabled: currentPage === 1 }" />
        <!-- 24.12.19 수정- 폰트 추가  -->
        <div class="page-numbers pretendard-medium-log-cabin-16px">
          <!-- 24.12.19 수정 - totalPages - visiblePages 변경 -->
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
  name: "NoticeList",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      currentPage: 1,
      searchQuery: "",
      itemsPerPage: 5,
      arrowLeftImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      arrowRightImage: "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      items: [],
    };
  },
  async mounted() {
    await this.getNoticeList();
  },
  // 24.12.19 수정 - 추가
  watch: {
    filteredItems() {
      this.currentPage = 1; // 검색 결과 변경 시 첫 페이지로 이동
    },
  },
  computed: {
    // 24.12.19 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    // 24.11.22 수정
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    // 24.11.22 수정
    filteredItems() {
      if (!this.searchQuery.trim()) {
        console.log("검색어 없음, 전체 반환:", this.items);
        return this.items; // 검색어가 없으면 전체 코스 반환
      }
      const query = this.searchQuery.toLowerCase();
      const result = this.items.filter(item =>
        item.title.toLowerCase().includes(query)
      );
      console.log("검색 결과:", result);
      return result;
    },
  },
  methods: {
    async getNoticeList() {
      try {
        const response = await taskStore.getSelectTasks("customer-notice");
        console.log("API 응답:", response);

        this.items = response.map((item, index) => ({
          id: item.id,
          number: index + 1,
          title: item.title,
          date: item.createdAt.split("T")[0],
          views: item.views,
        }));
      } catch (error) {
        console.error("게시판 데이터를 가져오는 중 오류 발생:", error);
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
      // 24.12.19 수정 - 추가
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    openNoticeDetail(item) {
      console.log("Selected item ID:", item.id);
      this.$router.push({
        path: "/notice-detail",
        query: { id: item.id }
      });
    },
    // registerNotice() {
    //   this.$router.push({ path: "/notice-write" });
    // },
  },
};
</script>

<style scoped src="@/style/cs/noticelist.css"></style>
