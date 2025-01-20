<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="admin-management-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">점장 관리</h2>
          </div>

          <!-- <div class="search_box">
            <div class="select_box_1">
              
              <select
                class="text-2536 pretendard-regular-normal-mine-shaft-18px"
              >
                <option value="" disabled selected>점장아이디</option>
                <option value="tournament1">park55</option>
                <option value="tournament2">park55 2</option>
                <option value="tournament3">park55 3</option>
              </select>
            </div>
            <div class="select_box_2">
              
              <input
                type="text"
                class="text-2537 pretendard-regular-normal-mountain-mist-18px"
                placeholder="검색어를 입력하세요"
              />
              <img
                class="search-btn-10"
                src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/searchbtn-9.svg"
                alt="searchBtn"
              />
            </div>
          </div> -->

          <!-- 점장 추가 -->
          <div class="admin-management-add">
            <!-- 점장 추가 내역 -->
            <div class="admin-management-history">
              <div class="pretendard-bold-black-24px">   {{ defaultDt.length === 0 ? "점장 추가":"점장수정"}}</div>
              <div class="point-list">
                <div class="form-container">
                  <!-- 매장 지역 선택 -->
                  <div class="form-group">
                    <label for="shop" class="pretendard-regular-normal-mine-shaft-18px">매장지역</label>
                    <div class="shop">
                      <select
  id="shop"
  :disabled="defaultDt.length !== 0"
  v-model="region"
  class="pretendard-regular-normal-granite-gray-18px"
  @change="logSelectedRegion"
>
                        <!-- <option value="" disabled>매장을 선택해주세요</option>
                        <option
                          v-for="branch in branchList"
                          :key="branch.id"
                          :value="branch.name"
                        >
                          {{ branch.name }}
                        </option> -->
                        <!-- 24.12.04 수정 - 추가 -->
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="" selected>전체 지역</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="서울">서울</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="인천">인천</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="대전">대전</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="대구">대구</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="광주">광주</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="울산">울산</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="부산">부산</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="강원">강원</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="경기">경기</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="충북">충북</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="충남">충남</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="전북">전북</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="전남">전남</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="경북">경북</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="경남">경남</option>
                        <option class="pretendard-regular-normal-mine-shaft-18px" value="제주">제주</option>
                      </select>
                    </div>
                  </div>

                  <!-- 매장 명 입력 -->
                  <div class="form-group">
                    <label
                      for="name"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >매장명칭</label
                    >
                    <input
                      type="text"
                      id="name"
                      v-model="identifier"
                      placeholder="매장명칭을 입력해주세요"
                      class="pretendard-regular-normal-granite-gray-18px"
                    />
                  </div>

                  <!-- 매장 주소 입력 -->
                  <div class="form-group">
                    <label
                      for="name"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >매장주소</label
                    >
                    <input
                      type="text"
                      id="address"
                      v-model="address"
                      placeholder="주소를 검색해주세요"
                      class="pretendard-regular-normal-granite-gray-18px"
                      @click="openPostcode"
                      readonly
                    />
                    <!-- <input
                      type="text"
                      v-model="detailAddress"
                      placeholder="상세주소"
                    /> -->
                  </div>

                  <!-- 매장규모 입력 -->
                  <div class="form-group">
                    <label
                      for="name"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >매장규모</label
                    >
                    <input
                      type="text"
                      id="name"
                      v-model="room"
                        :readonly="defaultDt.length !== 0"
                      placeholder="매장규모을 입력해주세요"
                      class="pretendard-regular-normal-granite-gray-18px"
                    />
                  </div>

                  <!-- 점주명 입력 -->
                  <div class="form-group">
                    <label
                      for="name"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >점주명</label
                    >
                    <input
                      type="text"
                      id="name"
                      v-model="name"
                      placeholder="점주명을 입력해주세요"
                      class="pretendard-regular-normal-granite-gray-18px"
                    />
                  </div>

                  <!-- 아이디 입력 -->
                  <div class="form-group">
                    <label
                      for="username"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >아이디</label
                    >
                    <input
                      type="text"
                      id="username"
                      v-model="username"
                            :readonly="defaultDt.length !== 0"
                      placeholder="아이디를 입력해주세요"
                      class="pretendard-regular-normal-granite-gray-18px"
                    />
                  </div>

                  <!-- 비밀번호 입력 -->
                  <div class="form-group">
                    <label
                      for="password"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >비밀번호</label
                    >
                    <input
                      type="password"
                      id="password"
                      v-model="password"
                            :readonly="defaultDt.length !== 0"
                      placeholder="*****************"
                      class="pretendard-regular-normal-granite-gray-18px"
                    />
                  </div>

                  <!-- 등급 선택 -->
                  <div class="form-group">
                    <label
                      for="grade"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >등급</label
                    >
                    <div class="shop">
                      <select
                        id="grade"
                        v-model="grade"
                        class="pretendard-regular-normal-granite-gray-18px"
                      >
                        <option value="" disabled>등급을 선택해주세요</option>
                        <option value="무료">무료</option>
                        <option value="유료">유료</option>
                        <option value="VIP">VIP</option>
                      </select>
                    </div>
                  </div>

                  <!-- 요금제 선택 -->
                  <div class="form-group">
                    <label
                      for="pricingPlan"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >요금제</label
                    >
                    <div class="shop">
                      <!-- 24.12.11 수정 - 무료등급일 경우 선택 안되도록 수정 -->
                      <select id="pricingPlan" v-model="pricingPlan" class="pricingPlan pretendard-regular-normal-granite-gray-18px"
                        :disabled="grade === '무료'">
                        <option value="" disabled>요금제를 선택해주세요</option>
                        <option value="정액제">정액제</option>
                        <option value="종량제">종량제</option>
                        <option value="프리패스">프리패스</option>
                      </select>
                    </div>
                  </div>

                    <!-- 매장규모 입력 -->
                    <div class="form-group"  v-if="pricingPlan === '종량제'">
                    <label
                      for="name"
                      class="pretendard-regular-normal-mine-shaft-18px"
                      >정액 요금</label
                    >
                    <input
                      type="text"
                      id="name"
                      v-model="termPay"
                      placeholder="요금제 금액을 적어주세요."
                      class="pretendard-regular-normal-granite-gray-18px"
                    />
                  </div>

                  <!-- 비용 입력 -->
                  <div class="form-group form_fee_input">
                    <div class="fee_input">
                      <label
                        for="pricePer9Holes"
                        class="pretendard-regular-normal-mine-shaft-18px"
                        >9홀당 비용</label
                      >
                      <input
                        type="text"
                        id="pricePer9Holes"
                        v-model="pricePer9Holes"
                        placeholder="금액을 입력해주세요"
                        class="pretendard-regular-normal-granite-gray-18px"
                      />
                    </div>
                    <div class="fee_input">
                      <label
                        for="pricePerPerson"
                        class="pretendard-regular-normal-mine-shaft-18px"
                        >1인당 비용</label
                      >
                      <input
                        type="text"
                        id="pricePerPerson"
                        v-model="pricePerPerson"
                        placeholder="금액을 입력해주세요"
                        class="pretendard-regular-normal-granite-gray-18px"
                      />
                    </div>
                  </div>
                </div>
              </div>

               <!-- 24.12.12 수정 - 버튼 ui 변경 -->
               <button class="manager-add-btn pretendard-medium-white-20px" @click="addManage()"
                v-if="defaultDt.length === 0">점장추가</button>
              <button class="manager-add-btn pretendard-medium-white-20px" @click="editManage()" v-else>점장수정</button>
              <!-- <div style="
                  width: 100%;
                  height: 50px;
                  background-color: #184199;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                " @click="addManage()" v-if="defaultDt.length === 0">
                <span style="color: white">점장추가</span>
              </div>
              <div style="
                  width: 100%;
                  height: 50px;
                  background-color: #184199;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                " @click="editManage()" v-else>
                <span style="color: white">점장수정</span>
              </div> -->
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
import axios from "axios";
import { taskStore } from "@/store/taskStore";
import { adminStore } from "@/store/adminStore"; // API 호출

export default {
  name: "AdminUserManagement",
  components: {
    AdminHeader,
    AdminNavbar,
  },

  data() {
    return {
      identifier: "",
      username: "",
      password: "",
      role: "Master",
      name: "",
      grade: "",
      detailAddress:"",
      pricingPlan: "",
      pricePer9Holes: 0,
      pricePerPerson: 0,
      // branchList: [{ name: "서울" }, { name: "대구" }, { name: "부산" }],
      defaultDt: [], // 수정 할 데이터
      region: "",
      room: "",
      address: "",
      termPay : "" // 정기 요금
    };
  },
  mounted() {
    // this.getBranch();
    console.log("this.$route.query.key : : : : :: ", this.$route.query.params);
    // console.log("this.defaultDt.length : : : : :: " , this.defaultDt.length)
    if (this.$route.query.params) {
      console.log("여기 타나요???");
      this.defaultDt = this.$route.query.params;
      this.region = this.$route.query.params.region;
      this.identifier = this.$route.query.params.identifier;
      this.name = this.$route.query.params.name;
      this.username = this.$route.query.params.phone;
      this.grade = this.$route.query.params.grade;
      this.room=this.$route.query.params.room;
      this.address=this.$route.query.params.address;
      this.password=this.$route.query.params.password;
      this.pricingPlan = this.$route.query.params.pricingPlan;
      this.pricePer9Holes = this.$route.query.params.pricePer9Holes;
      this.pricePerPerson = this.$route.query.params.pricePerPerson;
      this.termPay = this.$route.query.params.termpay;
    }
  },
  watch: {
    address(newAddress) {
      // address가 변경될 때마다 getCoordinates 호출
      if (newAddress) {
        this.getCoordinates(newAddress);
      }
    },
  },
  methods: {
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.address = data.roadAddress; // 도로명 주소 설정
          console.log("선택된 주소:", data.roadAddress);
        },
        onclose: () => {
          console.log("우편번호 검색 창이 닫혔습니다.");
        },
      }).open();
    },
    // lay,lnt 값 구하기 ( 위도 , 경도)
    async getCoordinates(address) {
      try {
        const apikey = "AIzaSyAGSclEAPdi11Ngo7XEwQb9q7da5PyObqQ";
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apikey}`
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const coordinates = data.results[0].geometry.location;
          console.log("좌표:", JSON.stringify(coordinates));
          return coordinates; // 좌표 반환
        } else {
          console.error("좌표를 찾을 수 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("Geocoding API 요청 중 오류가 발생했습니다:", error);
        return null;
      }
    },
    async setRoominsert(i, managerId) {
      console.log(" I I I I I ", i);
      // const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));

      const params = {
        name: "룸" + i,
        status: "waiting",
        capacity: 5,
        gameType: "golf",
        startTime: "00:00",
        duration: "2h",
        equipment: "MACM14050033",
        course: "벨라스톤",
        hole: "18",
        managerid: parseInt(managerId), // 점장 ID 포함
        room_id: i,
      };
      console.log(" I I I I I ", JSON.stringify(params));

      try {
        const response = await adminStore.postTask("rooms", params);
        if (!response || response === undefined) {
          console.log("응답 데이터가 없습니다.");
        } else {
          console.log("매장이 등록 되었습니다.");
          // window.location.reload();
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        alert("등록에 실패했습니다. 서버 오류를 확인하세요.");
      }
    },
    logSelectedRegion() {
    console.log("선택된 매장 지역:", this.region);
  },
    async addBranch(managerId, lat, lng) {
      const params = {
        name: this.identifier,
        onDisplay: true,
        managerid: parseInt(managerId),
        address: this.address,
        mapImage:
          "https://leisure-ro.com/web/upload/share-image-1-3c6a7087f30092a3bf55de61dc6b9369.jpg", // 디폴트값
        region: this.region,
        weekdayHours: "10:00 ~ 22:00", // 디폴트값
        weekendHours: "10:00 ~ 22:00", // 디폴트값
        storeScale: this.room,
        latitude: lat, // getCoordinates에서 전달된 값
        longitude: lng, // getCoordinates에서 전달된 값
        telNumber: "01012341234",
      };

      try {
        const response = await adminStore.postTask("v1/branch", params);
        console.log("매장 등록 응답:", JSON.stringify(response));

        if (!response) {
          alert("매장이 이미 존재합니다. 룸 추가는 관리자에게 문의해주세요.");
        } else {
          alert("매장이 등록되었습니다.");
          for (var i = 1; i <= parseInt(this.room); i++) {
            console.log("this.storeData.roomea : : :", i);

            await this.setRoominsert(i, managerId);
          }
        }
      } catch (error) {
        console.error("매장 등록 중 오류:", error);
        alert("등록에 실패했습니다. 서버 오류를 확인하세요.");
      }
    },
    async getBranch() {
      // const res = await taskStore.getSelectTasks(`v1/branch/list`);
      const res = await adminStore.getTask(`v1/branch/list`);
      this.branchList = res;
      console.log("RES : : :  ", res);
      console.log("RES : : :  ", JSON.stringify(this.branchList));
      console.log("RES : : :  ", JSON.stringify(this.branchList[0].name));
    },
    async addManage() {
      // 주소를 기반으로 좌표 가져오기
      const coordinates = await this.getCoordinates(this.address);
      if (!coordinates) {
        alert("좌표를 가져오는 데 실패했습니다. 주소를 확인해주세요.");
        return;
      }

      const { lat, lng } = coordinates;
      console.log("termPay : : " , this.termPay)
      // 점장 등록 데이터 준비
      const param = {
        identifier: this.identifier,
        name: this.name,
        phone: this.username,
        password: this.password,
        role: this.role,
        grade: this.grade,
        region: this.region,
        address: this.address,
        termpay : this.termPay,
        room: this.room,
        pricingPlan: this.pricingPlan,
        pricePer9Holes: parseInt(this.pricePer9Holes) || 0,
        pricePerPerson: parseInt(this.pricePerPerson) || 0,
        accountInfo: {
          email: "",
        },
      };
      console.log("termPay : : " , param)

      try {
        // 점장 등록 API 호출
        const res = await adminStore.postTask(`administrators`, param);
        console.log("점장 등록 응답:", JSON.stringify(res));

        if (res && res[0]?.id) {
          const managerId = res[0].id; // 점장 ID 저장
          console.log("점장 ID:", managerId);

          // addBranch 호출 시 좌표와 managerId 전달
          await this.addBranch(managerId, lat, lng);
          alert("점장이 추가되었습니다.");
          this.$router.replace("/adminmanager-management");
        } else {
          alert("점장 등록에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("점장 등록 중 오류:", error);
        alert("통신 중 문제가 발생했습니다.");
      }
    },
    async editManage() {
  // Constructing parameters from the form data
  const param = {
    identifier: this.identifier,
    name: this.name,
    phone: this.username,
    password: this.password,
    role: this.role,
    grade: this.grade,
    pricingPlan: this.pricingPlan,
    pricePer9Holes: parseInt(this.pricePer9Holes) || 0,
    pricePerPerson: parseInt(this.pricePerPerson) || 0,
    accountInfo: {
      email: "",
    },
  };
  console.log("Request Parameters:", JSON.stringify(param));

  // Making an API call with the parameters
  try {
    await adminStore.updateTask(
      `administrators/${parseInt(this.$route.query.params.id)}`,
      param
    );
    console.log("Update successful");

    // 성공적으로 업데이트되었음을 사용자에게 알림
    alert("점장 데이터가 수정되었습니다.");
    this.$router.replace("/adminmanager-management");
  } catch (error) {
    console.error("Error updating manager:", error);
    alert("수정 중 문제가 발생했습니다. 다시 시도해주세요.");
  }
},
  }
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.admin-management-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  flex-direction: row;
}

.wrapper {
  flex-grow: 1;
  padding: 30px;
  gap: 20px;
}

/* 타이틀 박스 */
.title-box {
  width: 100%;
  background-color: #fff;
  padding: 24px 30px;
  margin-bottom: 20px;
}

.form-container {
  background-color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  padding: 18px 15px;
  left: 0;
}

/* 24.12.11 수정 - 비활성화 상태 스타일 */
.pricingPlan:disabled {
  background-color: #ccc;
  /* 비활성화 시 배경색 변경 */
  cursor: not-allowed;
  /* 마우스 커서 변경 */
}

.shop {
  width: 100%;
}

/* 포인트 박스 */
.admin-management-add {
  width: 100%;
  background-color: #fff;
  padding: 30px;
}

.blue {
  background-color: #184199;
}

.yellow {
  background-color: #f4bc1c;
}

.red {
  background-color: #d30f1a;
}

/* 정액제 사용 정보 */
.search_box {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  gap: 10px;
  display: flex;
}

.select_box_1 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  width: 250px;
  border: 1px solid #ddd;
}

.select_box_1 select {
  width: 100%;
}

.select_box_2 {
  align-items: center;
  background-color: var(--blackwhitewhite);
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  width: 1170px;
  border: 1px solid #ddd;
}

/* 네거티브 금액: 빨간색 */
.negative-money {
  color: #d30f1a;
}

.form_fee_input {
  margin-left: 110px;
}

.fee_input {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

/* 24.12.12 수정 - 추가 */
.manager-add-btn {
  width: 100%;
  height: 50px;
  background-color: #184199;
}
</style>
