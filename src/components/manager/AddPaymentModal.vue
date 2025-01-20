<template>
    <!-- 24.12.18 생성 -->
    <div class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
            <!-- 모달 헤더 -->
            <div class="modal-header">
                <h2 class="modal-title pretendard-extra-extra-bold-log-cabin-24px">결제하기</h2>
                <button class="close-button" @click="closeModal">✕</button>
            </div>

            <!-- 결제 정보 -->
            <div class="point-charge">
                <ul class="charge-options">
                    <li class="charge-option">
                        <div class="point-option pretendard-regular-normal-log-cabin-18px">
                            이름
                        </div>
                        <span class="charge-price pretendard-bold-black-18px">테스트</span>
                    </li>

                    <li class="charge-option">
                        <div class="point-option pretendard-regular-normal-log-cabin-18px">
                            전화번호
                        </div>
                        <span class="charge-price pretendard-bold-black-18px">010-1234-1234</span>
                    </li>
                    <li class="charge-option">
                        <div class="point-option pretendard-regular-normal-log-cabin-18px">
                            이메일
                        </div>
                        <span class="charge-price pretendard-bold-black-18px">cyw@maxform.io</span>
                    </li>
                    <li class="charge-option">
                        <div class="point-option pretendard-regular-normal-log-cabin-18px">
                            상품명
                        </div>
                        <span class="charge-price pretendard-bold-black-18px">정액제 충전</span>
                    </li>
                    <li class="charge-option">
                        <div class="point-option pretendard-regular-normal-log-cabin-18px">
                            가격
                        </div>
                        <span class="charge-price pretendard-bold-black-18px" :value ='selectedMny'>{{ parseInt(selectedMny).toLocaleString() }}</span>
                    </li>
                    <li class="charge-option">
                        <div class="point-option">
                            결제방법선택 
                        </div>
                        <div>
                            <label><input type="radio" v-model="selectedPaymentMethod" value="VBANK"> 가상계좌</label>
                            <label><input type="radio" v-model="selectedPaymentMethod" value="BANK"> 무통장입금</label>
                            <label><input type="radio" v-model="selectedPaymentMethod" value="CARD"> 신용카드 결제</label>
                        </div>
                    </li>
                    <span style="color: red;" v-if="!selectedPaymentMethod">* 결제방법을 선택해주세요.</span>
                    <span style="color: red;" v-else>* 카드 결제 취소 시 결제된 카드로 취소되며,입금은 영업일 기준으로 2~3일 소요 됩니다.</span>

                </ul>
            </div>

            <button class="confirm-button pretendard-bold-white-18px" @click="confirm">결제하기</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddPaymentModal",
    data() {
        return {
            selectedPaymentMethod: null, // 선택된 결제 방법

        };
    },
    props: {
    selectedMny: {
      type: Number,
      required: true,
    },
  },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        confirm(){
            if (!this.selectedPaymentMethod) {
                alert('결제방법을 선택해주세요.');
                return;
            }
            console.log('this.selectedMny : : ' , this.selectedMny.toString())
            const paymentInfo = {
            name: '테스트',
            phone: '010-1234-1234',
            email: 'cyw@maxform.io',
            product: '정액제 충전',
            price: this.selectedMny.toString(),
            paymentMethod: this.selectedPaymentMethod, // 선택된 결제 방법
        };
        this.$emit("confirm", paymentInfo);
        }

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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 880px;
    height: 698px;
    border-radius: 5px;
    padding: 40px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
}

.point-charge {
    padding-top: 30px;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 14px;
    height: 14px;
}

.current-point {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #666;
    padding: 20px;
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
    height: 60px;
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
    height: 60px;
}

.confirm-button:hover {
    background-color: #002080;
}
</style>