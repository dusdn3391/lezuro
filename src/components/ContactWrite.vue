<template>
  <div class="container-center-horizontal">
    <div class="contact-write screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">1:1문의</div>
      <div class="content-wrap">
        <div class="write-wrap">
          <!-- 제목 입력 -->
          <div class="title-box">
            <!-- 24.11.13 수정 - input,textarea, select font 수정 -->
            <div class="content-title pretendard-medium-black-18px">제목</div>
            <input type="text" v-model="title" placeholder="제목을 입력해주세요"
              class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px" />
          </div>

          <!-- 매장 선택 -->
          <div class="select-box">
            <div class="content-title pretendard-medium-black-18px">매장</div>
            <div class="branch-select-container pretendard-regular-normal-mountain-mist-16px">
              <select class="pretendard-regular-normal-mine-shaft-16px" v-model="selectedBranchId" @click="getGameshop">
                <option class="pretendard-regular-normal-mine-shaft-16px" value="" disabled>매장명 선택</option>
                <option class="pretendard-regular-normal-mine-shaft-16px" v-for="shop in shopOptions" :key="shop.id"
                  :value="shop.id">
                  {{ shop.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- 내용 입력 -->
          <div class="content-box">
            <div class="content-title pretendard-medium-black-18px">내용</div>
            <textarea v-model="content" placeholder="내용을 입력해주세요"
              class="frame-7281-9 pretendard-regular-normal-mine-shaft-16px"></textarea>
          </div>

          <!-- 파일 업로드 -->
          <div class="title-box">
            <div class="content-title pretendard-medium-black-18px">파일</div>
            <div class="file-align">
              <div class="frame-7487-4">
                <label for="file-upload" class="file-upload-label">
                  <img class="fluentfolder-20-filled-4"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/fluent-folder-20-filled-4.svg"
                    alt="fluent:folder-20-filled" />
                </label>
                <!-- 24.12.20 수정 - 폰트 추가 -->
                <input id="file-upload" type="file" accept="image/*" @change="onFileChange"
                  class="pretendard-regular-normal-mine-shaft-14px" />
                <div class="text-1902 valign-text-middle pretendard-regular-normal-granite-gray-14px">
                  <!-- {{ selectedFileName }} -->
                  <!-- 24.12.20 수정 -->
                  <!-- {{ selectedFileName || (imageUrl ? imageUrl.split('/').pop() : '파일을 선택해주세요') }} -->
                </div>

              </div>
              <!-- 24.12.20 수정 - 추가 : 미리보기  -->
              <div class="image-preview">
                <img v-if="previewImageUrl" :src="previewImageUrl" alt="미리보기" class="preview-image" />
              </div>
            </div>
          </div>

          <!-- 버튼들 -->
          <!-- 24.11.13 수정 -font style, align 변경 -->
          <div class="frame-7859-3">
            <!-- 24.12.20 수정 - 폰트 수정 -->
            <button class="cancel-btn pretendard-medium-white-18px" @click="cancel">취소하기</button>
            <!-- 24.12.20 수정 - 폰트 수정, class 명 수정 -->
            <button class="submit-btn pretendard-medium-white-18px" @click="postContactDt">확인하기</button>
          </div>
        </div>
      </div>
      <x-footer />
    </div>
  </div>
</template>

<script>
import { taskStore } from "@/store/taskStore";
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
import axios from "axios";

export default {
  name: "ContactWrite",
  components: { Header, RjZsWi, XFooter },
  data() {
    return {
      title: "",
      selectedBranchId: "", // 단일 매장 선택
      shopOptions: [], // 매장 목록
      content: "",
      file: null,
      imageUrl: "", // 업로드된 이미지 URL 저장
      selectedFileName: "",
      previewImageUrl: '', // 24.12.20 수정 - 추가 : 미리보기 이미지 URL
    };
  },
  props: ["rJZsWIProps"],
  mounted() {
    // this.getGameshop();
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginInfo && loginInfo.id) {
      this.loginInfo = loginInfo;
      console.log("초기화된 this.loginInfo:", this.loginInfo);
    } else {
      console.warn("로그인 정보가 없습니다.");
    }
  },
  computed: {
    selectedBranchName() {
      // shopOptions에서 selectedBranchId와 일치하는 매장 이름 찾기
      const selectedShop = this.shopOptions.find(
        (shop) => shop.id === this.selectedBranchId
      );
      return selectedShop ? selectedShop.name : ''; // 매칭된 매장 이름 반환
    },
  },
  methods: {
    async getGameshop() {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("https://13.124.62.68:3000/api/v1/branch/list", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.shopOptions = response.data.map((shop) => ({
          id: shop.id,
          name: shop.name,
        }));
      } catch (error) {
        console.error("매장 데이터를 가져오는 중 오류 발생:", error);
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

      // 24.12.20 수정 - 추가
      this.selectedFileName = file.name

      // 24.12.20 수정 - 추가 : 미리보기 처리
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImageUrl = e.target.result; // 미리보기 이미지 URL 설정
      };
      reader.readAsDataURL(file);

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

    async postContactDt() {
      // 필수 입력 항목 체크
      if (!this.title || !this.content || !this.selectedBranchId) {
        alert("모든 필수 항목을 입력해주세요.");
        return;
      }
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      const userId = loginInfo ? loginInfo.id : null;

      if (!userId) {
        alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
        return;
      }

      try {
        // const params ={}
        console.log("this.imageUr : : :", this.selectedBranchName)

        const params = this.imageUrl
          ? {
            title: this.title,
            content: this.content,
            branchId: parseInt(this.selectedBranchId),
            branchName: this.selectedBranchName,
            userId: parseInt(userId),
            imageUrl: this.imageUrl, // 업로드된 이미지 URL
            user_name: this.loginInfo.name,
          }
          : {
            title: this.title,
            content: this.content,
            branchId: parseInt(this.selectedBranchId),
            branchName: this.selectedBranchName,
            userId: parseInt(userId),
            user_name: this.loginInfo.name,
          };


        console.log("문의 등록 요청 데이터:", params);
        const token = localStorage.getItem("Token");
        const response = await axios.post(
          "https://13.124.62.68:3000/api/inquiries",
          params,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("등록이 완료되었습니다.");

        // 24.11.25 수정 - 추가
        // 폼 초기화
        this.title = "";
        this.content = "";
        this.selectedBranchId = "";
        this.selectedFileName = "";
        this.imageUrl = ""; // 이미지 URL 초기화
        this.file = null; // 파일도 초기화
        // window.location.reload();
        // this.$router.push({ path: "/myprofile" });
        // 24.12.11 수정 - 추가
        this.$router.push({
          path: "/myprofile",
          query: { tab: "1:1 문의내역" }
        });
      } catch (error) {
        console.error("등록 실패:", error);
        alert("등록에 실패했습니다.");
      }
    },

    cancel() {
      this.$router.push({ path: "/myprofile" });
    },
  },
};
</script>


<style scoped src="@/style/cs/contactwrite.css"></style>
