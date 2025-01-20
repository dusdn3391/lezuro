<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <div class="title-top">
            <h2 class="pretendard-bold-normal-black-28px">
              {{ isEdit ? "이벤트 수정" : "이벤트 등록" }}
            </h2>
          </div>
          <div class="content-wrap">
            <div class="write-wrap">
              <!-- 제목 입력 -->
              <div class="title-box">
                <!-- 24.11.13 수정 - input,textarea, select font 수정 -->
                <div class="content-title pretendard-medium-black-18px">제목</div>
                <input type="text" v-model="title" placeholder="제목을 입력해주세요"
                  class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px" />
              </div>

              <!-- 날짜 입력 -->
              <div class="title-box">
                <div class="content-title pretendard-medium-black-18px">날짜</div>
                <div class="date">
                  <input type="date" class="pretendard-regular-normal-mine-shaft-16px" v-model="startEventDate" />
                  <input type="date" class="pretendard-regular-normal-mine-shaft-16px" v-model="endEventDate" />
                </div>
              </div>

              <!-- 24.12.12 수정 - 내용 입력 추가 -->
              <!-- 내용 입력 -->
              <div class="title-box">
                <div class="content-title pretendard-medium-black-18px">내용</div>
                <textarea class="content-box-textarea pretendard-regular-normal-mine-shaft-16px"  v-model="content" placeholder="내용을 입력해주세요"></textarea>
               </div>

             <!-- 파일 업로드 -->
             <div class="content-box">
                <div class="content-title pretendard-medium-black-18px">파일</div>
                <div class="frame-7487-4">
                  <label for="file-upload" class="file-upload-label">
                    <img class="fluentfolder-20-filled-4"
                      src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/fluent-folder-20-filled-4.svg"
                      alt="fluent:folder-20-filled" />
                  </label>
                  <input id="file-upload" type="file" accept="image/*" @change="onFileChange" class="pretendard-regular-normal-mine-shaft-16px"                   />
                  <div class="text-1902 valign-text-middle pretendard-regular-normal-granite-gray-14px">
                    {{ selectedFileName }}
                  </div>
                </div>
              </div>

              <!-- 버튼들 -->
              <!-- 24.11.13 수정 -font style, align 변경 -->
              <div class="frame-7859-3">
                <button class="cancel-btn pretendard-medium-white-20px" @click="cancel">취소하기</button>
                <!-- 24.11.22 수정 - 등록하기로 수정 -->
                <button class="frame-7923-3 pretendard-medium-white-20px" @click="postEventDt"> {{ isEdit ? "수정하기" : "등록하기" }}</button>
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
import { adminStore } from '@/store/adminStore';
import axios from "axios";

export default {
  name: "EventWrite",
  components: { AdminHeader, AdminNavbar },
  data() {
    return {
      title: "",
      startEventDate: "",
      endEventDate: "",
      content: "", // 24.12.12 수정 - 추가
      file: null,
      imageUrl: "", // 업로드된 이미지 URL 저장
      selectedFileName: "",
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.isEdit = this.$route.query.idEdit === "true";
    if (this.isEdit) {
    this.getEventData(); // 수정 모드일 경우 기존 데이터를 가져옵니다.
  }
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

    this.loginInfo = loginInfo || {};
    console.log("초기화된 this.loginInfo:", this.loginInfo);
  },
  methods: {
    async getEventData() {
    try {
      const response = await adminStore.getTask(`events/${this.id}`);
      console.log("가져온 이벤트 데이터:", response);

      // 가져온 데이터를 컴포넌트 데이터에 할당
      this.title = response.title;
      this.startEventDate = response.startTime?.split("T")[0];
      this.endEventDate = response.endTime?.split("T")[0];
      this.content = response.content; // 24.12.12 수정 - 추가
      this.imageUrl = response.imageUrl;
      this.selectedFileName = response.imageUrl.split("/").pop(); // 파일명 추출
    } catch (error) {
      console.error("이벤트 데이터를 가져오는 중 오류 발생:", error);
    }
  },
    async onFileChange(event) {
      console.log("통신 하는 중!!!");
      // const token = localStorage.getItem("managerToken");
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

      const response = await adminStore.postTask(
        "v1/files/presigned-url",
        params
      );
      console.log("response : : : : :" + JSON.stringify(response));

      const url = response[0].presignedUrl;
      console.log("response.file.path : : : : :" + JSON.stringify(url));
      // const url = 'https://lezuro-bk.s3.ap-northeast-2.amazonaws.com/camera.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6CLHNBRW3AA7JQ5Z%2F20241107%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T074211Z&X-Amz-Expires=3600&X-Amz-Signature=dd4176d8288ed964223f471ff745ffec8943120dadf017fc2f373d91588df626&X-Amz-SignedHeaders=host&x-id=PutObject';
      this.imageUrl = new URL(url).origin + new URL(url).pathname;
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
    cancel(){
      this.$router.pusth({path:"/adminevent-list"})
    },
    async postEventDt() {
    // 필수 입력 항목 체크
    if (!this.title) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const params = {
        title: this.title,
        startTime: this.startEventDate,
        endTime: this.endEventDate,
        content: this.content, // 24.12.12 수정  - 추가
        imageUrl: this.imageUrl, // 업로드된 이미지 URL
      };

      if (this.isEdit) {
        // 수정 요청
        await adminStore.updateTask(`events/${this.id}`, params);
        alert("이벤트 수정이 완료되었습니다.");
      } else {
        // 새 이벤트 등록 요청
        await adminStore.postTask("events", params);
        alert("이벤트 등록이 완료되었습니다.");
      }

      this.$router.push({ path: "/adminevent-list" });
    } catch (error) {
      console.error("이벤트 처리 실패:", error);
      alert(this.isEdit ? "이벤트 수정에 실패했습니다." : "이벤트 등록에 실패했습니다.");
    }
  },
  },
};
</script>

<style>
.branch-select-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

/* 24.11.13 수정- margin-top 변경 */
.frame-7859-3 {
  top: 20px;
  display: flex;
  gap: 10px;
  margin-top: 50px;
  justify-content: center;
  width: 100%;
}
</style>
<style scoped>
.reservation-container {
  display: flex;
  height: 100%;
  flex-direction: row;
  background: #f5f6f6;
}

.title-top {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}

.wrapper {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}

.contact-write {
  width: 100%;
}

.write-wrap {
  width: 100%;
}

.title {
  padding-bottom: 44px;
}

/* 24.11.13 수정 - width 변경, border-radius 삭제 */
.cancel-btn {
  align-items: center;
  background-color: var(--mountain-mist);
  display: flex;
  gap: 10px;
  height: 50px;
  justify-content: center;
  position: relative;
  width: 200px;
  border: none;
  /* border-radius: 7px; */
}

/* 24.11.13 수정 - width 변경, border-radius 삭제 */
.frame-7923-3 {
  border: none;
  width: 200px;
  /* 24.12.12 수정 */
  padding: 0;
  /* border-radius: 7px; */
  /* 24.12.12 수정 - 배경색 변경 */
  background-color: #184199;
}

.content-title {
  display: flex;
  gap: 10px;
  position: relative;
  width: 150px;
}

/* 24.12.12 수정 */
.title-box {
  align-items: center;
  align-self: stretch;
  border-top : 1px solid #ccc;
  display: flex;
  flex: 0 0 auto;
  padding: 20px 20px 20px 0px;
  position: relative;
  width: 100%;
}

/* 24.12.12 수정 */
.content-box {
  align-items: center;
  align-self: stretch;
  border-top : 1px solid #ccc;
  border-bottom : 1px solid #ccc;
  display: flex;
  flex: 0 0 auto;
  padding: 20px 20px 20px 0px;
  position: relative;
  width: 100%;
}

.date {
  width: 100%;
}

/* 24.12.12 수정 */
.date input {
  /* display: block; */
  width: 100%;
  height: 60px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  padding: 10px;
}

.date input:nth-child(2) {
  margin-top: 20px;
}

/* 24.12.12 수정 - 추가 */
.content-box-textarea {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  background-color: #fafafa;
  resize: none;
  padding: 20px;
}

/* 24.11.13 수정 -  placeholder 색 변경 */
input::placeholder,
textarea::placeholder {
  color: #999;
}

.write-wrap {
  border: 1px solid #dddddd;
  padding: 40px;
}

.content-wrap {
  align-items: center;
  display: flex;
  gap: 10px;
  padding: 30px;
  position: relative;
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
}

.frame-7281-8 {
  background-color: #fafafa;
  padding: 20px;
  width: 100%;
  border: 0.5px solid #ddd;
}

.frame-7281-9 {
  background-color: #fafafa;
  padding: 20px;
  width: 100%;
  border: 0.5px solid #ddd;
  height: 200px;
}

/* 24.12.12 수정 */
.frame-7487-4 {
  align-items: center;
  background-color: #fafafa;
  border: 0.5px solid;
  border-color: var(--celeste);
  display: flex;
  gap: 10px;
  height: 55px;
  padding: 0px 20px;
  position: relative;
  width: 100%;
}

.select-container {
  width: 100%;
}

.branch-select-container select {
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fafafa;
  color: #999
}
</style>
<style scoped src="@/style/cs/contactwrite.css"></style>