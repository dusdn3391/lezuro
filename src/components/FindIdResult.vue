<template>
  <div class="container-center-horizontal">
    <div class="findid1-result-2 screen">
      <Header />
      <div class="findid1-result-wrap">
        <h1 class="findid1-result-title valign-text-middle pretendard-extra-extra-bold-black-30px">아이디 찾기</h1>
        <div class="result-text pretendard-medium-mine-shaft-20px">
          <div>{{ name }}님의 아이디는 </div>
          <div> {{ phone }} 입니다.</div>
        </div>
        <button class="find-result-btn pretendard-semi-bold-white-18px" @click="togoLogin()">로그인 하기</button>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import XFooter from "./XFooter";

export default {
  name: "FindIdResult",
  components: {
    Header,
    XFooter,
  },
  data() {
    return {
      name: this.$route.params.name || "",
      phone: this.$route.params.phone || "", 
    };
  },
  methods: {
    togoLogin() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>


<style></style>
<style scoped src="@/style/signup/findidresult.css" />