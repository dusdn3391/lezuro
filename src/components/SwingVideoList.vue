<template>
  <div class="container-center-horizontal">
    <!-- 24.11.13 수정 - 전체적인 틀 수정 -->
    <div class="swingvideos-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">스윙영상</div>
      <div class="select-btn">
        <!-- 24.11.11 수정 - select-box 추가 -->
        <div class="select-box">
          <!-- 24.12.19 수정 - 폰트 추가 -->
          <select class="pretendard-regular-normal-mine-shaft-18px" v-model="selectedOption1">
            <option value="최근" selected>최신 순</option>
            <!-- <option value="최근">최신순</option> -->
            <option value="베스트">베스트 순</option>
            <option value="내 영상">내가 등록한 영상</option>
          </select>
        </div>
        <button class="registerswing pretendard-medium-white-18px" @click="goToBoardWrite()">
          등록하기
        </button>
      </div>
      <!-- 각 Frame7657 데이터를 직접 렌더링, 8개만 표시 -->
      <div class="swing-content">
        <div class="row" v-for="(rowItems, rowIndex) in rows" :key="rowIndex">
          <div class="column" v-for="(item, index) in rowItems" :key="index">
            <div class="group-762-7" :data="item">
              <img class="group-762-7" :src="item.thumbnail" alt="Polygon 1" />
              <img class="vector-img" src="./../../img/Polygon 1.png" alt="Vector"
                @click="openYouTubeModal(item.videoUrl, item)" />
              <img class="corner-vector" src="./../../img/Vector.png" alt="Corner Vector" @click="openDeleteModal(item)"
                v-if="item.canDelete" />

              <img class="corner-edit" src="../../img/editbutton.png" alt="Corner Edit"
                @click="toGoEditSwingVideo(item.user.id, item)" v-if="item.canEdit" />
            </div>
            <div class="group-761">
              <!-- <div class="flex-col-40"> -->
              <div class="frame-7656">
                <!-- 데이터 바인딩 -->
                <div class="text-259 valign-text-middle pretendard-bold-log-cabin-20px">
                  {{ item.title }}
                </div>
                <div class="x1960m-1 valign-text-middle pretendard-regular-normal-log-cabin-18px">
                  {{ item.description }}
                </div>
              </div>
              <!-- 24.11.21 수정 - 정렬 추가 -->
              <!-- 24.12.19 수정 - 모바일 정렬하기 위해 data-label 추가  -->
              <div class="date-btn-align">
                <!-- 24.12.19 수정 - 추가 : 작성자 추가 -->
                <div class="date-28 valign-text-middle pretendard-regular-normal-mountain-mist-14px" data-label="작성자">
                  {{
                    item.user.name }}</div>
                <div class="date-28 valign-text-middle pretendard-regular-normal-mountain-mist-14px" data-label="작성일">{{
                  item.createdAt.split("T")[0] }}</div>
                <!-- 24.11.21 수정 - 추가 -->
                <div class="date-28 valign-text-middle pretendard-regular-normal-mountain-mist-14px" data-label="조회수">
                  조회수 : {{
                    item.viewCount }}</div>
              </div>
              <!-- </div> -->
            </div>
          </div>
          <!-- </div> -->
        </div>


        <!-- 페이징 버튼과 페이지 번호 -->
        <div class="pagination-controls">
          <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
            :class="{ disabled: currentPage === 1 }" />
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
      </div>

      <x-footer />
      <SwingVideoDeleteModal v-if="isDeleteModalVisible" @close="closeDeleteModal" @confirm="deleteSwingVideo" />
      <YouTubeModal v-if="isYouTubeModalVisible" :viedoLink=currentViedo @close="closeYouTubeModal" />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import SwingVideoDeleteModal from "./SwingVideoDeleteModal";
import YouTubeModal from "./YouTubeModal";
import { taskStore } from '@/store/taskStore';

export default {
  name: "MySwingVideoList",
  components: {
    Header,
    RjZsWi,
    YouTubeModal,
    SwingVideoDeleteModal,
    XFooter,
  },
  props: ["materialSymbolsClose", "rJZsWIProps"],
  data() {
    return {
      currentViedo: "",
      selectedOption1: "최근",
      currentPage: 1,
      isModalVisible: false,
      isDeleteModalVisible: false,
      isYouTubeModalVisible: false,
      videoToDelete: null, // 삭제할 비디오 정보 저장
      itemsPerPage: 8, // 한 페이지당 보여줄 데이터 수
      swingVideos: [
        {
          id: 1,
          title: "코스 1",
          description: "티샷: 196.0m",
          createdAt: "2024.09.01",
        },

      ],
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      screenWidth: window.innerWidth,
    };
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
      return Math.ceil(this.swingVideos.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.swingVideos.slice(start, end); // 현재 페이지에 해당하는 데이터만 보여줌
    },
    rows() {
      const result = [];
      const itemsPerRow = this.screenWidth <= 720 ? 2 : 4; // 720px 이하일 때 2개씩, 이상일 때 4개씩 표시
      for (let i = 0; i < this.paginatedData.length; i += itemsPerRow) {
        result.push(this.paginatedData.slice(i, i + itemsPerRow));
      }
      return result;
    },
  },
  watch: {
    selectedOption1(newValue) {
      this.handleSelectChange(newValue); // 값 변경 시 호출할 메서드
    },
  },
  methods: {
    async generateThumbnail(videoUrl) {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous"; // CORS 이슈 해결
      video.style.display = "none";
      document.body.appendChild(video);

      try {
        // 비디오 로드 완료 기다리기
        await new Promise((resolve, reject) => {
          video.addEventListener("loadeddata", resolve);
          video.addEventListener("error", reject);
        });

        // 2초로 이동
        video.currentTime = 2;

        await new Promise((resolve, reject) => {
          video.addEventListener("seeked", resolve, { once: true });
          video.addEventListener("error", reject);
        });

        // 캔버스에 비디오 프레임 그리기
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 썸네일 이미지 URL 생성
        const thumbnailUrl = canvas.toDataURL("image/png");

        return thumbnailUrl;
      } catch (error) {
        console.error("썸네일 생성 중 오류:", error);
        return null; // 오류 발생 시 null 반환
      } finally {
        // 비디오 엘리먼트 정리
        document.body.removeChild(video);
      }
    },
    handleSelectChange(value) {
      this.getSwingDt(value);

    },
    async getSwingDt(value) {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      console.log("로그인 사용자 정보:", loginInfo);

      try {
        const response = await taskStore.getSelectTasks(`swing-videos`);
        console.log("서버 응답 데이터:", JSON.stringify(response, null, 2));

        if (response) {
          // 비디오 데이터를 썸네일 추가와 함께 처리
          this.swingVideos = await Promise.all(
            response.map(async (video) => {
              video.canEdit = video.user?.id === loginInfo?.id;
              video.canDelete = video.user?.id === loginInfo?.id;

              // 2초 시점 썸네일 생성
              video.thumbnail = await this.generateThumbnail(video.videoUrl); // 썸네일 생성
              return video;
            })
          );

          // if (value === "베스트") {
          //   this.swingVideos = this.swingVideos.filter((video) => video.viewCount >= 10);
          // } else if (value === "내 영상") {
          //   this.swingVideos = this.swingVideos.filter((video) => video.canEdit);
          // }

          // 24.11.21 수정
          // 정렬 조건
          if (value === "베스트") {
            this.swingVideos = this.swingVideos.sort((a, b) => b.viewCount - a.viewCount); // 조회수 순으로 내림차순 정렬
          } else if (value === "최신") {
            this.swingVideos = this.swingVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 날짜 순으로 내림차순 정렬
          } else if (value === "내 영상") {
            this.swingVideos = this.swingVideos.filter((video) => video.canEdit); // 로그인한 사용자만 볼 수 있는 영상
          }
        } else {
          console.log("응답 데이터가 없습니다.");
        }
      } catch (err) {
        console.error("getSwingDt 에러 발생:", err);
      }
    },
    // 24.11.21 수정 
    goToBoardWrite() {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      if (loginInfo) {
        this.$router.push({ path: "/swingvideo-write" });
      } else {
        alert("로그인 후 등록이 가능합니다.")
      }

    },
    toGoEditSwingVideo(userId, item) {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      if (parseInt(userId) === parseInt(loginInfo.id)) {
        this.$router.push({
          // path: "/swingvideo-edit",
          name: "SwingVideoEdit", // 네임드 라우트 사용
          params: { itemData: item }, // 객체 전달
        });
      } else {
        alert("해당 영상을 수정할 권한이 없습니다.")
      }

    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    closeModal() {
      this.isModalVisible = false; // 모달을 닫을 때 호출
    },
    openDeleteModal(item) {
      this.videoToDelete = item; // 삭제할 비디오 설정
      console.log("this.videoToDelete: : : : ", this.videoToDelete)
      this.isDeleteModalVisible = true; // 모달 열기
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false; // 모달 닫기
      this.videoToDelete = null; // 선택된 비디오 초기화
    },
    async deleteSwingVideo() {
      console.log("영상 삭제")
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      if (parseInt(this.videoToDelete.user.id) === parseInt(loginInfo.id)) {
        // 삭제할 비디오를 배열에서 제거
        // this.swingVideos = this.swingVideos.filter(
        //   (video) => video.id !== this.videoToDelete.id
        // );
        // this.videoToDelete.id
        try {
          // const response = await taskStore.getSelectTasks(`swing-videos/${loginInfo.id}`);
          const response = await taskStore.deleteTask(`swing-videos/${this.videoToDelete.id}`);
          console.log("response data: ", response);
          if (!response || response === undefined) {
            console.log("응답 데이터가 없습니다.");
          } else {
            this.closeDeleteModal(); // 모달 닫기
            this.getSwingDt();
          }
        } catch (err) {

          console.log("ERROR", err)
        }

      } else {
        alert("해당 영상을 삭제 할 수  없습니다.")
        this.closeDeleteModal(); // 모달 닫기
      }
    },
    async editSwing(idx, cnt) {
      console.log("CNT L L L L l  ", cnt)
      const counts = cnt + 1
      try {

        const params = {
          "viewCount": counts,
        }
        const response = await taskStore.putTask(`swing-videos/${idx}`, params);
        console.log("response data: ", response);
        if (!response || response === undefined) {
          console.log("응답 데이터가 없습니다.");
        } else {
          console.log("조회수 + 1");
        }
      } catch (err) {
        console.log("ERROR", err)
      }
    },
    openYouTubeModal(selectViedo, item) {
      this.currentViedo = selectViedo
      console.log("selectViedo : : : : ", JSON.stringify(selectViedo))
      this.editSwing(item.id, item.viewCount)
      this.isYouTubeModalVisible = true;
    },
    closeYouTubeModal() {
      this.isYouTubeModalVisible = false;
    },
    handleResize() {
      this.screenWidth = window.innerWidth; // 화면 크기 갱신
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize); // 화면 크기 변경 이벤트 리스너 추가
    this.handleResize();
    this.getSwingDt();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize); // 컴포넌트 파괴 시 이벤트 리스너 제거
  },
  async generateThumbnail(url) {
    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous"; // S3에 CORS 설정이 필요할 수 있음
    video.style.display = "none";
    document.body.appendChild(video);

    await new Promise((resolve) => {
      video.addEventListener("loadeddata", resolve);
      video.load();
    });

    // 추출할 시점 설정 (예: 1초)
    video.currentTime = 1;

    await new Promise((resolve) => {
      video.addEventListener("seeked", resolve, { once: true });
    });

    // 캔버스에 비디오 프레임 그리기
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 썸네일 이미지 URL 생성
    this.thumbnail = canvas.toDataURL("image/png");

    // 비디오 엘리먼트 정리
    document.body.removeChild(video);
  },
};
</script>

<style scoped src="@/style/community/swingvideolist.css"></style>