<!-- <script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'; // Axios로 HTTP 요청 처리

// 인증 결과 파라미터
const authResultCode = ref("");
const authResultMsg = ref("");
const nextAppURL = ref("");
const txTid = ref("");
const authToken = ref("");
const payMethod = ref("");
const mid = ref("");
const moid = ref("");
const amt = ref("");
const reqReserved = ref("");
const netCancelURL = ref("");

// 승인 결과
const response = ref("");
const merchantKey =
  "33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A=="; // 상점키

// POST 요청 함수
async function reqPost(data, url) {
  try {
    const res = await axios.post(url, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
}

// JSON 응답 처리
function jsonRespDump(resp) {
  for (const [key, value] of Object.entries(resp)) {
    console.log(`${key}: ${value}`);
  }
}

// 결제 승인 처리
async function handlePayment() {
    console.log("authResultCode",authResultCode.value)
    
  if (authResultCode.value === "0000") {
    const ediDate = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14);
    const signData = CryptoJS.SHA256(
      authToken.value + mid.value + amt.value + ediDate + merchantKey
    ).toString(CryptoJS.enc.Hex);

    const requestData = {
      TID: txTid.value,
      AuthToken: authToken.value,
      MID: mid.value,
      Amt: amt.value,
      EdiDate: ediDate,
      SignData: signData,
      CharSet: "utf-8",
    };

    try {
      response.value = await reqPost(requestData, nextAppURL.value);
      jsonRespDump(response.value);
    } catch (error) {
      console.error("승인 요청 실패. 망취소 진행 중...");
      const cancelData = {
        TID: txTid.value,
        AuthToken: authToken.value,
        MID: mid.value,
        Amt: amt.value,
        EdiDate: ediDate,
        SignData: signData,
        NetCancel: "1",
        CharSet: "utf-8",
      };
      response.value = await reqPost(cancelData, netCancelURL.value);
      jsonRespDump(response.value);
    }
  } else {
    console.error("인증 실패:", authResultCode.value, authResultMsg.value);
  }
}

// Vue 컴포넌트가 로드되면 실행
onMounted(() => {
    console.log("authResultCode",authResultCode)
  // PHP POST 데이터를 JavaScript로 받는 로직 필요
  // 예제에서는 기본 값 설정
  authResultCode.value = "0000"; // 예제 값
  authResultMsg.value = "성공"; // 예제 값
  nextAppURL.value = "https://example.com/nextApp";
  txTid.value = "test123";
  authToken.value = "token123";
  payMethod.value = "CARD";
  mid.value = "testMID";
  moid.value = "testOrder123";
  amt.value = "1000";
  reqReserved.value = "reserved123";
  netCancelURL.value = "https://example.com/netCancel";

  // 결제 승인 처리 호출
  handlePayment();
});
</script> -->

<template>
  <div class="payment-complete-container">
    <div class="payment-complete-box">
      <!-- 아이콘 -->
      <div class="icon">
        <img src="../../../img/checked-img.png" alt=""></img>
      </div>
      <!-- 메시지 -->
      <div class="message">
        <p><span class="bold-text">결제가 완료</span>되었습니다.</p>
        <p>이용해주셔서 감사합니다.</p>
      </div>
      <!-- 확인 버튼 -->
      <button class="confirm-button" @click="handleConfirm">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleConfirm() {
      window.location.replace("/managerpoint-management");
      // alert("확인 버튼 클릭됨");
    },
  },
};
</script>

<style scoped>
/* 전체 컨테이너 */
.payment-complete-container {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center;    /* 수직 중앙 정렬 */
  height: 100vh;          /* 뷰포트 전체 높이 */
  width: 100vw;           /* 화면 전체 너비 */
  background-color: #f8f9fa; /* 배경색 */
}

.payment-complete-box {
  display: flex; /* Flexbox 활성화 */
  flex-direction: column; /* 세로 배치 */
  /* justify-content: center;  */
  align-items: center;     /* 가로 중앙 정렬 */
  text-align: center;
  background-color: #fff; /* 박스 배경색 */
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
  width: 40%; /* 너비는 화면의 50% */
  height: 100vh; /* 높이는 뷰포트의 70% */
}

.icon {
  margin-bottom: 60px;
  margin-top: calc(100vh / 3); /* 화면 높이의 1/3 */
}

.message {
  margin-bottom: 60px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.confirm-button {
  background-color: #2b56e4; /* 버튼 색상 */
  color: white;
  border: none;
  width: 60%;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #1a3db8; /* 버튼 호버 색상 */
}

.bold-text {
  font-weight: bold; /* 글자를 굵게 처리 */
  font-size: 18px;   /* 글자 크기 */
  color: #333;       /* 글자 색상 */
  margin-bottom: 10px;
}
</style>

