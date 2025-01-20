<template>
  <div class="container-center-horizontal">
    <div class="announcementsdetails screen">
      <Header />
      <rj-zs-wi :frame72911Props="rJZsWIProps.frame72911Props" :frame72912Props="rJZsWIProps.frame72912Props" />
      <div class="frame-7913">
        <div class="title pretendard-bold-log-cabin-38px">공지사항</div>
        <div class="notice-detail">
          <div class="frame-7754-2">
            <div class="text-1934 valign-text-middle pretendard-bold-log-cabin-30px">
              {{ title }}
            </div>
            <div class="frame-7835-2 pretendard-regular-normal-mountain-mist-20px">
              <div class="frame-7835-item-1 valign-text-middle">
                {{ updatedAt }}
              </div>
              <!-- <div class="rectangle-50927"></div> -->
              <!-- 24.12.19 수정 -->
              <span>l</span>
              <div class="frame-7835-item-1 valign-text-middle">
                {{ author }}
              </div>
              <!-- <div class="rectangle-50927"></div> -->
              <!-- 24.12.19 수정 -->
              <span>l</span>
              <div class="frame-7835-item-1 valign-text-middle">
                조회수 : {{ views }}
              </div>
            </div>
          </div>
          <div class="frame-7836-6 pretendard-light-granite-gray-18px">
            <p class="lorem-ipsum-dolor-si-7 valign-text-middle">
              {{ content }}
            </p>
            <div v-if="imageUrl" class="image-container">
              <img :src="imageUrl" alt="첨부된 이미지" class="uploaded-image" />
            </div>
          </div>
        </div>


        <!-- <div class="frame-7912">
          <article class="frame-7923-3">
            <div class="text_label-31 valign-text-middle pretendard-medium-white-18px" @click="toGoNoticeList">
              목록으로
            </div>
          </article>
        </div> -->
        <!-- 24.12.19 수정 -->
        <button class="to-go-list valign-text-middle pretendard-medium-white-18px" @click="toGoNoticeList">
          목록으로
        </button>
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
export default {
  name: "NoticeDetail",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  data() {
    return {
      title: "",
      updatedAt: "",
      author: "",
      views: "",
      content: "",
      imageUrl: "",
    };
  },
  props: ["rJZsWIProps"],
  async mounted() {
    // 라우트에서 전달된 상태 데이터를 가져옵니다.
    const id = this.$route.query.id
    console.log("Received ID:", id);
    if (id) {
      this.id = id;
      await this.fetchNoticeDetail();
    } else {
      console.error("ID를 찾을 수 없습니다.");
      this.toGoNoticeList();
    }
  },
  methods: {
    async updateViews(count) {
      console.log("count : : : ", count)
      const params = {
        views: count + 1
      }
      try {
        const response = await taskStore.updateTask(`customer-notice/${parseInt(this.id)}/`, params);
        console.log("API 응답:", response);


      } catch (error) {
        console.error("게시판 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    async fetchNoticeDetail() {
      try {
        // API 호출
        const response = await taskStore.getSelectTasks(`customer-notice/${this.id}`);
        console.log("API 응답:", response);

        // 응답에서 데이터를 추출 (수정된 부분)
        const data = response;

        this.updateViews(data.views)
        // 데이터가 존재하는지 확인하고 할당
        if (data) {
          this.title = data.title
          this.updatedAt = data.updatedAt ? data.updatedAt.split("T")[0] : "날짜 없음";
          this.author = data.author || "작성자 없음";
          this.views = data.views || 0;
          this.content = data.content || "내용이 없습니다.";
          this.imageUrl = data.imageUrl
        } else {
          console.error("응답 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("공지사항 데이터를 가져오는 중 오류 발생:", error);
      }
    },
    toGoNoticeList() {
      this.$router.push({ path: "/notice-list" });
    },
  },
};
</script>

<style scoped src="@/style/cs/noticedetail.css"></style>
