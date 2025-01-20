<template>
  <div class="container-center-horizontal">
    <div class="findpassword1-2 screen">
      <Header />
      <div class="findpassword1-wrap">
        <h1 class="findpassword1-title valign-text-middle pretendard-extra-extra-bold-black-30px">비밀번호 찾기</h1>
        <div class="findpassword1-content">
          <div class="findpassword1-content-item">
            <div class="findpassword1-content-item-title pretendard-medium-log-cabin-18px">성명</div>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              class="findpassword1-insert-name pretendard-medium-mountain-mist-16px"
              v-model="name"
            />
          </div>
          <div class="findpassword1-content-item">
            <div class="findpassword1-content-item-title pretendard-medium-log-cabin-18px">아이디</div>
            <input
              type="text"
              placeholder="영문, 숫자 / 6 ~ 12자로 입력하세요"
              class="findpassword1-insert-name valign-text-middle pretendard-medium-mountain-mist-16px"
              v-model="id"
            />
          </div>
          <div class="findpassword1-content-item">
            <div class="findpassword1-content-item-title pretendard-medium-log-cabin-18px">휴대폰번호</div>
            <div class="input-btn-align">
              <input
                type="text"
                placeholder="휴대폰번호를 입력하세요"
                class="findpassword1-input-box pretendard-medium-mountain-mist-16px"
                v-model="phoneNm"
              />
              <button class="find-password-cert-number-btn pretendard-medium-white-16px" @click="sendSMSPhone">
                인증번호 받기
              </button>
            </div>
          </div>
          <div class="findpassword1-content-item">
            <div class="findpassword1-content-item-title pretendard-medium-log-cabin-18px">인증번호</div>
            <div class="input-btn-align">
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                class="findpassword1-input-box pretendard-medium-mountain-mist-16px"
                v-model="verify_code"
              />
              <button class="find-password-cert-number-btn pretendard-medium-white-16px"  @click="checkPhoneNumber">인증번호 확인</button>
            </div>
          </div>
          <button class="find-password-btn pretendard-semi-bold-white-18px" @click="successfindpassword"  :disabled="!checkCode"   :class="{ 'disabled-btn': !checkCode }" >비밀번호 찾기</button>
        </div>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import XFooter from "./XFooter";
import axios from "axios";

export default {
  name: "FindPassword",
  components: {
    Header,
    XFooter,
  },
  data() {
    return {
      name: "",
      id: "",
      checkCode : false ,
      phoneNm: "",
      verify_code: "",
    };
  },
  methods: {
    // 인증번호 받기 로직
    async sendSMSPhone() {
      try {
        // 사용자 데이터 검증
        const userRes = await axios.get(`https://13.124.62.68:3000/api/v1/users/phone/${this.id}`);
        const userData = userRes.data;

        console.log("User Data: ", JSON.stringify(userData));

        // 사용자 정보 검증
        if (userData.name === this.name && userData.phone === this.phoneNm && userData.phone === this.id) {
          // 인증번호 요청
          const params = {
            phoneNumber: this.phoneNm,
          };
          const smsRes = await axios.post("https://13.124.62.68:3000/api/v1/sms/send", params);

          console.log("SMS Response: ", JSON.stringify(smsRes));

          if (smsRes.data.data.code === 1000) {
            alert("카카오톡으로 인증번호가 발송되었습니다.");
          } else {
            alert("인증번호 발송에 실패했습니다.");
          }
        } else {
          alert("입력하신 정보가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("Error in sendSMSPhone: ", error);
        alert("정보를 확인하는 중 오류가 발생했습니다.");
      }
    },
    async checkPhoneNumber() {
    const params =
      {
        "phoneNumber": this.phoneNm,
        "verificationCode": this.verify_code
      };
      const res = await axios.post('https://13.124.62.68:3000/api/v1/sms/verify-code',params);

      console.log("res : : : " , JSON.stringify(res))
      
  
    
      if(res){
        alert("인증번호가 일치합니다")
        this.checkCode = true;
      }else{
        this.checkCode = false;
      }
      
    },
    // 비밀번호 찾기 성공
    successfindpassword() {
      this.$router.push({ name: "resetpassword",
      params: {
        phone: this.phoneNm, 
        },
       });
    },
  },
};
</script>
<style scoped>
.find-password-btn.disabled-btn {
  background-color: gray; /* 비활성화 상태: 회색 */
  cursor: not-allowed;
}
</style>
<style scoped src="@/style/signup/findpassword.css" />
