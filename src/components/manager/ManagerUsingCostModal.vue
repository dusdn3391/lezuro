<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <!-- 모달 헤더 -->
      <div class="modal-header">
        <h2 class="modal-title pretendard-extra-extra-bold-log-cabin-24px">이용 비용 선택</h2>
        <button class="close-button" @click="closeModal">✕</button>
      </div>

      <!-- 보유 포인트 -->
      <!-- <div class="current-point pretendard-bold-white-18px">
        <div class="point-label">보유포인트</div>
        <div class="point-value">{{ currentPoint }}P</div>
      </div> -->

      <!-- 포인트 충전 목록 -->
      <div class="point-charge" style="max-height: 100%; overflow-y: auto; list-style-type: none;">
        <ul class="charge-options">
          <!-- 24.12.18  수정 - 폰트 추가 -->
          <li v-for="(option, index) in chargeOptions" :key="index"
            class="charge-option pretendard-regular-normal-log-cabin-18px">
            <input type="radio" :id="'option-' + index" :value="option.point" v-model="selectedOption" />
            <label :for="'option-' + index">{{ option.point }}P</label>
            <span class="charge-price">{{ option.price }}</span>
          </li>
          <!-- <li class="charge-option">
            <input type="radio" id="custom" value="custom" v-model="selectedOption" />
            <input type="text" v-if="selectedOption === 'custom'" v-model="customAmount" placeholder="직접 입력해주세요"
              class="custom-input pretendard-regular-normal-log-cabin-18px" />
          </li> -->
        </ul>
      </div>

      <!-- 선택하기 버튼 -->
      <!-- 24.12.18  수정 - 폰트 추가 -->
      <button class="confirm-button pretendard-bold-white-18px" @click="confirmSelection">선택하기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManagerUsingCostModal",
  data() {
    return {
      currentPoint: 70000, // 보유 포인트
      selectedOption: null, // 선택된 포인트 옵션
      customAmount: null, // 직접 선택한 포인트
      // chargeOptions: [
      //   { point: "10,000", price: "\\10,000" },
      //   { point: "20,000", price: "\\20,000" },
      //   { point: "30,000", price: "\\30,000" },
      //   { point: "40,000", price: "\\40,000" },
      // ],
      // 24.12.18 수정 - 원화 표시
      chargeOptions: [
        { point: "1,000", price: "\u20A91,000" }, 
        { point: "3,000", price: "\u20A93,000" },
        { point: "5,000", price: "\u20A95,000" },
        { point: "10,000", price: "\u20A910,000" }, 
        { point: "50,000", price: "\u20A950,000" },
        { point: "100,000", price: "\u20A9100,000" },
        { point: "300,000", price: "\u20A9300,000" },
        { point: "500,000", price: "\u20A9500,000" },
        { point: "1,000,000", price: "\u20A91,000,000" },

      ]
    };
  },
  mounted() {
    // 첫 번째 항목을 기본값으로 설정
    if (this.chargeOptions.length > 0) {
      this.selectedOption = this.chargeOptions[0].point;
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmSelection() {
      const selected = this.selectedOption === "custom" ? this.customAmount : this.selectedOption;
      // alert(`${selected}P 선택됨`);
      this.$emit("confirm", selected);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  
}


.modal {
  background-color: white;
  /* width: 471px;
  border-radius: 10px;
  padding: 20px; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* 24.12.18 수정 - 추가 */
  width: 880px;
  height: 814px;
  border-radius: 5px;
  padding: 40px;
  max-height: 100%; overflow-y: auto; list-style-type: none;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 20px; */
  /* 24.12.18 수정 - 추가 */
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}



.close-button {
  background: none;
  border: none;
  cursor: pointer;
  /* 24.12.18 수정 - 추가 */
  width: 14px;
  height: 14px;
}

.current-point {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #666;
  padding: 20px;
  /* margin-bottom: 20px; */
  /* 24.12.18 수정 - 추가 */
  margin-top: 20px;
  margin-bottom: 30px;
}

.charge-options {
  list-style: none;
  padding: 0;
  /* background-color: #d30f1a; */
  /* 24.12.18 수정 - 추가 */
  margin-top: 50px;

}

.point-title {
  margin-bottom: 10px;
}

.charge-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  /* 24.12.18 수정 - 추가 */
  height: 60px;
}

.charge-price {
  color: #d30f1a;
}

.confirm-button {
  background-color: #184199;
  color: white;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  /* 24.12.18 수정 - 추가 */
  height: 60px;
}

.confirm-button:hover {
  background-color: #002080;
}
</style>
