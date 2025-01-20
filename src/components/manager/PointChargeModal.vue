<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <!-- 모달 헤더 -->
      <div class="modal-header">
        <!-- 24.12.18  수정 - 폰트 수정 -->
        <h2 class="modal-title pretendard-extra-extra-bold-log-cabin-24px">포인트 충전</h2>
        <button class="close-button" @click="closeModal">✕</button>
      </div>

      <!-- 보유 포인트 -->
      <div class="current-point pretendard-bold-white-18px">
        <div class="point-label">보유포인트</div>
        <div class="point-value">{{ currentPoint }}P</div>
      </div>

      <!-- 포인트 충전 목록 -->
      <div class="point-charge">
        <!-- 24.12.18  수정 - 폰트 수정 -->
        <div class="point-title pretendard-medium-black-16px">포인트 충전</div>
        <ul class="charge-options">
          <li v-for="(option, index) in chargeOptions" :key="index" class="charge-option">
            <!-- 24.12.18  수정 - 폰트 추가 -->
            <div class="point-option pretendard-regular-normal-log-cabin-18px">
              <input type="radio" :id="'option-' + index" :value="option.point" v-model="selectedOption" />

              <label :for="'option-' + index">{{ option.point }}P</label>
            </div>
            <!-- 24.12.18  수정 - 폰트 추가 -->
            <span class="charge-price pretendard-bold-monza-18px">{{ option.price }}</span>

          </li>
          <li class="charge-option">
            <div class="point-option">
              <input type="radio" id="custom" value="custom" v-model="selectedOption" />
              <!-- <input type="text" v-if="selectedOption === 'custom'" v-model="customAmount" placeholder="직접 입력해주세요"
              class="custom-input" /> -->
              <!-- 24.12.18  수정 - 폰트 수정 -->
              <label for="custom" v-if="selectedOption !== 'custom'"
                class="label-align pretendard-regular-normal-log-cabin-18px">직접
                선택해주세요</label>
            </div>
            <!-- 24.12.18  수정 - 폰트 수정 -->
            <select v-if="selectedOption === 'custom'" class="custom-select pretendard-regular-normal-log-cabin-18px"
              v-model="customAmount">
              <!-- 24.12.18  수정 - 폰트 수정 -->
              <option value="" disabled class="pretendard-regular-normal-log-cabin-18px">직접 선택해주세요</option>
              <option value=" a 포인트">a 포인트</option>
              <option value="b 포인트">b 포인트</option>
              <option value="c 포인트">c 포인트</option>
            </select>
          </li>
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
  name: "PointChargeModal",
  data() {
    return {
      currentPoint: 70000, // 보유 포인트
      selectedOption: null, // 선택된 포인트 옵션
      customAmount: "", // 직접 선택한 포인트
      // chargeOptions: [
      //   { point: "10,000", price: "\\10,000" },
      //   { point: "20,000", price: "\\20,000" },
      //   { point: "30,000", price: "\\30,000" },
      //   { point: "40,000", price: "\\40,000" },
      // ],
      // 24.12.18 수정 - 원화 표시
      chargeOptions: [
        { point: "10,000", price: "\u20A910,000" },
        { point: "20,000", price: "\u20A920,000" },
        { point: "30,000", price: "\u20A930,000" },
        { point: "40,000", price: "\u20A940,000" },
      ]

    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    confirmSelection() {
      const selected = this.selectedOption === "custom" ? this.customAmount : this.selectedOption;
      alert(`${selected}P 선택됨`);
      this.closeModal();
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
  height: 698px;
  border-radius: 5px;
  padding: 40px;
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
  margin: 0;
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
  text-align: center;
  /* 24.12.18 수정 - 추가 */
  height: 60px;
}

/* 24.12.18 수정 - 추가 */
.point-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-align {
  margin-right: 8rem;
}

.custom-select {
  width: 100%;
  border: none;
}

.point-price {
  display: flex;
}

.charge-price {
  color: #d30f1a;
  text-align: right;
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
