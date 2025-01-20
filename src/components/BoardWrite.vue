<template>
  <div class="container-center-horizontal">
    <div class="communitywrite-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">자유게시판</div>
      <div class="frame-7782-1">
        <div class="frame-7857-7">
          <div class="title-box">
            <div class="content-title pretendard-medium-black-18px">
              제목
            </div>
            <!-- 24.12.19 수정 - 폰트 추가 -->
            <input type="text" class="frame-7281-8 pretendard-regular-normal-mountain-mist-16px"
              placeholder="제목을 입력해주세요" v-model="title" />
          </div>
          <div class="content-box">
            <div class="content-title pretendard-medium-black-18px">
              내용
            </div>
            <!-- 24.12.19 수정 - 폰트 추가, textarea 로 변경 -->
            <textarea type="text" class="frame-7281-9 pretendard-regular-normal-mountain-mist-16px"
              placeholder="내용을 입력해주세요" v-model="content" />
          </div>
          <!-- 24.11.26 수정 -->
          <div class="title-box file-box">
            <div class="content-title pretendard-medium-black-18px">
              파일
            </div>
            <div class="file-align">
              <div class="frame-7487-4">
                <!-- 24.12.19 수정 - 폰트 추가 -->
                <label for="file-upload" class="file-upload-label pretendard-regular-normal-mountain-mist-16px">
                  <img class="fluentfolder-20-filled-4"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/fluent-folder-20-filled-4.svg"
                    alt="파일 선택" />
                  <input id="file-upload" type="file" accept="image/*" @change="handleFileUpload" class="file-input"
                    style="display: none;" />
                  <div class="text-1902 valign-text-middle pretendard-regular-normal-granite-gray-14px">
                    <!-- {{ selectedFileName }} -->
                    <!-- 24.11.26 수정 -->
                    {{ selectedFileName || (imageUrl ? imageUrl.split('/').pop() : '파일을 선택해주세요') }}
                  </div>

                </label>

              </div>
              <!-- 24.12.19 수정 - 추가 : 미리보기  -->
              <div class="image-preview">
                <img v-if="previewImageUrl" :src="previewImageUrl" alt="미리보기" class="preview-image" />
              </div>
            </div>
          </div>

          <div class="frame-7859-3">
            <!-- 24.11.22 수정 - 취소시 목록으로 이동 -->
            <!-- 24.12.19 수정 - 폰트 수정 -->
            <button class="cancel-btn pretendard-medium-white-18px" @click="toGoBoardList">
              취소하기
            </button>
            <!-- 24.12.19 수정 - 폰트 수정, class 명 수정 -->
            <button class="submit-btn pretendard-medium-white-18px" @click="submit">
              <!-- 24.11.26 수정 -->
              {{ isEditing ? "수정하기" : "등록하기" }}
            </button>
          </div>
        </div>
      </div>
      <x-footer />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import { taskStore } from "@/store/taskStore";
import axios from "axios";

export default {
  name: "BoardWrite",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  // 24.11.26 수정 - id 추가
  props: ["rJZsWIProps", "id"],
  data() {
    return {
      selectedFileName: "",
      title: "",
      content: "",
      imageUrl: "",
      // author: localStorage.getItem("userName") || "",
      author: "", // 24.11.20 수정
      isEditing: false, // 24.11.26 수정 - 추가
      userId: 0,
      previewImageUrl: '', // 24.12.19 수정 - 추가 : 미리보기 이미지 URL
    };
  },
  mounted() {
    // // 만약 mounted에서 다시 초기화가 필요하다면 아래와 같이 사용 가능
    // this.author = localStorage.getItem("userName") || "";
    // console.log("Author Name (from localStorage):", this.author);

    // 24.11.20 수정
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    // 만약 mounted에서 다시 초기화가 필요하다면 아래와 같이 사용 가능
    // this.author = loginInfo.name;
    // 24.12.09 수정 - 추가:작성자 - 닉네임으로 변경
    this.author = loginInfo.userName;
    this.userId = parseInt(loginInfo.id);
    console.log("Author Name (from localStorage):", this.author);
  },
  // 24.11.26 수정 - 추가
  async created() {
    const { id } = this.$route.query; // query에서 id 추출
    if (id) {
      this.isEditing = true; // 수정 상태로 변경
      await this.loadBoardData(id); // 서버에서 데이터를 가져옴
    }
  },
  methods: {
    // 24.11.22 수정 - 추가
    toGoBoardList() {
      this.$router.push({ path: "/board-list" });
    },
    // 24.11.26 수정 - 추가
    // 기존 자유게시판 데이터 로드 (수정 시)
    async loadBoardData(id) {
      try {
        const response = await taskStore.getSelectTasks(`posts/${id}`);
        console.log('br response', response)

        this.title = response[0].post_title;
        this.content = response[0].post_content;
        this.imageUrl = response[0].post_imageUrl;
        this.views = response[0].post_views;
      } catch (error) {
        console.error("자유게시판 데이터를 불러오는 데 실패했습니다:", error);
        alert("데이터를 불러오지 못했습니다.");
      }
    },
    async submit() {
      if (!this.title || !this.content) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }


      // POST 요청으로 데이터를 서버에 전송
      const params = {
        title: this.title,
        content: this.content,
        author: this.author,
        imageUrl: this.imageUrl ? this.imageUrl : null, // 24.11.26 수정 - 이미지가 있으면 사용, 없으면 null
        user_id: this.userId,
        views: this.views
      };

      // 24.11.26 수정
      try {
        // 24.11.26 수정 - 추가
        if (this.isEditing) {
          const id = this.$route.query.id; // URL에서 id를 추출
          console.log('id 123', id)
          const response = await taskStore.putTask(`posts/${id}`, params);

          console.log('수정 data', params)
          console.log('수정 response 1', response)
          alert("수정이 되었습니다");

        } else {
          const response = await taskStore.postTask("posts", params);

          console.log("등록 성공:", response.data);
          alert("등록이 되었습니다");
        }

        this.$router.push({ path: "/board-list" });
      } catch (error) {
        console.error("등록 실패:", error);
        alert("등록에 실패했습니다.");
      }
    },

    async handleFileUpload(event) {
      console.log("통신 하는 중!!!");
      // const token = localStorage.getItem("managerToken");
      const file = event.target.files[0];
      this.file = null;
      this.file = file;

      // 24.12.19 수정 - 추가 : 파일 이름 표시
      this.selectedFileName = file.name;

      // 24.12.19 수정 - 추가 : 미리보기 처리
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImageUrl = e.target.result; // 미리보기 이미지 URL 설정
      };
      reader.readAsDataURL(file);

      console.log(file.size);
      console.log(file.name);
      console.log(file.type);
      const params = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      };
      console.log("통신 하는 중!!!" + JSON.stringify(this.file));

      // const response = await taskStore.postTask(
      //   "v1/files/presigned-url",
      //   params
      // );
      const token = localStorage.getItem("Token");

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ` + token
        },
      };
      const response = await axios.post("https://13.124.62.68:3000/api/v1/files/presigned-url", params, config);
      // response = response.data
      console.log("response : : : : :" + JSON.stringify(response));

      const url = response.data.presignedUrl;
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
  },
};
</script>

<style scoped src="@/style/community/boardwrite.css"></style>
