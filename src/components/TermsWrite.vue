<template>
  <div class="container-center-horizontal">
    <div class="updateterms screen">
      <Header />
      <rj-zs-wi
        :frame72911Props="rJZsWIProps.frame72911Props"
        :frame72912Props="rJZsWIProps.frame72912Props"
      />
      <div class="terms_title">
        <div class="title pretendard-bold-log-cabin-38px">약관</div>
      </div>
      <div class="content-wrap">
        <div class="write-wrap">
          <div class="title-box">
            <div
              class="content-title valign-text-middle pretendard-medium-black-18px"
            >
              제목
            </div>
            <input
              type="text"
              class="frame-7281-8"
              placeholder="약관제목을 입력해주세요"
            />
          </div>
          <div class="content-box">
            <div
              class="content-title valign-text-middle pretendard-medium-black-18px"
            >
              내용
            </div>
            <input
              type="text"
              class="frame-7281-9"
              placeholder="약관내용을 입력해주세요"
            />
          </div>
          <div class="button-container">
            <button
              class="cancel-button pretendard-medium-white-18px"
              @click="cancel"
            >
              취소하기
            </button>
            <button
              class="submit-button pretendard-medium-white-18px"
              @click="submit"
            >
              확인하기
            </button>
          </div>
        </div>
      </div>
      <x-footer  />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import RjZsWi from "./RjZsWi";
import XFooter from "./XFooter";
export default {
  name: "TermsWrite",
  components: {
    Header,
    RjZsWi,
    XFooter,
  },
  props: ["rJZsWIProps"],
  methods: {
    submit() {
      alert("등록이 되었습니다");
      this.$router.push({ path: "/terms-list" });
    },
    cancel() {
      this.$router.push({ path: "/terms-list" });
    },
  },
};
</script>

<style>
.updateterms {
  width: 100%;
}

.frame-7883-2 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.frame-7882 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
}

.frame-7857-5 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  position: relative;
  width: 100%;
}
</style>

<style scoped>
.terms_title{
  width:100%;
  padding:0px 13.5%;
  padding-top:104px;
}
.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
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

.submit-button {
  background-color: #d30f1a;
  color: white;
}

.frame-7782-1 {
  margin-bottom: 140px;
}

.write-wrap {
  width: 100%;
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
  border-bottom:1px solid #dddddd;
  display: flex;
  flex: 0 0 auto;
  padding: 20px 20px 20px 0px;
  position: relative;
  width: 100%;
}

.title-box{
  border-top:1px solid #ddd;
}
.frame-7281-9,.frame-7281-8{
  width:100%;
  height:220px;
  border:0.5px solid #dddddd;
  padding:20px;
  background-color:#fafafa;
}
.frame-7281-8{height:50px;}

.content-wrap {
  margin-top:50px;
  margin-bottom: 140px;
  padding: 0px 13.5%;
  width:100%;
}
.img-pick {
  align-items: center;
  background-color: var(--hint-of-red);
  border: 0.5px solid;
  border-color: var(--celeste);
  display: flex;
  gap: 10px;
  height: 55px;
  width: 90%;
  padding: 0px 20px;
  position: relative;
}

.img-pick label {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
<style scoped src="@/style/cs/termswrite.css"></style>
