<template>
  <div class="container-center-horizontal">
    <div class="signup2-2 screen">
      <Header />
      <div class="signup2-wrap">
        <h1 class="signup2-title  valign-text-middle pretendard-extra-extra-bold-black-30px">회원가입</h1>
        <div class="signup2-content">
          <div class="signup2-content-list">
            <div class="signup2-content-input-align">
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">성명</div>
                <input type="text" v-model="name" placeholder="이름을 입력하세요"
                  class="signup2-content-item-input-box pretendard-medium-mountain-mist-16px">
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">생년월일</div>
                <input type="date" v-model="yymmdd"
                  class="signup2-content-item-input-box pretendard-medium-mountain-mist-16px">
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">성별</div>
                <div class="gender">
                  <label>
                    <input type="radio" name="gender" class="pretendard-medium-mountain-mist-16px" value="MALE"
                      v-model="gender" />
                    남자
                  </label>
                  <label style="margin-left:20px;">
                    <input type="radio" name="gender" class="pretendard-medium-mountain-mist-16px" value="FEMALE"
                      v-model="gender" />
                    여자
                  </label>
                </div>
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">닉네임</div>
                <input type="text" placeholder="닉네임을 입력하세요" v-model="nick"
                  class="signup2-content-item-input-box valign-text-middle pretendard-medium-mountain-mist-16px">
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">이메일</div>
                <input type="text" v-model="email" placeholder="이메일을 입력하세요"
                  class="signup2-content-item-input-box valign-text-middle pretendard-medium-mountain-mist-16px">
              </div>
            </div>
            <p class="signup2-waring-text valign-text-middle pretendard-regular-normal-mine-shaft-14px">실제 정보와 다르게 입력하는
              경우 추후 대회 참가, 보상에 문제가 발생할 수 있습니다.</p>
          </div>
          <button class="signup-btn pretendard-semi-bold-white-18px" @click="submitsignup()">가입하기</button>
        </div>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import XFooter from "./XFooter";
export default {
  name: "SocialSignUp",
  components: {
    Header,
    XFooter,
  },
};
</script>

<style scoped src="@/style/signup/signup.css" />
