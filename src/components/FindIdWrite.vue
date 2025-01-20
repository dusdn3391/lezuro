<template>
  <div class="container-center-horizontal">
    <div class="findid1-2 screen">
      <Header />
      <div class="findid1-wrap">
        <div class="findid1-title valign-text-middle pretendard-extra-extra-bold-black-30px">아이디 찾기</div>
        <div class="findid1-content">
          <div class="findid1-content-item">
            <div class="findid1-content-item-title pretendard-medium-log-cabin-18px">
              성명
            </div>
            <input type="text" placeholder="이름을 입력하세요" v-model="name" class="insert-name pretendard-medium-mountain-mist-16px" />
          </div>
          <div class="findid1-content-item">
            <div class="findid1-content-item-title pretendard-medium-log-cabin-18px">
              휴대폰번호
            </div>
            <div class="input-btn-align">
              <input type="text" placeholder="휴대폰번호를 입력하세요" class="input-box pretendard-medium-mountain-mist-16px" v-model="phoneNm"/>
              <button class="cert-number-btn pretendard-medium-white-16px"  @click="sendSMSPhone">인증번호 받기</button>
            </div>
          </div>
          <div class="findid1-content-item">
            <div class="findid1-content-item-title pretendard-medium-log-cabin-18px">
              인증번호
            </div>
            <div class="input-btn-align">
              <input type="text" placeholder="인증번호를 입력하세요" class="input-box  pretendard-medium-mountain-mist-16px" v-model="verify_code" />
              <button class="cert-number-btn pretendard-medium-white-16px" @click="checkPhoneNumber">인증번호 확인</button>
            </div>
          </div>
          <button class="find-btn pretendard-semi-bold-white-18px"  :disabled="!checkCode"  @click="resultId()"   :class="{ 'disabled-btn': !checkCode }" >아이디 찾기</button>
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
  name: "FindIdWrite",
  components: {
    Header,
    XFooter,
  },
  data(){
    return {
      name : '',
      phoneNm :'',
      verify_code : '',
      checkCode : false /// 인증번호 체크여부
    }
  },
  methods: {
    // 인증번호 받기
    async sendSMSPhone(){
      this.phoneNm
      const params ={
        phoneNumber : this.phoneNm
      }
      const res = await axios.post('https://13.124.62.68:3000/api/v1/sms/send',params);

      console.log("res : : : " , JSON.stringify(res))
      console.log("res : : : " , JSON.stringify(res.data.data.code))

      if(res.data.data.code === 1000){
        this.showSms = true
        alert('카카오톡으로 인증번호가 발송 되었습니다.')
      }else{
        alert('휴대폰 번호가 일치 하지 않습니다.')
      }

    },
    // 인증번호 검증
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

    // 아이디 찾기 확인
    async resultId() {
  try {
    const res = await axios.get(`https://13.124.62.68:3000/api/v1/users/name/${this.name}`);
    console.log("res : : : ", JSON.stringify(res));

    if (!res || !res.data) {
      alert("이름을 다시 확인해주세요");
    } else {
      const { name, phone } = res.data; // name과 phone만 추출
      this.$router.push({
        name: "findid-result",
        params: {
          name,
          phone,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    alert("아이디를 가져오는 중 오류가 발생했습니다.");
  }
}

  },
};
</script>
<style scoped>
.find-btn.disabled-btn {
  background-color: gray; /* 비활성화 상태: 회색 */
  cursor: not-allowed;
}
</style>
<style scoped src="@/style/signup/findidwrite.css" />