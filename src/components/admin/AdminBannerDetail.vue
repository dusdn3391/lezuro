<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">배너관리</h2>
          </div>
          <div class="list-box">
            <div class="as-title">
              <div class="event-align">
                <div class="pretendard-bold-log-cabin-30px">{{ title }}</div>
                <button
                  class="pretendard-regular-normal-mine-shaft-16px"
                  @click="EditBanner"
                >
                  수정하기
                </button>
              </div>

              <div class="as-info pretendard-regular-normal-mountain-mist-20px">
                <div class="text-29-7 valign-text-middle">{{ date }}</div>
                <div class="rectangle-50927-1"></div>
                <div class="rectangle-50927-1"></div>
              </div>
            </div>
            <div class="as-content">
              <div class="as-content-st pretendard-light-granite-gray-18px">
                <div>{{ subtitle }}</div>
                <img
                  class="rectangle-509275-1"
                  :src="image"
                  alt="Banner Image"
                />
              </div>
              <button class="list-btn" @click="toGoList()">
                <p class="pretendard-medium-white-18px">목록으로</p>
              </button>
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
import { adminStore } from "@/store/adminStore"; // API 호출

export default {
  name: "AdminBannerDetail",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      title: "",
      date: "",
      image: "",
      createdAt: "",
      author: "",
      linkurl: "",
      subtitle: "",
      isEdit: false,
      inquiry_content: "",
      selectedStatus: "",
    };
  },
  mounted() {
    const { id } = this.$route.params;
    if (id) {
      this.id = id;
      console.log("전달된 id:", id);
    }
    this.getBannertDt();
  },
  methods: {
    toGoList() {
      this.$router.replace({ path: "/adminbanner" });
    },
    EditBanner() {
      this.$router.push({
        path: "/adminbanner-write",
        query: {
        id: this.id, // 현재 이벤트의 ID
        isEdit: true, // 수정 모드임을 나타내는 플래그
      },
      });
    },

    async getBannertDt() {
      try {
        const response = await adminStore.getTask(
          `v1/report/banner/${this.id}`
        );
        this.title = response[0].title; // 배너 제목
        this.date = response[0].createdAt;
        this.image = response[0].bannerImg; // 배너 이미지 URL
        this.subtitle = response[0].subtitle;
        console.log("dkljsfdkljf", response);
      } catch (error) {
        console.error("배너 상세 데이터를 가져오는 중 오류 발생:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.reservation-container {
  background-color: #f5f6f6;
  display: flex;
  height: 100%;
  width: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  flex-direction: row;
}

.wrapper {
  flex-grow: 1;
  /* 나머지 공간을 차지하게 함 */
  padding: 30px;
  gap: 20px;
}

/* 타이틀 박스 */
.title-box {
  background-color: #fff;
  padding: 24px 30px;
  margin-bottom: 20px;
  gap: 10px;
}

/* 리스트 박스 */
.list-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #fff;
  padding: 30px;
}

.as-title {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
  padding-bottom: 40px;
}

.as-info {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  position: relative;
}

.as-content {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.as-content-st {
  align-items: flex-start;
  align-self: stretch;
  border: 1px solid;
  border-color: var(--alto);
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  position: relative;
  width: 100%;
}
.as-content-st img {
  width: 100%;
}
.ft {
  letter-spacing: 0;
  line-height: 28px;
  margin-top: -1px;
  position: relative;
  /* width: 1320px; */
}

.list-btn {
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  background-color: var(--monza);
  width: 200px;
  height: 50px;
  border: none;
  padding: 18px 66px;
  gap: 10px;
}

.reply {
  height: 150px;
  position: relative;
  width: 100%;
}

.reply-input {
  align-items: flex-start;
  background-color: var(--hint-of-red);
  border: 1px solid;
  border-color: var(--celeste);
  display: flex;
  gap: 10px;
  height: 150px;
  left: 0;
  padding: 20px;
  position: relative;
  top: 0;
  width: 100%;
}

.reply-btn {
  display: flex;
  position: absolute;
  /* 부모 요소의 하단에 배치 */
  bottom: 10px;
  right: 0;
}

.cancel-btn,
.insert-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid;
  border-color: var(--blackwhitewhite);
  border-radius: 8px;
  gap: 10px;
  height: 48px;
  width: 90px;
  margin-right: 10px;
}

.cancel-btn {
  background-color: var(--mountain-mist);
}

.insert-btn {
  background-color: var(--torea-bay);
}

.reply-content-detail {
  left: 25px;
  /* letter-spacing: -0.72px; */
  line-height: 32px;
  position: absolute;
  top: 81px;
}

.process-status {
  display: flex;
  align-items: center;
  width: 100%;
}

.status {
  display: flex;
  margin-right: 40px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.process-status span {
  color: #d30f1a;
}

.process-status select {
  height: 56px;
  width: 93%;
  right: 0;
}

.answer-insert {
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: 100%;
  height: 54px;
  border: none;
  background-color: #184199;
  color: #fff;
}
.reply-content {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0px;
}

.reply-write {
  background-color: #fafafa;
  padding: 20px;
  margin-bottom: 20px;
}

.reply-textarea {
  width: 100%;
  background-color: #fafafa;
  border: none;
  height: 49px;
  outline: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  resize: none;
}

.reply-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.cancel-button {
  background-color: #999;
  border: none;
  width: 90px;
  height: 48px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.submit-button {
  background-color: #184199;
  border: none;
  width: 90px;
  height: 48px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.reply-view {
  padding: 20px;
  border-radius: 5px;
}

.reply-count {
  font-weight: bold;
  margin-bottom: 10px;
}

.divider {
  border-top: 1px solid #dddddd;
  margin: 10px 0;
}

.event-align {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.event-align button {
  border: none;
  width: 150px;
  height: 45px;
  line-height: 21.48px;
  color: #ffffff;
  background-color: #ccc;
}
</style>
