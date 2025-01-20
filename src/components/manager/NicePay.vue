<script setup>
import axios from "axios";
import CryptoJS from "crypto-js";
import { computed, onMounted, onUnmounted, ref } from "vue";


const handlePostMessage = (event) => {
  // 나이스페이에서 전달된 메시지인지 확인
  if (event.origin !== "https://www.nicepay.co.kr") return; // 나이스페이 도메인으로 설정
  try {
    const data = JSON.parse(event.data);
    console.log("Received Post Message:", data);

    // 원하는 값 추출
    const { code, width, height, scroll } = data;
    console.log("Code:", code);
    console.log("Width:", width);
    console.log("Height:", height);
    console.log("Scroll:", scroll);

    // 필요에 따라 추가 처리
  } catch (error) {
    console.error("Invalid postMessage data", error);
  }
};
function handlePopstate() {
  console.log("이거 타나요?")
  window.location.replace("/managerpoint-management");

}

// 쿼리 매개변수 추출 함수
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get('name'),
    phone: params.get('phone'),
    email: params.get('email'),
    product: params.get('product'),
    price: params.get('price'),
    paymentMethod: params.get('paymentMethod'),
    managerId: params.get('managerid'),
  };
}

// 데이터 관리
const queryData = ref({});

onMounted(async () => {
  try {
    console.log('컴포넌트 마운트 중...');
    window.nicepaySubmit = nicepaySubmit;
    window.nicepayClose = nicepayClose;
    queryData.value = getQueryParams();
    console.log('확인용  : : : :', queryData.value);

    // Execute goPay and then insertDb
    await goPay(document.payForm);
    console.log('goPay 완료');

    await insertDb();
    console.log('insertDb 완료');
  } catch (error) {
    console.error('오류 발생:', error);
  }
});

// nicepaySubmit 함수를 window 객체에 할당하여 전역에서 접근 가능하게 만듭니다.
async function nicepaySubmit() {
 
  console.log("폼 제출 시작");
  console.log("폼 제출 명령 실행됨");
  document.payForm.submit();
 

  // // 3. 결과값을 받았다고 가정하고 NicePayConfirm으로 이동
  // window.location.href = "/NicePayConfirm";
  // console.log("결√제 요청 응답:", JSON.stringify(formData));

  // try {
  //   console.log("폼 제출 시작" ,hashString.value);
  //   // console.log("결√제 요청 응답:", JSON.stringify(document.payForm));
  //   const formData = {
  //     PayMethod: paymentMethod,
  //     GoodsName: goodsName,
  //     Amt: amt,
  //     MID: MID,
  //     Moid: moid,
  //     BuyerName: buyerName,
  //     BuyerEmail: buyerEmail,
  //     BuyerTel: buyerTel,
  //     ReturnURL: "http://13.124.62.68:3000/api/points/authReq",
  //     EdiDate: ediDate,
  //     SignData: hashString.value,
  //     NpLang: "KO", // 고정 값
  //     GoodsCl: "1", // 고정 값
  //     TransType: "0", // 고정 값
  //     CharSet: "utf-8", // 고정 값
  //     ReqReserved: "", // 고정 값
  //   };
    
  //   // 폼 데이터 가져오기
  //   // const formData = new FormData(document.payForm);
    
  //   const a =  {
  //       "Accept-Charset": "euc-kr", // euc-kr 설정
  //     };
  //     console.log("결√제 요청 응답:", JSON.stringify(formData));

  //   // 1. 폼 제출 (여기서는 서버로 전송한다고 가정)
  //   const response = await axios.post("http://13.124.62.68:3000/api/points/authReq", formData,a);
  //   console.log("결√제 요청 응답:", response.data);

  //   // 2. 응답 결과 처리
  //   if (response.data.success) {
  //     // 결제 성공 후 NicePayConfirm으로 이동
  //     window.location.href = "/NicePayConfirm";
  //   } else {
  //     // 실패 처리
  //     alert("결제에 실패했습니다. 다시 시도해주세요.");
  //   }
  // } catch (error) {
  //   console.error("결제 요청 중 오류 발생:", error);
  //   alert("결제 요청 중 오류가 발생했습니다.");
  // }
}

function nicepayClose() {
  alert("결제가 취소 되었습니다");
  window.location.replace('/managerpoint-management');
}


onUnmounted(() => {
  // 컴포넌트가 언마운트될 때 window 객체에서 nicepaySubmit 함수를 제거합니다.
  console.log('onUnmounted 마운트 중...');

  delete window.nicepaySubmit;
  delete window.nicepayClose;
  // window.addEventListener("popstate", handlePopstate);

});


const paymentMethod = getQueryParams().paymentMethod;
const managerId = getQueryParams().managerId;
const moid_random = new Date().toISOString().replace(/[-:.TZ]/g, "")
const merchantKey =
  "33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A==";
const MID = "nictest00m";
const ediDate = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
const amt = getQueryParams().price;
const returnURL = "https://13.124.62.68:3000/api/points/authReq";
const goodsName = getQueryParams().product;
const moid = "moid"+ moid_random;
const buyerName = getQueryParams().name;
const buyerEmail = getQueryParams().email;
const buyerTel = getQueryParams().phone.replace(/-/g, '');

const count = ref(0);

const hashString = computed(() => {
  const str = `${ediDate}${MID}${amt}${merchantKey}`;
  return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
});

async function nicepayStart(event) {
  
  event.preventDefault();
  goPay(document.payForm);

  

}

async function insertDb() {

  console.log('moid : : : ' , moid ,paymentMethod , goodsName ,amt ,managerId)
  const params = {
  "managerid": parseInt(managerId),
  "description": "포인트 충전 취소",
  "amount": parseInt(amt),
  "tid": "",
  "goodsname": goodsName,
  "moid": moid,
  "paymethod": paymentMethod
}

  const config = {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
      };

  try {
    const response = await axios.post("https://13.124.62.68:3000/api/points",
      params,config
    );
    console.log("test get  요청", response.data);
  } catch (error) {
    console.error("결제 요청 실패:", error);
  }
}
</script>

<template>
  <body style="display: none">
    
    <form
      name="payForm"
      method="post"
      action="https://13.124.62.68:3000/api/points/authReq"
      accept-charset="euc-kr"
      class="payment-form"
    >

    <!-- <form name="payForm" @submit.prevent="nicepaySubmit" class="payment-form"> -->

      <table>
        <tr>
          <th>PayMethod</th>
          <td><input type="text" name="PayMethod" v-model="paymentMethod" /></td>
        </tr>
        <tr>
          <th>GoodsName</th>
          <td><input type="text" name="GoodsName" v-model="goodsName" /></td>
        </tr>
        <tr>
          <th>Amt</th>
          <td><input type="text" name="Amt" v-model="amt" /></td>
        </tr>
        <tr>
          <th>MID</th>
          <td><input type="text" name="MID" v-model="MID" /></td>
        </tr>
        <tr>
          <th>Moid</th>
          <td><input type="text" name="Moid" v-model="moid" /></td>
        </tr>
        <tr>
          <th>BuyerName</th>
          <td><input type="text" name="BuyerName" v-model="buyerName" /></td>
        </tr>
        <tr>
          <th>BuyerEmail</th>
          <td>
            <input type="text" name="BuyerEmail" v-model="buyerEmail" />
          </td>
        </tr>
        <tr>
          <th>BuyerTel</th>
          <td><input type="text" name="BuyerTel" v-model="buyerTel" /></td>
        </tr>
        <tr>
          <th>ReturnURL [Mobile only]</th>
          <td><input type="text" name="ReturnURL" v-model="returnURL" /></td>
        </tr>
        <tr>
          <th>Virtual Account Expiration Date(YYYYMMDD)</th>
          <td><input type="text" name="VbankExpDate" value="" /></td>
        </tr>

        <input type="hidden" name="NpLang" value="KO" />
        <!-- EN:English, CN:Chinese, KO:Korean -->
        <input type="hidden" name="GoodsCl" value="1" />
        <!-- products(1), contents(0)) -->
        <input type="hidden" name="TransType" value="0" />
        <!-- USE escrow false(0)/true(1) -->
        <input type="hidden" name="CharSet" value="utf-8" />
        <!-- Return CharSet -->
        <input type="hidden" name="ReqReserved" value="" />
        <!-- mall custom field -->

        <!-- DO NOT CHANGE -->
        <input type="hidden" name="EdiDate" v-model="ediDate" />
        <!-- YYYYMMDDHHMISS -->
        <input type="hidden" name="SignData" v-model="hashString" />
        <!-- EncryptData -->
      </table>
      <div class="button-group">
        <a href="#" class="btn_blue" @click="nicepayStart">REQUEST</a>
        <!-- <a href="#" class="btn_blue" @click="test">test</a> -->
      </div>
    </form>
  </body>
</template>
 
<style scoped>
.payment-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.payment-form table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.payment-form th {
  text-align: left;
  padding: 8px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
}

.payment-form td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.payment-form input[type="text"] {
  width: calc(100% - 16px);
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn_blue {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn_blue:hover {
  background-color: #0056b3;
}
</style>
