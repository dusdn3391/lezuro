<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">홈페이지 관리</h2>
          </div>
          <!-- 룸 리스트 부분 -->
          <!-- 24.11.11 전체적인 폰트사이즈 변경 -->
          <div class="room-list-box">
            <div class="form-container">
              <!-- 매장 지역 선택 -->
              <div class="form-group">
                <label for="region" class="pretendard-regular-normal-mine-shaft-18px">매장지역</label>
                <input id="region" class="pretendard-regular-normal-mine-shaft-18px" v-model="storeData.region"
                  readonly>
                <!-- <option value="서울" class="pretendard-regular-normal-mine-shaft-18px">서울</option>
                  <option value="경기도" class="pretendard-regular-normal-mine-shaft-18px">경기도</option>
                  <option value="인천" class="pretendard-regular-normal-mine-shaft-18px">인천</option> -->
              </div>

              <!-- 매장명칭 -->
              <div class="form-group">
                <label for="storeName" class="pretendard-regular-normal-mine-shaft-18px">매장명칭</label>
                <input type="text" id="storeName" class="pretendard-regular-normal-mine-shaft-18px" readonly
                  v-model="storeData.storeName" />
              </div>

              <!-- 매장주소 -->
              <div class="form-group">
                <label for="storeAddress" class="pretendard-regular-normal-mine-shaft-18px">매장주소</label>
                <input type="text" id="storeAddress" class="pretendard-regular-normal-mine-shaft-18px" readonly
                  v-model="storeData.address" />
              </div>

              <!-- 전화번호 -->
              <div class="form-group">
                <label for="phone" class="pretendard-regular-normal-mine-shaft-18px">전화번호</label>
                <input type="text" id="phone" class="pretendard-regular-normal-mine-shaft-18px"
                  v-model="storeData.phone" maxlength="11" />
              </div>

              <!-- 무료주차 -->
              <div class="form-group">
                <label for="parking" class="pretendard-regular-normal-mine-shaft-18px">무료주차</label>
                <input type="text" id="parking" class="pretendard-regular-normal-mine-shaft-18px"
                  v-model="storeData.parking" placeholder="무료 주차 여부 입력" />
              </div>

              <!-- 운영시간 -->
              <div class="form-group operating-hours">
                <label class="pretendard-regular-normal-mine-shaft-18px">운영시간</label>
                <div class="hours">
                  <span class="weekday pretendard-regular-normal-mine-shaft-18px">평일</span>
                  <select class="pretendard-regular-normal-mine-shaft-18px" v-model="storeData.weekdayStart">
                    <option class="pretendard-regular-normal-mine-shaft-18px" v-for="time in timeOptions" :key="time"
                      :value="time">{{ time }}</option>
                  </select>
                  ~
                  <select class="pretendard-regular-normal-mine-shaft-18px" v-model="storeData.weekdayEnd">
                    <option class="pretendard-regular-normal-mine-shaft-18px" v-for="time in timeOptions" :key="time"
                      :value="time">{{ time }}</option>
                  </select>
                </div>
                <div class="hours">
                  <span class="holiday pretendard-regular-normal-mine-shaft-18px">주말(휴일)</span>
                  <select class="pretendard-regular-normal-mine-shaft-18px" v-model="storeData.weekendStart">
                    <option class="pretendard-regular-normal-mine-shaft-18px" v-for="time in timeOptions" :key="time"
                      :value="time">{{ time }}</option>
                  </select>
                  ~
                  <select class="pretendard-regular-normal-mine-shaft-18px" v-model="storeData.weekendEnd">
                    <option class="pretendard-regular-normal-mine-shaft-18px" v-for="time in timeOptions" :key="time"
                      :value="time">{{ time }}</option>
                  </select>
                </div>
              </div>

              <!-- 매장규모 -->
              <div class="form-group">
                <label for="scale" class="pretendard-regular-normal-mine-shaft-18px">매장규모</label>
                <input type="text" class="pretendard-regular-normal-mine-shaft-18px" v-model="storeData.roomea" readonly
                  placeholder="게임 룸 갯수를 선택해주세요." />
              </div>

              <!-- 매장사진 -->
              <div class="form-group">
                <label for="photos" class="pretendard-regular-normal-mine-shaft-18px">매장사진</label>
                <input type="file" id="photos" class="pretendard-regular-normal-mine-shaft-18px" multiple
                  @change="onFileChange" />
              </div>
              <div v-if="storeData.mapImage" class="image-preview">
                <img :src="storeData.mapImage" alt="매장 사진 미리보기" class="preview-image" />
              </div>
              <!-- 매장안내 -->
              <div class="form-group">
                <label for="description" class="pretendard-regular-normal-mine-shaft-18px">매장안내</label>
                <textarea id="description" class="pretendard-regular-normal-mine-shaft-18px"
                  v-model="storeData.description" placeholder="매장 특징을 입력하세요"></textarea>
              </div>

              <!-- 수정 버튼 -->
              <div class="form-group buttons">
                <button @click="submitForm" class="pretendard-medium-white-20px">매장수정</button>
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
import { managerStore } from '@/store/managerStore';  // API 호출
import axios from 'axios';

export default {
  name: "ManagerHomepage",
  components: {
    ManagerHeader,
    ManagerNavbar,
  },
  data() {
    return {
      storeData: {
        region: "경기도",
        storeName: "",
        address: "",
        phone: "",
        parking: "",
        weekdayStart: "10:00",
        weekdayEnd: "22:00",
        weekendStart: "10:00",
        weekendEnd: "22:00",
        roomea: "",
        photos: [], // 업로드된 이미지의 URL을 저장할 배열
        description: "",
        coordinates: ''
      },
      timeOptions: this.generateTimeOptions(),
      lat: null,
      lng: null,
      photoUrl: '',
      file: null,
    };
  },

  mounted() {
    const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));

    // this.storeData.region = managerInfo.region
    // this.storeData.storeName = managerInfo.identifier
    // this.storeData.address = managerInfo.address
    // this.storeData.roomea = managerInfo.room
    this.getBranchInfo();
    // this.setRoominsert(1)
    // this.submitForm();
    // this.getCoordinates("서울특별시 강서구 공항대로 242")
  },
  methods: {
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
    async postFile(name, size) {
      console.log("통신 시이작!!!")
      const params = {
        "fileName": name,
        "fileSize": size
      }
      // const roomDt = await managerStore.postTask(`v1/files/upload`,params);

      console.log("this.roomDt : : : : : : ", JSON.stringify(roomDt))
    },
    removePhoto(index) {
      this.storeData.photos.splice(index, 1);
    },
    async getBranchInfo() {
      try {
        const managerInfo = JSON.parse(localStorage.getItem("managerInfo")); // localStorage에서 managerInfo 가져오기
        if (!managerInfo || !managerInfo.id) {
          console.error("Manager ID가 없습니다.");
          return;
        }

        // API 데이터 요청
        const response = await managerStore.getTask(`v1/branch/managerId/${managerInfo.id}`);
        console.log("getBranchInfo 응답 데이터:", response);

        // 가져온 데이터를 storeData에 반영
        if (response) {
          this.storeData.branchId = response.id || "";
          // 24.12.04 수정 - 추가
          this.storeData.region = response.region || "";
          this.storeData.storeName = response.name || "";
          this.storeData.address = response.address || "";
          this.storeData.phone = response.telNumber || "";
          this.storeData.parking = response.freeParking || "";
          this.storeData.mapImage = response.mapImage || "";
          this.storeData.weekdayStart = response.weekdayHours?.split(" ~ ")[0] || "10:00";
          this.storeData.weekdayEnd = response.weekdayHours?.split(" ~ ")[1] || "22:00";
          this.storeData.weekendStart = response.weekendHours?.split(" ~ ")[0] || "10:00";
          this.storeData.weekendEnd = response.weekendHours?.split(" ~ ")[1] || "22:00";
          this.storeData.roomea = response.storeScale || "";
          this.storeData.description = response.description || "";
        } else {
          console.warn("응답 데이터가 비어 있습니다.");
        }
      } catch (error) {
        console.error("getBranchInfo API 호출 오류:", error);
        alert("정보를 불러오는 중 문제가 발생했습니다.");
      }
    },
    async submitForm() {
      if (this.storeData.phone.length === 11) {

        const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
        // const branchId = this.storeData.branchId;
        const params = {
          onDisplay: true,
          telNumber: this.storeData.phone,
          facility: this.storeData.parking,
          // facility: this.storeData.parking,
          mapImage: this.storeData.mapImage,
          description: this.storeData.description,
          freeParking: this.storeData.parking,
          weekdayHours: `${this.storeData.weekdayStart} ~ ${this.storeData.weekdayEnd}`,
          weekendHours: `${this.storeData.weekendStart} ~ ${this.storeData.weekendEnd}`,

          // representativeImage: this.uploadedImageUrls[0]

          // "name": "레저로 부산 강북점12367",
          // "onDisplay": true,
          // "address": "부산 강서구 강서로 12512345678",
          // "telNumber": "05112444568",
          // "facility": "주차 불가능, 와이파이 지원",
          // "mapImage": "https://example.com/map.jpg",
          // "description": "최신 시설과 친절한 직원이 있는 매장입니다.",
          // "region": "서울",
          // "freeParking": "1시간 유료 주차",
          // "weekdayHours": "10:00 ~ 22:00",
          // "weekendHours": "10:00 ~ 22:00",
          // "storeScale": "12",
          // "representativeImage": "https://example.com/representative.jpg",
          // "serial": "BRANCH1234",
          // "payhereToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        };

        console.log("전송할 데이터:", JSON.stringify(params, null, 2));
        try {
          const response = await managerStore.updateTask(`v1/branch/${parseInt(managerInfo.id)}`, params);
          console.log("sdfdsff", params)
          console.log("response 데이터:", JSON.stringify(response));

          alert("매장이 수정이 완료되었습니다.");
          this.getBranchInfo();
        } catch (error) {
          console.error("API 호출 오류:", error);
          alert("등록에 실패했습니다. 서버 오류를 확인하세요.");
        }
      }
      else {
        alert("휴대폰자리를 11자리 입력해주세요")
      }
    },
    async onFileChange(event) {
      const file = event.target.files[0];

      if (!file) {
        console.error("No file selected.");
        return;
      }

      console.log("File details:", file.size, file.name, file.type);

      const params = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      };

      try {
        // Request a pre-signed URL
        const response = await managerStore.postTask("v1/files/presigned-url", params);
        const url = response[0].presignedUrl;
        const uploadedImageUrl = new URL(url).origin + new URL(url).pathname;

        // Set the uploaded image URL to `storeData.mapImage`
        this.storeData.mapImage = uploadedImageUrl;

        // Upload the file to S3
        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        console.log("File uploaded successfully!");
      } catch (error) {
        console.error("Error during file upload:", error);
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
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
  border-radius: 8px;
  /* 모서리 둥글게 */
}

/* 폼 그룹 */
.form-group {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 15px;
}

/* 24.11.11 수정 */
label {
  width: 70px;
}

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  padding: 18px 15px;
}

/* 24.11.11 수정 */
input::placeholder,
textarea::placeholder {
  color: #333;
}

/* 텍스트 영역 */
textarea {
  resize: none;
  height: 120px;
  /* 이미지에서 보이는 높이로 반영 */
}

.operating-hours .hours {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hours span {
  display: inline-block;
}

.photos-preview {
  display: flex;
  gap: 10px;
}

.photo {
  position: relative;
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

/* 수정 버튼 */
.buttons button {
  background-color: #003399;
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

.hours select {
  width: 100px;
}

.image-preview {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 100px;
  margin-bottom: 10px;
}

.preview-image {
  width: 200px;
  height: 100px;
  object-fit: cover;

  border-radius: 5px;
}
</style>
