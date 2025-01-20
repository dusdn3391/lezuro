<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <div class="title-top">
            <h2 class="pretendard-bold-normal-black-28px">
              {{ isEditLocal ? "배너 수정" : "배너 등록" }}
            </h2>
          </div>
          <div class="content-wrap">
            <div class="write-wrap">
              <!-- 제목 입력 -->
              <div class="title-box">
                <!-- 24.11.13 수정 - input,textarea, select font 수정 -->
                <div class="content-title pretendard-medium-black-18px">
                  타이틀
                </div>
                <input
                  type="text"
                  v-model="title"
                  placeholder="타이틀를 입력해주세요"
                  class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px"
                />
              </div>
              <div class="title-box">
                <!-- 24.11.13 수정 - input,textarea, select font 수정 -->
                <div class="content-title pretendard-medium-black-18px">
                  서브 타이틀
                </div>
                <input
                  type="text"
                  v-model="subtitle"
                  placeholder="서브 타이틀를 입력해주세요"
                  class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px"
                />
              </div>
              <div class="title-box">
                <!-- 24.11.13 수정 - input,textarea, select font 수정 -->
                <div class="content-title pretendard-medium-black-18px">
                  링크
                </div>
                <input
                  type="text"
                  v-model="linkurl"
                  placeholder="링크를 입력해주세요"
                  class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px"
                />
              </div>
              <!-- 파일 업로드 -->
              <div class="title-box">
                <div class="content-title pretendard-medium-black-18px">
                  파일
                </div>
                <div class="frame-7487-4">
                  <label for="file-upload" class="file-upload-label">
                    <img
                      class="fluentfolder-20-filled-4"
                      src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/fluent-folder-20-filled-4.svg"
                      alt="fluent:folder-20-filled"
                    />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    @change="onFileChange"
                  />
                  <div
                    class="text-1902 valign-text-middle pretendard-regular-normal-granite-gray-14px"
                  >
                    {{ selectedFileName }}
                  </div>
                </div>
              </div>

              <!-- 버튼들 -->
              <!-- 24.11.13 수정 -font style, align 변경 -->
              <div class="frame-7859-3">
                <button
                  class="cancel-btn pretendard-regular-normal-white-18px"
                  @click="cancel"
                >
                  취소하기
                </button>
                <!-- 24.11.22 수정 - 등록하기로 수정 -->
                <button
                  class="frame-7923-3 pretendard-regular-normal-white-18px"
                  @click="postEventDt"
                >
                  {{ isEditLocal ? "수정하기" : "등록하기" }}
                </button>
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
import { adminStore } from "@/store/adminStore";
import axios from "axios";

export default {
  name: "AdminBannerWrite",
  components: { AdminHeader, AdminNavbar },
  data() {
    return {
      title: "",
      subtitle: "",
      linkurl: "",
      date: "",
      imageUrl: "",
      isEditLocal: false,
      selectedFileName: "",
      file: null,
    };
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false, // 기본값 설정
    },
  },
  mounted() {
  // 쿼리에서 id와 isEdit 값을 가져옵니다.
  const { id, isEdit } = this.$route.query;

  // 받은 값 콘솔 출력
  console.log("mounted: id:", id, "isEdit:", isEdit);

  this.id = id;
  this.isEditLocal = isEdit === "true";

  if (this.isEditLocal && this.id) {
    console.log("mounted: 수정 모드입니다. 데이터를 로드합니다.");
    this.getBannertDt(); // 수정 모드일 경우 데이터 로드
  } else {
    console.log("mounted: 등록 모드입니다.");
  }
},
  methods: {
    async getBannertDt() {
      try {
        const response = await adminStore.getTask(`v1/report/banner/${this.id}`);
        this.title = response[0].title; // 배너 제목
        this.subtitle = response[0].subtitle; // 배너 서브 타이틀
        this.linkurl = response[0].linkurl; // 배너 링크
        this.imageUrl = response[0].bannerImg; 
        this.selectedFileName = response[0].bannerImg.split("/").pop(); // 파일명 추출
        console.log("eddddd",response)
      } catch (error) {
        console.error("배너 상세 데이터를 가져오는 중 오류 발생:", error);
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
      const url = response[response.length - 1]?.presignedUrl;
      console.log("response.file.path : : : : :" + JSON.stringify(url));
      // const url = 'https://lezuro-bk.s3.ap-northeast-2.amazonaws.com/camera.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6CLHNBRW3AA7JQ5Z%2F20241107%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T074211Z&X-Amz-Expires=3600&X-Amz-Signature=dd4176d8288ed964223f471ff745ffec8943120dadf017fc2f373d91588df626&X-Amz-SignedHeaders=host&x-id=PutObject';
      this.imageUrl = new URL(url).origin + new URL(url).pathname;
      console.log("Updated imageUrl:", this.imageUrl);
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
    cancel() {
      this.$router.pusth({ path: "/adminevent-list" });
    },
    async postEventDt() {
      if (!this.title  || !this.linkurl) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
      }

      const params = {
        title: this.title,
        subtitle: this.subtitle,
        bannerImg: this.imageUrl,
        linkurl: this.linkurl,
        status: "visible", // 기본값으로 노출 설정
      };
      console.log("postEventDt: 전송할 데이터:", params);
      try {
        if (this.isEditLocal && this.id) {
          // 수정 요청
          await adminStore.updateTask(`v1/report/${this.id}`, params);
        //   console.log("postEventDt: 서버 응답:", response);
          alert("배너 수정이 완료되었습니다.");
        } else {
          // 등록 요청
          await adminStore.postTask("v1/report", params);
          alert("배너 등록이 완료되었습니다.");
        }

        this.$router.push({ path: "/adminbanner" });
      } catch (error) {
        console.error("배너 처리 실패:", error);
        alert(
          this.isEditLocal
            ? "배너 수정에 실패했습니다."
            : "배너 등록에 실패했습니다."
        );
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
  padding: 18px 66px;
  position: relative;
  width: 200px;
  border: none;
  /* border-radius: 7px; */
}

/* 24.11.13 수정 - width 변경, border-radius 삭제 */
.frame-7923-3 {
  border: none;
  width: 200px;
  /* border-radius: 7px; */
  /* background-color: #001a51; */
  /* 24.12.11 수정 - 배경색 변경 */
  background-color: #184199;
}

.content-title {
  display: flex;
  gap: 10px;
  position: relative;
  width: 150px;
}


/* 24.12.11 수정 - border 겹치는 부분 수정 */
.title-box {
  align-items: center;
  align-self: stretch;
  border-color: var(--celeste);
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  flex: 0 0 auto;
  padding: 20px 20px 20px 0px;
  position: relative;
  width: 100%;
}

/* 24.11.13 수정 -  placeholder 색 변경 */
input::placeholder {
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

.img-pick {
  align-items: center;
  background-color: var(--hint-of-red);
  border: 0.5px solid;
  border-color: var(--celeste);
  display: flex;
  gap: 10px;
  height: 55px;
  width: 90%;
  padding: 0px 20px;
  position: relative;
}

.img-pick label {
  display: flex;
  align-items: center;
  gap: 10px;
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

.frame-7487-4 {
  align-items: center;
  background-color: var(--hint-of-red);
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
  color: #999;
}
</style>

