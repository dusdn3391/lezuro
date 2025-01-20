<template>
  <div class="all">
    <ManagerHeader />
    <div class="wrap">
      <div class="reservation-container">
        <ManagerNavbar />
        <div class="wrapper">
          <!-- 타이틀 부분 -->
          <div class="title-box">
            <h2 class="pretendard-bold-normal-black-28px">포인트 관리</h2>
          </div>

          <!-- 포인트 관리 내용 -->
          <div class="point-box">
            <!-- 탭 버튼 -->
            <div class="tab-buttons">
              <!-- 24.12.04 수정 - v-if  추가 -->
              <div v-if="pricingPlan === '정액제'" class="blue pretendard-regular-normal-white-16px"
                @click="selectPlan('정액제')">
                정액제
              </div>
              <div v-if="pricingPlan === '종량제'" class="yellow pretendard-regular-normal-white-16px"
                @click="selectPlan('종량제')">
                종량제
              </div>
              <div v-if="pricingPlan === '프리패스'" class="red pretendard-regular-normal-white-16px"
                @click="selectPlan('프리패스')">
                프리패스
              </div>
            </div>

            <!-- 정액제 사용 정보 -->
            <!-- 요금제 사용 정보 -->
            <div class="plan-info">
              <!-- 정액제 정보 -->
              <!-- <div v-if="selectedPlan === '정액제'"> -->
              <!-- 정액제 정보 -->
              <!-- 24.12.18 수정 - selectedPlan - pricingPlan 로 변경 -->
              <div v-if="pricingPlan === '정액제'">
              <div class="plan-status">
                <div class="pretendard-bold-mine-shaft-20px">정액제 사용중</div>
                        <!-- 24.12.18 수정- 추가 : plan-status-btn-align 추가 - 추후 삭제예정  -->
                        <div class="plan-status-btn-align">
                    <!-- 24.12.18 수정- 추가 : 결제등록 버튼  -->
                    <button class="register-btn pretendard-medium-white-18px" @click="openAddPaymentModal">
                      결제 등록
                    </button>
                    <!-- <button class="register-btn pretendard-medium-white-18px" @click="goPayment">
                      결제수단 등록
                    </button> -->
                  </div>
                </div>
              <div class="dates-cost">
                <div class="date-info">
                  <span class="pretendard-regular-normal-mountain-mist-20px">시작일</span>
                  <p class="start-date pretendard-bold-normal-28px">2024-07-25</p>
                </div>
                <div class="date-info">
                  <span class="pretendard-regular-normal-mountain-mist-20px">만료일</span>
                  <p class="end-date pretendard-bold-normal-28px">2024-08-24</p>
                </div>
                <div class="cost-info">
                  <div>
                    <span class="pretendard-regular-normal-mountain-mist-20px">이용 비용</span>
                    <p class="cost pretendard-bold-normal-28px">{{parseInt(selectedMny).toLocaleString()}}</p>
                  </div>
                  <!-- <div>
                    <button class="cost-change-btn" @click="openCostModal">이용 비용 변경</button>
                  </div> -->
                </div>
              </div>
            </div>

            <!-- 종량제 정보 -->
              <!-- 24.12.18 수정 - selectedPlan - pricingPlan 로 변경 -->
              <div v-if="pricingPlan === '종량제'">
                <div class="plan-status">
                  <div class="pretendard-bold-mine-shaft-20px">종량제 사용중</div>
                  <div class="point-charge">
                    <span class="pretendard-bold-mine-shaft-20px">{{ totalPoint.toLocaleString() }}P</span>
                    <!-- 24.12.18 수정- 추가 : plan-status-btn-align 추가 - 추후 삭제예정  -->
                    <div class="plan-status-btn-align">
                      <!-- 24.12.18 수정- 추가 : 결제등록 버튼  -->
                      <button class="register-btn pretendard-medium-white-18px" @click="openAddPaymentModal">
                        포인트 결제
                      </button>
                      <!-- <button class="register-btn pretendard-medium-white-18px" @click="pointChargeModal">포인트
                        충전</button> -->
                    </div>
                  </div>
                </div>
              <div class="dates-cost">
                <div class="cost-info_2">
                  <div class="cost-item_2">
                    <p class="cost pretendard-bold-normal-28px">{{ pricePer9Holes.toLocaleString() }} P</p>
                    <span class="pretendard-regular-normal-mountain-mist-20px">9홀당 비용</span>
                  </div>
                  <div class="cost-item_2">
                    <p class="cost pretendard-bold-normal-28px">{{ pricePerPerson.toLocaleString() }} P</p>
                    <span class="pretendard-regular-normal-mountain-mist-20px">1인당 비용</span>
                  </div>
                 
                 
                 
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button class="cost-change-btn" @click="openCostModal">이용 비용 변경</button>
                  </div>
              </div>
            </div>

             <!-- 프리패스 정보 -->
              <!-- 24.12.18 수정 - selectedPlan - pricingPlan 로 변경 -->
              <div v-if="pricingPlan === '프리패스'">
                <div class="plan-status">
                  <div class="pretendard-bold-mine-shaft-20px">프리패스 사용중</div>
                  <div class="plan-status-btn-align">
                    <!-- 24.12.18 수정- 추가 : 결제등록 버튼  -->
                    <button class="register-btn pretendard-medium-white-18px" @click="openAddPaymentModal">
                      결제 등록
                    </button>
                    <!-- <button class="register-btn pretendard-medium-white-18px" @click="goPayment">
                      결제수단 등록
                    </button> -->
                  </div>
                </div>
              <div class="dates-cost">
                <div class="dates-cost_3">
                  <div class="date-info">
                    <span class="pretendard-regular-normal-mountain-mist-20px">시작일</span>
                    <p class="start-date pretendard-bold-normal-28px">2024-07-25</p>
                  </div>
                  <div class="date-info">
                    <span class="pretendard-regular-normal-mountain-mist-20px">만료일</span>
                    <p class="end-date pretendard-bold-normal-28px">2024-08-24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 24.12.18 수정 - selectedPlan - pricingPlan 로 변경 -->
          <div class="point-info" v-if="pricingPlan === '프리패스'">
            <h4 class="pretendard-bold-mine-shaft-20px">프리패스 사용중 (2024.07 ~ 2024.09)</h4>
            <ul>
              <li>
                오픈 기념 프로모션으로 3개월 프리패스 서비스를 제공합니다.
              </li>
              <li>
                프로모션은 기간 만료 시 자동 종료되며 정상적인 이용을 위해서 요금제를 반드시 정액제 또는 종량제 선택 후 이용하시기 바랍니다.
              </li>

            </ul>
          </div>
          <!-- 포인트 요금제 안내 -->
          <div class="point-info">
            <h4 class="pretendard-bold-mine-shaft-20px">포인트 요금제 안내</h4>
            <ul>
              <li class="pretendard-light-granite-gray-16px">
                <strong class="pretendard-medium-black-18px">정액제</strong>- 월별 자동 충전 방식으로 포인트 차감
                없이 자유롭게 이용 가능
              </li>
              <li class="pretendard-light-granite-gray-16px">
                <strong class="pretendard-medium-black-18px">종량제</strong>- 9홀당 이용 포인트와 플레이 유저수를 곱해 총 이용 포인트를 게임 종료 후
                차감하는 방식입니다.(차감 시 포인트가 부족할 경우 재 충전 후 이용 가능합니다.)
              </li>
              <li class="pretendard-light-granite-gray-16px">
                <strong class="pretendard-medium-black-18px">프리패스</strong>- 이벤트형 유료제로 회사 담당자를
                통해 진행 가능
              </li>
            </ul>
          </div>

          <!-- 포인트 내역 -->
          <div class="point-history">
              <!-- 24.12.18 수정 - 폰트 추가 -->
              <div class="pretendard-bold-black-24px">포인트 내역</div>
            <div class="tabs">
              <div v-for="tab in tabs" :key="tab" :class="[
                'tab-btn pretendard-regular-normal-mine-shaft-16px ',
                { active: selectedTab === tab },
              ]" @click="selectTab(tab)">
                {{ tab }}
              </div>
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" /> -->
              <!-- 24.12.04 수정 --> <!-- 24.12.09 수정 - max 추가 -->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="startDate"
                @change="validateStartDate" :max="today" />
              ~
              <!-- <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" /> -->
              <!-- 24.12.04 수정 --> <!-- 24.12.09 수정 - max 추가 -->
              <input type="date" class="date pretendard-regular-normal-mine-shaft-18px" v-model="endDate"
                @change="validateEndDate" :max="today" />
            </div>
            <div class="point-list">
              <div class="table-container">
                <table>
                  <thead>
                    <tr class="pretendard-bold-mine-shaft-18px ">
                      <th>번호</th>
                      <th>내역</th>
                      <th>분류</th>
                      <th>금액</th>
                      <th>잔여 포인트</th>
                      <th>사용일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(point, index) in paginatedItems" :key="index"
                      class="pretendard-light-granite-gray-16px">
                      <td class="pretendard-regular-normal-granite-gray-18px">
                        <!-- {{ index + 1 }} -->
                        <!-- 24.12.03 수정 -->
                        {{ point.pointTransaction_transactionId }}
                      </td>
                      <td>{{ point.pointTransaction_description }}</td>
                      <td class="pretendard-regular-normal-granite-gray-18px">{{ point.pointTransaction_type }}</td>
                      <td :class="{
                        // 'positive-money': !isPositiveMoney(point.pointTransaction_amount),
                        // 'negative-money': isPositiveMoney(point.pointTransaction_amount),
                        // 24.12.04 수정 - 천단위 쉼표 추가
                        'positive-money': parseFloat(point.pointTransaction_amount) > 0,
                        'negative-money': parseFloat(point.pointTransaction_amount) < 0,
                      }">
                        <!-- {{ parseInt(point.pointTransaction_amount) > 0 ?
                            "+" + parseInt(point.pointTransaction_amount)
                            :
                            parseInt(point.pointTransaction_amount) }} -->
                        <!--  24.12.04 수정 - 천단위 쉼표 추가 -->
                        {{ parseFloat(point.pointTransaction_amount) > 0
                          ? "+" + formatAmount(point.pointTransaction_amount)
                          : formatAmount(point.pointTransaction_amount)
                        }}
                      </td>
                      <td class="pretendard-regular-normal-granite-gray-18px">
                        <!-- {{ parseInt(point.pointTransaction_balance) }} -->
                        <!-- 24.12.04 수정 - 천단위 쉼표 추가 -->
                        {{ formatAmount(point.pointTransaction_balance) }}
                      </td>
                      <td>{{ point.pointTransaction_timestamp.split("T")[0] }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="pagination-controls">
                  <img class="pagination-arrow" @click="prevPage" :src="arrowLeftImage" :alt="'Previous'"
                    :class="{ disabled: currentPage === 1 }" />
                  <div class="page-numbers pretendard-medium-log-cabin-16px">
                    <!-- 24.12.03 수정 - 추가 -->
                    <div v-for="page in visiblePages" :key="page"
                      :class="['page-number', { active: page === currentPage }]" @click="goToPage(page)">
                      {{ page }}
                    </div>
                  </div>
                  <img class="pagination-arrow flipped" @click="nextPage" :src="arrowRightImage" :alt="'Next'"
                    :class="{ disabled: currentPage === totalPages }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PointChargeModal v-if="isModalVisible" @close="closeModal" />
    <ManagerUsingCostModal v-if="isModalCVisible" @close="closeCModal" @confirm="confirmPay"/>
   <!-- 24.12.18 수정 - 추가  -->
   <AddPaymentModal v-if="isAddModalVisible" @close="closeAddPaymentModal" @confirm="goPayment"  :selectedMny = "selectedMny" />
    </div>
  </div>
</template>

<script>
import ManagerHeader from "./ManagerHeader.vue";
import ManagerNavbar from "./ManagerNavbar.vue";
import PointChargeModal from "./PointChargeModal.vue";
import ManagerUsingCostModal from "./ManagerUsingCostModal.vue";
import { managerStore } from '@/store/managerStore';  // API 호출
import AddPaymentModal from "./AddPaymentModal.vue"; // 24.12.18 수정 - 추가

export default {
  name: "ManagerPointManagement",
  components: {
    ManagerHeader,
    ManagerNavbar,
    PointChargeModal,
    ManagerUsingCostModal,
    AddPaymentModal // 24.12.18 수정 - 추가
  },
  data() {
    return {
      selectedMny : 1000,
      selectedTab: "전체",
      selectedPlan: "정액제",
      // 24.12.04 수정 - 추가
      pricingPlan: '',
      // tabs: ["전체", "주간", "월별", "월간"],
      // 24.12.04 수정
      tabs: ["전체"],
      // 24.12.04 수정 - 추가
      startDate: "",
      endDate: "",
      totalPoint: 1000, // 포인트 정보 (종량제에서 사용)
      isModalVisible: false,
      isModalCVisible: false,
      isAddModalVisible: false, // 24.12.18 수정 - 추가
      point: [
        { number: 6, pointTransaction_description: "포인트 충전", pointTransaction_type: "충전", pointTransaction_amount: "+30,000", pointTransaction_balance: "70,000", pointTransaction_timestamp: "2024-06-25 23:59:59" },
        { number: 5, pointTransaction_description: "9홀당 지불 요금", pointTransaction_type: "사용", pointTransaction_amount: "-30,000", pointTransaction_balance: "120,000", pointTransaction_timestamp: "2024-06-25 23:59:59" },
        { number: 4, pointTransaction_description: "포인트 충전", pointTransaction_type: "충전", pointTransaction_amount: "+30,000", pointTransaction_balance: "170,000", pointTransaction_timestamp: "2024-06-25 23:59:59" },
        { number: 3, pointTransaction_description: "9홀당 지불 요금", pointTransaction_type: "사용", pointTransaction_amount: "-30,000", pointTransaction_balance: "50,000", pointTransaction_timestamp: "2024-06-25 23:59:59" },
        { number: 2, pointTransaction_description: "9홀당 지불 요금", pointTransaction_type: "사용", pointTransaction_amount: "+30,000", pointTransaction_balance: "70,000", pointTransaction_timestamp: "2024-06-25 23:59:59" },
        { number: 1, pointTransaction_description: "9홀당 지불 요금", pointTransaction_type: "사용", pointTransaction_amount: "+30,000", pointTransaction_balance: "70,000", pointTransaction_timestamp: "2024-06-25 23:59:59" }
      ],
      arrowLeftImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 왼쪽 화살표 이미지 URL
      arrowRightImage:
        "https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/iconamoon-arrow-up-2-thin.svg", // 오른쪽 화살표 이미지 URL
      currentPage: 1,
      itemsPerPage: 5, // Display 6 courses per page
      pricePer9Holes : 1000,
      pricePerPerson : 1000
    };
  },
  async created() {
    const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
    console.log("managerInfo.id : : : : ", managerInfo.id);
    console.log("managerInfo.pricingPlan : : : : ", managerInfo.pricingPlan);

    // pricingPlan 값을 저장
    this.pricingPlan = managerInfo.pricingPlan;
    this.pricePer9Holes = managerInfo.pricePer9Holes;
    this.pricePerPerson = managerInfo.pricePerPerson;
    // this.pricingPlan = "프리패스";

    // 필요한 데이터 가져오기
    const response = await managerStore.getTask(`points/admin/${managerInfo.id}`);
    console.log("roomNumbering : : : : : : ", JSON.stringify(response));
    this.point = response;
  },
  computed: {
    // 24.12.09 수정 - 추가 : 오늘날짜 계산
    today() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    // 24.12.04 수정 - 추가 : 동적으로 표시할 페이지 번호 계산
    visiblePages() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      const maxVisiblePages = 5;

      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    // 24.12.04 수정 - 추가
    filteredItems() {
      const filteredPoints = this.point.filter(point => {
        const matchesDateRange = this.isWithinDateRange(point.pointTransaction_timestamp);

        return matchesDateRange;
      });

      return filteredPoints;
    },
  },
  mounted() {
    this.getPointList()
  },
  methods: {
    // 24.12.04 수정 - 추가
    isWithinDateRange(createdAt) {
      if (!this.startDate && !this.endDate) return true;

      const createdDate = new Date(createdAt.split("T")[0]);
      console.log("createdDate : : :", createdDate)
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;

      return (!start || createdDate >= start) && (!end || createdDate <= end);
    },
    // 24.12.04 수정 - 추가
    validateStartDate() {
      // 24.12.09 수정 - today 추가
      const today = new Date();
      if (new Date(this.startDate) > today) {
        alert("오늘 이후의 날짜는 선택할 수 없습니다.");
        this.startDate = ""; // 초기화
      }
      // 시작 날짜가 변경되었을 때 종료 날짜와 비교
      else if (this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
        alert("시작 날짜는 종료 날짜보다 늦을 수 없습니다.");
        this.startDate = ""; // 초기화
      }
      this.selectedTab = ""; // 전체 탭 해제
    },
    // 24.12.04 수정 - 추가
    validateEndDate() {
      // 24.12.09 수정 - today 추가
      const today = new Date();
      if (new Date(this.endDate) > today) {
        alert("오늘 이후의 날짜는 선택할 수 없습니다.");
        this.endDate = ""; // 초기화
      }
      // 종료 날짜가 변경되었을 때 시작 날짜와 비교
      else if (this.startDate && new Date(this.endDate) < new Date(this.startDate)) {
        alert("종료 날짜는 시작 날짜보다 이를 수 없습니다.");
        this.endDate = ""; // 초기화
      }
      this.selectedTab = ""; // 전체 탭 해제
    },
    selectTab(tab) {
      this.selectedTab = tab;
      console.log('Selected Tab:', tab); // 이 로그가 출력되는지 확인하세요.
      // 24.12.04 수정 - 추가
      if (tab === "전체") {
        // 전체를 선택하면 날짜 초기화
        this.startDate = "";
        this.endDate = "";
        console.log('Date filters reset'); // 이 로그가 출력되는지 확인하세요.
      }
    },
    // 24.12.04 수정 - 추가 : 천 단위 쉼표 함수
    formatAmount(amount) {
      return Number(amount).toLocaleString(); // 쉼표 추가
    },
    async getPointList() {

      const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
      console.log("managerInfo.id : : : : ", managerInfo.id)
      console.log("managerInfo.pricingPlan : : : : ", managerInfo.pricingPlan)

      const response = await managerStore.getTask(`points/admin/${managerInfo.id}`);
      console.log("roomNumbering : : : : : : ", JSON.stringify(response))
      this.point = response
      // alert("해당 예약이 정상적으로 삭제 되었습니다.")
      // this.getReservationDt(this.selectedDate);
    },
    goPayment(paymentInfo) {
      const managerInfo = JSON.parse(localStorage.getItem('managerInfo'));
      this.isAddModalVisible = false;
      console.log("값 확인 : : :  ");
      console.log('Payment Info:', paymentInfo);
      paymentInfo.managerid = managerInfo.id;

      this.$router.push({
            name: 'nicePays',
            query: paymentInfo,
        });
      // this.$router.push('/nicepays')
    },
    isPositiveMoney(money) {
      return money.startsWith("-");
    },
    selectPlan(plan) {
      this.selectedPlan = plan; // 선택한 플랜을 업데이트
    },
    pointChargeModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    // 24.12.18 수정 - 추가
    openAddPaymentModal() {
      this.isAddModalVisible = true;
    },
    // 24.12.18 수정 - 추가
    closeAddPaymentModal() {
      this.isAddModalVisible = false;
    },
    openCostModal() {
      this.isModalCVisible = true;
    },
    closeCModal() {
      this.isModalCVisible = false;
    },
    confirmPay(selected){
      this.isModalCVisible = false;
      console.log('selected Mny:', selected);
      this.selectedMny = selected.replace(/,/g, "");
      this.totalPoint = selected.replace(/,/g, "");

    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
/* 전체 컨테이너의 배경색 설정 */
.reservation-container {
  background: #f5f6f6;
  display: flex;
  height: 100%;
  flex-direction: row;
}

/* 24.12.23 수정 */
.wrapper {
    width: 100%;
    padding: 30px;
    /* gap: 20px; */
    height: 100vh;
}

/* 타이틀 박스 */
.title-box {
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
}

/* 포인트 박스 */
.point-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* 탭 버튼 */
.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-buttons div {
  padding: 10px 20px;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.blue {
  background-color: #184199;
}

.yellow {
  background-color: #f4bc1c;
}

.red {
  background-color: #d30f1a;
}

/* 정액제 사용 정보 */
.plan-info {
  margin-bottom: 20px;
}

.plan-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16.5px 30px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  margin: 0;
}

/* 24.12.18 수정- 추가 */
.plan-status-btn-align {
  display: flex;
  align-items: center;
  gap: 5px;
}

.point-charge {
  display: flex;
  align-items: center;
  gap: 20px;
}

.register-btn {
  background-color: #184199;
  color: white;
  padding: 12px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dates-cost {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 27px 30px;
  gap: 20px;
  align-items: center;
}

.dates-cost_3 {
  display: flex;
  justify-content: space-between;
  width: 60%;
  gap: 20px;
  align-items: center;
}

.date-info .start-date,
.date-info .end-date {
  color: #d30f1a;
}

.cost-info {
  display: flex;
  gap: 50px;
}

.cost-info .cost {
  color: #d30f1a;
}

.cost-info_2 {
  display: flex;
  width: 60%;
  justify-content: space-between;
}

.cost-info_2 .cost-item_2 {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cost-change-btn {
  background-color: #333;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
}

/* 포인트 요금제 안내 */
.point-info {
  padding: 20px;
}

.point-info h4 {
  font-weight: bold;
  margin-bottom: 10px;
}

.point-info ul {
  padding: 0;
}

.point-info li {
  margin-bottom: 10px;
}

/* 포인트 내역 */
.tabs {
  /* 24.12.18 수정 - 배경색 변경  */
  background-color: #F5F6F6;
  margin-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding: 30px;
  align-items: center;
  /* 24.12.18 수정 - 추가 */
  height: 120px;
}

/* 24.11.11 수정 - 버튼 내 padding 정렬 수정 */
.tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 30px;
  gap: 10px;
  background-color: #fff;
  height: 60px;
  border: 1px solid #ddd;
}

.tab-btn.active {
  background-color: #184199;
  color: #fff;
}

.point-history {
  margin-top: 30px;
  background-color: #fff;
}

.point-history input {
  width: 250px;
  height: 60px;
  border: 1px solid #ddd;
  margin: 12px;
  padding: 0 20px;
}

.table-container {
  background-color: #fff;
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 26px 0px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f5f5f5;
}

.positive-money {
  color: #184199;
}

/* 네거티브 금액: 빨간색 */
.negative-money {
  color: #d30f1a;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* 24.11.11 수정 - 페이지 정렬 추가 */
.page-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* 24.12.04 수정 */
.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #eeeeee;
  cursor: pointer;
}

/* 24.12.04 수정 */
.page-number.active {
  background-color: #d30f1a;
  color: white;
}

/* 24.12.04 수정  - 추가 */
.page-number:hover {
  background-color: #eeeeee;
}

.pagination-arrow {
  cursor: pointer;
}

.pagination-arrow.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-arrow.flipped {
  transform: rotate(180deg);
}
</style>
