<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">대회 개최</h2>
          </div>
          <!-- 24.11.11 전반적인 font style 변경 -->
          <div class="room-list-box">
            <div class="form-container">
              <!-- 대회이름 -->
              <div class="form-group">
                <label for="region" class="pretendard-regular-normal-mine-shaft-18px">대회이름<span
                    class="red--text">*</span></label>
                <input type="text" id="gameName" class="pretendard-regular-normal-granite-gray-18px"
                  placeholder="대회이름을 입력해주세요" v-model="gameName" />
              </div>

              <!-- 대회일정 -->
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
              <div class="form-group">
                <label for="region" class="pretendard-regular-normal-mine-shaft-18px">대회 매장<span
                    class="red--text">*</span></label>
                <div class="separte-wrap">
                  <!-- 24.12.06 수정 - 추가:고정된 "내 매장" -->
                  <div class="separte">
                    <select class="pretendard-regular-normal-granite-gray-18px" v-model="branchIds[0]" disabled>
                      <option class="pretendard-regular-normal-granite-gray-18px" :value="branchIds[0]">
                        {{ branchIds[0]?.name || "내 매장" }}
                      </option>
                    </select>
                  </div>
                  <!-- 24.12.06 수정 -->
                  <div class="separte" v-for="(branch, index) in branchIds.slice(1)" :key="index + 1">
                    <select class="pretendard-regular-normal-granite-gray-18px" v-model="branchIds[index + 1]">
                      <option class="pretendard-regular-normal-granite-gray-18px" value="">
                        매장명
                      </option>
                      <option class="pretendard-regular-normal-granite-gray-18px"
                        v-for="shop in getFilteredShopOptions(index + 1)" :key="shop.id"
                        :value="{ id: shop.id, name: shop.name }">
                        {{ shop.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- 대회 코스 -->
              <div class="form-group">
                <label for="storeAddress" class="pretendard-regular-normal-mine-shaft-18px">대회 코스<span
                    class="red--text">*</span></label>
                <div class="date">
                  <select class="pretendard-regular-normal-granite-gray-18px" v-model="courseManagement[0]">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="" disabled selected>코스선택</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" v-for="course in courseOptions"
                      :key="course.id" :value="{ id: course.id, name: course.courseName }">
                      {{ course.courseName }}
                    </option>
                  </select>
                </div>
                <div class="date">
                  <select class="pretendard-regular-normal-granite-gray-18px" v-model="courseManagement[1]">
                    <option class="pretendard-regular-normal-granite-gray-18px" value="" disabled selected>코스선택</option>
                    <option class="pretendard-regular-normal-granite-gray-18px" v-for="course in filteredCourseOptions"
                      :key="course.id" :value="{ id: course.id, name: course.courseName }">
                      {{ course.courseName }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- 게임옵션 -->
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
              <div class="form-group">
                <label for="open" class="pretendard-regular-normal-mine-shaft-18px">공개여부<span
                    class="red--text">*</span></label>
                <div class="devide">
                  <!-- 공개여부 옵션 -->
                  <div class="concede-options">
                    <label class="pretendard-regular-normal-granite-gray-18px" v-for="option in openOptions"
                      :key="option">
                      <input type="radio" :value="option" class="pretendard-regular-normal-granite-gray-18px"
                        v-model="status" />
                      {{ option }}
                    </label>
                    <!-- 24.12.06 수정 - 정렬 추가 -->
                    <div class="private-align" v-if="status === '비공개'">
                      <!-- 24.12.06 수정 - 유효성 검사 추가 -->
                      <input type="text" class="pretendard-regular-normal-granite-gray-18px" :maxlength="6"
                        placeholder="비밀번호를 설정해주세요" v-model="password" @input="validatePassword" />
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
              <div class="form-group">
                <label for="scale" class="pretendard-regular-normal-mine-shaft-18px">규칙 및 상품</label>
                <textarea id="rule" v-model="rulesAndPrizes" class="pretendard-regular-normal-granite-gray-18px"
                  placeholder="간단한 규칙과 순위별 상품을 입력해주세요"></textarea>
              </div>


              <!-- 매장사진 -->
              <div class="form-group">
                <label for="photos" class="pretendard-regular-normal-mine-shaft-18px">대회 포스터</label>
                <!-- <input type="file" id="photos" multiple /> 기존 코드 -->
                <input type="file" class="pretendard-regular-normal-mine-shaft-18px" @change="onFileChange" />
              </div>

              <!-- 수정 버튼 -->
              <div class="form-group buttons">
                <button class="pretendard-medium-white-20px" @click="gameWrite">대회등록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";
import axios from "axios";
import { managerStore } from "@/store/managerStore"; // API 호출

export default {
  name: "ManagerGameWrite",
  components: {
    ManagerHeader,
    ManagerNavbar,
  },
  data() {
    return {
      file: null,
      gameName: "",
      rank: "등급",
      gender: "성별",
      errorMessage: "",
      password: "",
      startGameDate: "",
      branchIds: ["", ""],// 초기값으로 두 개의 빈 문자열을 설정
      courseManagement: ["", ""],
      endGameDate: "",
      status: "",
      courseOptions: [],
      shopOptions: [],
      mulliganCount: "1",
      branchUsage: "매장이용",
      ageRange: "나이범위",
      rulesAndPrizes: "",
      concedeDistance: "",
      mulliganOptions: [1, 2, 3],
      concedeDistanceOptions: ["0m", "0.5m", "1.0m", "1.5m", "2m", "3m"],
      openOptions: ["전체공개", "비공개"],
      photoUrl: "",
      startGameTime: "00:00",
      endGameTime: "00:00",
      timeOptions: this.generateTimeOptions(),
    };
  },
  watch: {
    branchIds: {
      handler(newBranchIds) {
        // 모든 요소가 비어있지 않으면 (즉, 모든 select가 선택되어 있으면) 새 빈 문자열 추가
        if (newBranchIds.every(id => id !== "") && newBranchIds.length < this.shopOptions.length) {
          this.branchIds.push("");
        }
      },
      deep: true
    }
  },
  computed: {
    filteredCourseOptions() {
      return this.courseOptions.filter(
        (option) => option !== this.courseManagement[0]
      );
    },
  },
  mounted() {
    //  this.gameWrite();
    this.getGameshop();
    this.getGameCourse();
    //   const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
    // if (managerInfo && managerInfo.name) {
    //   // managerInfo의 name 값이 있을 경우 branchIds의 첫 번째 값으로 설정
    //   const defaultBranch = this.shopOptions.find(
    //     (shop) => shop.name === managerInfo.name
    //   );
    //   if (defaultBranch) {
    //     this.branchIds[0] = { id: defaultBranch.id, name: defaultBranch.name };
    //   }
    // }
  },
  methods: {
    // 24.12.06 수정 - 추가
    validatePassword() {
      // 입력값에서 숫자만 필터링
      const regex = /^\d{6}$/;
      this.errorMessage = !regex.test(this.password)
        ? "비밀번호는 숫자 6자리여야 합니다."
        : null;
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
    async getGameshop() {
      try {
        const response = await managerStore.getTask("v1/branch/list");
        this.shopOptions = response.map((shop) => ({
          id: shop.id,
          name: shop.name,
        }));

        // 매장 목록을 가져온 후 초기 branch 설정
        const managerInfo = JSON.parse(localStorage.getItem("managerInfo"));
        if (managerInfo && managerInfo.identifier) {
          const defaultBranch = this.shopOptions.find(
            (shop) => shop.name === managerInfo.identifier
          );
          if (defaultBranch) {
            this.branchIds[0] = { id: defaultBranch.id, name: defaultBranch.name };
          }
        }
      } catch (error) {
        console.error("매장 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    getFilteredShopOptions(selectedIndex) {
      // return this.shopOptions.filter(
      //   option => !this.branchIds.map(id => id.name).includes(option.name) || this.branchIds[selectedIndex]?.name === option.name
      // );
      // 24.12.06 수정
      return this.shopOptions.filter(
        (shop) =>
          // 이미 선택된 매장은 제외
          !this.branchIds.some((branch, idx) => idx !== selectedIndex && branch?.id === shop.id)
      );
    },
    async getGameCourse() {
      try {
        const response = await managerStore.getTask("course-management");
        this.courseOptions = response.map(course => ({ id: course.id, courseName: course.courseName }));
      } catch (error) {
        console.error("코스 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    validateForm() {
      const errors = [];
// 24.12.06 수정 - 참가옵션 필수 제외
if (!this.gameName) errors.push("대회 이름을 입력해주세요.");
      if (!this.startGameDate) errors.push("대회 시작 날짜를 선택해주세요.");
      if (!this.startGameTime) errors.push("대회 시작 시간을 선택해주세요.");
      if (!this.endGameDate) errors.push("대회 종료 날짜를 선택해주세요.");
      if (!this.endGameTime) errors.push("대회 종료 시간을 선택해주세요.");
      if (!this.mulliganCount) errors.push("멀리건 수를 선택해주세요.");
      if (!this.concedeDistance) errors.push("컨시드 옵션을 선택해주세요.");
      // if (!this.rank || this.rank === "등급") errors.push("참가 등급을 선택해주세요.");
      // if (!this.gender || this.gender === "성별") errors.push("참가 성별을 선택해주세요.");
      // if (!this.branchUsage || this.branchUsage === "매장이용") errors.push("매장 이용 조건을 선택해주세요.");
      // if (!this.ageRange || this.ageRange === "나이범위") errors.push("참가 나이 범위를 선택해주세요.");
      if (!this.status) errors.push("공개여부를 선택해주세요.");
      if (this.status === "비공개" && (!this.password || this.password.length !== 6)) {
        errors.push("비공개 상태일 경우 비밀번호를 숫자 6자리로 설정해주세요.");
      }

      // 오류가 있으면 경고창 표시
      if (errors.length > 0) {
        alert(errors.join("\n")); // 여러 오류를 줄바꿈으로 표시
        return false; // 유효성 검사 실패
      }
      return true; // 유효성 검사 성공
    },
    async gameWrite() {

      if (!this.validateForm()) {
        return; // 유효성 검사가 실패하면 종료
      }

      this.errorMessage = "";
      const params = {
        name: this.gameName,
        startDate: `${this.startGameDate} T${this.startGameTime}`,
        endDate: `${this.endGameDate} T${this.endGameTime}`,
        passWord: this.status === "비공개" ? String(this.password) : '0',
        branchIds: this.branchIds
          .filter(branch => branch && branch.id) // null 또는 undefined 값 제거
          .map(branch => Number(branch.id)),// branchIds 배열에서 id 값만 추출
        courseManagement: this.courseManagement
          .filter(course => course && course.id) // null 또는 undefined 값 제거
          .map(course => Number(course.id)), // courseManagement 배열에서 id 값만 추출
        mulliganCount: this.mulliganCount,
        concedeDistance: parseFloat(this.concedeDistance),
        rank: this.rank,
        gender: this.gender,
        branchUsage: this.branchUsage,
        ageRange: this.ageRange,
        rulesAndPrizes: this.rulesAndPrizes,
        status: this.status === "전체공개" ? "PUBLIC" : "PRIVATE",
        posterUrl: this.photoUrl,

        // "name": "가나다 대회",
        // "startDate": "2024-11-15T00:00:00",
        // "endDate": "2024-11-18T00:00:00",
        // "branchIds": [1,2],
        // "courseManagement": [1,2],
        // "mulliganCount": 3,
        // "concedeDistance": 1.5,
        // "rank": "A",
        // "gender": "남성",
        // "branchUsage": "필수",
        // "ageRange": "20-30",
        // "rulesAndPrizes": "규칙 설명과 상품 목록",
        // "status": "PUBLIC",
        // "posterUrl": "https://example.com/poster.jpg"
      };
      console.log("전송할 데이터:", JSON.stringify(params, null, 2));
      try {
        const response = await managerStore.postTask("competitions", params);
        if (!response || response === undefined) {
          alert("응답 데이터가 없습니다.");
        } else {
          alert("대회 등록이 완료 되었습니다.");
          this.$router.push({ path: "/managergame-managementlist" })
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        alert("예약에 실패했습니다. 서버 오류를 확인하세요.");
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

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  padding: 18px 15px;
  left: 0;
}

/* 24.11.11 수정 - 추가 */
input::placeholder,
textarea::placeholder {
  color: #999;
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

/* .concede-options input[type="radio"] {
} */
.operating-hours .date {
  display: flex;
  gap: 10px;
}

/* 24.11.11 수정 - height 수정 */
.date input {
  width: 250px;
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

.photo {
  position: relative;
}

.events_tab {
  display: flex;
  justify-content: center;
  margin-top: 40px;
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
  padding: 40px;
}

.table {
  width: 1320px;
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

/* 24.12.06 수정 - 추가 */
.error-message {
  display: flex;
  align-items: center;
  color: var(--monza);
  font-size: 12px;
  margin-top: 4px;
}
</style>
