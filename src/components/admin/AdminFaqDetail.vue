<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="reservation-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">FAQ</h2>
          </div>
          <div class="list-box">
            <div class="as-title">
              <div class="event-align">
                <div class="pretendard-bold-log-cabin-30px">그룹 : {{ title }}</div>
                <button
                  class="pretendard-regular-normal-mine-shaft-16px"
                  @click="EditFaq"
                >
                  수정하기
                </button>
              </div>

              <div class="as-info pretendard-regular-normal-mountain-mist-20px">
                <div class="text-29-7 valign-text-middle">{{ date }}</div>
              </div>
            </div>
            <div class="box">
              <div class="q pretendard-regular-normal-mountain-mist-20px">
                질문 : {{ question }}
              </div>
              <div class="a pretendard-regular-normal-mountain-mist-20px">
                답변 : {{ answer }}
              </div>
            </div>
            <div class="as-content">
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
      question: "",
      answer: "",
      createdAt: "",
      //   getData: {},
    };
  },
  mounted() {
    const faqId = this.$route.query.id; // 쿼리로 전달된 ID 가져오기
    console.log("FAQ ID:", faqId);
    if (faqId) {
      this.getFaqDt(faqId); // FAQ ID를 메서드에 전달
    } else {
      console.error("FAQ ID가 없습니다.");
    }
  },
  methods: {
    toGoList() {
      this.$router.replace({ path: "/adminbanner" });
    },
    EditFaq() {
      const faqId = this.$route.query.id; // 현재 FAQ의 ID 가져오기
      if (faqId) {
        this.$router.push({
          path: "/adminfaq-management", // 수정 페이지 라우트 이름
          query: { id: faqId, isEdit: true }, // ID와 isEdit 전달
        });
      } else {
        console.error("FAQ ID가 없습니다.");
      }
    },

    async getFaqDt(faqId) {
      try {
        const response = await adminStore.getTask(`faqs/${faqId}`);
        // 데이터를 data 속성에 할당
        this.title = response.group; // 배너 제목
        this.question = response.question; // 질문
        this.answer = response.answer; // 답변
        this.date = response.createdAt.split("T")[0];
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

.box {
  border: 1px solid #ddd;
  width: 100%;
  padding: 30px;
}

.a{
    margin-top:20px;
}
</style>
