<template>
    <div class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
            <!-- 모달 헤더 -->
            <div class="modal-header">
                <!-- 24.12.12 수정 - 모드 마다 title 명 변경 -->
                <div class="modal-title pretendard-extra-extra-bold-log-cabin-24px"> {{ isEditMode ?
                    '장비수정' : '장비추가' }}</div>
                <img class="material-symbolsclose-3"
                    src="https://cdn.animaapp.com/projects/66da512d0c22d478015e0e07/releases/66da51d8cf50153cef9952df/img/material-symbols-close.svg"
                    alt="material-symbols:close" @click="closeModal" />
            </div>

            <!-- 장비 리스트 반복 -->
            <div class="point-charge">
                <div class="shop-title">
                    <div class="equipment_name pretendard-regular-normal-log-cabin-16px"> 매장명</div>
                    <!-- <input type="text" class="store pretendard-medium-log-cabin-16px" placeholder="매장명을 입력해주세요"> -->
                    <!-- 24.11.18 수정 - v-if 추가 -->
                    <select v-if="!isEditMode" v-model="selectedShopId" class="store pretendard-medium-log-cabin-16px">
                        <option value="" disabled selected>매장명을 선택해주세요 </option>
                        <!-- <option v-for="shop in shopOptions" :key="shop.id" :value="shop.id">
                            {{ shop.name }}
                        </option> -->
                        <!-- 24.12.13 수정 - 추가 : branches에서 이미 등록된 매장 필터링 후 출력 -->
                        <option v-for="branch in filteredBranches" :key="branch.id" :value="branch.id">
                            {{ branch.name }}
                        </option>
                    </select>
                    <!-- 24.11.18 수정 - 추가 : edit 모드에서는 <option>을 고정으로 -->
                    <select v-else class="store pretendard-medium-log-cabin-16px" disabled>
                        <option value="" disabled selected>{{ machine.branchName }}</option>
                    </select>
                </div>
                <div v-for="(equipment, index) in equipmentList" :key="index" class="point-title">
                    <div class="equipment_name pretendard-regular-normal-log-cabin-16px">
                        장비종류{{ index + 1 }}
                    </div>
                    <div :class="'equip' + (index + 1)" class="equip equip-align pretendard-medium-log-cabin-16px">
                        {{ equipment.name }}
                    </div>
                    <input type="text" v-model="quantities[index]" class="count pretendard-medium-mountain-mist-16px"
                        placeholder="수량" />
                </div>

                <!-- <p>수량 배열: {{ quantities }}</p> -->

                <!-- 24.12.03 수정 - 추가 -->
                <!-- 추가된 장비 리스트 -->
                <div v-for="(equipment, index) in equipmentDetails" :key="'additional-' + index" class="point-title">
                    <div class="equipment_name pretendard-regular-normal-log-cabin-16px">
                        장비추가 {{ index + 1 }}
                    </div>
                    <div class="equip equip-align pretendard-medium-log-cabin-16px">
                        {{ equipment.title }}
                    </div>
                    <input type="text" v-model="equipment.num" class="count pretendard-medium-mountain-mist-16px"
                        placeholder="수량" />
                </div>

                <!-- 장비추가 부분 -->
                <div class="point-title">
                    <div class="equipment_name pretendard-regular-normal-log-cabin-16px">
                        장비추가
                    </div>
                    <input type="text" v-model="newEquipment" class="equip pretendard-medium-log-cabin-16px"
                        placeholder="장비명을 입력해주세요" />
                    <button class="add pretendard-medium-white-16px" @click="addEquipment">장비추가</button>
                </div>
            </div>

            <div class="add-modal-btn-align">
                <!-- 선택하기/취소하기 버튼 -->
                <button class="cancel-button pretendard-bold-white-18px" @click="closeModal">취소하기</button>
                <!-- 24.12.03 수정 - 추가 -->
                <button class="confirm-button pretendard-bold-white-18px" @click="confirmSelection"> {{ isEditMode ?
                    '수정하기' : '등록하기' }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { adminStore } from '@/store/adminStore';  // API 호출
export default {
    name: "AdminShopAddModal",
    data() {
        return {
            // 초기 장비 리스트
            equipmentList: [
                { name: "키오스크" },
                { name: "카메라 센서" },
                { name: "빔 프로젝트" },
                { name: "오토키업기" },
                { name: "티 브러쉬" },
                { name: "타석매트" },
            ],
            newEquipment: "", // 새로운 장비명을 위한 데이터
            shopOptions: [],
            selectedShopId: "",
            quantities: [],
            mode: "add", // 24.11.18 수정 - 추가
            isEditMode: !!this.machine.id, // machine.id가 있을 경우 edit 모드 -  24.11.18 수정 - 추가
            equipmentDetails: [], // 추가 장비 목록 - 24.12.03 수정 - 추가
        };
    },
    props: {
        // isVisible: {
        //     type: Boolean,
        //     required: true,
        // },
        machine: {
            type: Object,
            required: false,
            default: () => ({}), // 기본값을 빈 객체로 설정
        },
        // 24.12.13 수정 - 추가 : 이미 등록된 매장 필터링
        branches: {
            type: Array,
            required: false,
            default: () => [],  // 기본값 빈 배열
        },
    },
    mounted() {
        this.getGameshop();
        // 24.11.18 수정 - 추가
        if (this.mode === "edit" && this.machine.branchName) {
            // edit 모드일 경우 branchName을 selectedShopId에 설정
            this.selectedShopId = this.machine.branchName;
        }
    },
    created() {
        // Initialize the quantities array with empty strings for each equipment
        this.quantities = new Array(this.equipmentList.length).fill('');

        // 24.11.18 수정 - 추가
        if (this.isEditMode && this.machine) {
            this.quantities = [
                this.machine.kiosk || '',
                this.machine.cameraSensor || '',
                this.machine.beamProjector || '',
                this.machine.autoTeeUp || '',
                this.machine.teeBrush || '',
                this.machine.targetMat || ''
            ];
            // 24.12.03 수정 - 추가
            // 기존 추가 장비를 equipmentDetails에 설정
            if (this.machine.equipmentDetails) {
                this.equipmentDetails = this.machine.equipmentDetails.map(equipment => ({
                    title: equipment.title,
                    num: equipment.num || ''
                }));
            }
        }
    },
    // 24.12.13 수정 - 추가
    computed: {
        filteredBranches() {
            // 이미 등록된 매장을 필터링
            return this.branches.filter(
                (branch) => branch.id !== this.machine.branchId
            );
        },
    },
    // 24.11.18 수정 - 추가
    watch: {
        isEditMode(newValue) {
            if (newValue && this.machine) {
                this.quantities = [
                    this.machine.kiosk || '',
                    this.machine.cameraSensor || '',
                    this.machine.beamProjector || '',
                    this.machine.autoTeeUp || '',
                    this.machine.teeBrush || '',
                    this.machine.targetMat || ''
                ];
                // 24.12.03 수정 - 추가
                if (this.machine.equipmentDetails) {
                    this.equipmentDetails = this.machine.equipmentDetails.map(equipment => ({
                        title: equipment.title,
                        num: equipment.num || ''
                    }));
                }
                console.log('this.machine.equipmentDetails', this.machine.equipmentDetails)
            }
        }
    },
    methods: {
        // 새로운 장비 추가
        addEquipment() {
            if (this.newEquipment.trim()) {
                // 24.12.12 수정 - 장비 추가 시 중복 확인
                const existsInDetails = this.equipmentDetails.some(
                    equip => equip.title.replace(/\s+/g, '') === this.newEquipment.replace(/\s+/g, '')
                );
                const existsInList = this.equipmentList.some(
                    equip => equip.name.replace(/\s+/g, '') === this.newEquipment.replace(/\s+/g, '')
                );

                if (existsInDetails || existsInList) {
                    alert("이미 추가된 장비입니다.");
                    return;
                }
                
                // 새로운 장비를 리스트에 추가
                this.equipmentDetails.push({
                    title: this.newEquipment,
                    num: '', // 기본 수량을 비워둠
                });
                // 24.12.03 수정 - 추가
                this.newEquipment = ""; // 입력 필드 초기화
                console.log('this.equipmentDetails', this.equipmentDetails);

            } else {
                alert("장비명을 입력해주세요!");
            }
        },
        async getGameshop() {
            try {
                const response = await adminStore.getTask("v1/branch/list");
                this.shopOptions = response.map(shop => ({ id: shop.id, name: shop.name }));
            } catch (error) {
                console.error("매장 데이터를 가져오는 중 오류 발생:", error);
            }
        },
        closeModal() {
            this.$emit("close"); // 부모 컴포넌트에 모달 닫기 이벤트 전달
        },
        // async confirmSelection() {
        //     const params = {
        //         "branchId": parseInt(this.selectedShopId),
        //         "kiosk": parseInt(this.quantities[0]),
        //         "cameraSensor": parseInt(this.quantities[1]),
        //         "beamProjector": parseInt(this.quantities[2]),
        //         "autoTeeUp": parseInt(this.quantities[3]),
        //         "teeBrush": parseInt(this.quantities[4]),
        //         "targetMat": parseInt(this.quantities[5])
        //     }

        //     console.log("selectedShopId : : : :", this.selectedShopId)
        //     console.log("selectedShopId : : : :", JSON.stringify(params))
        //     // 선택 확인 로직을 추가할 수 있습니다.
        //     try {
        //         const response = await adminStore.postTask("branch-equipment", params);

        //         console.log("shopOptions: [], : :: : ", JSON.stringify(response)
        //         )
        //         this.$emit("confirm"); // 부모 컴포넌트에 확인 이벤트 전달
        //     } catch (error) {
        //         console.error("매장 데이터를 가져오는 중 오류 발생:", error);
        //     }

        // },

        // 24.11.18 수정
        async confirmSelection() {

            try {
                let response;
                if (this.isEditMode) {
                    console.log('edit equipmentList:', this.equipmentList);
                    console.log('edit quantities:', this.quantities);
                    const params = {
                        kiosk: parseInt(this.quantities[0]) || 0,
                        cameraSensor: parseInt(this.quantities[1]) || 0,
                        beamProjector: parseInt(this.quantities[2]) || 0,
                        autoTeeUp: parseInt(this.quantities[3]) || 0,
                        teeBrush: parseInt(this.quantities[4]) || 0,
                        targetMat: parseInt(this.quantities[5]) || 0,
                        // 24.12.03 수정 - 추가
                        // 추가된 장비 정보를 equipmentDetails 형식으로 생성
                        // 추가 장비를 equipmentDetails로 변환
                        equipmentDetails: this.equipmentDetails.map((equipment) => ({
                            title: equipment.title,
                            num: parseInt(equipment.num) || 0,
                        })),
                    };
                    console.log('update param', params)
                    response = await adminStore.updateTask(
                        `branch-equipment/${this.machine.id}`,
                        params
                    );
                    console.log("수정 응답:", response);
                } else {
                    console.log('post equipmentList:', this.equipmentList);
                    console.log('post quantities:', this.quantities);
                    const params = {
                        branchId: parseInt(this.selectedShopId),
                        kiosk: parseInt(this.quantities[0]) || 0,
                        cameraSensor: parseInt(this.quantities[1]) || 0,
                        beamProjector: parseInt(this.quantities[2]) || 0,
                        autoTeeUp: parseInt(this.quantities[3]) || 0,
                        teeBrush: parseInt(this.quantities[4]) || 0,
                        targetMat: parseInt(this.quantities[5]) || 0,
                        // 24.12.03 수정 - 추가
                        // 추가된 장비 정보를 equipmentDetails 형식으로 생성
                        equipmentDetails: this.equipmentDetails.map((equipment) => ({
                            title: equipment.title,
                            num: parseInt(equipment.num) || 0,
                        })),
                    };

                    console.log('post param', params)
                    response = await adminStore.postTask("branch-equipment", params);
                    console.log("등록 응답:", response);
                }
                this.$emit("confirm");
            } catch (error) {
                console.error("오류 발생:", error);
            }
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: white;
    width: 880px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    /* 24.12.03 수정 - 추가 */
    height: 100%;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
}

.equipment_name {
    white-space: nowrap;
    width: 94.5px;
}

.close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.point-charge {
    margin-top: 20px;
}

.point-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 15px;
}

.equip-align {
    background-color: #F5F6F6;
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: center;
}

.shop-title {
    display: flex;
    align-items: center;
    gap: 12px;
}

.add {
    background-color: #444444;
    width: 150px;
    height: 60px;
    text-align: center;
    border: none;
    cursor: pointer;
}

.store {
    width: calc(100% - 30px);
    height: 60px;
    padding: 0 15px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
}

.cancel-button,
.confirm-button {
    width: 49%;
    height: 50px;
    border: none;
    cursor: pointer;
}

.cancel-button {
    background-color: #999999;
    color: #ffffff;
}

.confirm-button {
    background-color: #184199;
    color: #ffffff;
}

.cancel-button:hover {
    background-color: #777777;
}

.confirm-button:hover {
    background-color: #002080;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.equip {
    width: 550px;
    height: 60px;
    border: 1px solid #ddd;
    padding: 0 15px;
    outline: none;

}

.count {
    width: 150px;
    height: 60px;
    text-align: center;
}

.add-modal-btn-align {
    display: flex;
    gap: 10px;
}
</style>
