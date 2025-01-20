<template>
  <div class="container-center-horizontal">
    <!-- 24.11.14 수정 - 전체적인 틀 수정 -->
    <div class="myswingvideos-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">나의 스윙영상</div>
      <!-- <div class="frame-7667-8"> -->
      <!-- <div class="frame-7666"> -->
      <div class="swingvideo">
        <!-- 각 Frame7657 데이터를 직접 렌더링, 8개만 표시 -->
        <div class="row" v-for="(rowItems, rowIndex) in rows" :key="rowIndex">
          <div class="column" v-for="(item, index) in rowItems" :key="index">
            <!-- <div class="frame-76-11"> -->
            <div class="group-762-7" :data="item">
              <img class="group-762-7" :src="item.thumbnail" alt="Thumbnail" />
              <img class="vector-img" src="./../../img/Polygon 1.png" alt="Vector"
                @click="openYouTubeModal(item.videoUrl)" />
              <img class="corner-vector" src="./../../img/Vector.png" alt="Corner Vector"
                @click="openDeleteModal(item)" />
            </div>
            <div class="group-761">
              <!-- <div class="flex-col-40"> -->
              <div class="frame-7656">
                <!-- 데이터 바인딩 -->
                <div class="text-259 valign-text-middle pretendard-bold-log-cabin-20px">{{ item.title }}
                </div>
                <div class="x1960m-1 valign-text-middle pretendard-regular-normal-log-cabin-18px">{{
                  item.description }}</div>
              </div>
              <!-- 24.11.14 수정 - date-btn-align 추가 -->
              <div class="date-btn-align">
                <!-- 24.12.17 수정 - date-align 추가 -->
                <div class="date-align">
                  <div class="date-28 valign-text-middle pretendard-regular-normal-mountain-mist-14px">{{
                    item.createdAt.split("T")[0] }}</div>
                  <!-- 24.11.21 수정 - 추가 -->
                  <div class="date-28 valign-text-middle pretendard-regular-normal-mountain-mist-14px"> 조회수 : {{
                    item.viewCount }}</div>
                </div>
                <img class="frame-7655-2"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/frame-7655-6.svg"
                  alt="Frame 7655" @click="openSwingVideosDownloadModal(item.videoUrl)" />
              </div>
              <!-- </div> -->

            </div>
            <!-- </div> -->
          </div>
        </div>

        <!-- 페이징 버튼과 페이지 번호 -->
        <div class="pagination-controls">
          <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
            :class="{ disabled: currentPage === 1 }" />
          <div class="page-numbers pretendard-medium-log-cabin-16px">
            <!-- 24.12.17 수정 - totalPages - visiblePages 변경 -->
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
      <SwingVideoDownloadModal v-if="isModalVisible" @close="closeModal" @confirm="downloadMovie" />
      <SwingVideoDeleteModal v-if="isDeleteModalVisible" @close="closeDeleteModal" @confirm="deleteSwingVideo" />
      <YouTubeModal v-if="isYouTubeModalVisible" :viedoLink=currentViedo @close="closeYouTubeModal" />
    </div>
  </div>
</template>


<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
// import View from "./View";
// import Frame7657 from "./Frame7657";
import XFooter from "./XFooter";
import SwingVideoDownloadModal from "./SwingVideoDownloadModal";
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
    SwingVideoDownloadModal,
    XFooter,
  },
  props: [
    "rJZsWIProps",
  ],
  data() {
    return {
      currentViedo: "",
      currentPage: 1,
      isModalVisible: false,
      isDeleteModalVisible: false,
      isYouTubeModalVisible: false,
      videoToDelete: null, // 삭제할 비디오 정보 저장
      itemsPerPage: 8, // 한 페이지당 보여줄 데이터 수
      swingVideos: [],
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    // 24.12.17 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
      return this.swingVideos.slice(start, end);
    },
    rows() {
      const result = [];
      const itemsPerRow = this.screenWidth <= 720 ? 2 : 4; // 화면 크기에 따라 2개 또는 4개씩 나누기
      for (let i = 0; i < this.paginatedData.length; i += itemsPerRow) {
        result.push(this.paginatedData.slice(i, i + itemsPerRow));
      }
      return result;
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
    async downloadVideo(videoUrl) {
      // 다운로드할 비디오 URL
      // const videoUrl = "https://lezuro-bk.s3.ap-northeast-2.amazonaws.com/user1.mp4";
      try {
        // Fetch API를 사용해 비디오 파일을 가져오기
        const response = await fetch(videoUrl);

        // 성공적으로 응답을 받은 경우 Blob 생성
        if (!response.ok) throw new Error("Failed to download video");

        const blob = await response.blob();

        // Blob을 가리키는 URL 생성
        const url = window.URL.createObjectURL(blob);

        // 가상의 다운로드 트리거
        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.download = "user1.mp4"; // 파일명 설정
        document.body.appendChild(tempLink);
        tempLink.click();

        // 메모리 정리
        window.URL.revokeObjectURL(url);
        document.body.removeChild(tempLink);
      } catch (error) {
        console.error("Download error:", error);
      }
    },

    async getSwingDt() {
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

      try {
        const response = await taskStore.getSelectTasks(`swing-videos/${loginInfo.id}`);
        console.log("서버 응답 데이터: ", response);

        if (response) {
          // 비디오 데이터를 썸네일 추가와 함께 처리
          this.swingVideos = await Promise.all(
            response.map(async (video) => {
              // 썸네일 생성
              video.thumbnail = await this.generateThumbnail(video.videoUrl);
              return video;
            })
          );

          // 최신순 정렬 (createdAt 기준 내림차순)
          this.swingVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          console.log("최신순 정렬된 데이터: ", this.swingVideos);
        } else {
          console.log("응답 데이터가 없습니다.");
        }
      } catch (err) {
        console.error("getSwingDt 에러 발생: ", err);
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
    openSwingVideosDownloadModal(selectViedo) {
      this.currentViedo = selectViedo
      this.isModalVisible = true;
    },
    downloadMovie() {
      this.downloadVideo(this.currentViedo)
      this.isModalVisible = false;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openDeleteModal(item) {
      this.videoToDelete = item;
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
      this.videoToDelete = null;
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
    openYouTubeModal(selectViedo) {
      this.currentViedo = selectViedo
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
    this.getSwingDt()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize); // 컴포넌트 파괴 시 이벤트 리스너 제거
  },
};
</script>

<style scoped src="@/style/record/myswingvideolist.css"></style>
