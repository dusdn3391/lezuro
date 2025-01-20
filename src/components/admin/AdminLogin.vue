<template>
  <div class="container-center-horizontal">
    <div class="login-box screen">
      <div class="frame-7622">
        <div class="frame-7613-10">
          <div class="loginLogo">
            <img src="../../../img/lezuro-logo-black-1@2x.png" alt="" />
          </div>
          <input type="text" class="frame-input valign-text-middle pretendard-medium-mountain-mist-16px"
            placeholder="아이디" v-model="id" />
          <!-- 24.11.20 수정 - type password 로 변경  -->
          <input type="password" class="frame-input valign-text-middle pretendard-medium-mountain-mist-16px"
            placeholder="비밀번호" v-model="pw" />
          <div class="overlap-group-96" @click="loginbutton()">
            <div class="text-2173 valign-text-middle pretendard-semi-bold-white-18px">
              로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// `/api/users/${id}`
import { taskStore } from '@/store/taskStore';  // API 호출
import axios from 'axios';

export default {
  name: "AdminLogin",
  data() {
    return {
      id: '',
      pw: '',
    };
  },
  methods: {
    // 24.11.20 수정 - 로그인 입력 불일치시 에러 출력 
    async loginbutton() {
      try {
        const params = {
          "phone": this.id,
          "password": this.pw
        };

        const response = await axios.post('https://13.124.62.68:3000/api/v1/auth/phone/login-admin_root',
          params,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        if (response && response.data && response.data.token) {

          alert("로그인이 성공하였습니다");
          console.log("확인 : : :: :", JSON.stringify(response))
          localStorage.setItem('adminToken', response.data.token);
          localStorage.setItem("adminLogin", "true");
          // localStorage.setItem('managerToken', this.userDt[0].token);
          // localStorage.setItem('Token', JSON.stringify(response.data.token));
          console.log("확인 : : :: :", JSON.stringify(response.data.token))


          this.$router.push({ path: "/admin-dashboard" })
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
          console.error("에러 응답: ", error.response);
        } else {
          // 네트워크 에러 또는 기타 문제
          alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
          console.error("네트워크 에러: ", error);
        }
      }
    },
  },
};
</script>
<style scoped>
.loginLogo {
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
}

.loginLogo img {
  width: 127px;
}

.frame-input {
  border: none;
  width: 100%;
  /* 입력 필드 너비 */
  padding: 18px 20px;
  /* 양 끝에 padding 추가 */
  box-sizing: border-box;
  /* padding, border를 height에 포함 */
}

.login-box {
  align-items: flex-start;
  background-color: var(--blackwhitewhite);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 1920px;
}

.frame-7622 {
  background-color: var(--cultured-pearl);
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  margin-top: 235px;
  padding: 50px;
  height: 377px;
  position: relative;
  width: 600px;
}

.frame-7617 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  position: relative;
  width: 100%;
}

.frame-7615 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 30px;
  position: relative;
  width: 100%;
}

.frame-7613-10 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 122px;
  position: relative;
  width: 100%;
}

.overlap-group-96 {
  align-items: flex-start;
  background-color: #184199;
  display: flex;
  height: 55px;
  justify-content: flex-end;
  min-width: 500px;
  margin-top: 30px;
  padding: 15.4px 226px;
}

.text-2173 {
  height: 23px;
  letter-spacing: 0;
  line-height: normal;
  width: 47px;
}
</style>
