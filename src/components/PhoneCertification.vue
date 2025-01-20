<template>
  <div class="container-center-horizontal">
    <div class="signup1-2 screen">
      <Header />
      <div class="signup1-wrap">
        <div class="signup1-wrap-title valign-text-middle pretendard-extra-extra-bold-black-30px">휴대폰 인증</div>
        <div class="signup1-input-align">
          <input type="text" class="signup1-input-box pretendard-regular-normal-mountain-mist-20px" v-model="phoneNm"
              maxlength="11" :readonly="showSms"
            placeholder="휴대폰 번호 입력해주세요" />

            <input v-if="showSms" type="text" class="signup1-input-box pretendard-regular-normal-mountain-mist-20px" v-model="SMSNm"
                    maxlength="6"
            placeholder="인증번호를 입력해주세요" />
          <button v-if="showSms" class="cert-btn pretendard-extra-extra-bold-white-20px"
            @click="checkPhoneNumber">인증하기</button>
          <button v-else class="cert-btn pretendard-extra-extra-bold-white-20px"
            @click="sendSMSPhone">인증번호 전송</button>
           
        </div>
      </div>
      <XFooter />
      <PhoneCertificationConfirmModal v-if="isModalVisible" :isRegistered="isPhoneNumberRegistered"
        @close="closePhoneCertificationModal" @confirm="navigateToSignup" />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import XFooter from "./XFooter";
import PhoneCertificationConfirmModal from "./PhoneCertificationConfirmModal";
import axios from "axios";

export default {
  name: "PhoneCertification",
  components: {
    XFooter,
    PhoneCertificationConfirmModal,
    Header
  },
  data() {
    return {
      phoneNm: '',
      isModalVisible: false,
      isPhoneNumberRegistered: false, // 핸드폰 번호가 등록되었는지 여부를 저장
      showSms :false,
      SMSNm : '',
      consfirmTxt : '인증번호 전송',
      isRegistered : null
    };
  },
  methods: {
    async sendSMSPhone() {
      try {
        // 번호 확인 요청
        const userCheckRes = await axios.get(
          `https://13.124.62.68:3000/api/v1/users/phoneNm/${this.phoneNm}`
        );

        // 번호가 존재하면 모달을 열고 종료
        if (userCheckRes.data) {
          this.openPhoneCertificationModal(false); // 상태를 false로 설정
          return;
        }
      } catch (error) {
        // 번호가 없으면(404 에러) 인증번호를 전송
        if (error.response && error.response.status === 404) {
          try {
            const params = {
              phoneNumber: this.phoneNm,
            };
            const smsRes = await axios.post(
              "https://13.124.62.68:3000/api/v1/sms/send",
              params
            );

            if (smsRes.data.data.code === 1000) {
              this.showSms = true;
              alert("카카오톡으로 인증번호가 발송되었습니다.");
            } else {
              alert("인증번호 발송에 실패했습니다.");
            }
          } catch (smsError) {
            console.error("Error in SMS sending:", smsError);
            alert("인증번호 전송 중 오류가 발생했습니다.");
          }
        } else {
          console.error("Error in user phone check:", error);
          alert("번호 확인 중 오류가 발생했습니다.");
        }
      }
    },

   async checkPhoneNumber() {
    const params =
      {
        "phoneNumber": this.phone,
        "verificationCode": this.SMSNm
      };
      const res = await axios.post('https://13.124.62.68:3000/api/v1/sms/verify-code',params);

      console.log("res : : : " , JSON.stringify(res))
      
       // 예시: API 요청 후 실제 결과에 따라 설정

      if(res){
        this.isRegistered = true;
      }else{
        this.isRegistered = false;
      }

      this.openPhoneCertificationModal(this.isRegistered);
      // 모달 열기 및 상태 저장
    },
    openPhoneCertificationModal(isRegistered) {
      this.isModalVisible = true;
      this.isPhoneNumberRegistered = isRegistered; // true 또는 false로 핸드폰 번호 상태 설정
      // localStorage.getItem("phoneNo");
      localStorage.setItem('phoneNo', this.phoneNm);

    },
    closePhoneCertificationModal() {
      this.isModalVisible = false;
    },
    navigateToSignup() {
      if(this.isRegistered === true){
        this.$router.push("/signup");
      }else{
        this.isModalVisible = false;
      }
      
    },
  },
};
</script>

<style scoped src="@/style/signup/phonecertification.css" />