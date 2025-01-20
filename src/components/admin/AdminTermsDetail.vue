<template>
<div class="all">
  <AdminHeader />
  <div class="wrap">
    <div class="reservation-container">
      <AdminNavbar />
      <div class="wrapper">
        <!-- 타이틀 -->
        <div class="title-box">
          <h2 class="pretendard-bold-normal-black-28px">약관 관리</h2>
        </div>

        <!-- 약관 종류별 데이터 표시 -->
        <div v-for="(terms, type) in groupedTerms" :key="type" class="list-box">
          <!-- 약관 종류 -->
          <div class="as-title">
            <div class="event-align">
              <div class="pretendard-bold-log-cabin-30px">
                약관 종류: {{ type }}
              </div>
            </div>
          </div>

    <!-- 약관 데이터 리스트 -->
    <div v-for="term in terms" :key="term.id" class="box">
              <div class="q pretendard-regular-normal-mountain-mist-20px">
                제목: {{ term.title }}
              </div>
              <div class="a pretendard-regular-normal-mountain-mist-20px">
                내용: {{ term.content }}
              </div>
              <!-- 24.12.11 수정 -->
              <button v-if="term.id === Number($route.query.id)"
                class="edit-terms pretendard-regular-normal-white-16px" @click="EditTerms(term)">
                수정하기
              </button>
            </div>
            <div class="as-content">
              <!-- 24.12.11 수정 -->
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
  name: "AdminTermsDetail",
  components: {
    AdminHeader,
    AdminNavbar,
  },
  data() {
    return {
      groupedTerms: {},
      type: "", 
    };
  },
    // URL의 query에서 type 값을 가져옴
    mounted() {
  // URL 쿼리에서 id와 type 값을 가져옵니다.
  const { id, type } = this.$route.query;

  console.log("받은 약관 ID:", id);
  console.log("받은 약관 type:", type);

  if (type) {
    // type이 있는 경우 해당 데이터를 로드합니다.
    this.type = type; // type을 컴포넌트의 data에 저장
    this.loadTermsData(type); // 데이터 로드
  } else {
    console.warn("type 값이 없습니다.");
  }
},
  methods: {
    toGoList(){
        this.$router.push({path:"/adminterms-list"})
    },
    EditTerms(term) {
    this.$router.replace({
      name: "AdminTermsWrite",
      params: {
        id: term.id,
        title: term.title,
        type: term.type, 
        content: term.content,
        isEdit: true 
      },
    });
  },
    async loadTermsData(type) {
      try {
        // API 호출
        const response = await adminStore.getTask(`terms`);
        console.log("받은 데이터:", response);

        // type별 데이터 필터링
        const filteredTerms = response.filter((item) => item.type === type);

        // 데이터 그룹화
        const grouped = filteredTerms.reduce((acc, item) => {
          if (!acc[item.type]) {
            acc[item.type] = [];
          }
          acc[item.type].push(item);
          return acc;
        }, {});

        this.groupedTerms = grouped;
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
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
  /* letter-spacing: 0; */
  /* line-height: normal; */
  position: relative;
  /* white-space: nowrap; */
  background-color: #D30F1A;
  width: 200px;
  height: 50px;
  border: none;
  /* padding: 18px 66px; */
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

.a {
  margin-top: 20px;
}

.edit-terms{
    margin-top:20px;
    background-color: #184199; 
    color:#fff;
    padding:10px;
    border:none;
}
</style>
