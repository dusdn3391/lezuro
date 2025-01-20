<template>
  <div class="main-2 screen">
    <Header />
    <div class="slide-container">
      <!-- Image Slider -->
      <div class="slide">
        <div class="slide-wrapper" :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }">
          <div v-for="(image, index) in images" :key="index" class="slide-item"
            @click="goToLink(slideTexts[index].link)">
            <img :src="image" alt="Slide image" />
            <!-- 텍스트가 이미지와 함께 이동하도록 설정 -->
            <div v-if="index === currentImageIndex" class="slide-text-overlay">
              <span class="text-2322 valign-text-middle">{{
                slideTexts[index].title
              }}</span>
              <span class="text-2323 valign-text-middle pretendard-medium-white-20px">{{ slideTexts[index].subtitle
                }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide Overlay Text (like in the image) -->

      <!-- Slide Indicator (1/5) -->
      <div class="slide-indicator">
        {{ currentImageIndex + 1 }}/{{ images.length }}
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="progress" :style="{
          width: `${((currentImageIndex + 1) / images.length) * 100}%`,
        }"></div>
      </div>
      <div class="move">
        <div class="left-arrow" @click="prevImage">&lt;</div>
        <!-- 24.12.05 수정 - 재생 버튼 추가 -->
        <img :src="isPaused ? playBtn : pauseBtn" class="pause-button" @click="togglePause"
          :alt="isPaused ? 'Play' : 'Pause'" />

        <!-- Right Arrow Button -->
        <div class="right-arrow" @click="nextImage">&gt;</div>
      </div>
      <!-- Left Arrow Button -->

    </div>

    <!--공지사항-->
    <div class="frame-7383">
      <div class="frame-7382">
        <div class="frame-7381-1">
          <div class="title-align">
            <div class="notice">
              <img class="vector-191"
                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-117.svg"
                alt="Vector" />
              <div class="text-2281 valign-text-middle pretendard-bold-log-cabin-18px">
                공지사항
              </div>
            </div>

            <!-- <div class="notice-list" v-if="notices.length > 0" @click="toGoNoticeList"> -->
            <!-- 24.12.09 수정 - 상세페이지로 이동 -->
            <div class="notice-list" v-if="notices.length > 0" @click="toGoNotice(notices[0])">
              <p class="text-2282 pretendard-regular-normal-log-cabin-16px">
                {{ notices[0].text }}
              </p>
              <div class="pretendard-regular-normal-mountain-mist-16px">
                {{ notices[0].date }}
              </div>
            </div>
          </div>
          <div class="date-align">
            <div class="frame-7378-container">
              <div class="text-2-19 to-go-notice pretendard-regular-normal-log-cabin-18px" @click="toGoNoticeList">
                <!-- 바로가기 -->
                <!-- 24.11.20 수정 -->
                더보기
              </div>
              <!-- <img class="frame-7378" src="../../img/Vector 2.png" alt="Previous" @click="prevNotice" />
              <img class="frame-7378" src="../../img/Vector 3.png" alt="Next" @click="nextNotice" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="frame-7388">
      <div class="frame-7389">
        <div class="frame-738">
          <div class="event-title-arrows-align">
            <div class="event_title pretendard-bold-log-cabin-38px">
              이벤트
            </div>
            <div class="event-arrows">
              <span class="Events-left-arrow" @click="EventsPrevSlide">
                <img src="../../img/Group 686leftarrow.png" alt="" />
              </span>
              <span class="Events-right-arrow" @click="EventsNextSlide"><img src="../../img/Group 687rightarrow.png"
                  alt="" /></span>
            </div>
          </div>

          <div class="Events-slide-container">
            <div class="Events-slide-wrapper" :style="{
              transform: `translateX(-${EventsCurrentSlide * 100}%)`,
            }">
              <!-- 24.12.05 수정 - :class 추가 종료이벤트 필터링, click 막기 -->
              <div v-for="slide in EventsSlides" :key="slide.id" @click="handleEventClick(slide)"
                class="Events-slide-item">
                <img :src="slide.slide" alt="Event Slide" />
                <span class="pretendard-bold-white-24px">{{ slide.title }}</span>
                <!-- 24.12.05 수정 - 추가 : 종료된 이벤트 메시지 -->
                <!-- <div v-if="slide.isExpired" class="expired-overlay">
                  <span>종료된 이벤트입니다</span>
                </div> -->
              </div>
            </div>
          </div>

          <!-- Dot Navigation -->
          <div class="Events-dot-container">
            <span v-for="(slide, index) in EventsSlides" :key="index" class="Events-dot"
              :class="{ active: index === EventsCurrentSlide }" @click="EventsGoToSlide(index)"></span>
          </div>
        </div>
        <!-- 24.11.22 수정 - 랭킹 삭제 -->
        <!-- 랭킹 -->
        <!-- <div class="ranking">
          <div class="r_title">
            <h3 class="pretendard-bold-log-cabin-24px">
              랭킹({{ currentRanking === "male" ? "남" : "여" }})
            </h3>
            <div class="direct">
              <img src="../../img/Group 686leftarrow.png" @click="prevRanking" class="ranking-btn left"
                alt="Previous" />
              <img src="../../img/Group 687rightarrow.png" @click="nextRanking" class="ranking-btn right" alt="Next" />
            </div>
          </div>
          <table v-if="currentRanking === 'male'">
            <thead>
              <tr>
                <th v-for="(header, index) in tableHeaders" :key="index" class="pretendard-medium-white-18px">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in maleTableData" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                  <div v-if="cellIndex === 1" class="cell-with-image"> -->
        <!-- 이미지와 텍스트를 포함한 셀 -->
        <!-- <img class="layer_1-2"
                      src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/layer-1-1.svg"
                      alt="Layer_1" />
                    <span>{{ cell }}</span>
                  </div>
                  <div v-else>
                    {{ cell }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table v-else>
            <thead>
              <tr>
                <th v-for="(header, index) in tableHeaders" :key="index" class="pretendard-medium-white-18px">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in femaleTableData" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                  <div v-if="cellIndex === 1" class="cell-with-image"> -->
        <!-- 이미지와 텍스트를 포함한 셀 -->
        <!-- <img class="layer_1-2"
                      src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/layer-1-1.svg"
                      alt="Layer_1" />
                    <span>{{ cell }}</span>
                  </div>
                  <div v-else>
                    {{ cell }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
    </div>
    <div class="overlap-group7-1">
      <div class="frame-7356">
        <div class="frame-7358">
          <div class="frame-797">
            <div class="frame-7347">
              <div class="text-2-18 pretendard-bold-log-cabin-38px">
                베스트 스윙
              </div>
              <div class="text-2-19 pretendard-regular-normal-log-cabin-18px">
                레저로 회원들의 베스트 스윙 영상!
              </div>
            </div>
            <div class="text-2-19 to-go-btn valign-text-middle pretendard-regular-normal-log-cabin-18px"
              @click="toGoSwingVideolist">
              바로가기
            </div>
          </div>
          <div class="frame-7346">
            <div class="best-slide-container">
              <div class="best-slider-wrapper" :style="{
                transform: `translateX(-${currentSlideIndex * (100 / itemsPerSlide)
                  }%)`,
              }">
                <div class="group-688" v-for="(item, index) in visibleGroup688Items" :key="index"
                  @click="openYouTubeModal(item.videoUrl, item)">
                  <div class="overlap-group-101">
                    <img class="image-3" :src="item.image" alt="Best swing image" />
                    <div class="text-23-2 valign-text-middle pretendard-bold-log-cabin-24px">
                      {{ item.title }}
                    </div>
                    <!-- 이 부분 원래 [경기 파주] 레저로 파크골프 이런 식으로 나오는 곳 -->
                    <div class="text-23-3 valign-text-middle pretendard-regular-normal-log-cabin-18px">
                      {{ item.location }}
                    </div>
                    <div class="flex-row-88 pretendard-light-mountain-mist-14px">
                      <div class="text-100 valign-text-middle">
                        {{ item.nickname }}
                      </div>
                      <div class="date-25 valign-text-middle">
                        {{ item.date }}
                      </div>
                      <!-- 24.11.21 수정 - 추가 -->
                      <div class="date-25 valign-text-middle">
                        조회수 : {{ item.viewCount }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlap-group4-2" @click="prevSlide">
        <div class="ellipse-10-2"></div>
        <img class="vector-5-4"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-5.svg"
          alt="Vector 5" />
      </div>
      <!-- <div class="group-693-1" @click="nextSlide"> -->
      <div class="overlap-group5-1" @click="nextSlide">
        <div class="ellipse-10-3"></div>
        <img class="vector-5-5"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-6.svg"
          alt="Vector 5" />
        <!-- </div> -->
      </div>
    </div>

    <!-- 코스 -->
    <div class="frame-7357-2">
      <div class="frame-797">
        <div class="frame-73-10">
          <div class="text-2-18 valign-text-middle pretendard-bold-log-cabin-38px">
            코스 소개
          </div>
          <div class="text-2-19 valign-text-middle pretendard-regular-normal-log-cabin-18px">
            레저로만의 다양한 코스들을 만나세요!
          </div>
        </div>
        <div class="text-2-19 to-go-btn valign-text-middle pretendard-regular-normal-log-cabin-18px"
          @click="toGoCourselist">
          바로가기
        </div>
      </div>
      <div class="frame-7355-1">
        <div class="courses-grid" :style="{
          transform: `translateX(-${currentCourseSlideIndex * (100 / coursesPerSlide)
            }%)`,
        }">
          <div v-for="course in visibleCourses" :key="course.id" :class="['frame-769-2-1', course.className || '']"
            @click="openCourseDetail(course.id)">

            <div class="group-763-3" :style="{ 'background-image': 'url(' + course.group763 + ')' }"></div>
            <div class="frame-7683-3">
              <div class="frame-7759">
                <h1 class="text-28-3 valign-text-middle pretendard-bold-log-cabin-24px">
                  {{ course.courseName }}
                </h1>
                <div class="group-767-1">
                  <!-- 24.12.16 수정 - 폰트 수정  -->
                  <div class="frame-7757-1 pretendard-light-granite-gray-14px">
                    <div class="text-28-4">{{ course.holeInfo }}홀</div>
                    <!-- <div class="rectangle-50926-1"></div> -->
                     <!-- 24.12.16 수정 - 추가 -->
                    <div>l</div>
                    <div class="text-28-4">{{ course.courseDetails }}</div>
                    <!-- <div class="rectangle-50926-1"></div> -->
                     <!-- 24.12.16 수정 - 추가 -->
                    <div>l</div>
                    <div class="text-28-4">{{ course.region }}</div>
                  </div>
                    <!-- 24.12.16 수정 - 폰트 수정  -->
                  <div class="frame-7758-2 pretendard-light-granite-gray-14px">
                    <div class="text-1609">코스난이도</div>
                    <!-- 별점 표시 -->
                    <div class="rating-stars">
                      <span v-for="star in 5" :key="star" :class="star <= course.difficulty ? 'red-star' : 'gray-star'
                        ">
                        ★
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="overlap-group4-2" @click="prevCourseSlide">
        <div class="ellipse-10-2"></div>
        <img class="vector-5-4"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-5.svg"
          alt="Vector 5" />
      </div>
      <div class="group-693-1" @click="nextCourseSlide">
        <div class="overlap-group5-1">
          <div class="ellipse-10-3"></div>
          <img class="vector-5-5"
            src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-6.svg"
            alt="Vector 5" />
        </div>
      </div> -->
      <!-- 24.12.16 수정 -->
      <div class="overlap-group4-3" @click="prevCourseSlide">
        <div class="ellipse-10-2"></div>
        <img class="vector-5-4"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-5.svg"
          alt="Vector 5" />
      </div>
      <!-- 24.12.16 수정 -->
      <div class="overlap-group5-3" @click="nextCourseSlide">
        <div class="ellipse-10-3"></div>
        <img class="vector-5-5"
          src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/vector-5-6.svg"
          alt="Vector 5" />
        <!-- </div> -->
      </div>
    </div>
    <div class="frame-7369">
      <div class="s_title">
        <div class="text-2-18 valign-text-middle pretendard-bold-log-cabin-38px">
          전국 매장 안내
        </div>
        <span class="text-2-19 valign-text-middle pretendard-regular-normal-log-cabin-18px">레저로 스크린파크골프 전국 매장 안내</span>
      </div>
      <div class="s_bg">
        <!-- 24.11.20 수정 - 추가-->
        <div class="s_image" @click="openReservation(hoveredStore)">
          <div class="image_title">
            <!-- 24.11.20 수정 -->
            <span class="valign-text-middle pretendard-medium-white-20px">{{
              hoveredStore.name
            }}</span>
          </div>
          <img :src="hoveredStore.image || 'https://via.placeholder.com/400'" alt="Store Image" />
        </div>
        <div class="s_location">
          <div class="s_location_title">
            <span class="text-2309 valign-text-middle pretendard-bold-log-cabin-24px">전국 매장 리스트</span>
            <div class="s_direct">
              <img src="../../img/Group 686leftarrow.png" class="ranking-btn left" alt="Previous" @click="prevPage"
                :class="{ disabled: currentPage === 1 }" />
              <img src="../../img/Group 687rightarrow.png" class="ranking-btn right" alt="Next" @click="nextPage"
                :class="{ disabled: currentPage === totalPages }" />
            </div>
          </div>
          <table>
            <thead>
              <!-- 24.11.18 수정 - click 추가 -->
              <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" @mouseenter="handleRowHover(row)"
                @click=" openReservation(row)">
                <!-- 24.11.14 수정 - 삭제된 코드 추가 -->
                <!-- 24.12.13 수정 - class 추가 -->
                <td class="icon-cell">
                  <div class="ellipse-11-2"></div>
                </td>
                <td class="name-cell pretendard-medium-log-cabin-18px">{{ row.name }}</td>
                <td class="address-cell pretendard-regular-normal-mountain-mist-16px">
                  {{ row.address }}
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
    <YouTubeModal v-if="isYouTubeModalVisible" :viedoLink="currentViedo" @close="closeYouTubeModal" />
    <x-footer />
  </div>
</template>

<script>
import Header from "./Header";
import XFooter from "./XFooter";
import YouTubeModal from "./YouTubeModal";
import { taskStore } from "@/store/taskStore";
export default {
  name: "Home",
  components: {
    Header,
    XFooter,
    YouTubeModal,
  },
  props: ["date"],

  data() {
    return {
      isYouTubeModalVisible: false,
      images: [
        require("../../img/CK_ti436a27207 1.png"),
        require("../../img/CK_ti436a27207 1.png"),
        require("../../img/CK_ti436a27207 1.png"),
        require("../../img/CK_ti436a27207 1.png"),
        require("../../img/CK_ti436a27207 1.png"),
      ],
      slideTexts: [
        {
          title: "스트레스 해소와 집중력 강화, 새로운 삶의 품격을 경험하세요.",
          subtitle:
            "편리한 접근성과 날씨에 관계없이 언제든지 즐길 수 있는 스크린 골프, 지금 바로 체험해보세요!",
        },
        {
          title: "건강한 생활 습관을 만들어 보세요.",
          subtitle: "레저로와 함께 건강을 챙기고 에너지를 재충전하세요!",
        },
        {
          title: "가족과 함께하는 행복한 시간!",
          subtitle: "레저로에서 가족과의 소중한 추억을 만들어보세요.",
        },
        {
          title: "도전과 열정의 공간, 레저로!",
          subtitle: "당신의 한계를 시험하고 성취감을 느껴보세요.",
        },
        {
          title: "모든 연령대가 즐길 수 있는 스크린 골프",
          subtitle:
            "남녀노소 누구나 쉽게 즐길 수 있는 골프의 즐거움을 경험하세요.",
        },
      ],
      EventsSlides: [],
      storeData: [],
      hoveredStore: { name: "", image: "", branchId: "" },   // 24.11.20 수정 
      currentPage: 1, // 현재 페이지
      itemsPerPage: 6, // 페이지당 표시할 매장 수
      currentRanking: "male",
      tableHeaders: ["순위", "닉네임", "등급", "최고성적"],
      maleTableData: [
        ["1", "스코티 셰틀러", "마스터", "-24"],
        ["2", "로이 맥길로이", "마스터", "-24"],
        ["3", "잰더 슈펠레", "마스터", "-24"],
        ["4", "봉길", "마스터", "-24"],
        ["5", "마크 ", "마스터", "-24"],
      ],
      femaleTableData: [
        ["1", "하라", "마스터", "-24"],
        ["2", "페아키", "마스터", "-24"],
        ["3", "라라라랄", "마스터", "-24"],
        ["4", "제니", "마스터", "-24"],
        ["5", "도로시", "마스터", "-24"],
      ],
      notices: [],
      courses: [],
      currentViedo: "",
      group688Items: [],
      // 코스
      coursesPerSlide: 1, // Default for larger screens
      currentCourseSlideIndex: 0,
      courseSlideInterval: null,
      // 베스트스윙
      currentSlideIndex: 0,
      itemsPerSlide: 4, // Default for larger screens
      swingSlideInterval: null,
      currentTextIndex: 0,
      currentImageIndex: 0,
      EventsCurrentSlide: 0,
      currentNoticeIndex: 0, // 현재 표시 중인 공지사항의 인덱스
      EventsInterval: null,
      interval: null,
      isPaused: false,
      pauseBtn: require('../../img/KakaoTalk_Photo_2024-11-21-15-08-21.png'),// 24.12.05 수정 - 추가
      playBtn: require('../../img/play.png'),// 24.12.05 수정 - 추가
      refreshToken: null,
    };
  },
  computed: {
    currentText() {
      return this.notices.length > 0
        ? this.notices[this.currentNoticeIndex].text
        : "";
    },
    currentDate() {
      return this.notices.length > 0
        ? this.notices[this.currentNoticeIndex].date
        : "";
    },
    visibleGroup688Items() {
      return this.group688Items;
    },
    visibleCourses() {
      return this.courses;
    },
    totalPages() {
      return Math.ceil(this.storeData.length / this.itemsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.storeData.slice(startIndex, startIndex + this.itemsPerPage);
    },
  },
  mounted() {
    this.getBannerDt();
    this.getBestSwing();
    this.getEvents();
    this.getCourseDt();
    this.getStroeInfo();
    this.getNotice();
    this.startSlideshow(); // Start the slideshow on component mount
    this.startEventsSlideshow(); // 슬라이드쇼 자동 실행
    if (this.storeData.length > 0) {
      this.setHoveredStore(this.storeData[0]);
    }
    // 베스트 스윙
    this.startSwingSlide(); // Auto slide for swing section
    this.updateItemsPerSlide();
    window.addEventListener("resize", this.updateItemsPerSlide);
    // 코스 소개
    this.updateCoursesPerSlide();
    window.addEventListener("resize", this.updateCoursesPerSlide);
    this.startCourseSlide();
  },
  methods: {
    goToLink(link) {
      if (link.startsWith("http")) {
        window.open(link, "_blank"); // 외부 링크는 새 탭에서 열기
      } else {
        this.$router.push(link); // 내부 링크는 Vue Router를 사용
      }
    },
    async getBannerDt() {
      try {
        const response = await taskStore.getSelectTasks("v1/report/banner");
        console.log("getBannerDt : 응답:", response);

        // 5개의 데이터만 가져오기 위해 slice 사용
        const limitedBanners = response.filter((item) => item.status === "visible").slice(0, 5);

        // 이미지와 텍스트 처리
        this.images = limitedBanners.map(item => item.bannerImg).filter(img => !!img);
        this.slideTexts = limitedBanners.map((item) => ({
          title: item.title,
          subtitle: item.subtitle,
          link: item.linkurl, // 링크 추가
        }));

        console.log("배너 이미지:", this.images);
        console.log("배너 텍스트:", this.slideTexts);
      } catch (error) {
        console.error("배너 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    nextImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
      this.isPaused = false; // 슬라이드 재개를 위해 일시 정지 해제
      this.restartSlideshow(); // 슬라이드 재시작
    },
    prevImage() {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      this.isPaused = false; // 슬라이드 재개를 위해 일시 정지 해제
      this.restartSlideshow(); // 슬라이드 재시작
    },
    startSlideshow() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          if (!this.isPaused) {
            this.nextImage();
          }
        }, 5000); // 5초 간격
      }
    },
    stopSlideshow() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    restartSlideshow() {
      this.stopSlideshow(); // 기존 타이머 초기화
      this.startSlideshow(); // 슬라이드쇼 재시작
    },
    stopAutoSlide() {
      this.stopSlideshow();
      this.stopEventsSlideshow();
      this.stopCourseSlide();
      clearInterval(this.swingSlideInterval);
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      if (!this.isPaused) {
        this.restartSlideshow(); // 일시 정지 해제 시 슬라이드 재시작
      } else {
        this.stopSlideshow(); // 일시 정지 시 슬라이드 멈춤
      }
    },

    // 공지사항

    async getNotice() {
      try {
        const response = await taskStore.getSelectTasks("customer-notice");
        console.log("API 응답:", response);

        if (response.length > 0) {
          // 가장 최신 공지사항 찾기
          const latestNotice = response.reduce((latest, current) => {
            return new Date(current.createdAt) > new Date(latest.createdAt)
              ? current
              : latest;
          });

          this.notices = [
            {
              id: latestNotice.id,
              text: latestNotice.title,
              date: latestNotice.createdAt.split("T")[0],
            },
          ];
        } else {
          // 데이터가 없을 경우 기본값 설정
          this.notices = [];
        }

        console.log("최신 공지사항 데이터:", this.notices);
      } catch (error) {
        console.error("공지사항 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    toGoNotice(item) {
      this.$router.push({
        path: "/notice-detail",
        query: { id: item.id },
      });
    },
    // 24.11.20 수정
    toGoNoticeList() {
      this.$router.push({ path: "/notice-list" });
    },
    // 이벤트
    EventsNextSlide() {
      this.EventsCurrentSlide =
        (this.EventsCurrentSlide + 1) % this.EventsSlides.length;
    },
    EventsPrevSlide() {
      this.EventsCurrentSlide =
        (this.EventsCurrentSlide - 1 + this.EventsSlides.length) %
        this.EventsSlides.length;
    },
    EventsGoToSlide(index) {
      this.EventsCurrentSlide = index;
    },
    // 24.12.05 수정 - 추가 : 종료이벤트 페이지 이동 금지
    handleEventClick(slide) {
      if (slide.isExpired) {
        alert("종료된 이벤트입니다.");
        return; // 클릭 동작 중지
      }
      // 진행 중인 이벤트일 경우 상세 페이지로 이동
      this.toGoEventDetail(slide.id);
    },
    startEventsSlideshow() {
      this.EventsInterval = setInterval(this.EventsNextSlide, 3000);
    },
    stopEventsSlideshow() {
      clearInterval(this.EventsInterval);
    },
    callCourseDt() {
      this.refreshToken = localStorage.getItem("refreshToken"); // 로그인 토큰
    },
    async getEvents() {
      try {
        // 서버에서 이벤트 데이터를 가져옵니다.
        const response = await taskStore.getSelectTasks("events");
        console.log("이벤트 response :", response);

        // 24.11.26 수정 - 추가
        // 오늘 날짜 기준으로 진행 예정 이벤트 필터링
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 오늘의 00:00:00 설정

        // 24.11.26 수정 - 추가
        const filteredEvents = response.filter((item) => {
          const startDate = new Date(item.startTime).setHours(0, 0, 0, 0);
          return startDate <= today; // 오늘 이전 또는 오늘 시작하는 이벤트만 남김
        })
          // 24.12.05 수정 - 추가:종료이벤트 필터링
          .map((item) => {
            const endDate = new Date(item.endTime).setHours(23, 59, 59, 999);
            return {
              ...item,
              isExpired: endDate < today, // 종료 여부 판단
            };
          });

        console.log('filteredEvents', filteredEvents)

        // 24.12.05 수정 - 추가 : 종료되지 않은 이벤트만 남김
        const activeEvents = filteredEvents.filter((item) => !item.isExpired);

        console.log("activeEvents", activeEvents);

        //  24.11.26 수정 - response 대신 filteredEvents
        // 데이터를 가공하여 EventsSlides 배열에 할당
        // 24.12.05 수정 - 추가 : filteredEvents 대신 activeEvents
        const sortedEvents = activeEvents.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        // 데이터를 가공하여 EventsSlides 배열에 할당
        this.EventsSlides = sortedEvents.slice(0, 5).map((item) => ({
          id: item.id,
          title: item.title,
          slide: item.imageUrl || "https://via.placeholder.com/400", // 이미지가 없을 경우 기본 이미지 사용
        }));

        console.log("filteredEvents:", this.EventsSlides);
      } catch (error) {
        console.error("Failed to fetch events data:", error);
      }
    },
    // toGoEventList() {
    //   this.$router.push({ path: "/events-list" });
    // },
    toGoEventDetail(courseId) {
      console.log("Navigating to event detail with ID:", courseId); // 콘솔에 id 출력
      this.$router.push({
        path: "/event-detail",
        query: { id: courseId },
      });
    },

    // 랭킹
    nextRanking() {
      this.currentRanking = this.currentRanking === "male" ? "female" : "male";
    },
    prevRanking() {
      this.currentRanking =
        this.currentRanking === "female" ? "male" : "female";
    },

    // 베스트 스윙
    async getBestSwing() {
      try {
        // 서버에서 스윙 영상 데이터를 가져옵니다.
        const response = await taskStore.getSelectTasks("swing-videos");
        console.log("베스트 스윙 111", response);

        // 데이터를 가공하여 group688Items 배열에 할당
        const items = response
          .filter((item) => item.viewCount >= 10) // 조회수가 10 이상인 항목만 필터링
          .map((item) => ({
            id: item.id,
            title: item.title,
            nickname: item.user?.name || "익명",
            date: item.createdAt.split("T")[0],
            image: item.imageUrl || require("../../img/image-5@2x.png"),
            videoUrl: item.videoUrl || "", // 영상 URL 추가
            viewCount: item.viewCount,
          }))
          .sort((a, b) => b.viewCount - a.viewCount); // 조회수(viewCount) 기준 내림차순 정렬

        // 썸네일을 동적으로 생성하여 items에 추가
        for (const item of items) {
          if (item.videoUrl) {
            const thumbnail = await this.generateThumbnail(item.videoUrl);
            item.image = thumbnail || item.image; // 썸네일 생성 실패 시 기본 이미지 사용
          }
        }

        this.group688Items = items; // 가공된 데이터 할당
        console.log("Processed group688Items with thumbnails:", this.group688Items);
      } catch (error) {
        console.error("Failed to fetch swing-videos data:", error);
      }
    }
    ,
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
    toGoSwingVideolist() {
      this.$router.push({ path: "/swingvideo-list" });
    },
    startSwingSlide() {
      this.swingSlideInterval = setInterval(this.nextSlide, 3000); // Auto-slide every 3 seconds
    },
    openYouTubeModal(selectViedo, item) {
      if (selectViedo) {
        this.currentViedo = selectViedo;
        console.log("Selected video URL:", selectViedo);
        this.isYouTubeModalVisible = true;
      } else {
        console.error("No video URL available for this item");
      }
    },
    closeYouTubeModal() {
      this.isYouTubeModalVisible = false;
    },

    // 코스
    toGoCourselist() {
      this.$router.push({ path: "/course-list" });
    },
    nextCourseSlide() {
      const maxIndex = this.courses.length - this.coursesPerSlide;
      if (this.currentCourseSlideIndex < maxIndex) {
        this.currentCourseSlideIndex++;
      } else {
        this.currentCourseSlideIndex = 0; // Loop back to the first slide
      }
    },
    prevCourseSlide() {
      if (this.currentCourseSlideIndex > 0) {
        this.currentCourseSlideIndex--;
      } else {
        this.currentCourseSlideIndex =
          this.courses.length - this.coursesPerSlide;
      }
    },
    startCourseSlide() {
      this.courseSlideInterval = setInterval(this.nextCourseSlide, 3000); // Start auto-slide for courses
    },
    stopCourseSlide() {
      clearInterval(this.courseSlideInterval);
    },
    updateCoursesPerSlide() {
      // 24.12.27 수정
      if (window.innerWidth <= 720) {
        this.coursesPerSlide = 1; // Show 1 course for screens 360px or smaller
      } else {
        this.coursesPerSlide = 3; // For larger screens, show 3 courses per slide
      }
    },
    async getCourseDt() {
      try {
        const response = await taskStore.getSelectTasks("course-management");
        console.log("getCourseDt 11 ", response)

        // 24.11.21 수정 - 추가
        // createdAt을 기준으로 내림차순 정렬 (최신 등록순)
        const sortedCourses = response.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt); // 최신순으로 정렬
        });

        // this.courses = response.slice(0, 3).map((course) => ({
        this.courses = sortedCourses.slice(0, 3).map((course) => ({
          ...course,
          id: course.id,
          group763: course.mainImage || null, // 이미지가 없을 경우 null 처리
          courseDetails: course.rules,
          holeInfo: course.averageScores.length,
          difficulty: this.convertDifficultyToStars(course.difficulty),
          // 24.11.21 수정 - 추가
          createdAt: course.createdAt,
        }));
        console.log("전체 코스 데이터:", JSON.stringify(this.courses));
      } catch (error) {
        console.error("코스 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    openCourseDetail(courseId) {
      console.log("넘어온 courseId:", courseId);


      this.$router.push({
        path: "/course-detail",
        query: { id: courseId },
      });
    },

    // 전국매장안내
    handleRowHover(store) {
      if (store) {
        this.hoveredStore = {
          // 24.11.20 수정 - title - name으로 수정
          // title: store.name || "매장 정보 없음",
          name: store.name || "매장 정보 없음",
          image: store.mapImage || "https://via.placeholder.com/400",
          // 24.11.20 수정 - 추가
          address: store.address,
          mapImage: store.mapImage || "https://via.placeholder.com/400", // mapImage가 없으면 기본 이미지 사용
          branchId: store.branchId,
          weekdayHours: store.weekdayHours,
          weekendHours: store.weekendHours,
          managerid: store.managerid,
          storeScale: store.storeScale,
          location: {
            latitude: store.latitude,
            longitude: store.longitude
          }
        };
      } else {
        this.hoveredStore = {
          // 24.11.20 수정 
          name: "",
          image: "https://via.placeholder.com/400",
          branchId: ""
        };
      }
      console.log("hoveredStore 업데이트:", this.hoveredStore);
    },
    convertDifficultyToStars(difficulty) {
      switch (difficulty) {
        case "Easy":
          return 1; // 별 1개
        case "Medium":
          return 3; // 별 3개
        case "Hard":
          return 5; // 별 5개
        default:
          return 0; // 예외 처리: 값이 없거나 올바르지 않은 경우
      }
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
    updateItemsPerSlide() {
      // 24.12.13 수정
      if (window.innerWidth <= 720) {
          this.itemsPerSlide = 1; // Show 1 item for screens <= 360px
        // } else if (window.innerWidth <= 720) {
        // this.itemsPerSlide = 2; 
      } else {
        this.itemsPerSlide = 4; // Default for larger screens
      }
    },
    nextSlide() {
      const maxIndex = this.group688Items.length - this.itemsPerSlide;
      if (this.currentSlideIndex < maxIndex) {
        this.currentSlideIndex++;
      } else {
        this.currentSlideIndex = 0; // Loop back to the first slide
      }
    },
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
      } else {
        this.currentSlideIndex = this.group688Items.length - this.itemsPerSlide;
      }
    },
    async getStroeInfo() {
      try {
        const response = await taskStore.getSelectTasks("v1/branch/list");
        console.log("API 응답:", response);

        // 응답 데이터를 storeData 배열에 추가
        this.storeData = response.map((item) => ({
          name: item.name,
          address: item.address,
          mapImage: item.mapImage || "https://via.placeholder.com/400", // mapImage가 없으면 기본 이미지 사용
          // 24.11.20 수정 - 추가
          branchId: item.id,
          weekdayHours: item.weekdayHours,
          weekendHours: item.weekendHours,
          managerid: item.managerid,
          storeScale: item.storeScale,
          location: {
            latitude: item.latitude,
            longitude: item.longitude
          }
        }));
        console.log("전국 매장 데이터:", this.storeData);

        // 데이터가 로드되면 첫 번째 매장을 초기 선택된 매장으로 설정
        if (this.storeData.length > 0) {
          this.hoveredStore = {
            // 24.11.20 수정
            name: this.storeData[0].name || "매장 정보 없음",
            image:
              this.storeData[0].mapImage || "https://via.placeholder.com/400",
            branchId: this.storeData[0].branchId || "",
            name: this.storeData[0].name || "",
            address: this.storeData[0].address || "",
            weekdayHours: this.storeData[0].weekdayHours || "",
            weekendHours: this.storeData[0].weekendHours || "",
            mapImage: this.storeData[0].mapImage || "",
            managerid: this.storeData[0].managerid || "",
            storeScale: this.storeData[0].storeScale || "",
            location: {
              latitude: this.storeData[0].latitude || "",
              longitude: this.storeData[0].longitude || "",
            }
          };
          console.log("초기 매장 정보 설정:", this.hoveredStore);
        }
      } catch (error) {
        console.error("매장 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    // 24.11.20 수정 - 추가 : 매장 이름 클릭시 예약하기로 이동
    async openReservation(selectedBranch) {
      try {
        this.branch = selectedBranch;
        console.log("selectedBranch", selectedBranch);

        if (!selectedBranch || !selectedBranch.branchId) {
          console.error("branchId가 없습니다. 데이터를 확인하세요.");
          return;
        }

        this.$router.push({
          name: "reservation-write", // 라우트 이름
          params: {
            branchId: selectedBranch.branchId,
            name: selectedBranch.name,
            address: selectedBranch.address,
            weekdayHours: selectedBranch.weekdayHours,
            weekendHours: selectedBranch.weekendHours,
            mapImage: selectedBranch.mapImage,
            managerid: selectedBranch.managerid,
            storeScale: selectedBranch.storeScale,
            location: {
              latitude: selectedBranch.latitude,
              longitude: selectedBranch.longitude
            }
          },

        });
      } catch (error) {
        console.error("Error in openReservation:", error);
      }
    },
  },
  beforeDestroy() {
    this.stopSlideshow();
    clearInterval(this.interval); // 컴포넌트가 파괴될 때 타이머 제거
    this.stopEventsSlideshow();
    this.stopAutoSlide();
    clearInterval(this.swingSlideInterval);
    // 코스소개
    this.stopCourseSlide();
  },

};
</script>

<style scoped src="../style/common/home.css"></style>
