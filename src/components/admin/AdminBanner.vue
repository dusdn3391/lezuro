<template>
  <div class="wrap">
    <AdminHeader />
    <div class="content_wrap">
      <AdminNavbar />
      <div class="content">
        <div class="title-box">
          <h2 class="pretendard-bold-normal-black-28px">배너관리</h2>
        </div>
        <div class="banner_content">
          <div class="banner-button">
            <button class="delete-button pretendard-regular-normal-white-16px" @click="deleteSelectedBanners">
              선택삭제
            </button>
            <button class="add-button pretendard-regular-normal-white-16px" @click="toGoBanner">
              배너추가
            </button>
          </div>
          <div class="banner">
            <table class="banner-table">
              <thead>
                <tr class="pretendard-regular-normal-log-cabin-18px">
                  <th>
                    <input class="checkbox" type="checkbox" @change="toggleAll" :checked="isAllSelected" />
                  </th>
                  <th class="center pretendard-bold-mine-shaft-20px">번호</th>
                  <th class="center pretendard-bold-mine-shaft-20px">
                    배너 이미지
                  </th>
                  <th class="center pretendard-bold-mine-shaft-20px">
                    작성 일시
                  </th>
                  <th class="center pretendard-bold-mine-shaft-20px">타이틀</th>
                  <th class="center pretendard-bold-mine-shaft-20px">
                    활성여부
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(banner, index) in paginatedItems" :key="banner.id">
                  <td class="center">
                    <input class="checkbox" type="checkbox" v-model="selectedBanner" :value="banner.id" />
                  </td>
                  <td class="center" @click="toGoBannerDetail(banner.id)">
                    <!-- {{ (currentPage - 1) * itemsPerPage + index + 1 }} -->
                      <!-- 24.12.11 수정 -->
                      {{  banner.id }}
                  </td>
                  <td class="banner-img" @click="toGoBannerDetail(banner.id)">
                    <img :src="banner.image" alt="배너 이미지" />
                  </td>
                  <td @click="toGoBannerDetail(banner.id)" class="center pretendard-regular-normal-granite-gray-18px">
                    {{ banner.startDate }}
                  </td>
                  <td @click="toGoBannerDetail(banner.id)" class="center pretendard-regular-normal-granite-gray-18px">
                    {{ banner.title }}
                  </td>
                  <td class="pretendard-regular-normal-granite-gray-18px">
                    <button class="status-button" :class="{
                      visible: banner.status === 'visible',
                      invisible: banner.status === 'invisible',
                    }" @click="toggleBannerStatus(banner)">
                      {{ banner.status === "visible" ? "노출" : "비노출" }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-controls">
              <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" alt="Previous"
                :class="{ disabled: currentPage === 1 }" />
             <!-- 24.12.11 수정 - 폰트 수정 -->
             <div class="page-numbers pretendard-medium-log-cabin-16px">
                  <!-- 24.12.11 수정 - 추가 -->
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
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import AdminNavbar from "./AdminNavbar.vue";
import { adminStore } from "@/store/adminStore";
export default {
  name: "AdminBanner",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      selectedBanner: [],
      isModalVisible: false,
      currentPage: 1,
      subtitle: "", // 추가
      linkurl: "",
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      itemsPerPage: 3,
      banners: [],
      //   arrowLeftImage: require("@/assets/img/Vector.png"),
      //   arrowRightImage: require("@/assets/img/Vector-1.png"),
    };
  },
  computed: {
    isAllSelected() {
      return (
        this.paginatedItems.length > 0 &&
        this.paginatedItems.every((banner) =>
          this.selectedBanner.includes(banner.id)
        )
      );
    },
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
    totalPages() {
      return Math.ceil(this.banners.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.banners.slice(start, start + this.itemsPerPage);
    },
  },
  mounted() {
    this.getBannerDt();
  },
  methods: {
    async getBannerDt() {
      try {
        const response = await adminStore.getTask("v1/report/banner");
        console.log("getBannerDt : 응답:", response);

        // response 데이터를 가공하여 banners 배열 업데이트
        this.banners = response.map((item) => ({
          id: item.id,
          image: item.bannerImg,
          startDate: item.createdAt.split("T")[0], // createdAt 날짜 포맷만 추출
          title: item.title,
          subtitle: item.subtitle, // 추가
          linkurl: item.linkurl,
          status: item.status,
        }));

        console.log("banners 데이터:", this.banners);
      } catch (error) {
        console.error("배너 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    async toggleBannerStatus(banner) {
      try {
        const newStatus = banner.status === "visible" ? "invisible" : "visible";
        const params = { status: newStatus };

        await adminStore.updateTask(`v1/report/${banner.id}`, params);
        banner.status = newStatus; // 로컬 상태 업데이트
        alert(
          `배너 상태가 ${newStatus === "visible" ? "노출" : "비노출"
          }로 변경되었습니다.`
        );
      } catch (error) {
        console.error("배너 상태 업데이트 중 오류 발생:", error);
        alert("배너 상태 변경에 실패했습니다. 다시 시도해주세요.");
      }
    },
    async toGoBannerDetail(bannerId) {
      const selectedBanner = this.banners.find(
        (banner) => banner.id === bannerId
      );

      if (!selectedBanner) {
        console.error("선택된 배너를 찾을 수 없습니다.");
        return;
      }

      // 전달할 데이터를 콘솔에 출력
      console.log("선택된 배너 데이터:", selectedBanner);

      // 라우터로 데이터 전달
      this.$router.push({
        name: "AdminBannerDetail",
        params: {
          id: bannerId,
        },
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    toGoBanner() {
      this.$router.push({ path: "adminbanner-write" });
    },
    toggleAll() {
      if (this.isAllSelected) {
        this.selectedBanner = this.selectedBanner.filter(
          (id) => !this.paginatedItems.some((banner) => banner.id === id)
        );
      } else {
        const newSelection = this.paginatedItems
          .filter((banner) => !this.selectedBanner.includes(banner.id))
          .map((banner) => banner.id);
        this.selectedBanner = this.selectedBanner.concat(newSelection);
      }
    },
    async deleteSelectedBanners() {
      if (this.selectedBanner.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      if (confirm("선택된 배너를 정말 삭제하시겠습니까?")) {
        try {
          for (let i = 0; i < this.selectedBanner.length; i++) {
            const response = await adminStore.deleteTask(
              `v1/report/${this.selectedBanner[i]}`
            );
            console.log("배너 삭제 응답:", response);
          }

          // banners 배열에서 삭제된 항목 제거
          this.banners = this.banners.filter(
            (banner) => !this.selectedBanner.includes(banner.id)
          );

          // 선택된 배너 초기화
          this.selectedBanner = [];

          // 현재 페이지 조정
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages || 1;
          }

          alert("선택된 배너가 삭제되었습니다.");
        } catch (error) {
          console.error("배너 삭제 중 오류 발생:", error);
          alert("배너 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    },
    goToEdit() {
      this.$router.push({ path: "/banner-write" });
    },
  },
};
</script>

<style scoped>
.content_wrap {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  flex-direction: row;
}

.content {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}

.banner-button {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 20px;
}

.banner_content {
  width: 100%;
  background-color: #fff;
  padding: 30px;
}

.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}

/* 24.12.11 수정 - width 추가, 배경색 변경 */
.delete-button {
  width: 150px;
  background-color: #ccc;
  color: white;
  padding: 12px 30px;
  border: none;
  cursor: pointer;
}

/* 24.12.11 수정 - width 추가 */
.add-button {
  width: 150px;
  background-color: #184199;
  color: white;
  padding: 12px 30px;
  border: none;
  cursor: pointer;
}

.banner {
  width: 100%;
}

.banner-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.banner-table th,
.banner-table td {
  padding: 20px 5px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
}

.banner-table th {
  background-color: #f9f9f9;
  font-weight: 500;
}

.banner-img {
  width: 600px;
  height: 200px;
  object-fit: cover;
}

.banner-img img {
  width: 100%;
  height: 100%;
}

.edit-button {
  background-color: #184199;
  color: white;
  padding: 12px 30px;
  border: none;
  cursor: pointer;
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

.status-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.status-button.visible {
  background-color: #184199;
  color: #fff;
}

.status-button.invisible {
  background-color: #eeeeee;
}
</style>
