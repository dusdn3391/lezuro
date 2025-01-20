<template>
  <div class="container-center-horizontal">
    <div class="login-2 screen">
      <Header />
      <div class="login-view">
        <div class="login-view-title">
          <h1 class="login-view-title-font valign-text-middle pretendard-extra-extra-bold-black-30px">
            로그인
          </h1>
          <p class="login-view-content-font valign-text-middle pretendard-regular-normal-granite-gray-16px">
            로그인 하시고 더 많은 서비스를 이용해보세요.
          </p>
        </div>
        <div class="login-view-body">

          <div class="input-align">
            <!-- 24.11.14 수정 - @input 추가 -->
            <input type="text" class="login-input-box valign-text-middle pretendard-medium-mountain-mist-16px"
              placeholder="아이디" v-model="id" @focus="isIdFocused = true" @blur="isIdFocused = false" @input="validateId"
              ref="idInput" />
            <div class="pretendard-medium-celeste-14px" v-if="!isIdFocused && id === ''" @click="focusInput('idInput')">
              최소
              6자 ~ 최대 12자</div>
          </div>
          <div class="input-align">
            <!-- 24.11.14 수정 - @input 추가 -->
            <input type="password" class="login-input-box valign-text-middle pretendard-medium-mountain-mist-16px"
              placeholder="비밀번호" v-model="pw" @focus="isPwFocused = true" @blur="isPwFocused = false"
              @input="validatePw" ref="pwInput" />
            <div class="pretendard-medium-celeste-14px" v-if="!isPwFocused && pw === ''" @click="focusInput('pwInput')">
              최소 8자 ~ 최대 20자</div>
          </div>
          <!-- 24.11.14 수정 - 추가 -->
          <div class="error-box">
            <div v-if="idError" class="error-message pretendard-regular-normal-white-12px">{{ idError }}</div>
            <div v-if="pwError" class="error-message pretendard-regular-normal-white-12px">{{ pwError }}</div>
          </div>
          <div class="stay-login-box">
            <input type="checkbox" id="rememberMe" v-model="rememberMe" />
            <label for="rememberMe" class="pretendard-medium-granite-gray-14px">
              로그인 상태유지
            </label>
          </div>
          <!-- 24.11.14 수정 -->
          <button class="login-btn pretendard-semi-bold-white-18px" @click="validateLogin()">로그인</button>
          <!-- 24.11.14 수정 - 로그인 에러 메시지 -->
          <div v-if="formError" class="error-message pretendard-regular-normal-white-12px">{{ formError }}</div>
          <div class="login-join-find-btn-align pretendard-medium-granite-gray-14px">
            <div class="login-join-find-btn valign-text-middle" @click="navigateTo('phonecertification')">회원가입</div>
            l
            <div class="login-join-find-btn valign-text-middle" @click="navigateTo('findid')">아이디 찾기</div>
            l
            <div class="login-join-find-btn valign-text-middle" @click="navigateTo('findpassword')">비밀번호 찾기</div>
          </div>
          <button class="kakao-btn pretendard-semi-bold-black-18px" @click="kakaoLogin()">카카오로 시작하기</button>
          <button class="naver-btn pretendard-semi-bold-white-18px" @click="loginWithNaver()">네이버로 시작하기</button>
          <!-- <div @click="kakaoLogout()">카카오 로그아웃</div> -->
        </div>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from "./Header";
import XFooter from "./XFooter";
export default {
  name: "Loginview",
  components: {
    Header,
    XFooter,
  },
  mounted() {
    // 로그인이 되어있을 시 로그인 화면 보호
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    if(loginInfo){
      this.$router.replace("/")
    }


  },
  data() {
    return {
      rememberMe: false, // 초기 체크 상태
      id: '',
      pw: '',
      isIdFocused: false,
      isPwFocused: false,
      idError: null, // 24.11.14 수정 - 추가
      // 24.11.14 수정 - 추가
      pwError: null,
      // //24.11.14 수정 - 추가 로그인 에러 메시지
      formError: null,
    }
  },
  methods: {

    async loginbutton() {
      // 24.11.21 수정 - 에러 송출
      try {
        var params = {
          "phone": this.id,
          "password": this.pw
          // "phone": "01096651354",
          // "password": "dud700"
        };

        const response = await axios.post('https://13.124.62.68:3000/api/v1/auth/email/login',
          params,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        if (response) {

          alert("로그인이 성공하였습니다");
          console.log("확인 : : :: :", JSON.stringify(response))
          // console.log("확인 : : :: :" , JSON.stringify(response.data.user))
          localStorage.setItem('Token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('loginInfo', JSON.stringify(response.data.user));
          localStorage.setItem("userLogin", "true");
          if (this.rememberMe === false) {
            localStorage.setItem("autoLogin", "false");
          } else {
            localStorage.setItem("autoLogin", "true");
          }
          // commit('refreshToken', response.refreshToken);
          this.$router.push({ path: "/" });
        } else {
          alert('회원정보가 일치하지 않습니다. 회원정보를 다시 입력해주세요.');
        }
      } catch (error) {
        // 에러 처리
        if (error.response) {
          // 서버가 에러 응답을 반환한 경우
          alert('회원정보가 일치하지 않습니다. 회원정보를 다시 입력해주세요.');
          this.id = "";
          this.pw = "";
          console.error("서버 응답 에러: ", error.response);
        } else {
          // 네트워크 오류 또는 기타 문제
          alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
          console.error("네트워크 에러: ", error);
        }
      }
    },

    loginWithNaver() {
      console.log("값 확인  ㅣ ㅣ ㅣ ㅣ  클릭이 되었습니다.")

      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: 'JmomDi958One8jDmGBLl', // Naver client key
        callbackUrl: `${window.location.origin}/callback`,
        callbackHandle: true,
        // isPopup: false, // 팝업창으로 로그인 여부 (true 시 팝업, false 시 현재 창에서 이동)
        // loginButton: { color: 'green', type: 3, height: '48' }, // 로그인 버튼 스타일 설정
      })
      naverLogin.init()
      naverLogin.reprompt()
    },

    // 카카오 로그인

    kakaoLogin() {

      Kakao.init("f8ff26ae142fce94a37a71940dc11e33");
      Kakao.Auth.login({
        success: (authObj) => {
          // 엑세스 토큰 서버로 보내서 회원 정보받기
          console.log("Access Token:", authObj.access_token);

          // Get user info after successful login
          Kakao.API.request({
            url: "/v2/user/me",
         success: (res) => {
              // 유저 아이디값이 있을때는 메인 페이지로 이동
              console.log("User Info:", res);
              this.$router.push({ path: "/KaKaoCallback" ,
              query: {
                  accessToken: authObj.access_token,
                  userId: res,
                },
              });
              // console.log("User Info:", res.phone_number);
              // console.log("User Info:", res.kakao_account.email);
              // console.log("User Info:", res.profile.nickname);
              // console.log("User Info:", res.profile.profile_image_url);

              // phone_number
              // email
              // profile.nickname
              // profile.profile_image_url
              // You can store user info or token in local storage or Vuex for further use
            },
            fail: (error) => {
              console.error("Failed to get user info:", error);
            },
          });
        },
        fail: (err) => {
          console.error("Kakao Login Failed:", err);
        },
      });
    },
    kakaoLogout(){
      Kakao.Auth.logout(function() {
      console.log('로그아웃 완료');
      // 로그아웃 이후 처리
      // location.href = '/'; // 로그아웃 후 리디렉션
    });
    },
    navigateTo(route) {
      if (route === 'phonecertification') {
        this.$router.push('/phone-certification');
      } else if (route === 'findid') {
        this.$router.push('/findid-write');
      } else if (route === 'findpassword') {
        this.$router.push('/findpassword');
      }
    },
    focusInput(inputRef) {
      // Vue에서 ref로 지정한 input 필드에 포커스 이동
      this.$refs[inputRef].focus();
    },
    // 24.11.14 수정 - 추가
    validateId() {
      // 글자수 제한: 6~12자
      const maxLength = 12;
      const minLength = 6;

      // 입력값 자르기
      if (this.id.length > maxLength) {
        this.id = this.id.slice(0, maxLength);
      }

      // 유효성 검사: 영소문자와 숫자만 허용
      const idRegex = /^[a-z0-9]*$/;
      if (!idRegex.test(this.id)) {
        this.idError = "아이디는 영소문자와 숫자만 가능합니다.";
      } else if (this.id.length < minLength) {
        this.idError = "아이디는 최소 6자 이상이어야 합니다.";
      } else {
        this.idError = null;
      }
    },
    // 24.11.14 수정 - 추가
    validatePw() {
      const maxLength = 20;
      // 실배포시에 주석 풀고 이거로 변경
      // const minLength = 8;
      const minLength = 3;

      // 입력값 자르기
      if (this.pw.length > maxLength) {
        this.pw = this.pw.slice(0, maxLength);
      }

      // 유효성 검사: 연속된 동일 문자 금지
      // const pwRegex = /^(?!.*(.)\1{2,}).{8,20}$/; 실배포시에 주석 풀기
      const pwRegex = /^(?!.*(.)\1{2,}).{3,20}$/;
      if (!pwRegex.test(this.pw) && this.pw.length >= minLength) {
        this.pwError = "비밀번호는 연속된 문자가 없어야 합니다.";
      } else if (this.pw.length < minLength) {
        // this.pwError = "비밀번호는 최소 8자 이상이어야 합니다.";  실배포시에 주석 풀기
        this.pwError = "비밀번호는 최소 3자 이상이어야 합니다.";
      } else {
        this.pwError = null;
      }
    },

    // 24.11.14 수정 - 추가
    validateLogin() {
      this.validateId();
      this.validatePw();

      // 모든 조건 만족 여부 확인
      if (this.idError || this.pwError || !this.id || !this.pw) {
        this.formError = "아이디와 비밀번호를 올바르게 입력해주세요.";
      } else {
        this.formError = null;
        // 로그인 API 호출
        this.loginbutton();
      }
    },
  },
};
</script>

<style scoped src="@/style/signup/loginview.css" />
