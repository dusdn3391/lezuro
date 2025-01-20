<template>
  <div class="all">
    <AdminHeader />
    <div class="wrap">
      <div class="notice-container">
        <AdminNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <!-- 24.11.25 수정 -->
            <div class="pretendard-bold-normal-black-28px">공지사항</div>
          </div>
          <div class="list-box">
            <div class="notice-title">
              <div class="pretendard-bold-log-cabin-30px">{{ title }}</div>
              <div class="notice-info pretendard-regular-normal-mountain-mist-20px">
                <div class="notice-info-first">
                  <div>{{ createdAt }}</div>
                  <span> l </span>
                  <div>작성자 : {{ author }}</div>
                </div>
                <!-- 24.11.25 수정 - 추가 -->
                <div class="notice-info-btn">
                  <button class="notice-edit-btn pretendard-medium-white-18px" @click="toGoEdit()">수정</button>
                  <button class="notice-del-btn pretendard-medium-white-18px" @click="deleteNoticeDt">삭제</button>
                </div>
              </div>
            </div>
            <div class="notice-content">
              <div class="notice-content-st pretendard-light-granite-gray-18px">
                <p class="ft valign-text-middle">
                  {{ content }}
                </p>
                <!-- 24.11.25 수정 - 추가 -->
                <div v-if="imageUrl" class="image-container">
                  <img :src="imageUrl" alt="첨부된 이미지" class="uploaded-image" />
                </div>
              </div>
              <!-- 24.11.25 수정 -->
              <button class="list-btn pretendard-medium-white-18px" @click="toGoList()">
                목록으로
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
  name: "AdminNoticeDetail",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      title: "",
      content: "",
      contents: "",
      createdAt: "",
      author: "",
      selectedStatus: "",
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log("받아온 ID:", this.id);
    this.getNoticeDt();
  },
  methods: {
    toGoList() {
      this.$router.push({ path: "/adminnotice-list" });
    },
    async getNoticeDt() {
      try {
        const response = await adminStore.getTask(`customer-notice/${this.id}`);
        console.log("notice : : : ", response);

        // 데이터를 data 속성에 할당
        this.title = response.title || "제목 없음";
        this.author = response.author || "작성자 없음";
        this.content = response.content || "내용이 없습니다.";
        this.createdAt = response.createdAt.split("T")[0];
        this.imageUrl = response.imageUrl

      }
      catch (error) {
        console.error("공지사항 상세 데이터를 가져오는 중 오류 발생:", error);
      }
    },

    // 24.11.26 수정 - 추가
    toGoEdit() {
      this.$router.push({
        path: "/notice-write",
        query: {
          id: this.id,
        },
      });
    },

    // 24.11.25 수정 - 추가
    async deleteNoticeDt() {
      const response = await adminStore.deleteTask(`customer-notice/${this.id}`);
      alert('게시글이 삭제되었습니다.');
      this.$router.push({ path: "/adminnotice-list" });
    }
  },
};
</script>

<style scoped>
/* 24.11.25 수정 */
/* 전체 컨테이너의 배경색 설정 */
.notice-container {
  background-color: #f5f6f6;
  display: flex;
  /* height: 100%; */
  width: 100%;
  /* 기본값이 세로방향인 flex-direction을 가로방향으로 설정 */
  /* flex-direction: row; */
}

/* 24.11.25 수정 */
.wrapper {
  /* flex-grow: 1; */
  /* 나머지 공간을 차지하게 함 */
  width: 100%;
  height: 100%;
  padding: 30px;
  /* gap: 20px; */
}

/* 24.11.25 수정 */
/* 타이틀 박스 */
.title-box {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  /* gap: 10px; */
}

/* 리스트 박스 */
/* 24.11.25 수정 */
.list-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  gap: 10px;
  background-color: #fff;
  padding: 30px;
}

/* 24.11.25 수정 */
.notice-title {
  /* align-items: flex-start; */
  /* align-self: stretch; */
  display: flex;
  /* flex: 0 0 auto; */
  flex-direction: column;
  gap: 16px;
  /* position: relative; */
  width: 100%;
  padding-bottom: 40px;
}

/* 24.11.25 수정 */
.notice-info {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

/* 24.11.25 수정 - 추가 */
.notice-info-first {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notice-info-btn {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notice-edit-btn,
.notice-del-btn {
  background-color: #d30f1a;
  border: none;
  width: 90px;
  height: 50px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.notice-edit-btn {
  background-color: #999;
}

.notice-content {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.notice-content-st {
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

.ft {
  letter-spacing: 0;
  line-height: 28px;
  margin-top: -1px;
  position: relative;
  /* width: 1320px; */
}

.uploaded-image {
  width: 100%;
  padding: 30px 0px;
}

/* 24.11.25 수정 */
.list-btn {
  line-height: 50px;
  background-color: #d30f1a;
  width: 200px;
  height: 50px;
  border: none;
  /* padding: 10px 30px; */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
