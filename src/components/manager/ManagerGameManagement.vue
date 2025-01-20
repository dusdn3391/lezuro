<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">대회 관리</h2>
          </div>
          <div class="room-list-box">
            <div class="events_tab">
              <div v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)"
                :class="['tab', { active: selectedTab === tab }]">
                {{ tab }}
              </div>
            </div>
            <div class="form-container" v-if="selectedTab === '대회 정보'">
              <!-- 대회이름 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <label for="region" class="pretendard-regular-normal-mine-shaft-18px">대회이름<span
                    class="red--text">*</span></label>
                <input type="text" id="gameName" class="pretendard-regular-normal-granite-gray-18px"
                  placeholder="대회이름을 입력해주세요" v-model="gameName" />
              </div>
              <!-- 대회일정 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group operating-hours">
                <label for="storeName" class="pretendard-regular-normal-mine-shaft-18px">대회일정<span
                    class="red--text">*</span></label>
                <div class="date">
                  <input type="date" class="pretendard-regular-normal-granite-gray-18px" v-model="startGameDate" />
                  <select class="pretendard-regular-normal-granite-gray-18px" v-model="startGameTime">
                    <option class="pretendard-regular-normal-granite-gray-18px" v-for="time in timeOptions" :key="time"
                      :value="time">
                      {{ time }}
                    </option>
                  </select>
                </div>
                ~
                <div class="date">
                  <input type="date" class="pretendard-regular-normal-granite-gray-18px" v-model="endGameDate" />
                  <select class="pretendard-regular-normal-granite-gray-18px" v-model="endGameTime">
                    <option class="pretendard-regular-normal-granite-gray-18px" v-for="time in timeOptions" :key="time"
                      :value="time">
                      {{ time }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- 대회 매장 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <label for="region" class="pretendard-regular-normal-mine-shaft-18px">대회 매장<span
                    class="red--text">*</span></label>
                <div class="separte-wrap">
                  <div class="separte" v-for="(branchId, index) in branchIds" :key="index">
                    <!-- <select class="pretendard-regular-normal-granite-gray-18px" v-model="branchIds[index]"
                      @change="logBranchIdChange(index)">
                      <option class="pretendard-regular-normal-granite-gray-18px" value="" disabled selected>매장명
                      </option>
                      <option class="pretendard-regular-normal-granite-gray-18px"
                        v-for="shop in getFilteredShopOptions(index)" :key="shop.id" :value="shop.id">
                        {{ shop.name }}
                      </option>
                    </select> -->
                    <!-- 24.12.06 수정 - 추가 : 내 매장 수정 불가 -->
                    <select class="pretendard-regular-normal-granite-gray-18px" v-model="branchIds[index]"
                      :disabled="index === 0" @change="logBranchIdChange(index)">
                      <!-- 옵션 목록 -->
                      <option class="pretendard-regular-normal-granite-gray-18px" value="" disabled selected>
                        {{ index === 0 ? "내 매장" : "매장명" }}
                      </option>
                      <option class="pretendard-regular-normal-granite-gray-18px"
                        v-for="shop in getFilteredShopOptions(index)" :key="shop.id" :value="shop.id">
                        {{ shop.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- 대회 코스 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <label for="storeAddress" class="pretendard-regular-normal-mine-shaft-18px">대회 코스<span
                    class="red--text">*</span></label>
                <div class="date">
                  <select class="pretendard-regular-normal-granite-gray-18px" v-model="courseManagement[0]"
                    @change="logCourseChange(0)">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="" disabled selected>코스선택</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" v-for="course in courseOptions"
                      :key="course.id" :value="course.id">
                      {{ course.courseName }}
                    </option>
                  </select>
                </div>
                <div class="date">
                  <select class="pretendard-regular-normal-granite-gray-18px" v-model="courseManagement[1]"
                    @change="logCourseChange(1)">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="" selected>코스선택</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" v-for="course in filteredCourseOptions"
                      :key="course.id" :value="course.id">
                      {{ course.courseName }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- 게임옵션 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <label for="phone" class="pretendard-regular-normal-mine-shaft-18px">게임옵션<span
                    class="red--text">*</span></label>
                <div class="gameoption">
                  <div class="devide">
                    <label for="mulligan" class="pretendard-regular-normal-mine-shaft-18px">멀리건 수</label>
                    <select id="mulligan" class="pretendard-regular-normal-granite-gray-18px" v-model="mulliganCount">
                      <option class="pretendard-regular-normal-granite-gray-18px" v-for="option in mulliganOptions"
                        :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- 구분선 -->
                  <hr class="divider" />
                  <div class="devide">
                    <!-- 컨시드 옵션 -->
                    <!-- 24.12.06 수정 - 폰트 수정 -->
                    <label for="concede" class="pretendard-regular-normal-mine-shaft-18px">컨시드</label>
                    <div class="concede-options">
                      <label class="pretendard-regular-normal-granite-gray-18px"
                        v-for="option in concedeDistanceOptions" :key="option">
                        <input type="radio" :value="option" class="pretendard-regular-normal-granite-gray-18px"
                          v-model="concedeDistance" />
                        {{ option }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 공개여부 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <label for="open" class="pretendard-regular-normal-mine-shaft-18px">공개여부<span
                    class="red--text">*</span></label>
                <div class="devide">
                  <!-- 공개여부 옵션 -->
                  <div class="concede-options">
                    <label class="pretendard-regular-normal-granite-gray-18px">
                      <input class="pretendard-regular-normal-granite-gray-18px" type="radio" value="PUBLIC"
                        v-model="status" />
                      전체공개
                    </label>
                    <label class="pretendard-regular-normal-granite-gray-18px">
                      <input class="pretendard-regular-normal-granite-gray-18px" type="radio" value="PRIVATE"
                        v-model="status" />
                      비공개
                    </label>
                    <!-- 24.12.06 수정 - 정렬 추가 -->
                    <div class="private-align" v-if="status === 'PRIVATE'">
                      <!-- 24.12.06 수정 - 유효성 검사 추가 -->
                      <input type="text" class="pretendard-regular-normal-granite-gray-18px" placeholder="비밀번호를 설정해주세요"
                        :maxlength="6" v-model="password" @input="validatePassword" />
                      <!-- 24.12.06 수정 - div로 변경, 정렬 수정 -->
                      <div class="pretendard-regular-normal-mine-shaft-18px">
                        비밀번호 숫자 6자리
                      </div>
                      <!-- 24.12.06 수정 - 숫자 이외의 문자 입력시 에러문구 출력 -->
                      <span v-if="errorMessage" class="error-message pretendard-regular-normal-red-18px">
                        {{ errorMessage }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 참가조건 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <!-- 24.12.06 수정- 필수표시 삭제 -->
                <label for="option" class="pretendard-regular-normal-mine-shaft-18px">참가조건</label>
                <div class="option">
                  <!-- 24.12.06 수정- disabled 삭제 -->
                  <select id="grade" class="pretendard-regular-normal-granite-gray-18px" v-model="rank">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="등급" selected>등급</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="1">1</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="2">2</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="3">3</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="4">4</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="5">5</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="6">6</option>
                  </select>
                  ~
                  <!-- 24.12.06 수정- disabled 삭제 -->
                  <select id="gender" class="pretendard-regular-normal-granite-gray-18px" v-model="gender">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="성별" selected>성별</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="남성">남성</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="여성">여성</option>
                  </select>
                  <!-- 24.12.06 수정- disabled 삭제 -->
                  <select id="shop" class="pretendard-regular-normal-granite-gray-18px" v-model="branchUsage">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="매장이용" selected>매장이용
                    </option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="필수">필수</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="선택">선택</option>
                  </select>
                  <!-- 24.12.06 수정- disabled 삭제 -->
                  <select id="age" class="pretendard-regular-normal-granite-gray-18px" v-model="ageRange">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="나이범위" selected>나이범위
                    </option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="10-20">10-20</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="20-30">20-30</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="30-40">30-40</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="40-50">40-50</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="50-60">50-60</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="60-70">60-70</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="70-80">70-80</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" value="80-90">80-90</option>
                  </select>
                </div>
              </div>

              <!-- 규칙&상품 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <label for="scale" class="pretendard-regular-normal-mine-shaft-18px">규칙 및 상품</label>
                <textarea id="rule" v-model="rulesAndPrizes" class="pretendard-regular-normal-granite-gray-18px"
                  placeholder="간단한 규칙과 순위별 상품을 입력해주세요"></textarea>
              </div>

              <!-- 매장사진 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group">
                <label for="photos" class="pretendard-regular-normal-mine-shaft-18px">대회 포스터</label>
                <div class="img-wrap">
                  <input type="file" class="pretendard-regular-normal-mine-shaft-18px" @change="onFileChange" />
                  <!-- 이미지 미리보기 -->
                  <div v-if="posterUrl" class="photo-preview">
                    <img :src="posterUrl" alt="포스터 미리보기" />
                    <!-- <span class="poster-url">{{ posterUrl }}</span> -->
                    <!-- Display the URL or file name here -->
                  </div>
                </div>
              </div>


              <!-- 수정 버튼 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="form-group buttons">
                <button class="pretendard-medium-white-20px" @click="gameEdit">대회수정</button>
              </div>
            </div>

            <!-- 대회 참여 리스트 -->
            <div v-if="selectedTab === '대회 참여 리스트'" class="table_box">
              <table class="table">
                <thead>
                  <tr>
                    <th v-for="(header, index) in CTableHeaders" :key="index" class="pretendard-bold-mine-shaft-18px">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, rowIndex) in paginatedItems" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in user" :key="cellIndex"
                      class="pretendard-regular-normal-granite-gray-18px">
                      <span v-if="cell === '상세보기'" @click="openModal(user)" class="detail-view">
                        {{ cell }}
                      </span>
                      <span v-else>{{ cell }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- 페이징 컨트롤 -->
              <!-- 24.12.06 수정 - 폰트 수정 -->
              <div class="pagination-controls">
                <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                  :class="{ disabled: currentPage === 1 }" />
                <div class="page-numbers pretendard-medium-log-cabin-16px">
               <!-- 24.12.12 수정 - 추가 -->
               <div v-for="page in visiblePages"  :key="page" :class="['page-number', { active: page === currentPage }]"
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
      <AdminUserInfoModal v-if="isModalVisible" :user="selectedUser" @close="closeModal" />
    </div>
  </div>
</template>

<script>
import AdminUserInfoModal from "../admin/AdminUserInfoModal.vue";
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";
import axios from "axios";
import { managerStore } from "@/store/managerStore";
export default {
  name: "ManagerGameManagement",
  components: {
    ManagerHeader,
    ManagerNavbar,
    AdminUserInfoModal,
  },
  props: ["id"],
  data() {
    return {
      gameData: null,
      isModalVisible: false,
      tabs: ["대회 정보", "대회 참여 리스트"],
      CTableHeaders: [
        "번호",
        "아이디",
        "이름",
        "성별",
        "이용매장",
        "이용 게임 수",
        "이용시간",
        "회원정보",
      ],
      posterUrl: "",
      selectedTab: "대회 정보",
      gameName: "",
      rank: "",
      gender: "",
      startGameDate: "",
      branchIds: ["", ""], // 초기값으로 두 개의 빈 문자열을 설정
      courseManagement: ["", ""],
      courseOptions: [],
      shopOptions: [],
      endGameDate: "",
      status: "",
      mulliganCount: "",
      branchUsage: "",
      ageRange: "나이범위",
      rulesAndPrizes: "",
      concedeDistance: "",
      mulliganOptions: [1, 2, 3],
      concedeDistanceOptions: ["0m", "0.5m", "1.0m", "1.5m", "2m", "3m"],
      openOptions: ["전체공개", "비공개"],
      startGameTime: "00:00",
      endGameTime: "00:00",
      timeOptions: this.generateTimeOptions(),
      photoUrl: "",
      users: [],
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5, // Display 6 courses per page
      password: "",
      errorMessage: "", // 24.12.06 수정 - 추가:에러 메시지
    };
  },
  computed: {
    // 24.12.12 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
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
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.users.slice(start, start + this.itemsPerPage);
    },
    filteredCourseOptions() {
      // return this.courseOptions.filter(
      //   (option) => option !== this.courseManagement[0]
      // 24.12.09 수정
      return this.courseOptions.filter(
        (course) => !this.courseManagement.includes(course.id)
      );
    },
  },
  watch: {
    branchIds: {
      handler(newBranchIds) {
        // 모든 요소가 비어있지 않으면 (즉, 모든 select가 선택되어 있으면) 새 빈 문자열 추가
        if (
          newBranchIds.every((id) => id !== "") &&
          newBranchIds.length < this.shopOptions.length
        ) {
          this.branchIds.push("");
        }
      },
      deep: true,
    },
  },
  // created() {
  //   const id = this.$route.params.id;
  //   if (id) {
  //     this.getCompetition(id);
  //   } else {
  //     console.error("ID is missing in route params.");
  //   }
  // },
  // 24.12.09 수정
  async created() {
    try {
      await this.getGameshop(); // shopOptions 로드
      const id = this.$route.params.id;

      if (id) {
        await this.getCompetition(id); // 대회 데이터 로드
        // branchIds 타입을 문자열로 변환
        this.branchIds = this.branchIds.map((id) => String(id));
        // 선택된 매장을 제외
        this.shopOptions = this.shopOptions.filter(
          (shop) => shop.id !== this.selectedShopId
        );
        console.log('this.shopOptions', this.shopOptions)
      } else {
        console.error("ID is missing in route params.");
      }
    } catch (error) {
      console.error("Error during created lifecycle:", error);
    }
  },
  mounted() {
    this.getGameshop();
    this.getGameCourse();
  },
  methods: {
    //     async getParticipantsDt() {
    //   try {
    //     // API 호출
    //     const response = await managerStore.getTask("competitions/users/me/competitions");
    //     console.log("응답 데이터:", response);

    //     // 데이터가 배열로 전달될 경우 그대로 할당
    //     if (Array.isArray(response)) {
    //       this.users = response.map((item, index) => ({
    //         번호: index + 1,
    //         아이디: item.userId,
    //         이름: item.name,
    //         성별: item.gender,
    //         이용매장: item.branchName,
    //         이용게임수: item.gameCount,
    //         이용시간: item.usageTime,
    //         상세보기: "상세보기",
    //       }));
    //     } else {
    //       console.warn("응답 데이터가 예상과 다릅니다:", response);
    //     }
    //   } catch (error) {
    //     console.error("참가자 데이터를 가져오는 중 오류 발생:", error);
    //     alert("참가자 데이터를 불러오는 데 실패했습니다.");
    //   }
    // },

    // 24.12.06 수정 - 추가
    validatePassword() {
      // 입력값에서 숫자만 필터링
      const regex = /^\d{6}$/;
            this.errorMessage  = !regex.test(this.password )
        ? "비밀번호는 숫자 6자리여야 합니다."
        : null;
    },
    logBranchIdChange(index) {
      console.log(`선택된 매장 branchIds[${index}]:`, this.branchIds[index]);
    },
    logCourseChange(index) {
      console.log(`선택된 코스 courseManagement[${index}]:`, this.courseManagement[index]);
    },
    async getCompetition(id) {
      try {
        // ID를 사용하여 서버에서 데이터 가져오기
        const response = await managerStore.getTask(`competitions/${id}`);
        console.log("받아온 response 객체:", response);
             // 24.12.09 수정- 추가
             this.selectedShopId = response.shopId; // 대회와 연결된 매장 ID
        // 가져온 데이터를 컴포넌트의 data 속성에 채우기
        this.gameName = response.name;
        this.startGameDate = response.startDate.substring(0, 10); // 날짜만 추출
        this.endGameDate = response.endDate.substring(0, 10);
        this.startGameTime = response.startDate.substring(11, 16); // 시간만 추출
        this.endGameTime = response.endDate.substring(11, 16);
        this.branchIds = response.branchIds;

         // 24.12.06 수정 - 추가:첫 번째 branchId는 "내 매장"으로 고정
         const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
        if (managerInfo && managerInfo.identifier) {
          const myShop = this.shopOptions.find(
            (shop) => shop.name === managerInfo.identifier
          );
          if (myShop) {
            this.branchIds[0] = myShop.id; // 내 매장 ID
          }
        }

        this.courseManagement = response.courseManagement;
            // 24.12.09 수정
            if (this.courseManagement.length === 1) {
          this.courseManagement.push(""); // 두 번째 선택지를 기본값으로 초기화
        }
        this.branchUsage = response.branchUsage;
        this.mulliganCount = response.mulliganCount;
        this.ageRange = response.ageRange;
        this.rank = response.rank;
        this.gender = response.gender;
        this.rulesAndPrizes = response.rulesAndPrizes;
        this.concedeDistance = `${response.concedeDistance}m`;
        this.posterUrl = response.posterUrl;
        this.status = response.status;

        if (response.posterUrl) {
          this.photoUrl = response.posterUrl;
        }
        // participants 데이터를 users 배열에 매핑
        if (Array.isArray(response.participants)) {
          this.users = response.participants.map((participant, index) => ({
            번호: index + 1,
            아이디: participant.phone,
            이름: participant.name,
            성별: participant.gender,
            이용매장: participant.branchName,
            이용게임수: participant.gameCount,
            이용시간: participant.usageTime,
            상세보기: "상세보기",
          }));

          // 데이터 전송용 전체 정보 저장
          this.participantDetails = response.participants.map((participant) => ({
            birthDay: participant.birthDay,
            phone: participant.phone,
            gender: participant.gender,
            grade: participant.grade,
            name: participant.name,
            email: participant.email,
            createdAt: participant.createdAt,
            branchName: participant.branchName,
            gameCount: participant.gameCount,
            usageTime: participant.usageTime,
            profileImage: participant.profileImage,
          }));
        } else {
          console.warn("participants 데이터가 예상과 다릅니다:", response.participants);
        }
      } catch (error) {
        console.error("대회 정보를 가져오는 중 오류 발생:", error);
        alert("대회 정보를 불러오는 데 실패했습니다.");
      }
    },
    async getGameshop() {
      try {
        const response = await managerStore.getTask("v1/branch/list");
        this.shopOptions = response.map((shop) => ({
          id: shop.id,
          name: shop.name,
        }));
      } catch (error) {
      }
    },
    getFilteredShopOptions(selectedIndex) {
      // return this.shopOptions.filter(
      //   (option) =>
      //     !this.branchIds.map((id) => id.name).includes(option.name) ||
      //     this.branchIds[selectedIndex]?.name === option.name
      // );
      // 24.12.09 수정
      // branchIds 배열에 이미 선택된 ID가 포함되어 있는지 확인
      return this.shopOptions.filter(
        (shop) =>
          !this.branchIds.includes(shop.id) || // 이미 선택된 매장이 아닌 경우
          this.branchIds[selectedIndex] === shop.id // 현재 선택된 매장은 포함
      );
    },
    async getGameCourse() {
      try {
        const response = await managerStore.getTask("course-management");
        this.courseOptions = response.map((course) => ({
          id: course.id,
          courseName: course.courseName,
        }));
      } catch (error) {
      }
    },
    generateTimeOptions() {
      const times = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour.toString().padStart(2, "0");
          const formattedMinute = minute.toString().padStart(2, "0");
          times.push(`${formattedHour}:${formattedMinute}`);
        }
      }
      return times;
    },
    async gameEdit() {
      const params = {
        name: this.gameName,
        startDate: `${this.startGameDate}T${this.startGameTime}`, // 공백 제거
        endDate: `${this.endGameDate}T${this.endGameTime}`, // 공백 제거
        branchIds: this.branchIds
          .filter(branch => branch)
          .map(branch => Number(branch)),
        courseManagement: this.courseManagement
          .filter(course => course)
          .map(course => Number(course)),
        mulliganCount: this.mulliganCount,
        concedeDistance: parseFloat(this.concedeDistance),
        rank: this.rank,
        gender: this.gender,
        branchUsage: this.branchUsage,
        ageRange: this.ageRange,
        rulesAndPrizes: this.rulesAndPrizes,
        status: this.status || (this.status === "PUBLIC" ? "PUBLIC" : "PRIVATE"),
        passWord: this.status === "PRIVATE" ? String(this.password) : '0',
        posterUrl: this.photoUrl,
      };

      console.log("전송할 데이터:", JSON.stringify(params, null, 2));

      try {
        // 데이터 전송 시도
        await managerStore.updateTask(`competitions/${this.id}`, params);

        // 서버 응답 없이도 성공했다고 가정
        alert("대회 수정이 완료되었습니다."); // 수정 완료 알림
        this.$router.push({ path: "/managergame-managementlist" }); // 페이지 이동
      } catch (error) {
        console.error("수정 오류:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");

      }
    },
    async onFileChange(event) {
      console.log("통신 하는 중!!!");
      const token = localStorage.getItem("managerToken");
      const file = event.target.files[0];
      this.file = file;
      console.log(file.size);
      console.log(file.name);
      console.log(file.type);
      const params = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      };
      console.log("통신 하는 중!!!" + JSON.stringify(this.file));

      const response = await managerStore.postTask(
        "v1/files/presigned-url",
        params
      );
      console.log("response : : : : :" + JSON.stringify(response));

      const url = response[0].presignedUrl;
      console.log("response.file.path : : : : :" + JSON.stringify(url));
      // const url = 'https://lezuro-bk.s3.ap-northeast-2.amazonaws.com/camera.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6CLHNBRW3AA7JQ5Z%2F20241107%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T074211Z&X-Amz-Expires=3600&X-Amz-Signature=dd4176d8288ed964223f471ff745ffec8943120dadf017fc2f373d91588df626&X-Amz-SignedHeaders=host&x-id=PutObject';
      this.photoUrl = new URL(url).origin + new URL(url).pathname;
      try {
        // 파일 업로드
        // 2. 프리사인 URL을 사용해 S3에 파일을 업로드합니다.
        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
            // 'Content-Length': file.size
          },
        });
        console.log("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    openModal(user) {
      const participantData = this.participantDetails.find(
        (participant) => participant.phone === user.아이디
      );
      if (participantData) {
        this.selectedUser = participantData; // 상세 데이터를 모달에 전달
        this.isModalVisible = true;
      } else {
        console.warn("선택된 유저의 상세 데이터를 찾을 수 없습니다:", user);
      }
      console.log("선택된 유저 상세 데이터:", this.selectedUser);
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedUser = null; // 모달을 닫고 선택된 유저 정보 초기화
    },
    selectTab(tab) {
      this.selectedTab = tab;
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

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.reservation-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  flex-direction: row;
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
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}

/* 방 리스트 박스 */
.room-list-box {
  width: 100%;
  flex-wrap: wrap;
  gap: 30px;
  background-color: #fff;
  padding: 15px 30px;
}

/* 폼 컨테이너 */
.form-container {
  background-color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #ddd;
}

/* 폼 그룹 */
.form-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* 입력 필드와 레이블을 가로로 정렬 */
  gap: 30px;
  /* 레이블과 입력 필드 사이의 간격 */
  margin-bottom: 15px;
}

.form-group label {
  white-space: nowrap;
  /* 라벨이 여러 줄로 분리되지 않도록 함 */
  width: 80px;
  /* 모든 label의 너비를 100px로 고정 */
  min-width: 80px;
  /* 최소 너비를 100px로 고정 */
  display: inline-block;
}

.red--text {
  color: #d30f1a;
  /* * 표시 색상 빨간색 */
}

.img-wrap {
  width: 100%;
}

.img-wrap img {
  width: 140px;
  height: 100px;
}

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  padding: 18px 15px;
  left: 0;
}

select {
  width: 250px;
}

/* 텍스트 영역 */
textarea {
  resize: none;
  height: 120px;
  /* 이미지에서 보이는 높이로 반영 */
}

.divider {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 10px 0;
}

.concede-options {
  /* 24.12.06 수정 - 추가 */
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
}

.concede-options label {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 24.12.06 수정 - 추가 */
.private-align {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
}

/* 24.12.06 수정 - 추가 */
.private-align input {
  width: 30%;
}

/* 24.12.06 수정 - 추가 */
.error-message {
  display: flex;
  align-items: center;
  color: var(--monza);
  font-size: 12px;
  margin-top: 4px;
}

/* .concede-options input[type="radio"] {
} */
.operating-hours .date {
  display: flex;
  gap: 10px;
}

.date input {
  width: 250px;
  /* 24.12.06 수정 */
  height: 60px;
  border: 1px solid #ddd;
  /* margin: 12px; */
  /* padding: 0 20px; */
}

.hours span {
  display: inline-block;
  width: 200px;
}

.photos-preview {
  display: flex;
  gap: 10px;
}

.separte-wrap {
  width: 100%;
}

.separte {
  width: 100%;
  display: block;
  margin-top: 10px;
}

.separte select {
  width: 100%;
}

.photo {
  position: relative;
}

.events_tab {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.tab {
  line-height: 100%;
  width: 100%;
  padding: 23px 0px;
  text-align: center;
  cursor: pointer;
  color: #666666;
  background-color: #f5f6f6;
}

.tab:hover {
  background-color: #fff;
}

.tab.active {
  width: 100%;
  border: 1px solid #ddd;
  margin-bottom: -2px;
  background-color: #fff;
  border-bottom: 2px solid #fff;
  position: relative;
  z-index: 2;
  color: #222222;
  font-family: "Pretendard-Bold";
}

.gameoption {
  border: 1px solid #ddd;
  width: 100%;
  padding: 15px 40px;
  /* 24.12.06 수정 - 추가 */
  display: grid;
  gap: 10px;
}

.gameoption .devide {
  display: flex;
  align-items: center;
}

/* 24.12.06 수정 - 추가 */
.devide {
  width: 100%;
  display: flex;
  align-items: center;
}

.option {
  display: flex;
  align-items: center;
  gap: 20px;
}

.photo img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  /* 이미지처럼 모서리를 둥글게 */
}

.photo button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
}

th,
td {
  text-align: center;
  width: 220px;
  padding: 20px 0px !important;
}

td {
  border-bottom: 0.5px solid #cccccc !important;
}

th {
  background-color: #f5f6f6;
}

.table_box {
  border: 1px solid #ccc;
  padding: 40px;
}

.table {
  width: 100%;
}

/* 수정 버튼 */
.buttons button {
  background-color: #184199;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  /* 버튼의 너비를 이미지에 맞춤 */
  margin-top: 20px;
  text-align: center;
}

.detail-view {
  border: 1px solid #184199;
  /* 원하는 테두리 색상 */
  color: #184199;
  padding: 11px 15px;
  /* 테두리 안쪽 여백 */
  border-radius: 5px;
  /* 테두리 둥글게 */
  cursor: pointer;
  /* 클릭 가능한 것처럼 커서 변경 */
  display: inline-block;
  /* 크기 조정을 위한 블록 요소 */
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* 24.12.12 수정 - 추가 */
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

/* 24.12.12 수정 - 추가 */
.page-number.active {
  background-color: #d30f1a;
  color: white;
}

/* 24.12.12 수정 - 추가 */
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

.photo-preview {
  margin-top: 20px;
}
</style>
