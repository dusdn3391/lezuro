<template>
  <div class="community-2 screen">
    <Header />
    <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
    <div class="title_center">
      <div class="title pretendard-bold-log-cabin-38px">자유게시판</div>
    </div>
    <div class="frame-7833">
      <div class="board-button">
        <button class="register pretendard-medium-white-18px" @click="goToBoardWrite()">
          등록하기
        </button>
      </div>
      <div class="frame-7831-3">
        <table class="table-style">
          <thead>
            <tr class="th-16 pretendard-bold-mine-shaft-18px">
              <!-- 24.12.19 수정 - 셀 간격을 위한 th 클래스명 변경 -->
              <th class="col-number">번호</th>
              <th class="col-title">제목</th>
              <th class="col-author">작성자</th>
              <th class="col-date">작성일</th>
              <th class="col-views">조회</th>
            </tr>
          </thead>
          <tbody>
            <!-- 24.12.19 수정 - 폰트 수정  -->
               <!-- 24.12.19 수정 - 셀 간격을 위한 td 클래스명 변경, data-label 추가  -->
            <tr v-for="(item, index) in paginatedItems" :key="index" @click="goToBoardDetail(item)" :data-id="item.id"
              class="table-tr pretendard-regular-normal-granite-gray-18px">
              <!-- 24.11.22 수정 - 번호 index로 출력 후 역순으로 정렬  -->
              <td class="col-number" data-label="번호">{{ thItems.length - ((currentPage - 1) * itemsPerPage + index) }}</td>
              <!-- <td class="text-2898 ">{{ item.number }}</td> -->
              <!-- 24.11.20 수정 -->
              <!-- <td class="text-2898 ">{{ item.id }}</td> -->
              <td class="col-title" data-label="제목"> {{ item.title }}</td>
              <td class="col-author" data-label="작성자">
                <div class="text-none ">작성자 |</div>{{ item.author }}
              </td>
              <td class="col-date" data-label="작성일">
                <div class="text-none">작성일 |</div>{{ item.date }}
              </td>
              <td class="col-views" data-label="조회수">
                <div class="text-none">조회수 |</div>{{ item.views }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination-controls">
          <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" alt="Previous"
            :class="{ disabled: currentPage === 1 }" />
          <!-- 24.11.20 수정 -->
          <div class="page-numbers pretendard-medium-log-cabin-16px">
            <!-- 24.12.19 수정 - totalPages - visiblePages 변경 -->
            <div v-for="page in visiblePages" :key="page" :class="['page-number', { active: page === currentPage }]"
              @click="goToPage(page)">
              {{ page }}
            </div>
          </div>
          <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" alt="Next"
            :class="{ disabled: currentPage === totalPages }" />
        </div>
      </div>
    </div>
    <x-footer />
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import { taskStore } from "@/store/taskStore";

export default {
  name: "BoardList",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg",
      thItems: [
      ],
    };
  },
  mounted() {
    this.getBoardList();
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
      return Math.ceil(this.thItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.thItems.slice(start, start + this.itemsPerPage);
    },
  },

  methods: {
    async getBoardList() {
      try {
        const response = await taskStore.getSelectTasks("posts");
        console.log("API 응답:", response);

        this.thItems = response.map((item, index) => ({
          id: item.id,
          number: index + 1,
          title: item.title,
          author: item.author,
          date: item.createdAt.split("T")[0],
          views: item.views,
        }));
      } catch (error) {
        console.error("게시판 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    goToBoardWrite() {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      if (loginInfo) {
        this.$router.push({ path: "/board-write" });
      } else {
        alert("로그인 후 이용이 가능합니다.")
      }

    },
    goToBoardDetail(item) {
      console.log("Selected item ID:", item.id);
      this.$router.push({
        path: "/board-detail",
        query: { id: item.id }
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
  },
};
</script>

<style scoped src="@/style/community/boardlist.css"></style>