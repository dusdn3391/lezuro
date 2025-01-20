<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <div class="title-top pretendard-bold-log-cabin-38px">  {{ isEdit ? "FAQ 수정" : "FAQ 작성" }}</div>
          <div class="content-wrap">
            <div class="write-wrap">
              <div class="title-box">
                <div
                  class="content-title valign-text-middle pretendard-medium-black-18px"
                >
                  카테고리
                </div>
                <select
                  name="category"
                  id="category"
                  v-model="selectedCategory"
                  class="category-select pretendard-regular-normal-mine-shaft-16px"
                >
                  <option value="" disabled selected>
                    카테고리를 선택해주세요
                  </option>
                  <option value="서비스">서비스</option>
                  <option value="문의">문의</option>
                  <option value="예약">예약</option>
                  <option value="대회">대회</option>
                  <option value="코스">코스</option>
                  <option value="매장">매장</option>
                  <option value="이용요금">이용요금</option>
                  <option value="단체이용">단체이용</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div class="title-box">
                <div
                  class="content-title valign-text-middle pretendard-medium-black-18px"
                >
                  질문
                </div>
                <input
                  type="text"
                  class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px"
                  placeholder="질문을 입력해주세요"
                  v-model="question"
                />
              </div>
              <div class="content-box">
                <div
                  class="content-title valign-text-middle pretendard-medium-black-18px"
                >
                  응답
                </div>
                <input
                  type="text"
                  class="frame-7281-9 pretendard-regular-normal-mine-shaft-16px"
                  placeholder="응답내용을 입력해주세요"
                  v-model="answer"
                />
              </div>
              <!-- <div class="title-box">
                <div
                  class="content-title valign-text-middle pretendard-medium-black-18px"
                >
                  파일
                </div>
                <div class="img-pick">
                  <label for="file-upload" class="file-label">
                    <img
                      class="fluentfolder-20-filled-4"
                      src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/fluent-folder-20-filled-4.svg"
                      alt="파일 선택"
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
              </div> -->
              <div class="button-container">
                <button
                  class="cancel-button pretendard-medium-white-18px"
                  @click="cancel"
                >
                  취소하기
                </button>
                <button
                  class="submit-button pretendard-medium-white-18px"
                  @click="isEdit ? updateFaq() : submit()"
                >
                {{ isEdit ? "수정하기" : "등록하기" }}
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

export default {
  name: "NoticeWrite",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      //   selectedFileName: "",
      question: "",
      isEdit: false,
      answer: "",
      id: null,
      selectedCategory: "",
      //   imageUrl: "", // 업로드된 파일의 URL 저장
    };
  },
  mounted(){
    this.id = this.$route.query.id; // FAQ ID 가져오기
    this.isEdit = this.$route.query.isEdit === "true"; // 수정 여부 확인
    if (this.isEdit) {
      this.getFaqData(); // 수정 모드일 경우 기존 데이터를 가져옴
    }
  },
  methods: {
    // 등록하기 버튼 클릭 시 호출되는 메서드
    async getFaqData() {
    try {
      const response = await adminStore.getTask(`faqs/${this.id}`);
      console.log("가져온 이벤트 데이터:", response);

      // 가져온 데이터를 컴포넌트 데이터에 할당
      this.selectedCategory = response.group;
      this.question = response.question;
      this.answer = response.answer;
    } catch (error) {
      console.error("이벤트 데이터를 가져오는 중 오류 발생:", error);
    }
  },
    async submit() {
      if (!this.question || !this.answer) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }

      try {
        // POST 요청으로 데이터를 서버에 전송
        const params = {
          question: this.question,
          answer: this.answer,
          //   imageUrl: this.imageUrl,
          group: this.selectedCategory,
        };

        const response = await adminStore.postTask("faqs", params);

        console.log("등록 성공:", response.data);
        alert("등록이 되었습니다");
        this.question = "";
    this.answer = "";
    this.selectedCategory = "";
    this.$router.push({path:"/adminfaq-list"})
      } catch (error) {
        console.error("등록 실패:", error);
        alert("등록에 실패했습니다.");
      }
    },
    async updateFaq() {
      if (!this.question || !this.answer || !this.selectedCategory) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      try {
        const params = {
          question: this.question,
          answer: this.answer,
          group: this.selectedCategory,
        };

        const response = await adminStore.updateTask(`faqs/${this.id}`, params);
        console.log("수정 성공:", response);
        alert("FAQ가 수정되었습니다.");
        this.$router.push({ path: "/adminfaq-list" });
      } catch (error) {
        console.error("FAQ 수정 실패:", error);
        alert("FAQ 수정에 실패했습니다.");
      }
    },
   cancel(){
    this.$router.push({path:"/adminfaq-list"})
   }
    // 파일 업로드 처리
    // async onFileChange(event) {
    //   console.log("통신 하는 중!!!");
    //   // const token = localStorage.getItem("managerToken");
    //   const file = event.target.files[0];
    //   this.file = file;
    //   console.log(file.size);
    //   console.log(file.name);
    //   console.log(file.type);
    //   const params = {
    //     fileName: file.name,
    //     fileSize: file.size,
    //     mimeType: file.type,
    //   };
    //   console.log("통신 하는 중!!!" + JSON.stringify(this.file));

    //   const response = await adminStore.postTask(
    //     "v1/files/presigned-url",
    //     params
    //   );
    //   console.log("response : : : : :" + JSON.stringify(response));

    //   const url = response[0].presignedUrl;
    //   console.log("response.file.path : : : : :" + JSON.stringify(url));
    //   // const url = 'https://lezuro-bk.s3.ap-northeast-2.amazonaws.com/camera.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6CLHNBRW3AA7JQ5Z%2F20241107%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241107T074211Z&X-Amz-Expires=3600&X-Amz-Signature=dd4176d8288ed964223f471ff745ffec8943120dadf017fc2f373d91588df626&X-Amz-SignedHeaders=host&x-id=PutObject';
    //   this.imageUrl = new URL(url).origin + new URL(url).pathname;
    //   try {
    //     // 파일 업로드
    //     // 2. 프리사인 URL을 사용해 S3에 파일을 업로드합니다.
    //     await axios.put(url, file, {
    //       headers: {
    //         "Content-Type": file.type,
    //         // 'Content-Length': file.size
    //       },
    //     });
    //     console.log("File uploaded successfully!");
    //   } catch (error) {
    //     console.error("Error uploading file:", error);
    //   }
  },
};
</script>

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
  /* 24.12.10 수정 - 추가 */
  font-size: 28px;
}
.wrapper {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}
.title {
  padding: 44px 13.5%;
  padding-top: 104px;
}

/* 24.11.13 수정- margin-top 변경 */
.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
}

.cancel-button,
.submit-button {
  width: 200px;
  padding: 18.5px;
  border: none;
  cursor: pointer;
}

.cancel-button {
  background-color: #999;
}

/* 24.12.10 수정 - 배경색 변경 */
.submit-button {
  background-color: #184199;
}

.frame-7782-1 {
  margin-bottom: 140px;
}

.contact-write {
  width: 100%;
}

.write-wrap {
  width: 100%;
}

.title {
  padding: 104px 13.5%;
  padding-bottom: 44px;
}

.cancel-btn {
  align-items: center;
  background-color: var(--mountain-mist);
  display: flex;
  gap: 10px;
  height: 50px;
  justify-content: center;
  padding: 18px 66px;
  position: relative;
  width: 150px;
  border: none;
  border-radius: 7px;
}

.frame-7923-3 {
  border: none;
  border-radius: 7px;
}

.content-title {
  display: flex;
  gap: 10px;
  position: relative;
  width: 150px;
}

.title-box,
.content-box {
  align-items: center;
  align-self: stretch;
  /* 24.12.10 수정 - border-bottom 삭제 */
  /* border-bottom-style: solid;
  border-bottom-width: 1px; */
  border-color: var(--celeste);
  border-top-style: solid;
  border-top-width: 1px;
  display: flex;
  flex: 0 0 auto;
  padding: 20px 20px 20px 0px;
  position: relative;
  width: 100%;
}

/* 24.11.13 수정 - border 겹치는 부분 수정 */
/* .content-box {
  border: none;
} */

/* 24.11.13 수정 -  placeholder 색 변경 */
input::placeholder {
  color: #999;
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
  width: 100%;
  padding: 0px 20px;
  position: relative;
}

.img-pick label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-box select{
    width:100%;
    padding:20px;
    border:1px solid #ddd;
    background-color: var(--hint-of-red);

}
</style>
