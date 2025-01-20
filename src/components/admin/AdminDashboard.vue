<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">대시보드</h2>
          </div>
          <div class="dashboard_wrap">
            <div class="admin-dashboard">
              <div class="board-list-box">
                <!-- 코스 랭킹 -->
                <div class="list-box">
                  <div class="pretendard-bold-mine-shaft-18px">코스 랭킹</div>
                  <div class="more-link pretendard-light--mountain-mist-16px" @click="goToCourseManagement()">
                    + 더보기
                  </div>
                </div>
                <table class="course-ranking-table">
                  <thead>
                    <tr>
                      <th>선호도</th>
                      <th>코스명</th>
                      <th>난이도</th>
                      <th>최고</th>
                      <th>평균</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(course, idx) in course_re" :key="course.id">
                      <td>{{ idx + 1 }}</td>
                      <td>{{ course.courseName }}</td>
                      <td>
                        코스난이도
                        <!-- <span>{{course.difficulty}}</span> -->
                        <span v-for="n in course.difficulty" :key="n" class="star">★</span>
                        <span v-for="n in 5 - course.difficulty" :key="`empty-${n}`" class="empty-star">☆</span>
                      </td>
                      <td>{{ course.bestScore }}</td>
                      <td>{{ course.averageScore }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 포인트 내역 -->
            <div class="admin-dashboard">
              <div class="board-list-box">
                <!-- 코스 랭킹 -->
                <div class="list-box">
                  <div class="pretendard-bold-mine-shaft-18px">포인트 내역</div>
                  <div class="more-link pretendard-light--mountain-mist-16px" @click="goToPointManagement()">
                    + 더보기
                  </div>
                </div>
                <table class="course-ranking-table">
                  <thead>
                    <tr>
                      <!-- 24.12.03 수정 - 선호도-번호로 수정 -->
                      <th>번호</th>
                      <th>매장</th>
                      <th>내역</th>
                      <th>금액</th>
                      <!-- 24.12.03 수정 - 일시-날짜로 수정 -->
                      <th>날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="point in points.slice(0, 5)" :key="point.id">
                      <td>{{ point.pointTransaction_transactionId }}</td>
                      <td>{{ point.branch_name }}</td>
                      <td>{{ point.pointTransaction_description }}</td>
                      <td :class="{
                        // 'positive-money': !isPositiveMoney(point.pointTransaction_amount),
                        // 'negative-money': isPositiveMoney(point.pointTransaction_amount),
                        // 24.12.03 수정 - 천단위 쉼표 추가
                        'positive-money': parseFloat(point.pointTransaction_amount) > 0,
                        'negative-money': parseFloat(point.pointTransaction_amount) < 0,
                      }">
                        <!-- {{ parseInt(point.pointTransaction_amount) > 0 ?
                                "+" + point.pointTransaction_amount.split(".")[0] :
                                point.pointTransaction_amount.split(".")[0] }} -->
                        <!--  24.12.03 수정 - 천단위 쉼표 추가 -->
                        {{ parseFloat(point.pointTransaction_amount) > 0
                          ? "+" + formatAmount(point.pointTransaction_amount.split(".")[0])
                          : formatAmount(point.pointTransaction_amount.split(".")[0])
                        }}
                      </td>
                      <td>{{ point.pointTransaction_timestamp.split("T")[0] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- A/S 리스트 -->
            <div class="admin-dashboard">
              <div class="board-list-box">
                <!-- 코스 랭킹 -->
                <div class="list-box">
                  <div class="pretendard-bold-mine-shaft-18px">A/S 리스트</div>
                  <div class="more-link pretendard-light--mountain-mist-16px" @click="goToAsManagement()">
                    + 더보기
                  </div>
                </div>
                <table class="course-ranking-table">
                  <thead>
                    <tr>
                      <th>상태</th>
                      <th>매장</th>
                      <th>A/S 신청 내용</th>
                      <th>접수 일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="AS in ASs" :key="AS.id">
                      <td>
                        <div class="state_box pretendard-medium-white-14px" :class="statusClass(AS.status)">{{ AS.status
                          }}</div>
                      </td>
                      <td>{{ AS.branch.name }}</td>
                      <td>{{ AS.description }}</td>
                      <td>{{ AS.requestedAt.split("T")[0] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 1:1문의 -->
            <div class="admin-dashboard">
              <div class="board-list-box">
                <!-- 코스 랭킹 -->
                <div class="list-box">
                  <div class="pretendard-bold-mine-shaft-18px">1:1문의</div>
                  <div class="more-link pretendard-light--mountain-mist-16px" @click="goToContactListManagement()">
                    + 더보기
                  </div>
                </div>
                <table class="course-ranking-table">
                  <thead>
                    <tr>
                      <th>매장</th>
                      <th>1:1문의내용</th>
                      <th>접수 일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="contact in contacts" :key="contact.id">
                      <td>{{ contact.branchName }}</td>
                      <td>{{ contact.content }}</td>
                      <td>{{ contact.createdAt.split("T")[0] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
import { taskStore } from '@/store/taskStore';  // API 호출
import { adminStore } from '@/store/adminStore';  // API 호출

export default {
  name: "AdminDashboard",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      courses: [
        {
          id: 1,
          rank: 1,
          courseName: "스카이뷰CC",
          difficulty: 3,
          bestScore: "68타",
          averageScore: "80타",
        }
      ],
      course_re: [],  // 형변환
      points: [],
      ASs: [],
      contacts: [

      ]
    };
  },
  mounted() {
    this.getScore();
    this.getPoints();
    this.getASdata();
    this.getInquirydata();
  },
  methods: {
    goToCourseManagement() {
      this.$router.push({ path: "/admincourse-management" })
    },
    goToPointManagement() {
      this.$router.push({ path: "/adminpoint-management" })
    },
    goToAsManagement() {
      this.$router.push({ path: "/adminas-management" })
    },
    goToContactListManagement() {
      this.$router.push({ path: "/admincontact-list" })
    },
    isPositiveMoney(money) {
      return money.startsWith("-");
    },
    // 24.12.03 수정 - 추가 : 천 단위 쉼표 함수
    formatAmount(amount) {
      return Number(amount).toLocaleString(); // 쉼표 추가
    },
    statusClass(state) {
      switch (state) {
        case "접수":
          return "status-accepted";
        case "진행중":
          return "status-in-progress";
        case "완료":
          return "status-completed";
        case "취소":
          return "status-pending";
        default:
          return "";
      }
    },
    // 포인트 관리 메서드
    async getPoints() {
      this.points = await adminStore.getTask(`points`);
      console.log("points : : : ", this.points)

      // points 데이터가 제대로 로드되었을 때 slice 적용
      if (this.points && this.points.length > 0) {
        this.points = this.points.slice(0, 5); // 0부터 5번째까지 데이터를 자른다
      }

      this.points = this.points.map(point => {
        if (parseFloat(point.pointTransaction_amount) >= 0) {
          return {
            ...point,
            amount: `+${point.pointTransaction_amount}`
          };
        }
        return point; // Leave the negative values unchanged
      });
      console.log("points : : : ", JSON.stringify(this.points))

    },
    // A/S 메서드
    async getInquirydata() {
      this.contacts = await adminStore.getTask(`inquiries`);
      console.log("inquiries : : : ", this.contacts)

      // 데이터가 존재하면 5개로 자르기
      if (this.contacts && this.contacts.length > 0) {
        this.contacts = this.contacts.slice(0, 5);
      }
    },
    // A/S 메서드
    async getASdata() {
      this.ASs = await adminStore.getTask(`as-requests`);
      console.log("requests : : : ", this.ASs)

      // 데이터가 존재하면 5개로 자르기
      if (this.ASs && this.ASs.length > 0) {
        this.ASs = this.ASs.slice(0, 5);
      }
    },
    // 코스 소개 메서드
    async getScore() {
      this.courses = await adminStore.getTask(`course`);
      console.log("courses : : : ", this.courses)

      // 코스 데이터가 존재하고, 길이가 5개 이상이면 5개로 잘라서 저장
      if (this.courses.length > 0) {
        this.courses = this.courses.slice(0, 5);
      }
      // console.log("courses22222 : : : ", this.courses) 

      // console.log("courses : : : " , JSON.stringify(this.courses))
      console.log("courses  바뀐거: : : ", this.sortedCourses())

      this.course_re = this.sortedCourses()
      console.log("courses  바뀐거: : : ", this.course_re)
    },
    sortedCourses() {
      // Transform difficulty values, convert bestScore to number, and sort
      // console.log("courses 123 : ", courses)
      return this.courses
        .map(course => {
          let difficultyValue;
          switch (course.difficulty) {
            case "Hard":
              difficultyValue = 5;
              break;
            case "Medium":
              difficultyValue = 3;
              break;
            case "Easy":
              difficultyValue = 1;
              break;
          }
          // Convert bestScore to a number
          return { ...course, difficulty: difficultyValue, bestScore: Number(course.bestScore) };
        })
        .sort((a, b) => b.bestScore - a.bestScore);
    }


  },
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

.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}

.board-list-box {
  padding: 30px;
  background-color: #fff;
  /* width: 735px; */
}

.list-box {
  flex-wrap: wrap;
  /* width: 45%; */
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  /* margin: 20px; */
}

.list-box div {
  margin-bottom: 10px;
}

.dashboard_wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
}

.admin-dashboard {
  /* width: 730px; */
  width: 49.3%;
}

.course-ranking-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.course-ranking-table th,
.course-ranking-table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

/* 더보기 링크 스타일 */
.more-link {
  text-align: right;
  margin-top: 10px;
  cursor: pointer;
}

.more-link a {
  text-decoration: none;
}

/* 난이도 별점 스타일 */
.star {
  color: #d30f1a;
}

.empty-star {
  color: #ddd;
}

.positive-money {
  color: #184199;
}

/* 네거티브 금액: 빨간색 */
.negative-money {
  color: #d30f1a;
}

.status-accepted {
  background-color: #14b655;
  /* 접수 */
}

.status-pending {
  background-color: #999;
  /* 취소 */
}

.status-completed {
  background-color: #184199;
  /* 완료 */
}

.status-in-progress {
  background-color: #d30f1a;
  /* 진행중 */
}

.state_box {
  border-radius: 30px;
  width: 100px;
  padding: 5px 0px;
  text-align: center;
}
</style>
