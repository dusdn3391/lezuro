<template>
  <div class="container-center-horizontal">
    <div class="signup2-2 screen">
      <Header />
      <div class="signup2-wrap">
        <h1 class="signup2-title valign-text-middle pretendard-extra-extra-bold-black-30px">회원가입</h1>
        <div class="signup2-content">
          <div class="signup2-content-list">
            <div class="signup2-content-input-align">
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">성명 &nbsp;&nbsp;<p style="color: red;">*</p></div>
                <input type="text" v-model="name" placeholder="이름을 입력하세요"
                  class="signup2-content-item-input-box pretendard-medium-mountain-mist-16px">
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">아이디&nbsp;&nbsp;<p style="color: red;">*</p></div>
                <!-- 24.11.14 수정 - signup2-input-align 추가 -->
                <div class="signup2-input-align">
                  <input type="text" v-model="id" @input="validateId" :maxlength="12" @blur="handleBlur"
                    @keyup.enter="handleEnter" placeholder="영문,숫자 / 6 ~ 12자로 입력하세요"
                    class="signup2-content-item-input-box valign-text-middle pretendard-medium-mountain-mist-16px">
                  <!-- 24.11.14 수정 - 추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="idError">{{ idError }}</div>
                  <div class="error-message pretendard-regular-normal-white-12px" v-else-if="checkId">이미 사용중인 아이디입니다.</div>
                  <div class="error-message pretendard-regular-normal-white-12px" style="color: #184199" v-else-if="!idError && !checkId">사용가능한 아이디 입니다.</div>

                </div>
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">비밀번호&nbsp;&nbsp;<p style="color: red;">*</p></div>
                <!-- 24.11.14 수정 - signup2-input-align 추가 -->
                <div class="signup2-input-align">
                  <input type="password" v-model="pw" @input="validatePassword" :maxlength="20" placeholder="비밀번호 입력하세요"
                    class="signup2-content-item-input-box valign-text-middle pretendard-medium-mountain-mist-16px">
                  <!-- 24.11.14 수정 - 추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="pwError">{{ pwError }}</div>
                </div>
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">비밀번호 확인&nbsp;&nbsp;<p style="color: red;">*</p></div>
                <!-- 24.11.14 수정 - signup2-input-align 추가 -->
                <div class="signup2-input-align">
                  <!-- 24.11.14 수정 - v-model 추가 -->
                  <input type="password" v-model="confirmPw" :maxlength="20" placeholder="비밀번호 재입력하세요"
                    class="signup2-content-item-input-box valign-text-middle pretendard-medium-mountain-mist-16px">
                  <!-- 24.11.14 수정 - 추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="confirmPwError">{{ confirmPwError }}</div>
                </div>
              </div>

              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">생년월일&nbsp;&nbsp;<p style="color: red;">*</p></div>
                <input type="date" v-model="yymmdd"
                  class="signup2-content-item-input-box pretendard-medium-mountain-mist-16px">
              </div>
              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">성별&nbsp;&nbsp;<p style="color: red;">*</p></div>
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
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">닉네임&nbsp;&nbsp;<p style="color: red;">*</p></div>
                <!-- 24.11.14 수정 - signup2-input-align 추가 -->
                <div class="signup2-input-align">
                  <input type="text" placeholder="닉네임을 입력하세요" v-model="nick" @input="validateNickname" :maxlength="8"
                    @blur="nickBlur" @keyup.enter="nicknter"
                    class="signup2-content-item-input-box valign-text-middle pretendard-medium-mountain-mist-16px">
                  <!-- 24.11.14 수정 - 추가 -->
                  <div class="error-message pretendard-regular-normal-white-12px" v-if="nickError">{{ nickError }}</div>
                  <div class="error-message pretendard-regular-normal-white-12px" v-else-if="checkNick">이미 사용중인 닉네임입니다.</div>
                  <div class="error-message pretendard-regular-normal-white-12px" style="color: #184199" v-else-if="nick.length > 1 && !checkNick">사용가능한 닉네임
                    입니다.</div>
                </div>
              </div>

              <div class="signup2-content-item">
                <div class="signup2-content-item-title pretendard-medium-log-cabin-18px">이메일&nbsp;&nbsp;<p style="color: red;">*</p></div>
                <input type="text" v-model="email" placeholder="이메일을 입력하세요"
                  class="signup2-content-item-input-box valign-text-middle pretendard-medium-mountain-mist-16px">
              </div>
            </div>
            <p class="signup2-waring-text valign-text-middle pretendard-regular-normal-mine-shaft-14px">실제 정보와 다르게
              입력하는
              경우 추후 대회 참가, 보상에 문제가 발생할 수 있습니다.</p>
          </div>
          <button class="signup-btn pretendard-semi-bold-white-18px" @click="submitsignup()"
            :disabled="!isFormValid">가입하기</button>
        </div>
      </div>
      <XFooter />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import XFooter from "./XFooter";
import { taskStore } from '@/store/taskStore';  // API 호출
import axios from 'axios';


export default {
  name: "SignUp",
  components: {
    Header,
    XFooter,
  },

  data() {
    return {
      signDt: [],
      name: '',
      id: '',
      pw: '',
      confirmPw: "",// 24.11.14 수정
      yymmdd: '',
      gender: '',
      nick: '',
      email: '',
      idError: null, // 24.11.14 수정
      pwError: null, // 24.11.14 수정
      confirmPwError: null, // 24.11.14 수정
      nickError: null, // 24.11.14 수정
      checkId: false,
      checkNick: false
    }
  },
  mounted() {
    const phoneNo = localStorage.getItem("phoneNo");
    if (phoneNo) {
     this.id = phoneNo;
    } else {
     alert('폰 인증을 다시 시도해주세요.')
     this.$router.push({ path: "/phone-certification" })
    }
  },
  computed: {
    // 24.11.14 수정 - 추가
    // 전체 폼 유효성 검사
    isFormValid() {
      return !this.idError && !this.pwError && !this.confirmPwError && !this.nickError;
    },
  },
  watch: {
    // 24.11.14 수정 - 추가
    confirmPw(value) {
      if (value !== this.pw) {
        this.confirmPwError = "비밀번호가 일치하지 않습니다.";
      } else {
        this.confirmPwError = null;
      }
    },
  },
  methods: {
    nickBlur() {
      // 입력 필드 포커스를 벗어났을 때 실행되는 로직
      console.log('Blur 이벤트 발생, nick:', this.nick);
      this.checkingNick();
    },
    nickEnter() {
      // Enter 키를 눌렀을 때 실행되는 로직
      console.log('Enter 키 입력, nick:', this.nick);
      this.checkingNick();
    },
    handleBlur() {
      // 입력 필드 포커스를 벗어났을 때 실행되는 로직
      console.log('Blur 이벤트 발생, 아이디:', this.id);
      this.checkingId();

    },
    handleEnter() {
      // Enter 키를 눌렀을 때 실행되는 로직
      console.log('Enter 키 입력, 아이디:', this.id);
      this.checkingId();

    },
    async checkingId() {
      // users/phone/1

      const signDt = await taskStore.getSelectTasks(`v1/users/phone/${this.id}`);
      console.log("회원정보 확인  : : : ", signDt)
      if (signDt) {
        this.checkId = true
      } else {
        this.checkId = false
      }


    },
    async checkingNick() {

      const nickDt = await taskStore.getSelectTasks(`v1/users/nick/${this.nick}`);
      console.log("Nick정보 확인  : : : ", nickDt)
      if (nickDt) {
        this.checkNick = true
      } else {
        this.checkNick = false
      }
    },
    // 24.11.15 수정 - 추가
    checkPasswordMatch() {
      this.confirmPwError = this.pw !== this.confirmPw
        ? "비밀번호가 일치하지 않습니다."
        : null;
    },
    // 24.11.15 수정 - 추가
    validateId() {
      // 6~12자, 영소문자 및 숫자만 허용
      const regex = /^[a-z0-9]{6,12}$/;
      this.idError = !regex.test(this.id)
        ? "아이디는 영소문자와 숫자만 사용하며 6~12자로 입력해야 합니다."
        : null;
    },
    // 24.11.15 수정 - 추가
    validatePassword() {
      // 최소 8~20자, 연속된 문자를 사용할 수 없음
      const regex = /^(?!.*[^a-zA-Z0-9])(?!.*(.)\1{2,}).{8,20}$/;
      this.pwError = !regex.test(this.pw)
        ? "비밀번호는 8~20자 이내로 입력해야 하며 연속된 문자와 특수문자를 사용할 수 없습니다."
        : null;
    },
    // 24.11.15 수정 - 추가
    validateNickname() {
      // 2~6자, 한글, 영문, 숫자만 허용
      const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
      this.nickError = !regex.test(this.nick)
        ? "닉네임은 한글, 영문, 숫자만 사용하며 2~8자로 입력해야 합니다."
        : null;
    },
    async submitsignup() {

      if (!this.isFormValid) {
        alert("모든 입력값을 올바르게 입력해주세요.");
        return; // 유효성 검사 실패 시 함수 종료
      }
      if (this.checkId) {
        alert("아이디가 중복됩니다.");
        return; // 유효성 검사 실패 시 함수 종료
      }
      if (this.checkNick) {
        alert("닉네임이 중복됩니다.");
        return; // 유효성 검사 실패 시 함수 종료
      }

      const phoneNo = localStorage.getItem("phoneNo");
      const storeId = phoneNo.slice(-4);
      // http://localhost:3000/api/v1/auth/email/register
      //http://localhost:3000/api/v1/auth/email/register
      var params = {
        "name": this.name,
        "phoneNumber": this.id,
        "password": this.pw,
        "birthDate": this.yymmdd,
        "gender": this.gender,
        "phoneNm": phoneNo,
        "storeId": storeId,
        "userName": this.nick,
        "email": this.email,
        "termsOfServiceAgreed": true,
        "marketingAgreement": false,
        "accountType": "PHONE",
        "socialId": "12345678901234567890"
      };
      //                   {
      //   "name": "John Doe",
      //   "phoneNumber": "01012345678",
      //   "password": "Password123!",
      //   "birthDate": "1990-01-01",
      //   "gender": "MALE",
      //   "email": "user@example.com",
      //   "termsOfServiceAgreed": true,
      //   "marketingAgreement": false,
      //   "accountType": "PHONE",
      //   "socialId": "12345678901234567890"
      // }
      // this.signDt = await taskStore.addTask('/auth/email/register',params);
      console.log("params : : : ", JSON.stringify(params))
      try {
        const response = await axios.post('https://13.124.62.68:3000/api/v1/auth/phone/register',
          params,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        // console.log(me.data.message)
        console.log("this.signDt : : : : : : ", JSON.stringify(response))
        // localStorage.setItem('signDt', JSON.stringify(re));
        // localStorage.setItem('Token', JSON.stringify(response.token));
        if (response) {
          alert("회원가입이 성공하였습니다")
          // 여기서 로그인 하여 token정보 받아서 처리
          console.log("this.signDt : : : : : : ", JSON.stringify(response.config.data)) // 해당 부분 스토리지에 저장
          this.$router.push({ path: "/" })
        } else {
          alert("필수 요건을 입력해주세요.")
        }
      } catch (error) {
        alert("중복 아이디가 존재하거나 요청이 실패했습니다.");
      }
    }
  }
};
</script>

<style scoped src="@/style/signup/signup.css" />