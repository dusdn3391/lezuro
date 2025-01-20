<template>
  <div class="container-center-horizontal">
    <div class="coursedetails-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" />
      <div class="title pretendard-bold-log-cabin-38px">코스</div>
      <div class="course-detail-content">
        <div class="course-image-box">
          <img class="course-img" :src="mainImage" alt="course image" />
        </div>

        <div class="course-detail-info">
          <div class="course-detail-head">
            <div class="course-detail-head-first">
              <div class="course-detail-name valign-text-middle pretendard-bold-log-cabin-30px">
                {{ courseName }}
              </div>
              <div class="course-detail-region pretendard-medium-granite-gray-14px">
                {{ region }}
              </div>
            </div>
            <div class="course-detail-head-end pretendard-regular-normal-granite-gray-16px">
              <div class="course-detail-head-end-first">
                <div>{{ holeInfo }}</div>
                <span>l</span>
                <div>{{ courseDetails }}</div>
                <span class="course-detail-slash">l</span>
              </div>
              <div class="course-detail-head-end-difficulty">
                <div class="course-info-font">코스난이도</div>
                <!-- 별점 표시 -->
                <div class="course-rating-stars">
                  <span v-for="star in 5" :key="star" :class="getStarClass(difficulty, star)">
                    ★
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="course-detail-body">
            <div class="average-font pretendard-bold-black-24px">평균타수</div>
            <div class="average-level">
              <div v-for="(ranking, index) in rankingData" :key="index" class="average-level-card">
                <div class="average-level-align">
                  <div class="grade-circle">
                    <img class="grade-circle-image"
                      src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/group-33602-6@2x.png"
                      alt="Group 33602" />
                    <div class="grade-font pretendard-extra-extra-bold-white-20px">
                      {{ ranking.grade }}등급
                    </div>
                  </div>
                  <div class="ranking-score-font pretendard-semi-bold-black-20px">
                    {{ ranking.score }}타
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="course-detail-hole-detail-info">
            <div class="hole-detail-font pretendard-bold-black-24px">
              홀 세부정보
            </div>

            <!-- 아웃코스 렌더링 -->
            <!-- 아웃코스 렌더링 -->
            <div class="course-detail-hole-detail-info-box" v-if="filteredCourseInfo.holesOut.length > 0">
              <div class="course-detail-hole-detail-info-box-align">
                <div class="hole-detail-info-box-wrapper">
                  <div class="hole-detail-info-box-head">
                    <div class="course-detail-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                      아웃코스
                    </div>
                    <div
                      class="course-detail-meter-font valign-text-middle pretendard-regular-normal-granite-gray-14px">
                      단위meter
                    </div>
                  </div>
                  <div class="table-detail-wrapper">
                    <div class="table-detail-align">
                      <table class="hole-detail-info-table">
                        <thead>
                          <tr class="hole-col pretendard-regular-normal-mine-shaft-18px">
                            <th>Hole</th>
                            <th v-for="(hole, index) in filteredCourseInfo.holesOut" :key="'out-hole-' + index">
                              {{ hole }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="black-col pretendard-regular-normal-mine-shaft-18px">
                            <td>Course</td>
                            <td v-for="(black, index) in filteredCourseInfo.blackOut" :key="'out-black-' + index">
                              {{ black }}
                            </td>
                          </tr>
                          <tr class="par-col pretendard-bold-mine-shaft-18px">
                            <td>PAR</td>
                            <td v-for="(par, index) in filteredCourseInfo.parsOut" :key="'out-par-' + index">
                              {{ par }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hole-detail-image-box">
                <!-- 아웃코스 이미지 슬라이더 -->
                <div class="hole-detail-image-box-left-box" @click="prevOutImage">
                  <img class="hole-detail-image-box-left-arrow"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/ep-arrow-left-4.svg"
                    alt="ep:arrow-left" />
                </div>
                <div class="hole-detail-image">
                  <div v-if="currentOutImage !== '이미지가 없습니다'">
                    <img class="course-hole-detail-image" :src="currentOutImage" alt="Out course map" />
                  </div>
                  <div v-else class="no-image-text pretendard-semi-bold-granite-gray-18px">
                    {{ currentOutImage }}
                  </div>
                  <div class="hole-detail-address pretendard-semi-bold-log-cabin-18px">
                    {{ courseInfo.holesOut[outCurrentIndex] }} HOLE. {{ courseInfo.parsOut[outCurrentIndex] }} PAR
                  </div>
                </div>
                <div class="hole-detail-image-box-right-box" @click="nextOutImage">
                  <img class="hole-detail-image-box-right-arrow"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/ep-arrow-left-5.svg"
                    alt="ep:arrow-right" />
                </div>
              </div>
            </div>

            <!-- 인코스 렌더링 -->
            <div class="course-detail-hole-detail-info-box" v-if="filteredCourseInfo.holesIn.length > 0">
              <div class="course-detail-hole-detail-info-box-align">
                <div class="hole-detail-info-box-wrapper">
                  <div class="hole-detail-info-box-head">
                    <div class="course-detail-font valign-text-middle pretendard-semi-bold-log-cabin-18px">
                      인코스
                    </div>
                    <div
                      class="course-detail-meter-font valign-text-middle pretendard-regular-normal-granite-gray-14px">
                      단위meter
                    </div>
                  </div>
                  <div class="table-detail-align">
                    <!-- 24.12.18 수정 - class 명 수정 -->
                    <table class="hole-detail-info-table">
                      <thead>
                        <tr class="hole-col pretendard-regular-normal-mine-shaft-18px">
                          <th>Hole</th>
                          <th v-for="(hole, index) in filteredCourseInfo.holesIn" :key="'in-hole-' + index">
                            {{ hole }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="black-col pretendard-regular-normal-mine-shaft-18px">
                          <td>Course</td>
                          <td v-for="(black, index) in filteredCourseInfo.blackIn" :key="'in-black-' + index">
                            {{ black }}
                          </td>
                        </tr>
                        <tr class="par-col pretendard-bold-mine-shaft-18px">
                          <td>PAR</td>
                          <td v-for="(par, index) in filteredCourseInfo.parsIn" :key="'in-par-' + index">
                            {{ par }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="hole-detail-image-box">
                <!-- 인코스 이미지 슬라이더 -->
                <div class="hole-detail-image-box-left-box" @click="prevInImage">
                  <img class="hole-detail-image-box-left-arrow"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/ep-arrow-left-4.svg"
                    alt="ep:arrow-left" />
                </div>
                <div class="hole-detail-image">
                  <div v-if="currentInImage !== '이미지가 없습니다'">
                    <img class="course-hole-detail-image" :src="currentInImage" alt="In course map" />
                  </div>
                  <div v-else class="no-image-text pretendard-semi-bold-granite-gray-18px">
                    {{ currentInImage }}
                  </div>
                  <div class="hole-detail-address pretendard-semi-bold-log-cabin-18px">
                    {{ courseInfo.holesIn[inCurrentIndex] }} HOLE. {{ courseInfo.parsIn[inCurrentIndex] }} PAR
                  </div>
                </div>
                <div class="hole-detail-image-box-right-box" @click="nextInImage">
                  <img class="hole-detail-image-box-right-arrow"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/ep-arrow-left-5.svg"
                    alt="ep:arrow-right" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import { taskStore } from "@/store/taskStore";

export default {
  name: "CourseDetail",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      courseId: null,
      courseData: null,
      courseName: "",
      courseDetails: "",
      mainImage: null,
      region: "",
      holeInfo: "",
      difficulty: "",
      rankingData: [],
      courseInfo: {},
      outCurrentIndex: 0,
      inCurrentIndex: 0,
      outCourseImages: [],
      inCourseImages: [],
    };
  },
  async created() {
    // URL에서 courseId를 받아오기
    this.courseId = this.$route.query.id;
    console.log("받은 courseId:", this.courseId); // 콘솔로 확인

    if (this.courseId) {
      await this.getCourseDetail(this.courseId);
    }
  },
  computed: {
    // currentOutPar() {
    //   return this.courseInfo.parsOut[this.outCurrentIndex] || "-";
    // },
    // currentInPar() {
    //   return this.courseInfo.parsIn[this.inCurrentIndex] || "-";
    // },
    filteredCourseInfo() {
      const filteredOutIndexes = this.courseInfo.holesOut
        .map((hole, index) => (this.courseInfo.blackOut[index] !== 0 ? index : null))
        .filter((index) => index !== null);

      const filteredInIndexes = this.courseInfo.holesIn
        .map((hole, index) => (this.courseInfo.blackIn[index] !== 0 ? index : null))
        .filter((index) => index !== null);

      return {
        holesOut: filteredOutIndexes.map((index) => this.courseInfo.holesOut[index]),
        blackOut: filteredOutIndexes.map((index) => this.courseInfo.blackOut[index]),
        parsOut: filteredOutIndexes.map((index) => this.courseInfo.parsOut[index]),
        holesIn: filteredInIndexes.map((index) => this.courseInfo.holesIn[index]),
        blackIn: filteredInIndexes.map((index) => this.courseInfo.blackIn[index]),
        parsIn: filteredInIndexes.map((index) => this.courseInfo.parsIn[index]),
      };
    },
    currentOutImage() {
      // 아웃코스 이미지 로직
      const image = this.outCourseImages[this.outCurrentIndex];
      return image && image !== "string" ? image : "이미지가 없습니다";
    },
    currentInImage() {
      // 인코스 이미지 로직
      const image = this.inCourseImages[this.inCurrentIndex];
      return image && image !== "string" ? image : "이미지가 없습니다";
    },
  },
  methods: {
    async getCourseDetail(courseId) {
      try {
        const response = await taskStore.getSelectTasks(
          `course-management/${courseId}`
        );
        this.courseData = response;
        console.log("불러온 코스 데이터:", this.courseData);

        // 다른 데이터 설정
        this.holeInfo = `${this.courseData.holes.length}홀`;
        this.region = this.courseData.region;
        this.courseDetails = this.courseData.rules;
        this.courseName = this.courseData.courseName;
        this.mainImage = this.courseData.mainImage || "";

        // outCourseImages와 inCourseImages를 data에 설정
        this.outCourseImages = response.holes
          .slice(0, 9)
          .map((hole) => hole.teeBoxes[0]?.mapImage || this.image21);
        this.inCourseImages = response.holes
          .slice(9, 18)
          .map((hole) => hole.teeBoxes[0]?.mapImage || this.image21);

        this.difficulty = this.courseData.difficulty;
        this.courseInfo = this.formatCourseInfo(this.courseData.holes);
        this.rankingData = this.courseData.averageScores.map(
          (score, index) => ({
            score,
            grade: index + 1,
          })
        );

        // 평균 점수를 기준으로 등급 계산
        this.rankingData.sort((a, b) => a.score - b.score);

        this.rankingData.forEach((item, index) => {
          item.grade = index + 1;
        });
      } catch (error) {
        console.error("코스 데이터를 가져오는 중 오류 발생:", error);
      }
    },

    formatCourseInfo(holes) {
      const courseInfo = {
        holesOut: [],
        holesIn: [],
        blackOut: [],
        blackIn: [],
        whiteOut: [],
        whiteIn: [],
        yellowOut: [],
        yellowIn: [],
        redOut: [],
        redIn: [],
        parsOut: [],
        parsIn: [],
      };

      holes.forEach((hole) => {
        // 홀 번호에 따라 아웃코스와 인코스를 구분
        const isOutCourse = hole.holeNumber <= 9;

        const holesKey = isOutCourse ? "holesOut" : "holesIn";
        const blackKey = isOutCourse ? "blackOut" : "blackIn";
        const whiteKey = isOutCourse ? "whiteOut" : "whiteIn";
        const yellowKey = isOutCourse ? "yellowOut" : "yellowIn";
        const redKey = isOutCourse ? "redOut" : "redIn";
        const parsKey = isOutCourse ? "parsOut" : "parsIn";

        // 홀 번호 추가
        courseInfo[holesKey].push(hole.holeNumber);

        // 각 티 박스 정보를 배열에 추가
        const blackTee = hole.teeBoxes.find((tee) => tee.color === "Black");
        const whiteTee = hole.teeBoxes.find((tee) => tee.color === "White");
        const yellowTee = hole.teeBoxes.find((tee) => tee.color === "Yellow");
        const redTee = hole.teeBoxes.find((tee) => tee.color === "Red");

        courseInfo[blackKey].push(blackTee ? blackTee.distance : "-");
        courseInfo[whiteKey].push(whiteTee ? whiteTee.distance : "-");
        courseInfo[yellowKey].push(yellowTee ? yellowTee.distance : "-");
        courseInfo[redKey].push(redTee ? redTee.distance : "-");

        // PAR 값 추가
        const parValue = hole.teeBoxes[0]?.par || 4;
        courseInfo[parsKey].push(parValue);
      });

      return courseInfo;
    },
    getStarClass(difficulty, star) {
      const starRatings = {
        Very_Hard: 5, Hard: 4, Medium: 3, Easy: 2, Very_Easy: 1
      };

      // `difficulty`가 없으면 기본적으로 회색 별을 반환
      if (!difficulty) return "course-gray-star";

      // 난이도에 따른 별점 색상 설정
      return star <= starRatings[difficulty]
        ? "course-red-star"
        : "course-gray-star";
    },
    nextOutImage() {
      if (this.outCourseImages.length > 0) {
        this.outCurrentIndex =
          (this.outCurrentIndex + 1) % this.outCourseImages.length;
      }
    },
    prevOutImage() {
      if (this.outCourseImages.length > 0) {
        this.outCurrentIndex =
          (this.outCurrentIndex - 1 + this.outCourseImages.length) %
          this.outCourseImages.length;
      }
    },
    nextInImage() {
      if (this.inCourseImages.length > 0) {
        this.inCurrentIndex =
          (this.inCurrentIndex + 1) % this.inCourseImages.length;
      }
    },
    prevInImage() {
      if (this.inCourseImages.length > 0) {
        this.inCurrentIndex =
          (this.inCurrentIndex - 1 + this.inCourseImages.length) %
          this.inCourseImages.length;
      }
    },
  },
};
</script>

<style scoped src="@/style/course/coursedetail.css" />
