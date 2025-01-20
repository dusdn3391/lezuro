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
            <input class="frame-7281-8 pretendard-regular-normal-mine-shaft-16px" v-model="title"
              placeholder="제목을 입력하세요" />
          </div>
          <div class="content-box">
            <div class="content-title valign-text-middle pretendard-medium-black-18px">
              내용
            </div>
            <textarea class="frame-7281-9 pretendard-regular-normal-mine-shaft-16px" v-model="content"
              placeholder="내용을 입력하세요"></textarea>
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
             <!-- 24.12.19 수정 - v-if 추가  -->
             <input v-if="!selectedFileName" type="file" id="photos" class="pretendard-regular-normal-mine-shaft-18px"
                multiple @change="onFileChange" />
              <div class="text-1902 valign-text-middle pretendard-regular-normal-granite-gray-14px">
                {{ selectedFileName }}
              </div>
            </div>

          </div>
          <div class="frame-7859-3">
            <!-- 24.11.11 수정 - 취소시 목록으로 가도록 수정 -->
            <!-- 24.12.19 수정 - div 삭제, 폰트 수정 -->
            <button class="cancel-btn pretendard-medium-white-18px" @click="toGoSwingList">
              취소하기
            </button>
            <!-- 24.12.19 수정 - div 삭제, 폰트 수정, click 이벤트 변경  -->
            <button class="delete-btn pretendard-medium-white-18px" @click="openDeleteModal()">
              삭제하기
            </button>
            <!-- 24.12.19 수정 - class 명 변경, div 삭제, 폰트 수정  -->
            <button class="submit-btn pretendard-medium-white-18px" @click="editSwing()">
              수정하기
            </button>
          </div>
        </div>
      </div>
      <!-- 24.12.19 수정 - 추가  -->
      <SwingVideoDeleteModal v-if="isDeleteModalVisible" @close="closeDeleteModal" @confirm="deleteSwing" />
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
import SwingVideoDeleteModal from "./SwingVideoDeleteModal"; // 24.12.19  수정 - 추가

export default {
  name: "SwingVideoEdit",
  components: {
    Header,
    RjZsWi,
    XFooter,
    SwingVideoDeleteModal, // 24.12.19  수정 - 추가
  },
  props: ["rJZsWIProps"],
  data() {
    return {
      title: "더미 제목입니다",
      content: "이곳은 더미 내용입니다. 이 텍스트는 내용을 표시하기 위해 사용되는 더미 텍스트입니다.",
      selectedFileName: null,
      videoUrl: "",
      file: null,
      // receiveItem : null
      isDeleteModalVisible: false, // 24.12.19 수정 - 추가 
    };
  },
  mounted() {
    const item = this.$route.params.itemData;
    if (item) {
      // this.receiveItem =  item
      this.title = item.title;
      this.content = item.description;
      this.selectedFileName = item.videoUrl.split('/').pop();;
      console.log("전달받은 객체:", item);
      // 여기서 `item` 객체를 사용하여 필요한 로직을 구현합니다.
    } else {
      console.warn("전달받은 객체가 없습니다.");
    }
  },
  methods: {
    // 24.12.19 수정 - 추가 
    openDeleteModal() {
      this.isDeleteModalVisible = true; 
    },
     // 24.12.19 수정 - 추가 
     closeDeleteModal() {
      this.isDeleteModalVisible = false; // 모달 닫기
      this.videoToDelete = null; // 선택된 비디오 초기화
    },
    async editSwing() {
      try {
        if (this.videoUrl === "") {
          this.videoUrl = this.$route.params.itemData.videoUrl
        } else {
          this.videoUrl = this.videoUrl
        }
        const params = {
          "title": this.title,
          "description": this.content,
          "videoUrl": this.videoUrl,
          // "userId": parseInt(this.$route.params.itemData.id),
        }
        const response = await taskStore.putTask(`swing-videos/${this.$route.params.itemData.id}`, params);
        console.log("response data: ", response);
        if (!response || response === undefined) {
          console.log("응답 데이터가 없습니다.");
        } else {
          alert("정상적으로 수정 되었습니다.")
          this.toGoSwingList()
        }
      } catch (err) {
        console.log("ERROR", err)
      }
    },

    async deleteSwing() {

      try {
        // const response = await taskStore.getSelectTasks(`swing-videos/${loginInfo.id}`);
        const response = await taskStore.deleteTask(`swing-videos/${this.$route.params.itemData.id}`);
        console.log("response data: ", response);
        if (!response || response === undefined) {
          console.log("응답 데이터가 없습니다.");
        } else {
            // alert("정상적으로 삭제가 되었습니다.")
          // 24.12.19 수정 - 추가
          this.closeDeleteModal(); // 모달 닫기
          this.toGoSwingList()
        }
      } catch (err) {
        console.log("ERROR", err)
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

      const response = await taskStore.postTask(
        "v1/files/presigned-url",
        params
      );
      console.log("response : : : : :" + JSON.stringify(response));

      const url = response[0].videoUrl;
      console.log("response.file.path : : : : :" + JSON.stringify(url));

      this.videoUrl = new URL(url).origin + new URL(url).pathname;
      console.log("videoUrl : :: : : ", this.videoUrl)
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

    // 24.11.11 수정 - 취소시 목록으로 가기
    toGoSwingList() {
      this.$router.replace({ path: "/swingvideo-list" });
    },
  },
};
</script>

<style scoped src="@/style/community/swingvideoedit.css"></style>
