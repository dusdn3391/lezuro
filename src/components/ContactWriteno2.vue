<template>
  <div class="container-center-horizontal">
    <div class="swingwrite-2 screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="title pretendard-bold-log-cabin-38px">스윙영상</div>
      <div class="frame-7782-1">
        <div class="frame-7857-7">
          <div class="title-box">
            <!-- 24.11.11 수정 - input,textarea font 수정 -->
            <div class="content-title valign-text-middle pretendard-medium-black-18px">
              제목
            </div>

            <input type="text" class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px" v-model="title"
              placeholder="제목을 입력해주세요" />
          </div>
          <div class="content-box">
            <div class="content-title valign-text-middle pretendard-medium-black-18px">
              내용
            </div>
            <!-- 24.12.19 수정 - input - textarea 로 변경  -->
            <textarea type="text" class="frame-7281-9 pretendard-regular-normal-mine-shaft-16px" v-model="description"
              placeholder="내용을 입력해주세요"></textarea>
          </div>
          <div class="title-box">
            <div class="content-title valign-text-middle pretendard-medium-black-18px">
              파일
            </div>
            <div class="frame-7487-4">
              <label for="file-upload" class="file-upload-label">
                <img class="fluentfolder-20-filled-4"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/fluent-folder-20-filled-4.svg"
                  alt="fluent:folder-20-filled" />
              </label>
              <!-- 24.12.19 수정 - 폰트 사이즈 변경  -->
              <input type="file" id="photos" class="pretendard-regular-normal-mine-shaft-14px" multiple
                @change="onFileChange" />
              <!-- <div class="text-1902 valign-text-middle pretendard-regular-normal-granite-gray-14px">
                {{ selectedFileName }}
              </div> -->
            </div>
       
            <!-- <div class="form-group">
              <label for="file-upload" class="file-upload-label">
                <img class="fluentfolder-20-filled-4"
                  src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/fluent-folder-20-filled-4.svg"
                  alt="fluent:folder-20-filled" />
              </label>
              
         
                <input type="file" id="photos" class="pretendard-regular-normal-mine-shaft-18px" multiple
                  @change="onFileChange" />
              </div> -->


          </div>
          <div class="frame-7859-3">
            <!-- 24.11.11 수정 - 취소시 목록으로 가도록 수정 -->
             <!-- 24.12.19 수정 - div 삭제 -->
            <button class="cancel-btn pretendard-medium-white-18px" @click="toGoSwingList">
                취소하기
            </button>
            <!-- 24.12.19 수정 - div 삭제, click 이벤트 변경  -->
            <button class="submit-btn pretendard-medium-white-18px" @click="updateSwingDt">
                등록하기
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
import { taskStore } from '@/store/taskStore';
import axios from 'axios';

export default {
  name: "ContactWriteno2",
  components: {
    Header,
    RjZsWi,
    XFooter,
  }, data() {
    return {
      title : "",
      description : "",
      videoUrl : "",
      selectedFileName: null,
      file: null,
    };
  },
  props: ["rJZsWIProps",],
  methods: {
    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.selectedFileName = file.name; // 선택된 파일 이름 저장
    //   }
    // },
    // 24.11.11 수정 - 취소시 목록으로 가기
    toGoSwingList() {
      this.$router.replace({ path: "/swingvideo-list" });
    },
    async updateSwingDt(){
      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      const params = {
        "title": this.title,
        "description": this.description,
        "videoUrl": this.videoUrl,
        "userId": parseInt(loginInfo.id)
      };

      console.log("Parmas", JSON.stringify(params))
      try {
        const response = await taskStore.postTask(`swing-videos`,params);
        console.log("response data: ", response);
        if (!response || response === undefined) {
          console.log("응답 데이터가 없습니다.");
        } else {
          console.log("매장이 등록 되었습니다.");
          this.toGoSwingList()
          // window.location.reload();
        }
      }catch(err){

        console.log("ERROR" , err)
      }

    },
    async onFileChange(event) {
      console.log("통신 하는 중!!!");
      //const token = localStorage.getItem("managerToken");
      const file = event.target.files[0];
      this.file = file;
      console.log(file.size);
      console.log(file.name);
      console.log(file.type);
      this.selectedFileName = file.name
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

      // 24.12.11 수정
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

      // const url = response[0].presignedUrl;
        // 24.12.11 수정
      const url = response.data.presignedUrl;
      console.log("response.file.path : : : : :" + JSON.stringify(url));
      
      this.videoUrl = new URL(url).origin + new URL(url).pathname;
      console.log("videoUrl : :: : : " , this.videoUrl)
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


<style scoped src="@/style/community/swingvideowrite.css"></style>